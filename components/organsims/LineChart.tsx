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
  labels: string[]; // e.g., ['2025-08-01', '2025-07-31', ...]
  data: number[]; // e.g., [105, 165, 50, ...]
}

export default function LineChart({ data, labels }: SalesOverTime) {
  const lineLabels = labels.map(label => label.split('-')[2]).reverse();
  const lineSales = data.map(item => item).reverse();
  // const lineSales2 = [100, 300, 400, 250, 500, 650];

  const lineData = {
    labels: lineLabels,
    datasets: [
      // {
      //   label: 'Monthly Sales',
      //   data: lineSales2,
      //   fill: true,
      //   borderColor: getCssVar('--linechart-line'),
      //   backgroundColor: (ctx: any) => {
      //     const from = getCssVar('--linegradient-under-from').trim();
      //     const to = getCssVar('--linegradient-under-to').trim();

      //     if (!from || !to) {
      //       console.warn('Colors not available yet, returning transparent');
      //       return 'transparent';
      //     }

      //     const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
      //     gradient.addColorStop(0, from);
      //     gradient.addColorStop(1, to);
      //     return gradient;
      //   },
      //   tension: 0.4,
      //   pointBackgroundColor: '#07557C',
      // },
      {
        label: 'Monthly Sales',
        data: lineSales,
        fill: true,
        borderColor: '#07557C',
        backgroundColor: (ctx: any) => {
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

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Sales Trend (Jan - Jun)',
      },
    },
    scales: {
      x: {
        type: 'category',
        grid: {
          display: false,
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: () => {
            return getCssVar('--text');
          },
          font: {
            size: 14,
            weight: 'bold ',
          },
        },
      },
      y: {
        type: 'linear',
        grid: {
          display: false,
          drawBorder: false,
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
            weight: 'bold',
          },
        },
        border: {
          display: false,
        },
      },
    } as Record<string, any>,
  };

  return (
    <div className="h-[350px] bg-card-bg">
      <Line data={lineData} options={lineOptions} />
    </div>
  );
}
