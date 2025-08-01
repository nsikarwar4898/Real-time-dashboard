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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface horizontalChartProps {
  data: {
    labels: string[];
    data: number[];
  };
}

export default function HorizontalBarChart({ data }: horizontalChartProps) {
  const weeks = data.labels;
  const fixedData = data.data;

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
    afterDatasetsDraw(chart: any) {
      const { ctx } = chart;

      chart.data.datasets.forEach((dataset: any, i: number) => {
        const meta = chart.getDatasetMeta(i);
        meta.data.forEach((bar: any, index: number) => {
          const value = dataset.data[index];
          const styles = getCssVar('--text');
          ctx.fillStyle = styles;
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(value, bar.x + 10, bar.y);
        });
      });
    },
  };

  const horizontalChartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false, position: 'top' },
      title: {
        display: false,
        text: 'Monthly Data (Jan - Jun)',
      },
    },
    scales: {
      x: {
        grid: { display: true, drawBorder: false },
        border: { display: false },
        ticks: {
          color: () => {
            return getCssVar('--text');
          },
          stepSize: 400,
          display: false,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        reverse: true,
        beginAtZero: true,
        grid: { display: false, drawBorder: false },
        ticks: {
          color: () => {
            return getCssVar('--text');
          },
          stepsize: 100,
          display: true,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        border: { display: false },
      },
    },
  } as Record<string, any>;

  return (
    <div className="w-full max-w-xl mx-auto p-4 h-full bg-card-bg pb-10!">
      <Bar options={horizontalChartOptions} data={horizontalChartData} plugins={[topLabelPlugin]} />
    </div>
  );
}
