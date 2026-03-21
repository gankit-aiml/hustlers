import { User } from "lucide-react";
import { useEffect, useRef } from "react";

import photoPresident from "@/assets/photo-president.png";
import photoVicePresident from "@/assets/photo-vice_president.png";
import photoConvenor from "@/assets/photo-covenor.png";

// Placeholder data since specific names/classes weren't provided yet
const leaders = [
  {
    role: "President",
    name: "Sumit Rathore",
    classification: "B.Tech DS",
    year: "2nd Year",
    photo: photoPresident
  },
  {
    role: "Vice President",
    name: "Asma Iman",
    classification: "B.Tech AI",
    year: "2nd Year",
    photo: photoVicePresident
  },
  {
    role: "Convenor",
    name: "Sanjay Sharma",
    classification: "Associate Professor",
    year: "Faculty Member",
    photo: photoConvenor
  }
];

export default function LeadershipSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10;

      if (isAtEnd) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll by roughly one card width
        scrollContainer.scrollBy({ left: 350, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-muted/10 border-t border-border relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container relative z-10">
        <h2 className="font-display text-3xl md:text-4xl text-foreground mb-10 tracking-wide uppercase flex items-center gap-3">
          <span className="w-8 h-1 bg-primary rounded-full"></span>
          CLUB <span className="text-secondary">LEADERSHIP</span>
        </h2>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full"
        >

          {leaders.map((leader, idx) => (
            <div
              key={idx}
              className="min-w-[320px] md:min-w-[400px] snap-start bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 flex gap-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:border-primary/40 hover:bg-card transition-all"
            >
              {/* Left Side: Photo Box */}
              <div className="flex-shrink-0 w-28 h-[8.5rem] bg-background rounded-lg border border-border/60 flex items-center justify-center overflow-hidden relative group">
                {leader.photo ? (
                  <img src={leader.photo} alt={leader.role} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent group-hover:opacity-50 transition-opacity"></div>
                    <User className="w-12 h-12 text-muted-foreground/50 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                  </>
                )}
              </div>

              {/* Right Side: Details Box */}
              <div className="flex flex-col justify-center">
                <p className="text-xs font-bold font-heading text-primary uppercase tracking-[0.15em] mb-1.5">{leader.role}</p>
                <h3 className="text-xl md:text-2xl font-display text-foreground tracking-wider uppercase mb-3">{leader.name}</h3>

                <div className="space-y-1">
                  <p className="flex items-center gap-2 text-sm text-muted-foreground font-heading">
                    <span className="w-3 h-3 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/30">
                      <span className="w-1 h-1 rounded-full bg-secondary"></span>
                    </span>
                    {leader.classification}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground font-heading">
                    <span className="w-3 h-3 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
                      <span className="w-1 h-1 rounded-full bg-accent"></span>
                    </span>
                    {leader.year}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
