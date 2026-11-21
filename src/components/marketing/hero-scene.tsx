"use client";

import { AdaptiveDpr } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef } from "react";
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DoubleSide,
  EdgesGeometry,
  MathUtils,
  Points,
  QuadraticBezierCurve3,
  ShaderMaterial,
  Vector3,
  type Group,
} from "three";

export type HeroDivisionId = "data" | "intelligence" | "engineering";

type TowerSpec = {
  id: HeroDivisionId;
  color: string;
  x: number;
  halfW: number;
  halfD: number;
  roof: [number, number, number, number];
};

const TOWERS: readonly TowerSpec[] = [
  { id: "data", color: "#ff9a32", x: -1.72, halfW: 0.3, halfD: 0.22, roof: [1.7, 1.32, 1.18, 1.56] },
  { id: "intelligence", color: "#8d5cff", x: 0, halfW: 0.32, halfD: 0.24, roof: [2.58, 2.5, 2.32, 2.4] },
  { id: "engineering", color: "#2ad4e0", x: 1.72, halfW: 0.28, halfD: 0.2, roof: [1.22, 1.66, 1.52, 1.12] },
];

const LINKS: readonly { start: number; end: number; y0: number; y1: number; z: number; lift: number }[] = [
  { start: 0, end: 1, y0: 0.98, y1: 1.22, z: 1.15, lift: 0.18 },
  { start: 1, end: 2, y0: 1.18, y1: 0.9, z: 1.05, lift: 0.16 },
  { start: 0, end: 2, y0: 0.42, y1: 0.4, z: 1.5, lift: 0.02 },
];

const glassVertex = `
  varying vec3 vNormal;
  varying vec3 vWorld;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorld = worldPosition.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const glassFragment = `
  uniform vec3 uColor;
  uniform float uStrength;
  varying vec3 vNormal;
  varying vec3 vWorld;
  void main() {
    vec3 view = normalize(cameraPosition - vWorld);
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), view)), 1.85);
    float base = smoothstep(1.35, 0.0, vWorld.y);
    float alpha = 0.12 + base * 0.14 + fresnel * (0.36 + uStrength * 0.22);
    vec3 color = uColor * (0.55 + base * 0.35 + fresnel);
    gl_FragColor = vec4(color, alpha);
  }
