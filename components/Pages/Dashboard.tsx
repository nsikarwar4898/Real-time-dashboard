'use client';

import dynamic from 'next/dynamic';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { DashboardApiResponse } from '@/lib/types/types';
import { useDashboardData } from '@/lib/hooks/useDashboardData';
import { withSkeletonWrapper } from '../hoc/withSkeletonWrapper';
import { BarChart, PaymentsTable, Summary, Header, TitleBar } from '../molecules';
import HorizontalBarChart from '../molecules/charts/HorizontalChart';
import { content } from '@/lib/utils/content';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);
const Map = dynamic(() => import('@/components/molecules/map/Map'), { ssr: false });
const LineChart = dynamic(() => import('@/components/molecules/charts/LineChart'), { ssr: false });

type DashboardClientProps = {
  initialData: DashboardApiResponse;
};

export default function Dashboard({ initialData }: DashboardClientProps) {
  const {
    dashboardData,
    layout,
    isLoading,
    islastUpdated,
    autoFetchEnabled,
    isEditMode,
    fetchDashboardData,
    resetLayout,
    setAutoFetchEnabled,
    handleLayoutChange,
    setIsEditMode,
  } = useDashboardData(initialData);

  const SkeletonWrapper = withSkeletonWrapper();

  return (
    <div className="p-4">
      <Header
        editMode={isEditMode}
        onToggleEditMode={() => setIsEditMode(currentEditMode => !currentEditMode)}
        onReset={resetLayout}
      />

      <TitleBar
        lastUpdated={islastUpdated}
        autoFetchEnabled={autoFetchEnabled}
        onToggleAutoFetch={() => setAutoFetchEnabled(currentAutoFetch => !currentAutoFetch)}
        onRefresh={fetchDashboardData}
      />

      <ResponsiveGridLayout
        className="layout"
        layouts={layout}
        breakpoints={{ lg: 1200, md: 786, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 2, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={100}
        isResizable={false}
        isDraggable={isEditMode}
        containerPadding={[0, 0]}
        margin={[10, 10]}
        useCSSTransforms={true}
        onLayoutChange={handleLayoutChange}
      >
        <div key="summary">
          <SkeletonWrapper loading={isLoading}>
            <div className="h-full">
              <Summary />
            </div>
          </SkeletonWrapper>
        </div>

        <div key="orders">
          <SkeletonWrapper loading={isLoading}>
            <div className="text-sm text-title p-3 h-12 border-b border-border">Orders</div>

            <div className="flex-1 p-2">
              <HorizontalBarChart
                dashboardData={dashboardData.data.dashboardData.charts.userEngagement}
              />
            </div>

            <div className="px-4 pb-4 text-sm text-text">
              {content.dashboard.trendingBy}{' '}
              <span className="font-semibold text-title">{content.dashboard.percent}</span>
              {content.dashboard.this}
              <br />
              <span className="text-xs text-muted">{content.dashboard.timeline}</span>
            </div>
          </SkeletonWrapper>
        </div>

        <div key="topProducts">
          <SkeletonWrapper loading={isLoading}>
            <div className="text-sm text-title p-3 h-12 border-b border-border flex items-center">
              {content.dashboard.topProducts}
            </div>

            <div className="flex-1 p-2">
              <BarChart dashboardData={dashboardData.data.dashboardData.tables.topProducts} />
            </div>

            <div className="flex items-center justify-center gap-4 px-3 pb-4 text-sm text-title">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#4B9CD3' }}></span>
                {content.dashboard.prod1}
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#07557C' }}></span>
                {content.dashboard.prod2}
              </div>
            </div>
          </SkeletonWrapper>
        </div>

        <div key="salesChart">
          <SkeletonWrapper loading={isLoading}>
            <div className="text-sm text-title font-medium flex items-end px-4 pt-3 pb-3 border-b border-border">
              {content.dashboard.salesTitle}
            </div>
            <div className="flex-1 p-4">
              <LineChart
                dashboardData={dashboardData.data.dashboardData.charts.salesOverTime.data}
                labels={dashboardData.data.dashboardData.charts.salesOverTime.labels}
              />
            </div>
          </SkeletonWrapper>
        </div>

        <div key="payments">
          <SkeletonWrapper loading={isLoading}>
            <PaymentsTable
              dashboardData={dashboardData.data.dashboardData.tables.recentTransactions}
            />
          </SkeletonWrapper>
        </div>

        <div key="locations">
          <SkeletonWrapper loading={isLoading}>
            <div className="text-sm text-title font-medium px-4 py-2 border-b border-border">
              {content.dashboard.locations}
            </div>
            <div className="flex-1 p-4 rounded-xl">
              <Map locations={dashboardData.data.dashboardData.map.locations} />
            </div>
          </SkeletonWrapper>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}
