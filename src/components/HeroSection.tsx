import { motion } from "framer-motion";
import heroImg from "@/assets/hero-sports.png";

export default function HeroSection() {
  return (
    <section className="container py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={heroImg}
            alt="Sports avatars collage"
            className="w-full max-w-lg mx-auto drop-shadow-2xl"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center md:text-left"
        >
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-wide gradient-hero-text">
            BPDSEU Annual
            <br />
            Sports Day
            <br />
            2026
          </h1>
          <p className="mt-4 font-heading text-xl md:text-2xl text-muted-foreground">
            Unleash Your Inner Champion
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            24th & 25th March 2026 • Bhai Parmanand DSEU Campus, Delhi
          </p>
          <motion.a
            href="#events"
            className="inline-block mt-6 px-8 py-3 rounded-lg gradient-cta text-primary-foreground font-heading text-lg shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Events
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
