/**
 * Layered SVG hill silhouettes for the Hero landscape.
 * Three depth layers: far, mid, near — each gets a different parallax speed.
 * Colors drawn from the grass palette (light) or muted emerald (dark).
 */

import clsx from "clsx";
import { useTheme } from "../../../context/ThemeContext";

export function FarHills({ className }: { className?: string }) {
  const { theme } = useTheme();
  return (
    <svg
      viewBox="0 0 1440 320"
      className={clsx("w-full", className)}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,240 C120,180 280,200 440,190 C600,180 760,220 920,200 C1080,180 1240,210 1440,220 L1440,320 L0,320 Z"
        fill={theme === "dark" ? "#065f46" : "#bbf7d0"}
        fillOpacity={theme === "dark" ? "0.25" : "0.45"}
      />
    </svg>
  );
}

export function MidHills({ className }: { className?: string }) {
  const { theme } = useTheme();
  return (
    <svg
      viewBox="0 0 1440 320"
      className={clsx("w-full", className)}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,260 C200,210 400,250 600,230 C800,210 1000,260 1200,240 C1320,230 1400,250 1440,260 L1440,320 L0,320 Z"
        fill={theme === "dark" ? "#047857" : "#86efac"}
        fillOpacity={theme === "dark" ? "0.3" : "0.55"}
      />
    </svg>
  );
}

export function NearGround({ className }: { className?: string }) {
  const { theme } = useTheme();
  return (
    <svg
      viewBox="0 0 1440 140"
      className={clsx("w-full", className)}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,80 C240,50 480,90 720,70 C960,50 1200,80 1440,90 L1440,140 L0,140 Z"
        fill={theme === "dark" ? "#064e3b" : "#4ade80"}
        fillOpacity={theme === "dark" ? "0.25" : "0.35"}
      />
    </svg>
  );
}
