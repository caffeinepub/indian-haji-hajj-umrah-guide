import { Link } from "@tanstack/react-router";
import { Heart, Moon } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-emerald-deeper border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                <Moon
                  className="w-5 h-5"
                  style={{ color: "oklch(0.22 0.06 155)" }}
                />
              </div>
              <div>
                <div className="font-serif font-bold text-white text-lg">
                  Indian Haji
                </div>
                <div className="text-gold text-sm">Hajj & Umrah Guide</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Apke muqaddas safar ko aasan aur yaadgar banane ke liye —
              step-by-step guides, duas, aur interactive learning.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">
              Guides
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/umrah", label: "Umrah Guide" },
                { to: "/hajj", label: "Hajj Guide" },
                { to: "/duas", label: "Dua Library" },
                { to: "/flipbook", label: "Flipbook" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">
              Rituals
            </h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>Tawaf</li>
              <li>Sa&apos;i</li>
              <li>Waqoof-e-Arafat</li>
              <li>Rami</li>
              <li>Qurbani</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            &copy; {year}. Built with{" "}
            <Heart className="inline w-3 h-3 text-red-400" /> using{" "}
            <a
              href={utm}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-white/40 text-xs text-right">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </div>
      </div>
    </footer>
  );
}
