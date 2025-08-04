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
import type { ScriptableContext, ChartOptions } from 'chart.js';

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

interface SalesOverTime {
  labels: string[];
  data: number[];
}

export default function LineChart({ labels, data }: SalesOverTime) {
  const reversedLabels = [...labels].reverse();
  const reversedData = [...data].reverse();

  const lineData = {
    labels: reversedLabels.map(label => {
      const date = new Date(label);
      return date.toISOString(); // Keep original ISO for matching later
    }),
    datasets: [
      {
        label: 'Monthly Sales',
        data: reversedData,
        fill: true,
        borderColor: '#07557C',
        backgroundColor: (ctx: ScriptableContext<'line'>) => {
          const from = getCssVar('--linegradient-from');
          const to = getCssVar('--linegradient-to');

          if (!from || !to) {
            console.warn('Missing gradient colors');
            return 'transparent';
          }

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
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        type: 'category',
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: () => getCssVar('--text'),
          font: {
            size: 12,
            weight: 'bold',
          },
          autoSkip: false,
          callback: function (_, index, ticks) {
            const total = ticks.length;
            const isFirst = index === 0;
            const isLast = index === total - 1;
            const isMiddle = index === Math.floor(total / 2);

            const date = new Date(reversedLabels[index]);
            const day = date.getDate().toString().padStart(2, '0');
            const month = date.toLocaleString('default', { month: 'short' });

            if (isFirst || isMiddle || isLast) {
              return `${month} ${day}`;
            }
            return `${day}`;
          },
        },
      },
      y: {
        type: 'linear',
        grid: { display: false },
        border: { display: false },
        min: 0,
        suggestedMax: Math.max(...data) + 50,
        ticks: {
          color: () => getCssVar('--text'),
          stepSize: 100,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };

  const currentMonthYear = new Date().toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="h-[350px] bg-card-bg flex flex-col">
      <div className="flex-1">
        <Line data={lineData} options={lineOptions} />
      </div>
      <div className="text-xs text-title text-center py-1 border-t border-border">
        {currentMonthYear}
      </div>
    </div>
  );
}
