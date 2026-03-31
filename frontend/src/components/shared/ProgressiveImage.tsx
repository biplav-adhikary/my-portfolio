import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

interface ProgressiveImageProps {
  /** Optimized WebP source (loaded lazily) */
  src: string;
  /** Tiny base64 LQIP data-URI (shown immediately, blurred) */
  lqip: string;
  alt: string;
  className?: string;
  /** Extra classes applied to the <img> element itself */
  imgClassName?: string;
  /** Loading strategy — defaults to "lazy" */
  loading?: "lazy" | "eager";
  /** aria-hidden for decorative images */
  decorative?: boolean;
}

/**
 * Progressive image with blur-up loading.
 *
 * Strategy:
 *   1. Renders a tiny LQIP inline as a blurred background-image (instant, ~300 bytes)
 *   2. Lazily loads the full WebP via a hidden <img>
 *   3. On load, cross-fades from blur to sharp (opacity transition)
 *   4. No layout shift — container dimensions are controlled by the caller via className
 *
 * No external dependencies. Uses native lazy loading + onLoad callback.
 */
export default function ProgressiveImage({
  src,
  lqip,
  alt,
  className = "",
  imgClassName = "",
  loading = "lazy",
  decorative = false,
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Handle case where image is already cached (onLoad won't fire)
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div
      className={clsx("relative overflow-hidden", className)}
      style={{
        backgroundImage: `url(${lqip})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blur overlay — visible until full image loads */}
      <div
        className={clsx(
          "absolute inset-0 backdrop-blur-xl transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100",
        )}
        aria-hidden="true"
      />

      {/* Full image — fades in on load */}
      <img
        ref={imgRef}
        src={src}
        alt={decorative ? "" : alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        aria-hidden={decorative || undefined}
        className={clsx(
          "h-full w-full transition-opacity duration-700",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName,
        )}
      />
    </div>
  );
}
