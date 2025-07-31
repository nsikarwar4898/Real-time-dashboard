'use client';

import { useEffect, useState, useRef } from 'react';
import { DashboardApiResponse } from '@/lib/types/types';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import Map from './organsims/Map';
import LineChart from './organsims/LineChart';
import { SummarySkeleton } from './skeletons/DashboardSkeleton';
import PaymentsTable from './organsims/PaymentsTable';
import Summary from './organsims/Summary';
import SubHeader from './organsims/SubHeader';
import Header from './organsims/Header';
import BarChart from './organsims/BarChart';
import HorizontalBarChart from './organsims/HorizontalChart';

const ResponsiveGridLayout = WidthProvider(Responsive);

const defaultLayout: Layout[] = [
  { i: 'summary', x: 0, y: 0, w: 1, h: 3 },
  { i: 'orders', x: 1, y: 0, w: 1, h: 3 },
  { i: 'topProducts', x: 2, y: 0, w: 1, h: 3 },
  { i: 'salesChart', x: 0, y: 2, w: 1.5, h: 4 },
  { i: 'payments', x: 1.5, y: 2, w: 1.5, h: 4 },
  { i: 'locations', x: 0, y: 5, w: 3, h: 5 },
];

type Props = {
  initialData: DashboardApiResponse;
};

export default function DashboardClient({ initialData }: Props) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [layout, setLayout] = useState<Layout[]>(defaultLayout);
  const [autoFetchEnabled, setAutoFetchEnabled] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [lastUpdated, setLastUpdated] = useState('just now');

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/dashboard');
      if (!res.ok) throw new Error('Failed to fetch');
      const newData = await res.json();
      setData(newData);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Fetch error:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (autoFetchEnabled) {
      intervalRef.current = setInterval(fetchData, 20000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoFetchEnabled]);

  const handleResetLayout = () => {
    setLayout(defaultLayout);
  };

  const onLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
  };

  return (
    <div className="p-4">
      <Header
        editMode={editMode}
        onToggleEditMode={() => setEditMode(prev => !prev)}
        onReset={handleResetLayout}
      />

      <SubHeader
        lastUpdated={lastUpdated}
        autoFetchEnabled={autoFetchEnabled}
        onToggleAutoFetch={() => setAutoFetchEnabled(prev => !prev)}
        onRefresh={fetchData}
      />

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 2, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={100}
        isResizable={false}
        isDraggable={editMode}
        useCSSTransforms={true}
        onLayoutChange={onLayoutChange}
      >
        <div key="summary" className={`border border-gray-300 rounded ${loading && 'p-4'}`}>
          {loading ? <SummarySkeleton /> : <Summary />}
        </div>
        <div key="orders" className="bg-white p-4 rounded shadow border">
          {loading ? <SummarySkeleton /> : <HorizontalBarChart />}
        </div>
        <div key="topProducts" className="bg-white p-4 rounded shadow border">
          {loading ? <SummarySkeleton /> : <BarChart />}
        </div>
        <div key="salesChart" className={`border border-gray-300 rounded ${loading && 'p-4'}`}>
          {loading ? (
            <SummarySkeleton />
          ) : (
            <>
              <div className="text-sm text-gray-700 font-medium px-4 py-2 border-b border-gray-300 rounded-t">
                Sales Chart
              </div>
              <div className="p-4">
                <LineChart />
              </div>
            </>
          )}
        </div>
        <div key="payments" className={`border border-gray-300 rounded ${loading && 'p-4'}`}>
          {loading ? <SummarySkeleton /> : <PaymentsTable />}
        </div>
        <div key="locations" className={`border border-gray-300 rounded ${loading && 'p-4'}`}>
          {loading ? (
            <SummarySkeleton />
          ) : (
            <>
              <div className="text-sm text-gray-700 font-medium px-4 py-2 border-b border-gray-300 rounded-t">
                Locations
              </div>
              <div className="p-4">
                <Map locations={data.data.dashboardData.map.locations} />
              </div>
            </>
          )}
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}
