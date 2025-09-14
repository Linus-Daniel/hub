import { NextRequest, NextResponse } from "next/server";

// hub/src/lib/cors.ts
export function createOptionsResponse(origin?: string): Response {
  const allowedOrigin =
    origin || process.env.ADMIN_DOMAIN || "http://localhost:3000";

  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}


export function addCorsHeaders(
  response: NextResponse,
  request: NextRequest
): NextResponse {
  const origin =
    request.headers.get("origin") ||
    process.env.ADMIN_DOMAIN ||
    "http://localhost:3000";

  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");

  return response;
}