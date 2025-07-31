'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { lineData, lineOptions } from '@/lib/utils/linechart';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  Filler
);

export default function LineChart() {
  return (
    <div className="h-[350px]">
      <Line data={lineData} options={lineOptions} />
    </div>
  );
}
