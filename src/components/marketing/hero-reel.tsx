"use client";

import { useEffect, useRef, useState } from "react";

const clips = [
  { src: "/video/hero-engineers.mp4", poster: "/images/editorial/hero-engineers.jpg" },
  { src: "/video/hero-meeting.mp4", poster: "/images/editorial/hero-meeting.jpg" },
] as const;

function playFromStart(video: HTMLVideoElement) {
  const start = () => {
    void video.play().catch(() => undefined);
  };
  if (!video.ended && video.currentTime < 0.05) {
    start();
    return;
  }
  const onSeeked = () => {
    video.removeEventListener("seeked", onSeeked);
    start();
  };
  video.addEventListener("seeked", onSeeked);
  video.currentTime = 0;
}

export function HeroReel() {
  const refs = useRef<Array<HTMLVideoElement | null>>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const firstPlay = useRef(true);

  useEffect(() => {
    activeRef.current = active;
    if (firstPlay.current) {
      firstPlay.current = false;
      return;
    }
    refs.current.forEach((video, index) => {
      if (!video) return;
      if (index !== active) {
        video.pause();
        return;
      }
      playFromStart(video);
    });
  }, [active]);

  return (
    <>
      {clips.map((clip, index) => (
        <video
          key={clip.src}
          ref={(node) => {
            refs.current[index] = node;
          }}
          className={`hero-video absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === active ? "opacity-100" : "pointer-events-none opacity-0"}`}
          autoPlay={index === 0}
          muted
          playsInline
          preload="auto"
          poster={clip.poster}
          aria-hidden="true"
          onEnded={() => {
            if (index !== activeRef.current) return;
            setActive((value) => (value + 1) % clips.length);
          }}
        >
          <source src={clip.src} type="video/mp4" />
        </video>
      ))}
    </>
  );
}
