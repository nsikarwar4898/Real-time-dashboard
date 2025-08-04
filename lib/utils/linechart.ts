const lineLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const lineSales = [200, 400, 600, 300, 700, 900];
const lineSales2 = [100, 300, 400, 250, 500, 650];

export const lineData = {
  labels: lineLabels,
  datasets: [
    {
      label: 'Monthly Sales',
      data: lineSales2,
      fill: true,
      borderColor: getCssVar('--linechart-line'),
      backgroundColor: (ctx: any) => {
        const from = getCssVar('--linegradient-under-from').trim();
        const to = getCssVar('--linegradient-under-to').trim();

        if (!from || !to) {
          console.warn('Colors not available yet, returning transparent');
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
    {
      label: 'Monthly Sales',
      data: lineSales,
      fill: 0,
      borderColor: '#07557C',
      backgroundColor: (ctx: any) => {
        const from = getCssVar('--linegradient-from')?.trim();
        const to = getCssVar('--linegradient-to')?.trim();

        if (!from || !to) {
          console.warn('Line gradient colors not available, returning transparent');
          return 'transparent'; // Prevents Chart.js from crashing
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

export const lineOptions = {
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
      max: 1000,
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
