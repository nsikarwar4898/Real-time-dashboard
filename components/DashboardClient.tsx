'use client';

import { useEffect, useState } from 'react';
import { DashboardApiResponse } from '@/lib/types/types';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import Map from './organsims/Map';
import LineChart from './organsims/LineChart';

const ResponsiveGridLayout = WidthProvider(Responsive);

type Props = {
  initialData: DashboardApiResponse;
};

export default function DashboardClient({ initialData }: Props) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/dashboard');
        if (!res.ok) throw new Error('Failed to fetch');
        const newData = await res.json();
        setData(newData);
      } catch (err) {
        console.error('Polling error:', err);
      }
    };

    const interval = setInterval(fetchData, 20000);
    return () => clearInterval(interval);
  }, []);

  const layout: Layout[] = [
    { i: 'summary', x: 0, y: 0, w: 1, h: 2 },
    { i: 'orders', x: 1, y: 0, w: 1, h: 2 },
    { i: 'topProducts', x: 2, y: 0, w: 1, h: 2 },
    { i: 'salesChart', x: 0, y: 2, w: 1.5, h: 3 },
    { i: 'payments', x: 1.5, y: 2, w: 1.5, h: 3 },
    { i: 'locations', x: 0, y: 5, w: 3, h: 3 },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 2, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={100}
        isResizable
        isDraggable
        useCSSTransforms={true}
      >
        <div key="summary" className="bg-white p-4 rounded shadow border">
          Summary
        </div>
        <div key="orders" className="bg-white p-4 rounded shadow border">
          Orders
        </div>
        <div key="topProducts" className="bg-white p-4 rounded shadow border">
          Top Products
        </div>
        <div key="salesChart" className="bg-white rounded border border-gray-300">
          <div className="text-sm text-gray-700 font-medium px-4 py-2 border-b border-gray-300 rounded-t">
            Sales Chart
          </div>
          <div className="p-4">
            <LineChart />
          </div>
        </div>
        <div key="payments" className="bg-white p-4 rounded shadow border">
          Payments Table
        </div>
        <div key="locations" className="bg-white rounded border border-gray-300">
          <div className="text-sm text-gray-700 font-medium px-4 py-2 border-b border-gray-300 rounded-t">
            Locations
          </div>
          <div className="p-4">
            <Map locations={data.data.dashboardData.map.locations} />
          </div>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}
