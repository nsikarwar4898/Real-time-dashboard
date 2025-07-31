import { DashboardApiResponse } from '../types/types';
import { envParameters } from '../utils/constants';

export async function fetchDashboardData(): Promise<DashboardApiResponse> {
  const API_URL = envParameters.webUrl || '';

  const dashboardRespose = await fetch(API_URL, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${envParameters.webUrlToken}`,
    },
  });

  if (!dashboardRespose.ok) {
    throw new Error(`Failed to fetch data: ${dashboardRespose.statusText}`);
  }

  return dashboardRespose.json();
}
