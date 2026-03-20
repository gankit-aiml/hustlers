import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 600);
    }, 3200);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Intense Background Grid & Glows */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/20 blur-[80px] rounded-full"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center w-full max-w-md px-8"
          >
            {/* Title */}
            <motion.h1
              className="font-display text-4xl md:text-6xl text-white tracking-[0.2em] uppercase text-center drop-shadow-[0_0_15px_rgba(255,100,0,0.6)]"
            >
              BPDSEU <span className="text-primary block mt-2 text-5xl md:text-7xl">SPORTS DAY</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-4 font-heading text-secondary tracking-[0.3em] text-sm md:text-base font-bold"
            >
              INITIALIZING ARENA...
            </motion.p>

            {/* Glowing Progress Bar */}
            <motion.div 
              className="w-full h-1 mt-8 bg-zinc-800 rounded-full overflow-hidden relative shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            >
              <div 
                className="h-full bg-gradient-to-r from-primary via-secondary to-primary shadow-[0_0_15px_rgba(255,100,0,0.8)]"
                style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
              />
            </motion.div>
            
            <motion.div
              className="w-full flex justify-between mt-2 text-xs font-mono text-zinc-500 font-bold tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span>SYS_READY</span>
              <span className="text-primary">{progress}%</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
