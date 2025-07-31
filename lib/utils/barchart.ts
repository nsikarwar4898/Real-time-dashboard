const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const fixedData = [20, 45, 32, 60, 38, 75];

export const barData = {
  labels: months,
  datasets: [
    {
      label: 'Fixed Dataset',
      diplay: false,
      data: fixedData,
      backgroundColor: () => {
        console.log(getCssVar('--bar'));

        return getCssVar('--bar');
      },
      borderRadius: 8,
      borderSkipped: false,
    },
  ],
};

function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export const topLabelPlugin = {
  id: 'topLabelPlugin',
  afterDatasetsDraw(chart: any) {
    const { ctx } = chart;

    chart.data.datasets.forEach((dataset: any, i: number) => {
      const meta = chart.getDatasetMeta(i);
      meta.data.forEach((bar: any, index: number) => {
        const value = dataset.data[index];
        ctx.fillStyle = '#000';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(value, bar.x, bar.y - 8);
      });
    });
  },
};

export const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false, position: 'top' as const },
    title: {
      display: false,
      text: 'Monthly Data (Jan - Jun)',
    },
  },
  scales: {
    x: {
      grid: { display: false, drawBorder: false },
      border: { display: false },
      ticks: {
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: { display: true, drawBorder: false },
      ticks: {
        stepSize: 20,
        font: {
          size: 14,
          weight: 'bold',
        },
        display: false,
      },
      border: { display: false },
    },
  },
} as Record<string, any>;
