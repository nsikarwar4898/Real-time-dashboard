'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  horizontalChartData,
  horizontalChartOptions,
  topLabelPlugin,
} from '@/lib/utils/horizontalchart';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function HorizontalBarChart() {
  return (
    <div className="w-full max-w-xl mx-auto p-4 h-full bg-card-bg pb-10!">
      <Bar options={horizontalChartOptions} data={horizontalChartData} plugins={[topLabelPlugin]} />
    </div>
  );
}
