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
