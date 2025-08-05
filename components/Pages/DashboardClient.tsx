'use client';

import { useState } from 'react';
import { DashboardApiResponse } from '@/lib/types/types';
import { useDashboardData } from '@/lib/hooks/useDashboardData';
import { DashboardLayout } from '../layout';
import { withSkeletonWrapper } from '../hoc/withSkeletonWrapper';
import dynamic from 'next/dynamic';
import { BarChart, PaymentsTable, Summary } from '../molecules';
import HorizontalBarChart from '../molecules/charts/HorizontalChart';

type Props = {
  initialData: DashboardApiResponse;
};

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
  const SkeletonWrapper = withSkeletonWrapper();
  const Map = dynamic(() => import('@/components/molecules/dashboard/Map'), { ssr: false });
  const LineChart = dynamic(() => import('@/components/molecules/charts/LineChart'), {
    ssr: false,
  });
  return (
    <DashboardLayout
      editMode={editMode}
      lastUpdated={lastUpdated}
      autoFetchEnabled={autoFetchEnabled}
      layout={layout}
      onToggleEditMode={() => setEditMode(prev => !prev)}
      onReset={resetLayout}
      onRefresh={fetchData}
      onToggleAutoFetch={() => setAutoFetchEnabled(prev => !prev)}
      onLayoutChange={handleLayoutChange}
    >
      <div key="summary">
        <SkeletonWrapper loading={loading}>
          <div className="p-4">
            <Summary />
          </div>
        </SkeletonWrapper>
      </div>
      <div key="orders">
        <SkeletonWrapper loading={loading}>
          <>
            <div className="text-sm text-title p-2 border-b border-border">Orders</div>

            <div className="flex-1 p-2">
              <HorizontalBarChart data={data.data.dashboardData.charts.userEngagement} />
            </div>

            <div className="px-4 pb-4 text-sm text-text">
              Trending up by <span className="font-semibold text-title">5.2%</span> this month
              <br />
              <span className="text-xs text-muted">January – June 2027</span>
            </div>
          </>
        </SkeletonWrapper>
      </div>
      <div key="topProducts">
        <SkeletonWrapper loading={loading}>
          <div className="text-sm text-title p-2 border-b border-border flex items-center">
            Top Products
          </div>

          <div className="flex-1 p-2">
            <BarChart data={data.data.dashboardData.tables.topProducts} />
          </div>

          <div className="flex items-center justify-center gap-4 px-3 pb-4 text-sm text-title">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#4B9CD3' }}></span>
              ACME Prod - 01
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#07557C' }}></span>
              ACME Prod - 02
            </div>
          </div>
        </SkeletonWrapper>
      </div>
      <div key="salesChart">
        <SkeletonWrapper loading={loading}>
          <div className="text-sm text-title font-medium flex items-end px-4 pt-3 pb-3 border-b border-border">
            Sales Chart
          </div>
          <div className="flex-1 p-4">
            <LineChart
              data={data.data.dashboardData.charts.salesOverTime.data}
              labels={data.data.dashboardData.charts.salesOverTime.labels}
            />
          </div>
        </SkeletonWrapper>
      </div>
      <div key="payments">
        <SkeletonWrapper loading={loading}>
          <PaymentsTable data={data.data.dashboardData.tables.recentTransactions} />
        </SkeletonWrapper>
      </div>
      <div key="locations">
        <SkeletonWrapper loading={loading}>
          <>
            <div className="text-sm text-title font-medium px-4 py-2 border-b border-border">
              Locations
            </div>
            <div className="flex-1 p-4 rounded-xl">
              <Map locations={data.data.dashboardData.map.locations} />
            </div>
          </>
        </SkeletonWrapper>
      </div>
    </DashboardLayout>
  );
}
