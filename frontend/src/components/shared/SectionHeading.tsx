interface SectionHeadingProps {
  /** Accent label (Caveat font, sunset color) — e.g., "a few stories" */
  accentLabel?: string;
  /** Main heading (Playfair Display) */
  heading: string;
  /** Optional subtitle (Inter, lighter weight) */
  subtitle?: string;
}

/**
 * Consistent heading pattern for each section:
 * accent label + heading + optional subtitle.
 */
export default function SectionHeading({
  accentLabel,
  heading,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="mb-12 md:mb-16">
      {accentLabel && (
        <span className="text-accent-label mb-2 block">{accentLabel}</span>
      )}
      <h2 className="heading-secondary">{heading}</h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl font-body text-base font-light text-earth-500 md:text-lg dark:text-earth-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}
