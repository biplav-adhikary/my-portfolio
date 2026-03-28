/**
 * Floating dandelion seed SVG — organic ambient element.
 * Uses CSS keyframe animation for continuous gentle float.
 * "More felt than seen" — very subtle opacity and small scale.
 */

interface DandelionSeedProps {
  className?: string;
}

export default function DandelionSeed({ className = "" }: DandelionSeedProps) {
  return (
    <div className={`absolute ${className}`} aria-hidden="true">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        className="text-earth-400/30"
      >
        <circle cx="7" cy="7" r="1.5" fill="currentColor" />
        {/* Radiating filaments */}
        <line
          x1="7"
          y1="7"
          x2="7"
          y2="1"
          stroke="currentColor"
          strokeWidth="0.4"
        />
        <line
          x1="7"
          y1="7"
          x2="3.5"
          y2="3"
          stroke="currentColor"
          strokeWidth="0.4"
        />
        <line
          x1="7"
          y1="7"
          x2="10.5"
          y2="3"
          stroke="currentColor"
          strokeWidth="0.4"
        />
        <line
          x1="7"
          y1="7"
          x2="4.5"
          y2="2"
          stroke="currentColor"
          strokeWidth="0.4"
        />
        <line
          x1="7"
          y1="7"
          x2="9.5"
          y2="2"
          stroke="currentColor"
          strokeWidth="0.4"
        />
        <line
          x1="7"
          y1="7"
          x2="2"
          y2="5"
          stroke="currentColor"
          strokeWidth="0.4"
        />
        <line
          x1="7"
          y1="7"
          x2="12"
          y2="5"
          stroke="currentColor"
          strokeWidth="0.4"
        />
      </svg>
    </div>
  );
}
