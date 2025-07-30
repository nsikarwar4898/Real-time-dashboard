<<<<<<< HEAD
export const envParameters = {
  webUrl: process.env.NEXT_PUBLIC_API_URL,
  webUrlToken: process.env.NEXT_PUBLIC_API_URL_TOKEN,
=======
export const CENTER_COORDINATES: [number, number] = [
  parseFloat(process.env.NEXT_PUBLIC_CENTER_LAT!),
  parseFloat(process.env.NEXT_PUBLIC_CENTER_LNG!),
];

export const ZOOM_LEVEL = parseInt(process.env.NEXT_PUBLIC_ZOOM_LEVEL!);

export const TILE_LAYER_URL = process.env.NEXT_PUBLIC_TILE_LAYER_URL!;

export const TILE_LAYER_ATTRIBUTION =
  process.env.NEXT_PUBLIC_TILE_LAYER_ATTRIBUTION!;

export const MAP_HEIGHT = process.env.NEXT_PUBLIC_MAP_HEIGHT!;

export const MAP_WIDTH = process.env.NEXT_PUBLIC_MAP_WIDTH!;

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
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

export const lineOptions = {
  responsive: true,
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
>>>>>>> bc2d97e (feature/completed line chart)
};
