'use client';

import { Summary, SummarySkeleton } from '@/components/molecules';

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
