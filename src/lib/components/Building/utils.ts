import { Color } from "three";
import type { HSL } from "./types";

export function random(min: number, max: number, seed: number): number {
  const x = Math.sin(seed) * 10000;
  return min + (x - Math.floor(x)) * (max - min);
}

export function generateColorFamily(
  baseColor: number,
  variation: number,
  seed: number,
): number {
  const color = new Color(baseColor);
  const hsl: HSL = { h: 0, s: 0, l: 0 };
  color.getHSL(hsl);

  hsl.h += random(-variation, variation, seed) / 360;
  hsl.s = Math.max(
    0,
    Math.min(1, hsl.s + random(-variation / 2, variation / 2, seed)),
  );
  hsl.l = Math.max(
    0,
    Math.min(1, hsl.l + random(-variation / 2, variation / 2, seed)),
  );

  color.setHSL(hsl.h, hsl.s, hsl.l);

  return color.getHex();
}