`;

const signalVertex = `
  attribute float aAlong;
  varying float vAlong;
  void main() {
    vAlong = aAlong;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const signalFragment = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uBoost;
  varying float vAlong;
  void main() {
    float travel = fract(vAlong - uTime * 0.22);
    float pulse = smoothstep(0.0, 0.015, travel) * smoothstep(0.16, 0.02, travel);
    float alpha = (0.34 + pulse) * uBoost;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const moteVertex = `
  attribute float aPhase;
  attribute float aHeight;
  attribute float aSpeed;
  uniform float uTime;
  uniform float uSize;
  uniform float uBoost;
  varying float vGlow;
  void main() {
    float rise = fract(aPhase + uTime * aSpeed);
    vec3 lifted = vec3(position.x, rise * aHeight, position.z);
    vec4 viewPosition = modelViewMatrix * vec4(lifted, 1.0);
    float spark = smoothstep(0.9, 1.0, fract(aPhase * 2.7 + uTime * 0.12));
    vGlow = (0.4 + spark) * uBoost;
    gl_PointSize = clamp(uSize * vGlow * (36.0 / max(1.0, -viewPosition.z)), 1.0, 3.2);
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const moteFragment = `
  uniform vec3 uColor;
  varying float vGlow;
  void main() {
    vec2 point = gl_PointCoord * 2.0 - 1.0;
    float dist = dot(point, point);
    if (dist > 1.0) discard;
    float core = smoothstep(1.0, 0.2, dist);
    gl_FragColor = vec4(uColor, core * vGlow);
  }
`;

const strandVertex = `
  attribute float aAlong;
  attribute float aEdge;
  attribute float aSide;
  attribute vec3 aTangent;
  attribute vec3 color;
  uniform float uWidth;
  varying float vAlong;
  varying float vEdge;
  varying vec3 vColor;
  void main() {
    vAlong = aAlong;
    vEdge = aEdge;
    vColor = color;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vec3 view = normalize(cameraPosition - world.xyz);
    vec3 side = normalize(cross(normalize(aTangent), view));
    world.xyz += side * aSide * uWidth;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const strandFragment = `
  uniform float uTime;
  uniform vec3 uEdge;
  varying float vAlong;
  varying float vEdge;
  varying vec3 vColor;
  void main() {
    float boost = vEdge < 0.5 ? uEdge.x : vEdge < 1.5 ? uEdge.y : uEdge.z;
    float forward = fract(vAlong - uTime * 0.16);
    float back = fract(vAlong + uTime * 0.13);
    float pulseA = smoothstep(0.0, 0.01, forward) * smoothstep(0.1, 0.012, forward);
    float pulseB = smoothstep(0.0, 0.014, back) * smoothstep(0.14, 0.016, back);
    float body = 0.28 + 0.08 * sin(vAlong * 22.0 + uTime);
    float alpha = (body + pulseA + pulseB * 0.55) * (0.35 + boost);
    gl_FragColor = vec4(vColor * (0.85 + pulseA), alpha);
  }
`;

function unit(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function useDisposed<T extends { dispose: () => void }>(value: T) {
  useEffect(() => () => value.dispose(), [value]);
  return value;
}

function minRoof(roof: TowerSpec["roof"]) {
  return Math.min(roof[0], roof[1], roof[2], roof[3]);
}

function prismGeometry(spec: TowerSpec) {
  const { halfW: w, halfD: d, roof } = spec;
  const positions = new Float32Array([
    -w, 0, -d, w, 0, -d, w, 0, d, -w, 0, d,
    -w, roof[0], -d, w, roof[1], -d, w, roof[2], d, -w, roof[3], d,
  ]);
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setIndex([
    0, 2, 1, 0, 3, 2,
    4, 5, 6, 4, 6, 7,
    3, 6, 2, 3, 7, 6,
    0, 1, 5, 0, 5, 4,
    0, 4, 7, 0, 7, 3,
    1, 2, 6, 1, 6, 5,
  ]);
  geometry.computeVertexNormals();
  return geometry;
}

function facetGeometry(spec: TowerSpec) {
  const { halfW: w, halfD: d } = spec;
  const peak = minRoof(spec.roof);
  const positions = new Float32Array([
    -w * 0.62, peak * 0.12, d * 0.25,
    w * 0.55, peak * 0.78, -d * 0.2,
    -w * 0.15, peak * 0.94, -d * 0.35,
    w * 0.4, peak * 0.22, d * 0.32,
    -w * 0.48, peak * 0.55, -d * 0.05,
    w * 0.2, peak * 0.4, d * 0.08,
  ]);
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setIndex([0, 1, 2, 0, 3, 1, 4, 5, 1]);
  geometry.computeVertexNormals();
  return geometry;
}

function signalGeometry(spec: TowerSpec, count: number) {
  const peak = minRoof(spec.roof) * 0.9;
  const positions: number[] = [];
  const along: number[] = [];
  for (let index = 0; index < count; index += 1) {
    const x = (unit(index, spec.x + 1) - 0.5) * spec.halfW * 1.35;
    const z = (unit(index, spec.x + 2) - 0.5) * spec.halfD * 1.35;
    const top = peak * (0.35 + unit(index, spec.x + 3) * 0.65);
    positions.push(x, 0.04, z, x, top, z);
    along.push(0, 1);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
  geometry.setAttribute("aAlong", new BufferAttribute(new Float32Array(along), 1));
  return geometry;
}

function moteGeometry(spec: TowerSpec, count: number) {
  const peak = minRoof(spec.roof) * 0.88;
  const positions = new Float32Array(count * 3);
  const phase = new Float32Array(count);
  const height = new Float32Array(count);
  const speed = new Float32Array(count);
  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = (unit(index, 4) - 0.5) * spec.halfW * 1.2;
    positions[index * 3 + 2] = (unit(index, 5) - 0.5) * spec.halfD * 1.2;
    phase[index] = unit(index, 6);
    height[index] = peak * (0.45 + unit(index, 7) * 0.55);
    speed[index] = 0.08 + unit(index, 8) * 0.14;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("aPhase", new BufferAttribute(phase, 1));
  geometry.setAttribute("aHeight", new BufferAttribute(height, 1));
  geometry.setAttribute("aSpeed", new BufferAttribute(speed, 1));
  return geometry;
}

function facePoint(index: number, side: "left" | "right", y: number) {
  const tower = TOWERS[index];
  const x = tower.x + (side === "right" ? tower.halfW : -tower.halfW);
  return new Vector3(x, y, 0);
}

function buildLinks(mobile: boolean) {
  const strandCount = mobile ? 5 : 9;
  const samples = mobile ? 24 : 34;
  const positions: number[] = [];
  const along: number[] = [];
  const edges: number[] = [];
  const sides: number[] = [];
  const tangents: number[] = [];
  const colors: number[] = [];
  const curves: QuadraticBezierCurve3[] = [];
  const point = new Vector3();
  const ahead = new Vector3();
  const tangent = new Vector3();
  const mixed = new Color();
  const indices: number[] = [];
  let vertex = 0;

  LINKS.forEach((link, edge) => {
    const startColor = new Color(TOWERS[link.start].color);
    const endColor = new Color(TOWERS[link.end].color);
    const origin = facePoint(link.start, "right", link.y0);
    const target = facePoint(link.end, "left", link.y1);
    for (let strand = 0; strand < strandCount; strand += 1) {
      const yBand = (unit(strand + edge * 5, 1) - 0.5) * 0.36;
      const zBand = (unit(strand, 2) - 0.5) * 0.16;
      const start = origin.clone();
      const end = target.clone();
      start.y += yBand;
      end.y += yBand * 0.85;
      start.z += zBand * 0.25;
      end.z += zBand * 0.25;
      const mid = new Vector3((start.x + end.x) / 2, (start.y + end.y) / 2 + link.lift, link.z + zBand);
      const curve = new QuadraticBezierCurve3(start, mid, end);
      curves.push(curve);
      const base = vertex;
      for (let step = 0; step < samples; step += 1) {
        const t = step / (samples - 1);
        curve.getPoint(t, point);
        curve.getPoint(Math.min(t + 0.02, 1), ahead);
        tangent.copy(ahead).sub(point);
        if (tangent.lengthSq() < 1e-8) tangent.set(0, 1, 0);
        tangent.normalize();
        positions.push(point.x, point.y, point.z, point.x, point.y, point.z);
        tangents.push(tangent.x, tangent.y, tangent.z, tangent.x, tangent.y, tangent.z);
        sides.push(-1, 1);
        along.push(t, t);
        edges.push(edge, edge);
        mixed.copy(startColor).lerp(endColor, t);
        colors.push(mixed.r, mixed.g, mixed.b, mixed.r, mixed.g, mixed.b);
        vertex += 2;
      }
      for (let step = 0; step < samples - 1; step += 1) {
        const offset = base + step * 2;
        indices.push(offset, offset + 1, offset + 2, offset + 1, offset + 3, offset + 2);
      }
    }
  });

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
  geometry.setAttribute("aAlong", new BufferAttribute(new Float32Array(along), 1));
  geometry.setAttribute("aEdge", new BufferAttribute(new Float32Array(edges), 1));
  geometry.setAttribute("aSide", new BufferAttribute(new Float32Array(sides), 1));
  geometry.setAttribute("aTangent", new BufferAttribute(new Float32Array(tangents), 3));
  geometry.setAttribute("color", new BufferAttribute(new Float32Array(colors), 3));
  geometry.setIndex(indices);
  return { geometry, curves };
}

function edgeWeights(active: HeroDivisionId | null) {
  if (!active) return [0.62, 0.62, 0.34] as const;
  const linked = [
    active === "data" || active === "intelligence",
    active === "intelligence" || active === "engineering",
    active === "data" || active === "engineering",
  ];
  return linked.map((on) => (on ? 1 : 0.14));
}

function dotTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext("2d");
  const texture = new CanvasTexture(canvas);
  if (!context) return texture;
  const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.45, "rgba(255,255,255,0.8)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 32, 32);
  texture.needsUpdate = true;
  return texture;
}

function Tower({
  spec,
  highlighted,
  dimmed,
  reduced,
  mobile,
  mirror,
  onHover,
  onSelect,
}: {
  spec: TowerSpec;
  highlighted: boolean;
  dimmed: boolean;
  reduced: boolean;
  mobile: boolean;
  mirror?: boolean;
  onHover: (id: HeroDivisionId | null) => void;
  onSelect: (id: HeroDivisionId) => void;
}) {
  const glass = useRef<ShaderMaterial>(null);
  const signals = useRef<ShaderMaterial>(null);
  const motes = useRef<ShaderMaterial>(null);
  const shell = useMemo(() => prismGeometry(spec), [spec]);
  const facets = useMemo(() => facetGeometry(spec), [spec]);
  const wires = useMemo(() => new EdgesGeometry(shell, 1), [shell]);
  const streams = useMemo(() => signalGeometry(spec, mobile ? 6 : 12), [spec, mobile]);
  const motesGeo = useMemo(() => moteGeometry(spec, mobile ? 28 : 64), [spec, mobile]);
  const color = useMemo(() => new Color(spec.color), [spec.color]);
  const glassUniforms = useMemo(() => ({ uColor: { value: color }, uStrength: { value: 0.35 } }), [color]);
  const signalUniforms = useMemo(() => ({ uColor: { value: color }, uTime: { value: 0 }, uBoost: { value: 1 } }), [color]);
  const moteUniforms = useMemo(() => ({ uColor: { value: color }, uTime: { value: 0 }, uSize: { value: 1.7 }, uBoost: { value: 1 } }), [color]);
  useDisposed(shell);
  useDisposed(facets);
  useDisposed(wires);
  useDisposed(streams);
  useDisposed(motesGeo);

  useFrame((state, delta) => {
    const boost = highlighted ? 1 : dimmed ? 0.45 : 0.72;
    if (glass.current) {
      const current = glass.current.uniforms.uStrength.value as number;
      const target = highlighted ? 0.85 : dimmed ? 0.2 : 0.4;
      glass.current.uniforms.uStrength.value = reduced ? target : MathUtils.damp(current, target, 4, delta);
    }
    if (signals.current) {
      signals.current.uniforms.uTime.value = reduced ? 0 : state.clock.elapsedTime;
      signals.current.uniforms.uBoost.value = reduced ? boost : MathUtils.damp(signals.current.uniforms.uBoost.value as number, boost, 4, delta);
    }
    if (motes.current) {
      motes.current.uniforms.uTime.value = reduced ? 0 : state.clock.elapsedTime;
      motes.current.uniforms.uBoost.value = boost;
    }
  });

  if (mirror) {
    return (
      <group position={[spec.x, 0, 0]}>
        <mesh geometry={shell} raycast={() => null}>
          <shaderMaterial transparent depthWrite={false} uniforms={glassUniforms} vertexShader={glassVertex} fragmentShader={glassFragment} />
        </mesh>
        <lineSegments geometry={wires} raycast={() => null}>
          <lineBasicMaterial color={spec.color} transparent opacity={0.14} depthWrite={false} />
        </lineSegments>
      </group>
    );
  }

  return (
    <group position={[spec.x, 0, 0]}>
      <points geometry={motesGeo} renderOrder={1}>
        <shaderMaterial
          ref={motes}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          uniforms={moteUniforms}
          vertexShader={moteVertex}
          fragmentShader={moteFragment}
        />
      </points>
      <lineSegments geometry={streams} renderOrder={1}>
        <shaderMaterial
          ref={signals}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          uniforms={signalUniforms}
          vertexShader={signalVertex}
          fragmentShader={signalFragment}
        />
      </lineSegments>
      <mesh geometry={facets} renderOrder={2}>
        <shaderMaterial transparent depthWrite={false} side={DoubleSide} uniforms={glassUniforms} vertexShader={glassVertex} fragmentShader={glassFragment} />
      </mesh>
      <mesh
        geometry={shell}
        renderOrder={2}
        onPointerOver={(event) => {
          event.stopPropagation();
          onHover(spec.id);
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          onHover(null);
        }}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(spec.id);
        }}
      >
        <shaderMaterial ref={glass} transparent depthWrite={false} uniforms={glassUniforms} vertexShader={glassVertex} fragmentShader={glassFragment} />
      </mesh>
      <lineSegments geometry={wires} renderOrder={3}>
        <lineBasicMaterial color={spec.color} transparent opacity={highlighted ? 0.95 : dimmed ? 0.28 : 0.62} />
      </lineSegments>
    </group>
  );
}

function Strands({ active, reduced, mobile }: { active: HeroDivisionId | null; reduced: boolean; mobile: boolean }) {
  const material = useRef<ShaderMaterial>(null);
  const points = useRef<Points>(null);
  const scratch = useRef(new Vector3());
  const invalidate = useThree((state) => state.invalidate);
  const built = useMemo(() => buildLinks(mobile), [mobile]);
  const perDirection = mobile ? 5 : 9;
  const total = LINKS.length * perDirection * 2;
  const sprite = useMemo(() => dotTexture(), []);
  const particleGeometry = useMemo(() => {
    const positions = new Float32Array(total * 3);
    const colors = new Float32Array(total * 3);
    const sample = new Vector3();
    for (let slot = 0; slot < total; slot += 1) {
      const edge = Math.floor(slot / (perDirection * 2));
      const curve = built.curves[edge * (mobile ? 5 : 9)];
      curve.getPoint(unit(slot, 3), sample);
      positions.set([sample.x, sample.y, sample.z], slot * 3);
      const link = LINKS[edge];
      const tint = new Color(slot % 2 === 0 ? TOWERS[link.start].color : TOWERS[link.end].color);
      colors.set([tint.r, tint.g, tint.b], slot * 3);
    }
    const buffer = new BufferGeometry();
    buffer.setAttribute("position", new BufferAttribute(positions, 3));
    buffer.setAttribute("color", new BufferAttribute(colors, 3));
    return buffer;
  }, [built.curves, mobile, perDirection, total]);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uEdge: { value: new Vector3(0.62, 0.62, 0.34) }, uWidth: { value: mobile ? 0.0028 : 0.0032 } }),
    [mobile],
  );
  useDisposed(built.geometry);
  useDisposed(particleGeometry);
  useDisposed(sprite);

  useEffect(() => {
    invalidate();
  }, [active, invalidate]);

  useFrame((state) => {
    if (!material.current) return;
    const weights = edgeWeights(active);
    material.current.uniforms.uTime.value = reduced ? 0 : state.clock.elapsedTime;
    (material.current.uniforms.uEdge.value as Vector3).set(weights[0], weights[1], weights[2]);
    if (reduced || !points.current) return;
    const attribute = points.current.geometry.getAttribute("position");
    const strandCount = mobile ? 5 : 9;
    const elapsed = state.clock.elapsedTime;
    for (let slot = 0; slot < total; slot += 1) {
      const edge = Math.floor(slot / (perDirection * 2));
      const direction = slot % (perDirection * 2) < perDirection ? 1 : -1;
      const curve = built.curves[edge * strandCount + (slot % strandCount)];
      const speed = 0.07 + unit(slot, 4) * 0.08;
      let phase = (unit(slot, 5) + elapsed * speed * direction) % 1;
      if (phase < 0) phase += 1;
      curve.getPoint(phase, scratch.current);
      attribute.setXYZ(slot, scratch.current.x, scratch.current.y, scratch.current.z);
    }
    attribute.needsUpdate = true;
  });

  return (
    <>
      <mesh geometry={built.geometry} renderOrder={4}>
        <shaderMaterial
          ref={material}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          uniforms={uniforms}
          vertexShader={strandVertex}
          fragmentShader={strandFragment}
        />
      </mesh>
      <points ref={points} geometry={particleGeometry} renderOrder={4}>
        <pointsMaterial map={sprite} size={mobile ? 0.03 : 0.022} vertexColors transparent depthWrite={false} blending={AdditiveBlending} sizeAttenuation alphaTest={0.05} />
      </points>
    </>
  );
}

