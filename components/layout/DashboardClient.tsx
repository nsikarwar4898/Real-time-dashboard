'use client';

import { useState } from 'react';
import { DashboardApiResponse } from '@/lib/types/types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { SummarySkeleton } from '../organsims/DashboardSkeleton';
import PaymentsTable from '../organsims/PaymentsTable';
import Summary from '../organsims/Summary';
import SubHeader from '../organsims/SubHeader';
import Header from '../organsims/Header';
import BarChart from '../organsims/BarChart';
import HorizontalBarChart from '../organsims/HorizontalChart';
import dynamic from 'next/dynamic';
import { useDashboardData } from '@/lib/hooks/useDashboardData';
import DashboardLocations from '../molecules/Location/DashboardLocations';

const ResponsiveGridLayout = WidthProvider(Responsive);

type Props = {
  initialData: DashboardApiResponse;
};
const LineChart = dynamic(() => import('../organsims/LineChart'), { ssr: false });

export default function DashboardClient({ initialData }: Props) {
  const {
    data,
    layout,
    loading,
    initialLoad,
    lastUpdated,
    autoFetchEnabled,
    fetchData,
    resetLayout,
    setAutoFetchEnabled,
    handleLayoutChange,
  } = useDashboardData(initialData);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="p-4">
      <Header
        editMode={editMode}
        onToggleEditMode={() => setEditMode(prev => !prev)}
        onReset={resetLayout}
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
        onLayoutChange={handleLayoutChange}
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
          ) : !initialLoad ? (
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
          {!initialLoad ? (
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
          {!initialLoad ? (
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
          <DashboardLocations loading={loading} locations={data.data.dashboardData.map.locations} />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}
