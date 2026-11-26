import type { ReactNode } from 'react';

type Point = { x: number; y: number };

/** Point and tangent angle (degrees) of a cubic Bézier curve at `t`. */
function bezierAt(
  [p0, p1, p2, p3]: readonly [Point, Point, Point, Point],
  t: number,
): Point & { angle: number } {
  const u = 1 - t;
  const at = (a: number, b: number, c: number, d: number): number =>
    u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
  const slope = (a: number, b: number, c: number, d: number): number =>
    3 * u * u * (b - a) + 6 * u * t * (c - b) + 3 * t * t * (d - c);
  const dx = slope(p0.x, p1.x, p2.x, p3.x);
  const dy = slope(p0.y, p1.y, p2.y, p3.y);
  return {
    x: at(p0.x, p1.x, p2.x, p3.x),
    y: at(p0.y, p1.y, p2.y, p3.y),
    angle: (Math.atan2(dy, dx) * 180) / Math.PI,
  };
}

/** The branch stem, from the base (bottom right) to the tip (top). */
const stem = [
  { x: 44, y: 116 },
  { x: 12, y: 96 },
  { x: 6, y: 50 },
  { x: 26, y: 6 },
] as const;

/** Seven pairs of leaves along the stem, smaller towards the tip. */
const leaves = Array.from({ length: 7 }, (_, i) => {
  const point = bezierAt(stem, 0.1 + i * 0.13);
  const scale = 1 - i * 0.07;
  return [
    { ...point, rotate: point.angle + 40, scale },
    { ...point, rotate: point.angle + 140, scale: scale * 0.92 },
  ];
}).flat();

const stemPath = `M${stem[0].x} ${stem[0].y} C ${stem[1].x} ${stem[1].y}, ${stem[2].x} ${stem[2].y}, ${stem[3].x} ${stem[3].y}`;
const leafPath = 'M0 0 C 5 -5, 6 -14, 0 -21 C -6 -14, -5 -5, 0 0 Z';

/** Props for {@link Laurel}. */
export type LaurelProps = {
  /** Mirrors the branch, for the right side of a title. */
  flip?: boolean;
  className?: string;
};

/**
 * Award laurel branch (decorative), drawn in `currentColor`: use it in pairs
 * around a short title, the left one plain and the right one `flip`ped.
 * Each leaf has `data-leaf` so a parent can grow them in with GSAP.
 */
export function Laurel({
  flip = false,
  className = '',
}: LaurelProps): ReactNode {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 60 120"
      className={`shrink-0 ${flip ? '-scale-x-100' : ''} ${className}`}
    >
      <path
        d={stemPath}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {leaves.map((leaf, i) => (
        <g
          key={i}
          transform={`translate(${leaf.x.toFixed(2)} ${leaf.y.toFixed(2)}) rotate(${leaf.rotate.toFixed(1)}) scale(${leaf.scale.toFixed(2)})`}
        >
          <path data-leaf d={leafPath} fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}