function Floor() {
  const grid = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const push = (x: number, z: number) => {
      positions.push(x, 0.004, z);
      const fade = 1 - Math.min(1, Math.hypot(x, z * 0.8) / 4.4);
      const shade = 0.08 + fade * 0.22;
      colors.push(shade, shade + 0.02, shade + 0.05);
    };
    for (let x = -3.4; x <= 3.4; x += 0.34) {
      push(x, -1.5);
      push(x, 2.3);
    }
    for (let z = -1.5; z <= 2.3; z += 0.34) {
      push(-3.4, z);
      push(3.4, z);
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute("color", new BufferAttribute(new Float32Array(colors), 3));
    return geometry;
  }, []);
  const dust = useMemo(() => {
    const count = 48;
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (unit(index, 9) - 0.5) * 7;
      positions[index * 3 + 1] = 0.4 + unit(index, 10) * 2.4;
      positions[index * 3 + 2] = -1.2 - unit(index, 11) * 2.2;
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    return geometry;
  }, []);
  useDisposed(grid);
  useDisposed(dust);

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0.3]}>
        <planeGeometry args={[8, 5]} />
        <meshBasicMaterial color="#070d18" transparent opacity={0.42} depthWrite={false} />
      </mesh>
      <lineSegments geometry={grid}>
        <lineBasicMaterial vertexColors transparent opacity={0.85} />
      </lineSegments>
      <points geometry={dust}>
        <pointsMaterial color="#9aa8c2" size={0.012} sizeAttenuation transparent opacity={0.28} depthWrite={false} />
      </points>
    </>
  );
}

