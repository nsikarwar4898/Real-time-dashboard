"use client";

import { DashboardApiResponse } from "@/lib/types/types";
import { useEffect, useState } from "react";
import Map from "./organsims/Map";

type Props = {
  initialData: DashboardApiResponse;
};

export default function DashboardClient({ initialData }: Props) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard");
        if (!res.ok) throw new Error("Failed to fetch");
        const newData = await res.json();
        setData(newData);
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    const interval = setInterval(fetchData, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex">
      <main className="flex-1 p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          data
          <Map />
        </div>
      </main>
    </div>
  );
}
