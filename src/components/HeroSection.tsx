import { motion } from "framer-motion";
import heroImg from "@/assets/hero-new.png";

export default function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-4rem)] max-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Sports background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/80 md:bg-background/60 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        {/* Additional radial gradient to darken sides, bringing focus to center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]"></div>
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center mt-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-none tracking-widest text-[#FDFDFD] drop-shadow-[0_0_20px_rgba(255,100,0,0.4)] uppercase">
              BPDSEU Annual
              <span className="block text-primary drop-shadow-[0_0_25px_rgba(255,100,0,0.6)] mt-1">Sports Day</span>
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-secondary to-[#4A90E2] drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]">2026</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 font-heading text-xl md:text-2xl text-foreground font-semibold tracking-wider uppercase"
          >
            Unleash Your Inner Champion
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-6 flex flex-col items-center gap-2"
          >
            <p className="text-sm md:text-base text-muted-foreground font-medium mb-3 tracking-wide">
              24th & 25th March 2026 <span className="text-primary mx-2">•</span> Bhai Parmanand DSEU Campus, Delhi
            </p>
            <motion.a
              href="#events"
              className="inline-flex items-center justify-center px-8 py-3 rounded-none border-2 border-primary bg-primary/10 hover:bg-primary/20 text-white font-heading text-lg shadow-[0_0_15px_rgba(255,100,0,0.3)] hover:shadow-[0_0_25px_rgba(255,100,0,0.5)] backdrop-blur-sm transition-all uppercase tracking-widest relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Explore Events</span>
              <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0"></div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
