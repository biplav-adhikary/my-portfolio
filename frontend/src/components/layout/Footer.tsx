/**
 * Minimal footer — quiet sign-off, not a separate section.
 * Inherits the sunset warmth from the Contact section above.
 */
export default function Footer() {
  return (
    <footer className="bg-[#e8dcc6] py-8 text-center dark:bg-[#1c1520]">
      <p className="text-sm text-earth-600 dark:text-earth-500">
        &copy; {new Date().getFullYear()} Biplav. Built with care.
      </p>
    </footer>
  );
}
