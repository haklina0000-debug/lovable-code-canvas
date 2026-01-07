import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Globe } from "lucide-react";
import { NtflyLogo } from "@/components/ui/NtflyLogo";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/features", label: "المميزات" },
  { href: "/templates", label: "القوالب" },
  { href: "/pricing", label: "الأسعار" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <NtflyLogo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-secondary transition-colors hidden sm:flex">
              <Sun className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg hover:bg-secondary transition-colors hidden sm:flex">
              <Globe className="w-5 h-5 text-muted-foreground" />
            </button>
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                لوحة التحكم
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm">تسجيل الدخول</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium bg-secondary text-foreground"
              >
                لوحة التحكم
              </Link>
              <Link
                to="/auth"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary"
              >
                خروج
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
