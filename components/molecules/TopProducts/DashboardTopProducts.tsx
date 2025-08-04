'use client';

import { BarChart, SummarySkeleton } from '@/components/organsims';

type TopProduct = {
  id: string;
  name: string;
  sales: number;
};
type DashboardTopProductsProps = {
  loading: boolean;
  initialLoad: boolean;
  topProductsData: TopProduct[];
};

export default function DashboardTopProducts({
  loading,
  initialLoad,
  topProductsData,
}: DashboardTopProductsProps) {
  if (!initialLoad || loading) {
    return (
      <div className="h-full overflow-hidden bg-card-bg border border-border rounded-2xl flex flex-col">
        <SummarySkeleton />
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden bg-card-bg border border-border rounded-2xl flex flex-col">
      <div className="text-sm text-title p-2 border-b border-border flex items-center">
        Top Products
      </div>

      <div className="flex-1 p-2">
        <BarChart data={topProductsData} />
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
    </div>
  );
}
