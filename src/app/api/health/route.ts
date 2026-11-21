import { publicHealth } from "@/server/observability/record";

export function GET() {
  return Response.json(publicHealth(), {
    headers: { "Cache-Control": "no-store" },
  });
}
