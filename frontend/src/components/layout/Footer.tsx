/**
 * Minimal footer — quiet sign-off, not a separate section.
 * Inherits the sunset warmth from the Contact section above.
 */
export default function Footer() {
  return (
    <footer className="bg-[#fef6e4] py-8 text-center">
      <p className="text-sm text-earth-400">
        &copy; {new Date().getFullYear()} Biplav. Built with care.
      </p>
    </footer>
  );
}
