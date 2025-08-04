'use client';

import { SummarySkeleton } from '@/components/organsims/DashboardSkeleton';
import PaymentsTable from '@/components/organsims/PaymentsTable';

type Props = {
  loading: boolean;
  data: {
    id: number;
    user: string;
    amount: string;
    date: string;
  }[];
};

export default function DashboardPayments({ loading, data }: Props) {
  return (
    <div className="h-full overflow-hidden bg-card-bg border border-border rounded-2xl p-4">
      {loading ? <SummarySkeleton /> : <PaymentsTable data={data} />}
    </div>
  );
}
