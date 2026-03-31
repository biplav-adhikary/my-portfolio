/**
 * Soft cloud shapes for the Hero sky.
 * Uses CSS keyframe animations (not Framer Motion) per spec — these run continuously
 * and shouldn't trigger React re-renders.
 */

import clsx from "clsx";

interface CloudProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-20 h-8 md:w-28 md:h-10",
  md: "w-32 h-12 md:w-44 md:h-16",
  lg: "w-44 h-16 md:w-64 md:h-22",
};

export default function Cloud({ className = "", size = "md" }: CloudProps) {
  return (
    <div
      className={clsx(
        "absolute rounded-full bg-white/60 blur-[2px] dark:bg-white/[0.07]",
        sizeMap[size],
        className,
      )}
      aria-hidden="true"
    />
  );
}
