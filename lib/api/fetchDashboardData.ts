import { DashboardApiResponse } from "../types/types";

export async function fetchDashboardData(): Promise<DashboardApiResponse> {
  const API_URL = "https://dashboard-api-dusky.vercel.app/api/get";

  const res = await fetch(API_URL, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  return res.json();
}
