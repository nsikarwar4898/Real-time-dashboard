'use client';

import { useState } from 'react';
import { DashboardApiResponse } from '@/lib/types/types';
import { useDashboardData } from '@/lib/hooks/useDashboardData';
import {
  DashboardOrders,
  DashboardPayments,
  DashboardSalesChart,
  DashboardTopProducts,
} from '../organisms';
import { DashboardLayout } from '../layout';
import { withSkeletonWrapper } from '../hoc/withSkeletonWrapper';
import dynamic from 'next/dynamic';
import { Summary } from '../molecules';
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
        <DashboardTopProducts
          loading={loading}
          initialLoad={initialLoad}
          topProductsData={data.data.dashboardData.tables.topProducts}
        />
      </div>
      <div key="salesChart">
        <DashboardSalesChart
          loading={loading}
          initialLoad={initialLoad}
          data={data.data.dashboardData.charts.salesOverTime}
        />
      </div>
      <div key="payments">
        <DashboardPayments
          loading={loading}
          data={data.data.dashboardData.tables.recentTransactions}
        />
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
