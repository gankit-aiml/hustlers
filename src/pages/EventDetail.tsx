import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { events, generalRulesForAll } from "@/data/events";
import { ArrowLeft, Calendar, Clock, Phone, Users, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RegistrationModal from "@/components/RegistrationModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const images: Record<string, string> = Object.fromEntries(
  Object.entries(import.meta.glob("@/assets/event-*.png", { eager: true, import: "default" })).map(
    ([path, mod]) => [path.split("/").pop()?.replace(".png", "") ?? "", mod as string]
  )
);

export default function EventDetail() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);
  const [showRegister, setShowRegister] = useState(false);

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

  const img = images[event.image] ?? "";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 font-heading">
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: poster */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="card-gradient rounded-2xl border border-border p-8 flex items-center justify-center shadow-sport"
          >
            <img src={img} alt={event.name} className="max-h-96 object-contain drop-shadow-xl" />
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
                {event.type === "team" ? "Team Event" : "Individual Event"}
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

            <Button
              size="lg"
              className="w-full gradient-cta text-primary-foreground font-heading text-lg"
              onClick={() => setShowRegister(true)}
            >
              Register Now
            </Button>
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
