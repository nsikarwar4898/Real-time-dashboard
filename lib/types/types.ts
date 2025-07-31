type Charts = {
  salesOverTime: Chart;
  userEngagement: Chart;
};

type Chart = {
  labels: string[];
  data: number[];
};

type Tables = {
  recentTransactions: Transaction[];
  topProducts: Product[];
};

type Transaction = {
  id: number;
  user: string;
  amount: string;
  date: string;
};

type Product = {
  id: string;
  name: string;
  sales: number;
};

export type Location = {
  latitude: number;
  longitude: number;
  label: string;
  activity: number;
};

type MapData = {
  locations: Location[];
};

type DashboardData = {
  charts: Charts;
  tables: Tables;
  map: MapData;
};

export type DashboardApiResponse = {
  success: boolean;
  data: {
    dashboardData: DashboardData;
  };
};
