'use client';

import { SummarySkeleton } from '@/components/organsims';
import HorizontalBarChart from '@/components/organsims/charts/HorizontalChart';

type UserEngagementChartData = {
  labels: string[];
  data: number[];
};

type DashboardOrdersProps = {
  loading: boolean;
  initialLoad: boolean;
  userEngagementData: UserEngagementChartData;
};

export default function DashboardOrders({
  loading,
  initialLoad,
  userEngagementData,
}: DashboardOrdersProps) {
  if (loading || !initialLoad) {
    return (
      <div className="h-full overflow-hidden bg-card-bg border border-border rounded-2xl flex flex-col">
        <SummarySkeleton />
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden bg-card-bg border border-border rounded-2xl flex flex-col">
      <div className="text-sm text-title p-2 border-b border-border">Orders</div>

      <div className="flex-1 p-2">
        <HorizontalBarChart data={userEngagementData} />
      </div>

      <div className="px-4 pb-4 text-sm text-text">
        Trending up by <span className="font-semibold text-title">5.2%</span> this month
        <br />
        <span className="text-xs text-muted">January – June 2027</span>
      </div>
    </div>
  );
}
