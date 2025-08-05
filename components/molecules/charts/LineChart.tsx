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
import type { ScriptableContext } from 'chart.js';
import type { ChartOptions } from 'chart.js';
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

type LineChartProps = {
  labels: string[]; // e.g., ['2025-08-01', '2025-07-31', ...]
  dashboardData: number[]; // e.g., [105, 165, 50, ...]
};

export default function LineChart({ dashboardData, labels }: LineChartProps) {
  const lineLabels = labels.map(label => label.split('-')[2]).reverse();
  const lineSales = dashboardData.map(item => item).reverse();
  // const lineSales2 = [100, 300, 400, 250, 500, 650];

  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        label: 'Monthly Sales',
        data: lineSales,
        fill: true,
        borderColor: '#07557C',
        backgroundColor: (ctx: ScriptableContext<'line'>) => {
          const from = getCssVar('--linegradient-from')?.trim();
          const to = getCssVar('--linegradient-to')?.trim();

          if (!from || !to) {
            console.warn('Line gradient colors not available, returning transparent');
            return 'transparent';
          }

          console.log(from, to, 'this is from to');

          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, from);
          gradient.addColorStop(1, to);
          return gradient;
        },
        tension: 0.4,
        pointBackgroundColor: '#07557C',
      },
    ],
  };

  function getCssVar(name: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  const lineOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Sales Trend',
      },
    },
    scales: {
      x: {
        type: 'category',
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: () => getCssVar('--text'),
          font: {
            size: 14,
            weight: 'bold' as const,
          },
          callback: function (val, index, ticks) {
            const total = ticks.length;
            const first = 0;
            const last = total - 1;
            const mid = Math.floor(total / 2);

            if (index !== first && index !== mid && index !== last) {
              return '';
            }

            const fullDate = [...labels].reverse()[index];

            if (!fullDate) return '';
            const dateObj = new Date(fullDate);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString('default', { month: 'short' });

            return `${day} ${month}`;
          },
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        type: 'linear',
        grid: {
          display: false,
        },
        min: 0,
        max: 300,
        ticks: {
          color: () => {
            return getCssVar('--text');
          },
          stepSize: 200,
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-[350px] bg-card-bg">
      <Line data={lineData} options={lineOptions} />
    </div>
  );
}
