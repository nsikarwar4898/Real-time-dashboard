"use client";

import { DashboardApiResponse } from "@/lib/types/types";
import { useEffect, useState } from "react";
import Map from "./organsims/Map";
import LineChart from "./organsims/LineChart";

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
  console.log(data, "kk");
  return (
    <div className="flex">
      <main className="flex-1 p-4 space-y-4">
        {/* Page Header */}
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* Top grid: Summary, Orders, Top Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow border">Summary</div>
          <div className="bg-white p-4 rounded shadow border">Orders</div>
          <div className="bg-white p-4 rounded shadow border">Top Products</div>
        </div>

        {/* Middle grid: Line chart + Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded border border-gray-300">
            <div className="text-sm text-gray-700 font-medium px-4 py-2 border-b border-gray-300 rounded-t">
              Sales Chart
            </div>
            <div className="p-4">
              <LineChart />
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow border">
            Payments Table
          </div>
        </div>

        {/* Full width map */}
        <div className="bg-white rounded border border-gray-300">
          <div className="text-sm text-gray-700 font-medium px-4 py-2 border-b border-gray-300 rounded-t">
            Locations
          </div>
          <div className="p-4">
            <Map locations={data.data.dashboardData.map.locations} />
          </div>
        </div>
      </main>
    </div>
  );
}
