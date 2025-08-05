export const CENTER_COORDINATES: [number, number] = [
  parseFloat(process.env.NEXT_PUBLIC_CENTER_LAT!),
  parseFloat(process.env.NEXT_PUBLIC_CENTER_LNG!),
];

export const ZOOM_LEVEL = 5;

export const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

export const TILE_LAYER_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';

export const MAP_HEIGHT = '500px';

export const MAP_WIDTH = '100%';
