'use client';

import { useState } from 'react';
import { DashboardApiResponse } from '@/lib/types/types';
import { useDashboardData } from '@/lib/hooks/useDashboardData';
import {
  DashboardLocations,
  DashboardOrders,
  DashboardPayments,
  DashboardSalesChart,
  DashboardSummary,
  DashboardTopProducts,
} from '../molecule';
import { DashboardLayout } from '../layout';

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
        <DashboardSummary loading={loading} />
      </div>
      <div key="orders">
        <DashboardOrders
          loading={loading}
          initialLoad={initialLoad}
          userEngagementData={data.data.dashboardData.charts.userEngagement}
        />
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
        <DashboardLocations loading={loading} locations={data.data.dashboardData.map.locations} />
      </div>
    </DashboardLayout>
  );
}
