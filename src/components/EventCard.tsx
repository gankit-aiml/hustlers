import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import type { EventData } from "@/data/events";

// Dynamic image imports
const images: Record<string, string> = Object.fromEntries(
  Object.entries(import.meta.glob("@/assets/event-*.png", { eager: true, import: "default" })).map(
    ([path, mod]) => [path.split("/").pop()?.replace(".png", "") ?? "", mod as string]
  )
);

export default function EventCard({ event, index }: { event: EventData; index: number }) {
  const img = images[event.image] ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link to={`/event/${event.id}`}>
        <div className="group card-gradient rounded-xl border border-border p-5 shadow-sport hover:shadow-sport-hover transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-center h-40 mb-4">
            <img src={img} alt={event.name} className="h-36 object-contain group-hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{event.emoji}</span>
            <h3 className="font-heading text-xl font-semibold text-foreground">{event.name}</h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
            <Calendar className="w-3 h-3" />
            <span>{event.date} • {event.time}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
            View Details <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
