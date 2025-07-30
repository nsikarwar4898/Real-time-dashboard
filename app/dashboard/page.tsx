import DashboardClient from "@/components/DashboardClient";
import { fetchDashboardData } from "@/lib/api/fetchDashboardData";

export default async function DashboardPage() {
  const initialData = await fetchDashboardData();
  console.log(initialData);
  return <DashboardClient initialData={initialData} />;
}
