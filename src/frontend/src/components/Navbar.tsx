import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Moon, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/umrah", label: "Umrah Guide" },
  { to: "/hajj", label: "Hajj Guide" },
  { to: "/duas", label: "Dua Library" },
  { to: "/flipbook", label: "Flipbook" },
  { to: "/expert", label: "Our Expert" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const state = useRouterState();
  const pathname = state.location.pathname;

  return (
    <header className="sticky top-0 z-50 bg-emerald-dark border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            data-ocid="nav.link"
          >
            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
              <Moon
                className="w-5 h-5"
                style={{ color: "oklch(0.22 0.06 155)" }}
              />
            </div>
            <div>
              <div className="font-serif font-bold text-white text-sm leading-tight">
                Indian Haji
              </div>
              <div className="text-gold text-xs leading-tight">
                Hajj & Umrah Guide
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  pathname === link.to
                    ? "text-gold bg-white/10"
                    : "text-white/80 hover:text-gold hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              className="bg-gold text-emerald-dark font-semibold hover:opacity-90 transition-opacity"
              data-ocid="nav.primary_button"
            >
              شروع کریں
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-emerald-deeper border-t border-white/10"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid="nav.link"
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.to
                      ? "text-gold bg-white/10"
                      : "text-white/80 hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
