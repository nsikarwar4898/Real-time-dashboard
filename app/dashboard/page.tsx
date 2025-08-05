import { Dashboard } from '@/components/Pages';
import { fetchDashboardData } from '@/lib/api/fetchDashboardData';

export default async function DashboardPage() {
  const initialData = await fetchDashboardData();
  return <Dashboard initialData={initialData} />;
}
