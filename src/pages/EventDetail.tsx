import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { events, generalRulesForAll } from "@/data/events";
import { ArrowLeft, Calendar, Clock, Phone, Users, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import RegistrationModal from "@/components/RegistrationModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedIcon } from "@/components/AnimatedIcons";
import { useAuth } from "@/contexts/AuthContext";

export default function EventDetail() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);
  const [showRegister, setShowRegister] = useState(false);
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);
  const { user, signInWithGoogle } = useAuth();

  useEffect(() => {
    // Reset the animation state whenever the ID changes
    setIsIntroPlaying(true);
    const timer = setTimeout(() => {
      setIsIntroPlaying(false);
    }, 2200); // 2.2 seconds loading animation
    return () => clearTimeout(timer);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Event Not Found</h1>
          <Link to="/" className="text-primary font-heading">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-background">
      {/* Event-Specific Loading Splash Screen */}
      <AnimatePresence>
        {isIntroPlaying && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Background Glows based on Event */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full"></div>

            <motion.div className="relative z-10 flex flex-col items-center">
              {/* Dynamic hit animation on the event vector image */}
              <div className="h-64 md:h-80 w-64 md:w-80">
                <AnimatedIcon eventId={event.id} />
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 font-display text-4xl md:text-5xl text-foreground tracking-[0.2em] uppercase text-center drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
              >
                ENTERING <span className="text-secondary">{event.name}</span>
              </motion.h2>
              <motion.div 
                className="w-48 h-1 mt-6 bg-zinc-800 rounded-full overflow-hidden relative shadow-[0_0_10px_rgba(0,0,0,0.5)]"
              >
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary via-secondary to-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: "circIn" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      <main className="flex-1 container py-8 relative">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 font-heading">
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: poster */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="card-gradient rounded-2xl border border-border p-8 flex items-center justify-center shadow-sport overflow-hidden bg-transparent"
          >
            {/* Ambient looping animation for the detail page as well */}
            <div className="w-full max-w-[16rem] aspect-square pointer-events-none drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
              <AnimatedIcon eventId={event.id} />
            </div>
          </motion.div>

          {/* Right: details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-6"
          >
            <div>
              <span className="text-5xl">{event.emoji}</span>
              <h1 className="font-display text-4xl md:text-5xl text-foreground mt-2">{event.name}</h1>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-heading font-semibold bg-primary/10 text-primary">
                {event.type === "team" ? "Team Event" : event.type === "duo" ? "Duo Event" : "Individual Event"}
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" /> {event.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" /> {event.time}
              </div>
            </div>

            {/* Faculty */}
            <div>
              <h3 className="font-heading text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-secondary" /> Faculty Incharges
              </h3>
              <ul className="space-y-1">
                {event.facultyIncharges.map((f) => (
                  <li key={f} className="text-sm text-muted-foreground">{f}</li>
                ))}
              </ul>
            </div>

            {/* Captains */}
            <div>
              <h3 className="font-heading text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-sport-green" /> Student Captains
              </h3>
              <ul className="space-y-2">
                {event.captains.map((c) => (
                  <li key={c.name + c.phone} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="font-medium text-foreground">{c.name}</span>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded">{c.role} • {c.program}</span>
                    {c.phone !== "-" && (
                      <span className="inline-flex items-center gap-1 text-xs">
                        <Phone className="w-3 h-3" /> {c.phone}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Rules */}
            <div className="max-h-60 overflow-y-auto pr-2 space-y-4">
              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-primary" /> General Rules
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {event.generalRules.map((r, i) => (
                    <li key={i} className="text-sm text-muted-foreground">{r}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-sport-red" /> Fouls & Violations
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {event.fouls.map((f, i) => (
                    <li key={i} className="text-sm text-muted-foreground">{f}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-secondary" /> General Rules for All Sports
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {generalRulesForAll.map((r, i) => (
                    <li key={i} className="text-sm text-muted-foreground">{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            {user ? (
              <Button
                size="lg"
                className="w-full gradient-cta text-primary-foreground font-heading text-lg"
                onClick={() => setShowRegister(true)}
              >
                Register Now
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="w-full font-heading text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={signInWithGoogle}
              >
                Login to Register
              </Button>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />

      <RegistrationModal
        open={showRegister}
        onClose={() => setShowRegister(false)}
        event={event}
      />
    </div>
  );
}
