import Link from "next/link";
import Logo from "../layout/Logo";

const socialLinks = [
  { label: "INSTAGRAM", href: "#" },
  { label: "PINTEREST", href: "#" },
];

const legalLinks = [
  { label: "PRIVACY", href: "#" },
  { label: "TERMS", href: "#" },
];

export function Footer() {
  return (
    <footer className="px-6 md:px-16 py-8 border-t border-white/10 bg-background">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Link
          href="/"
          className="text-lg font-black tracking-widest text-white"
        >
          <Logo withSlogan={false} />
        </Link>

        <div className="flex items-center gap-8">
          {[...socialLinks, ...legalLinks].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] tracking-[0.15em] text-muted hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="text-[11px] text-muted/60 tracking-wide">
          &copy; 2024 THE MIDNIGHT ATELIER | LOLA
        </p>
      </div>
    </footer>
  );
}
