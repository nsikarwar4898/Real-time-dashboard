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
import type { Chart } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type DashboardItem = {
  id: string;
  name: string;
  sales: number;
};

type BarChartProps = {
  dashboardData: DashboardItem[];
};

function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export default function BarChart({ dashboardData }: BarChartProps) {
  const labels = dashboardData.map(item => item.name.split(' ')[1]);
  const values = dashboardData.map(item => item.sales);

  const barData = {
    labels,
    datasets: [
      {
        label: 'Monthly Sales',
        data: values,
        backgroundColor: () => {
          return getCssVar('--bar');
        },
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const topLabelPlugin = {
    id: 'topLabelPlugin',
    afterDatasetsDraw(chart: Chart<'bar'>) {
      const { ctx } = chart;

      chart.data.datasets.forEach((dataset, i) => {
        const meta = chart.getDatasetMeta(i);

        meta.data.forEach((bar, index) => {
          const value = (dataset.data as number[])[index];
          ctx.fillStyle = getCssVar('--text');
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(String(value), bar.x, bar.y - 8);
        });
      });
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: false,
        text: 'Monthly Sales Data',
      },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        border: { display: false },
        ticks: {
          color: () => {
            return getCssVar('--text');
          },
          font: { size: 14, weight: 'bold' as const },
        },
      },
      y: {
        beginAtZero: true,
        grid: { display: true, drawBorder: false },
        ticks: {
          color: () => {
            return getCssVar('--text');
          },
          stepSize: 280,
          font: { size: 14, weight: 'bold' as const },
          display: false,
        },
        border: { display: false },
      },
    },
  };

  return (
    <div className="h-full pb-6 bg-card-bg">
      <Bar options={barOptions} data={barData} plugins={[topLabelPlugin]} />
    </div>
  );
}
