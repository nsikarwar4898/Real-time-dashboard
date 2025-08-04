'use client';

import { SummarySkeleton } from '@/components/organsims';
import dynamic from 'next/dynamic';

const LineChart = dynamic(() => import('@/components/organsims/charts/LineChart'), { ssr: false });

type Props = {
  loading: boolean;
  initialLoad: boolean;
  data: {
    data: number[];
    labels: string[];
  };
};

export default function DashboardSalesChart({ loading, initialLoad, data }: Props) {
  if (!initialLoad || loading) {
    return (
      <div className="h-full overflow-hidden bg-card-bg border border-border rounded-2xl flex flex-col">
        <SummarySkeleton />
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden bg-card-bg border border-border rounded-2xl flex flex-col">
      <div className="text-sm text-title font-medium flex items-end px-4 pt-3 pb-3 border-b border-border">
        Sales Chart
      </div>
      <div className="flex-1 p-4">
        <LineChart data={data.data} labels={data.labels} />
      </div>
    </div>
  );
}
