export interface BuildingProps {
  position?: [number, number, number];
  seed?: number;
}

export interface FloorConfig {
  width: number;
  depth: number;
  height: number;
  color: number;
  outlineColor: number;
  topFaceColor: number;
  offset: [number, number, number];
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export const BUILDING_CONFIG = {
  MIN_FLOORS: 4,
  MAX_FLOORS: 16,
  MIN_WIDTH: 0.25,
  MAX_WIDTH: 1,
  MIN_DEPTH: 0.25,
  MAX_DEPTH: 1,
  MIN_HEIGHT: 0.1,
  MAX_HEIGHT: 0.1,
  SETBACK_THRESHOLD: 0.25,
  SETBACK_HEIGHT_THRESHOLD: 0.25,
  SETBACK_SCALE: 0.3,
  POSITION_VARIATION: 0.25,
  COLOR_VARIATION: 0.1,
} as const;
