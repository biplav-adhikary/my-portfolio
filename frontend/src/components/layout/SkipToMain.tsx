/**
 * SkipToMain — accessibility skip link.
 * Visually hidden until keyboard focus. On activation, finds and focuses
 * the first focusable element inside <main id="main-content"> so keyboard
 * users skip the navbar entirely.
 */
export default function SkipToMain() {
  const handleSkip = () => {
    const main = document.getElementById("main-content");
    if (!main) return;

    const focusable = main.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      // Fallback: focus the main element itself
      main.setAttribute("tabindex", "-1");
      main.focus();
    }
  };

  return (
    <button
      type="button"
      onClick={handleSkip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSkip();
        }
      }}
      className={[
        // Hidden by default — clipped absolutely
        "absolute -top-full left-4 z-[9999]",
        // Visible on focus
        "focus:top-4",
        // Styling
        "rounded-lg bg-white px-4 py-2 text-sm font-medium text-earth-800 shadow-lg",
        "transition-[top] duration-150",
        "outline-none ring-2 ring-transparent focus:ring-sky-400",
        "dark:bg-night-800 dark:text-cloud-50",
      ].join(" ")}
    >
      Skip to main content
    </button>
  );
}
