const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const fixedData = [20, 45, 32, 60, 38, 75];

function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#07557c';
}

export const horizontalChartData = {
  labels: months,
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
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(value, bar.x + 10, bar.y); // ✅ horizontal bar label positioning
      });
    });
  },
};

export const horizontalChartOptions = {
  indexAxis: 'y', // ✅ use this to make chart horizontal
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
        stepSize: 20,
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
        stepsize: 20,
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
