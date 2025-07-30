// app/api/dashboard/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://dashboard-api-dusky.vercel.app/api/get", {
    headers: {
      Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"}`, // use env
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch" },
      { status: res.status }
    );
  }

  const data = await res.json();

  return NextResponse.json(data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
