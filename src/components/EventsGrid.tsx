import { events } from "@/data/events";
import EventCard from "./EventCard";

export default function EventsGrid() {
  return (
    <section id="events" className="container py-16">
      <h2 className="font-display text-4xl md:text-5xl text-center gradient-hero-text mb-2">Events</h2>
      <p className="text-center text-muted-foreground mb-10">Choose your battlefield</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}
