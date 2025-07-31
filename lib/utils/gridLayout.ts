import { Layout, Layouts } from 'react-grid-layout';

const defaultLayoutLg: Layout[] = [
  { i: 'summary', x: 0, y: 0, w: 1, h: 3 },
  { i: 'orders', x: 1, y: 0, w: 1, h: 3 },
  { i: 'topProducts', x: 2, y: 0, w: 1, h: 3 },
  { i: 'salesChart', x: 0, y: 3, w: 1.5, h: 4 },
  { i: 'payments', x: 1.5, y: 3, w: 1.5, h: 4 },
  { i: 'locations', x: 0, y: 7, w: 3, h: 5 },
];

const defaultLayoutMd: Layout[] = [
  { i: 'summary', x: 0, y: 0, w: 1, h: 3 },
  { i: 'orders', x: 1, y: 0, w: 1, h: 3 },
  { i: 'topProducts', x: 0, y: 3, w: 1, h: 3 },
  { i: 'salesChart', x: 1, y: 3, w: 1, h: 4 },
  { i: 'payments', x: 0, y: 6, w: 1, h: 4 },
  { i: 'locations', x: 1, y: 6, w: 1, h: 5 },
];

const defaultLayoutSm: Layout[] = [
  { i: 'summary', x: 0, y: 0, w: 1, h: 3 },
  { i: 'orders', x: 0, y: 3, w: 1, h: 3 },
  { i: 'topProducts', x: 0, y: 6, w: 1, h: 3 },
  { i: 'salesChart', x: 0, y: 9, w: 1, h: 4 },
  { i: 'payments', x: 0, y: 13, w: 1, h: 4 },
  { i: 'locations', x: 0, y: 17, w: 1, h: 5 },
];

const defaultLayoutXs = defaultLayoutSm;
const defaultLayoutXxs = defaultLayoutSm;

export const defaultLayouts: Layouts = {
  lg: defaultLayoutLg,
  md: defaultLayoutMd,
  sm: defaultLayoutSm,
  xs: defaultLayoutXs,
  xxs: defaultLayoutXxs,
};
