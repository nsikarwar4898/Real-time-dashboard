'use client';

import { useEffect, useState, useRef } from 'react';
import { DashboardApiResponse } from '@/lib/types/types';
import { Responsive, WidthProvider, Layouts } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { SummarySkeleton } from '../organsims/DashboardSkeleton';
import PaymentsTable from '../organsims/PaymentsTable';
import Summary from '../organsims/Summary';
import SubHeader from '../organsims/SubHeader';
import Header from '../organsims/Header';
import BarChart from '../organsims/BarChart';
import HorizontalBarChart from '../organsims/HorizontalChart';
import { defaultLayouts } from '@/lib/utils/gridLayout';
import dynamic from 'next/dynamic';

const ResponsiveGridLayout = WidthProvider(Responsive);

type Props = {
  initialData: DashboardApiResponse;
};
const Map = dynamic(() => import('../organsims/Map'), { ssr: false });
const LineChart = dynamic(() => import('../organsims/LineChart'), { ssr: false });

export default function DashboardClient({ initialData }: Props) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [layout, setLayout] = useState<Layouts>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dashboardLayout');
      if (saved) {
        try {
          return JSON.parse(saved) as Layouts;
        } catch (e) {
          console.error('Invalid saved layout:', e);
        }
      }
    }
    return defaultLayouts;
  });
  const [autoFetchEnabled, setAutoFetchEnabled] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [lastUpdated, setLastUpdated] = useState('just now');
  const [firstLoad, setFirstLoad] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/dashboard');
      if (!res.ok) throw new Error('Failed to fetch');
      const newData = await res.json();

      console.log(newData, 'this is new data');
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

    const intervalId = setInterval(() => {
      if (window.theme_loaded === true) {
        setFirstLoad(true);
        clearInterval(intervalId);
      }
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearInterval(intervalId);
    };
  }, [autoFetchEnabled]);

  const handleResetLayout = () => {
    setLayout(defaultLayouts);
    localStorage.removeItem('dashboardLayout');
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
        layouts={layout}
        breakpoints={{ lg: 1200, md: 786, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 2, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={100}
        isResizable={false}
        isDraggable={editMode}
        containerPadding={[0, 0]}
        margin={[10, 10]}
        useCSSTransforms={true}
        onLayoutChange={(layout, allLayouts) => {
          setLayout(allLayouts);
          localStorage.setItem('dashboardLayout', JSON.stringify(allLayouts));
        }}
      >
        <div
          key="summary"
          className="h-full overflow-hidden bg-card-bg border rounded-2xl border-border  p-4"
        >
          {loading ? <SummarySkeleton /> : <Summary />}
        </div>

        <div
          key="orders"
          className="h-full overflow-hidden bg-card-bg border border-border rounded-2xl flex flex-col"
        >
          {loading ? (
            <SummarySkeleton />
          ) : !firstLoad ? (
            <SummarySkeleton />
          ) : (
            <>
              <div className="text-sm text-title p-2 border-b border-border">Orders</div>
              <div className="flex-1 p-2">
                <HorizontalBarChart data={data.data.dashboardData.charts.userEngagement} />
              </div>
            </>
          )}
        </div>

        <div
          key="topProducts"
          className="h-full overflow-hidden bg-card-bg border border-border rounded-2xl flex flex-col"
        >
          {!firstLoad ? (
            <SummarySkeleton />
          ) : loading ? (
            <SummarySkeleton />
          ) : (
            <>
              <div className="text-sm text-title p-2 border-b border-border flex items-center">
                Top Products
              </div>
              <div className="flex-1 p-2">
                <BarChart data={data.data.dashboardData.tables.topProducts} />
              </div>
            </>
          )}
        </div>

        <div
          key="salesChart"
          className="h-full overflow-hidden bg-card-bg border border-border rounded-2xl flex flex-col"
        >
          {!firstLoad ? (
            <SummarySkeleton />
          ) : loading ? (
            <SummarySkeleton />
          ) : (
            <>
              <div className="text-sm text-title font-medium flex items-end px-4 pt-3 pb-3 border-b border-border">
                Sales Chart
              </div>
              <div className="flex-1 p-4">
                <LineChart
                  data={data.data.dashboardData.charts.salesOverTime.data}
                  labels={data.data.dashboardData.charts.salesOverTime.labels}
                />
              </div>
            </>
          )}
        </div>

        <div
          key="payments"
          className="h-full overflow-hidden bg-card-bg border border-border rounded-2xl p-4"
        >
          {loading ? (
            <SummarySkeleton />
          ) : (
            <PaymentsTable data={data.data.dashboardData.tables.recentTransactions} />
          )}
        </div>

        <div
          key="locations"
          className="h-full overflow-hidden bg-card-bg border border-border rounded-2xl flex flex-col "
        >
          {loading ? (
            <SummarySkeleton />
          ) : (
            <>
              <div className="text-sm text-title font-medium px-4 py-2 border-b border-border">
                Locations
              </div>
              <div className="flex-1 p-4 rounded-xl">
                <Map locations={data.data.dashboardData.map.locations} />
              </div>
            </>
          )}
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}
