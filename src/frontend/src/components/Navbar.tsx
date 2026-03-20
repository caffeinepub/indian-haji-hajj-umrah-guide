import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Link, useRouterState } from "@tanstack/react-router";
import { LogOut, Menu, Moon, Shield, X } from "lucide-react";
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
  const [loginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const state = useRouterState();
  const pathname = state.location.pathname;
  const { isAdmin, login, logout } = useAdminAuth();

  const handleLogin = () => {
    const ok = login(username, password);
    if (ok) {
      setLoginOpen(false);
      setUsername("");
      setPassword("");
      setError("");
    } else {
      setError("Galat ID ya Password");
    }
  };

  const AdminLoginDialog = (
    <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="text-white/70 hover:text-white border border-white/20 hover:border-white/40"
          data-ocid="nav.open_modal_button"
        >
          <Shield className="w-4 h-4 mr-1" /> Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm" data-ocid="nav.dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-700" />
            Admin Login
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label htmlFor="admin-username">Admin ID</Label>
            <Input
              id="admin-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Admin ID darj karein"
              data-ocid="nav.input"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password darj karein"
              data-ocid="nav.input"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm" data-ocid="nav.error_state">
              {error}
            </p>
          )}
          <Button
            className="w-full bg-emerald-800 hover:bg-emerald-700 text-white"
            onClick={handleLogin}
            data-ocid="nav.submit_button"
          >
            Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

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

          {/* CTA / Admin */}
          <div className="hidden md:flex items-center gap-3">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                  <Shield className="w-4 h-4" /> Admin
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white/70 hover:text-white"
                  onClick={logout}
                  data-ocid="nav.button"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              AdminLoginDialog
            )}
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
              <div className="pt-2 border-t border-white/10">
                {isAdmin ? (
                  <div className="flex items-center justify-between px-4 py-2">
                    <span className="flex items-center gap-1 text-green-400 text-sm font-semibold">
                      <Shield className="w-4 h-4" /> Admin
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white/70 hover:text-white"
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      data-ocid="nav.button"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </Button>
                  </div>
                ) : (
                  <div className="px-4 py-2">{AdminLoginDialog}</div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
