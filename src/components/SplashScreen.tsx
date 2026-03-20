import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const sportsIcons = ["🏐", "⚽", "🏸", "♟", "🏓", "💪"];

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 600);
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex gap-6 mb-8">
            {sportsIcons.map((icon, i) => (
              <motion.span
                key={icon}
                className="text-5xl md:text-6xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: i * 0.35,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
              >
                {icon}
              </motion.span>
            ))}
          </div>
          <motion.h1
            className="font-display text-3xl md:text-5xl tracking-wider gradient-hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.5 }}
          >
            BPDSEU Sports Day 2026
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
