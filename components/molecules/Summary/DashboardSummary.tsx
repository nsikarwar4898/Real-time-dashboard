'use client';

import { SummarySkeleton } from '@/components/organsims/DashboardSkeleton';
import Summary from '@/components/organsims/Summary';

type DashboardSummaryProps = {
  loading: boolean;
};

export default function DashboardSummary({ loading }: DashboardSummaryProps) {
  return (
    <div className="h-full overflow-hidden bg-card-bg border rounded-2xl border-border p-4">
      {loading ? <SummarySkeleton /> : <Summary />}
    </div>
  );
}