function CameraRig({ enabled }: { enabled: boolean }) {
  const engaged = useRef(false);
  const dom = useThree((state) => state.gl.domElement);

  useEffect(() => {
    const enter = () => {
      engaged.current = true;
    };
    const leave = () => {
      engaged.current = false;
    };
    dom.addEventListener("pointerenter", enter);
    dom.addEventListener("pointerleave", leave);
    return () => {
      dom.removeEventListener("pointerenter", enter);
      dom.removeEventListener("pointerleave", leave);
    };
  }, [dom]);

  useFrame((state, delta) => {
    const active = enabled && engaged.current;
    const idle = enabled ? Math.sin(state.clock.elapsedTime * 0.18) * 0.12 : 0;
    const x = active ? state.pointer.x * 0.42 : idle;
    const y = 1.82 + (active ? state.pointer.y * 0.14 : 0);
    state.camera.position.x = MathUtils.damp(state.camera.position.x, x, 2, delta);
    state.camera.position.y = MathUtils.damp(state.camera.position.y, y, 2, delta);
    state.camera.lookAt(0, 0.88, 0);
  });

  return null;
}

function Scene({
  active,
  reduced,
  mobile,
  onHover,
  onSelect,
}: {
  active: HeroDivisionId | null;
  reduced: boolean;
  mobile: boolean;
  onHover: (id: HeroDivisionId | null) => void;
  onSelect: (id: HeroDivisionId) => void;
}) {
  const sway = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!sway.current) return;
    const target = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
    sway.current.rotation.y = MathUtils.damp(sway.current.rotation.y, target, 1.4, delta);
  });

  return (
    <>
      <color attach="background" args={["#070d18"]} />
      <AdaptiveDpr pixelated />
      <CameraRig enabled={!reduced && !mobile} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[2.4, 4.2, 3.2]} intensity={0.85} color="#e7eeff" />
      <pointLight position={[-1.7, 1.2, 1.1]} color="#ff9a32" intensity={1.4} distance={4.5} />
      <pointLight position={[0, 1.8, 1.1]} color="#8d5cff" intensity={1.6} distance={5} />
      <pointLight position={[1.7, 1.15, 1.1]} color="#2ad4e0" intensity={1.4} distance={4.5} />
      <Floor />
      <group ref={sway}>
        <Strands active={active} reduced={reduced} mobile={mobile} />
        {TOWERS.map((spec) => (
          <Tower
            key={spec.id}
            spec={spec}
            highlighted={active === spec.id}
            dimmed={active !== null && active !== spec.id}
            reduced={reduced}
            mobile={mobile}
            onHover={onHover}
            onSelect={onSelect}
          />
        ))}
        <group position={[0, -0.02, 0]} scale={[1, -0.38, 1]}>
          {TOWERS.map((spec) => (
            <Tower
              key={`${spec.id}-reflection`}
              spec={spec}
              highlighted={false}
              dimmed
              reduced
              mobile={mobile}
              mirror
              onHover={onHover}
              onSelect={onSelect}
            />
          ))}
        </group>
      </group>
      {mobile ? null : (
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom intensity={0.16} luminanceThreshold={0.96} luminanceSmoothing={0.12} mipmapBlur radius={0.2} levels={4} />
        </EffectComposer>
      )}
    </>
  );
}

export function HeroScene({
  active,
  reduced,
  mobile,
  paused,
  onHover,
  onSelect,
}: {
  active: HeroDivisionId | null;
  reduced: boolean;
  mobile: boolean;
  paused: boolean;
  onHover: (id: HeroDivisionId | null) => void;
  onSelect: (id: HeroDivisionId) => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 1.82, 9.4], fov: 28 }}
      dpr={mobile ? [1, 1.25] : [1, 1.5]}
      frameloop={reduced || paused ? "demand" : "always"}
      gl={{ antialias: !mobile, alpha: false, powerPreference: "default" }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#070d18", 1);
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 1;
      }}
    >
      <Scene active={active} reduced={reduced} mobile={mobile} onHover={onHover} onSelect={onSelect} />
    </Canvas>
  );
}
