import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Trophy, GraduationCap } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/#events" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <span className="font-heading text-lg font-semibold text-foreground hidden sm:block">DSEU</span>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/30">
            <Trophy className="w-6 h-6 text-accent-foreground" />
          </div>
          <span className="font-heading text-lg font-semibold text-foreground hidden sm:block">Sports Society</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className="font-heading text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading">
            Login with Google
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block font-heading text-sm text-muted-foreground hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Button size="sm" className="w-full bg-primary text-primary-foreground font-heading">
            Login with Google
          </Button>
        </div>
      )}
    </nav>
  );
}
