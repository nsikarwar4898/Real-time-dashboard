import DashboardClient from '@/components/layout/DashboardClient';
import { fetchDashboardData } from '@/lib/api/fetchDashboardData';

export default async function DashboardPage() {
  const initialData = await fetchDashboardData();
  return <DashboardClient initialData={initialData} />;
}
