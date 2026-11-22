import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * Media query that animations must match to run. Wrap every animation in
 * `gsap.matchMedia().add(MOTION_OK, …)` so visitors who prefer reduced motion
 * see the final, static content.
 */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

/**
 * Single entry point for GSAP: import `gsap`, its plugins and `useGSAP` from
 * here (never from `gsap` directly) so plugins are registered exactly once.
 * Only import this module from `'use client'` components.
 */
export { gsap, ScrollTrigger, SplitText, useGSAP };
