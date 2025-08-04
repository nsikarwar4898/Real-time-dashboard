'use client';

import { SummarySkeleton } from '@/components/organsims/DashboardSkeleton';
import BarChart from '@/components/organsims/BarChart';

type DashboardTopProductsProps = {
  loading: boolean;
  initialLoad: boolean;
  topProductsData: any; // Replace `any` with the proper type if defined
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
    </div>
  );
}
