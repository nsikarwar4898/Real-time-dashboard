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
import { barData, barOptions, topLabelPlugin } from '@/lib/utils/barchart';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart() {
  return (
    <div className="h-full pb-10! bg-card-bg">
      <Bar options={barOptions} data={barData} plugins={[topLabelPlugin]} />
    </div>
  );
}
