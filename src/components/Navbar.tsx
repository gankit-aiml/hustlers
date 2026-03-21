import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import dseuLogo from "@/assets/dseu-logo.png";
import sportsLogo from "@/assets/sports-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/#events" },
  { label: "Contact", href: "/#contact" },
];

// Provide your authorized admin emails here
const ADMIN_EMAILS = [
  "gankitsysdev@gmail.com",
  "sam8920341517@gmail.com",
  "sumitrathore45528@gmail.com",
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, signInWithGoogle, signOut, isLoading } = useAuth();

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isAdmin = user && user.email && ADMIN_EMAILS.includes(user.email);

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10">
            <img src={dseuLogo} alt="DSEU Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-heading text-lg font-bold text-foreground tracking-wide hidden sm:block shadow-sm">DSEU</span>

          <div className="flex items-center justify-center w-10 h-10">
            <img src={sportsLogo} alt="Sports Society" className="w-full h-full object-contain drop-shadow-md" />
          </div>
          <span className="font-heading text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-wide leading-tight">
            Hustlers<br className="hidden sm:block" /> Sports Club
          </span>
        </Link>

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

          <div className="h-6 w-px bg-border mx-2"></div>

          {!isLoading && (
            user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link to="/dashboard">
                    <Button variant="ghost" size="sm" className="font-heading text-muted-foreground hover:text-primary">
                      <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                    </Button>
                  </Link>
                )}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <img src={user.user_metadata.avatar_url} alt="avatar" />
                  </div>
                  <span className="text-xs font-semibold text-secondary max-w-[100px] truncate">
                    {user.user_metadata.name}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={signOut} className="font-heading h-8 text-xs border-destructive/30 hover:bg-destructive/10 text-destructive">
                  <LogOut className="w-3.5 h-3.5 mr-1" /> Logout
                </Button>
              </div>
            ) : (
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading shadow-md" onClick={signInWithGoogle}>
                Login with Google
              </Button>
            )
          )}
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
          <div className="h-px w-full bg-border my-2"></div>

          {!isLoading && (
            user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-secondary/10 rounded-lg">
                  <img src={user.user_metadata.avatar_url} alt="avatar" className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-semibold text-secondary">{user.user_metadata.name}</span>
                </div>
                {isAdmin && (
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                    <Button variant="secondary" size="sm" className="w-full font-heading mb-2">
                      <LayoutDashboard className="w-4 h-4 mr-2" /> Admin Dashboard
                    </Button>
                  </Link>
                )}
                <Button size="sm" variant="outline" className="w-full text-destructive border-destructive/30" onClick={() => { signOut(); setMobileOpen(false); }}>
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
              </div>
            ) : (
              <Button size="sm" className="w-full bg-primary text-primary-foreground font-heading shadow-md" onClick={() => { signInWithGoogle(); setMobileOpen(false); }}>
                Login with Google
              </Button>
            )
          )}
        </div>
      )}
    </nav>
  );
}
