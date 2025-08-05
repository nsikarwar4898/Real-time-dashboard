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

type ChartData = {
  labels: string[];
  data: number[];
};

type HorizontalChartProps = {
  dashboardData: ChartData;
};

export default function HorizontalBarChart({ dashboardData }: HorizontalChartProps) {
  const weeks = dashboardData.labels;
  const fixedData = dashboardData.data;

  function getCssVar(name: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  const horizontalChartData = {
    labels: weeks,
    datasets: [
      {
        label: 'Fixed Dataset',
        data: fixedData,
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
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(String(value), bar.x + 10, bar.y);
        });
      });
    },
  };
  const horizontalChartOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false, position: 'top' as const },
      title: {
        display: false,
        text: 'Monthly Data',
      },
    },
    scales: {
      x: {
        grid: { display: true, drawBorder: false },
        border: { display: false },
        ticks: {
          color: () => getCssVar('--text'),
          stepSize: 400,
          display: false,
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
      },
      y: {
        reverse: true,
        beginAtZero: true,
        grid: { display: false, drawBorder: false },
        ticks: {
          color: () => getCssVar('--text'),
          stepSize: 100,
          display: true,
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
        border: { display: false },
      },
    },
  };

  return (
    <div className="w-full max-w-xl mx-auto p-1 h-full bg-card-bg">
      <Bar options={horizontalChartOptions} data={horizontalChartData} plugins={[topLabelPlugin]} />
    </div>
  );
}
