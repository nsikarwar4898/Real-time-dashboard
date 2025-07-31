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
        const gradient2 = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
        gradient2.addColorStop(0, getCssVar('--linegradient-under-from'));
        gradient2.addColorStop(1, getCssVar('--linegradient-under-to'));
        return gradient2;
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
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, getCssVar('--linegradient-from'));
        gradient.addColorStop(1, getCssVar('--linegradient-to'));
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
