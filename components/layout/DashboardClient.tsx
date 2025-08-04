'use client';

import { useState } from 'react';
import { DashboardApiResponse } from '@/lib/types/types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import SubHeader from '../organsims/SubHeader';
import Header from '../organsims/Header';
import { useDashboardData } from '@/lib/hooks/useDashboardData';
import DashboardLocations from '../molecules/Location/DashboardLocations';
import DashboardSummary from '../molecules/Summary/DashboardSummary';
import DashboardOrders from '../molecules/Orders/DashboardOrders';
import DashboardTopProducts from '../molecules/TopProducts/DashboardTopProducts';
import DashboardSalesChart from '../molecules/SalesChart/DashboardSalesChart';
import DashboardPayments from '../molecules/Payments/DashboardPayments';

const ResponsiveGridLayout = WidthProvider(Responsive);

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
