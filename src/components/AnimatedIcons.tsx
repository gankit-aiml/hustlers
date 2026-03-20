import { motion } from "framer-motion";

interface IconProps {
  className?: string;
  animate?: boolean;
}

const baseTransition: any = {
  duration: 1.5,
  repeat: Infinity,
  ease: "easeInOut",
};

export const AnimatedArmWrestling = ({ className }: IconProps) => (
  <svg viewBox="0 0 100 100" className={`w-full h-full ${className}`} fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    {/* Table */}
    <line x1="10" y1="85" x2="90" y2="85" className="stroke-muted-foreground opacity-50" strokeWidth="6" />
    <circle cx="50" cy="85" r="4" className="fill-muted-foreground" />
    
    {/* Left Arm (Secondary/Cyan) */}
    <g transform="translate(25, 85)">
      <motion.g
        animate={{ rotate: [0, 20, -10, 0] }}
        transition={baseTransition}
      >
        <path d="M0 0 Q 10 -25 25 -45" className="stroke-secondary drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]" />
      </motion.g>
    </g>

    {/* Right Arm (Primary/Orange) */}
    <g transform="translate(75, 85)">
      <motion.g
        animate={{ rotate: [0, -20, 10, 0] }}
        transition={baseTransition}
      >
        <path d="M0 0 Q -10 -25 -25 -45" className="stroke-primary drop-shadow-[0_0_8px_rgba(255,100,0,0.6)]" />
      </motion.g>
    </g>

    {/* Hands locking & pushing - approximate tracking */}
    <motion.circle
      cx="50" cy="40" r="5" className="fill-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
      animate={{ x: [0, 15, -8, 0], y: [0, 5, -2, 0] }}
      transition={baseTransition}
    />
  </svg>
);

export const AnimatedBadminton = ({ className }: IconProps) => (
  <svg viewBox="0 0 100 100" className={`w-full h-full ${className}`} fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    {/* Net */}
    <line x1="50" y1="60" x2="50" y2="90" className="stroke-muted-foreground opacity-50" strokeDasharray="2 3" />
    <path d="M48 60 L 52 60 M 48 70 L 52 70 M 48 80 L 52 80" className="stroke-muted-foreground" />
    
    {/* Player (Secondary/Cyan) - Standard Pictogram Human */}
    <circle cx="22" cy="35" r="4" className="fill-secondary drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]" />
    {/* Torso */}
    <line x1="22" y1="39" x2="22" y2="65" className="stroke-secondary drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
    {/* Legs */}
    <path d="M 22 65 L 12 85 M 22 65 L 32 85" className="stroke-secondary" />
    {/* Static Arm */}
    <line x1="22" y1="45" x2="12" y2="52" className="stroke-secondary" />
    
    {/* Swinging Arm & Racket (Anchored mathematically at shoulder bottom-left of group) */}
    <g transform="translate(22, 45)">
      <motion.g 
        animate={{ rotate: [-20, 80, -20] }} 
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
      >
        {/* Arm swinging */}
        <line x1="0" y1="0" x2="13" y2="-15" className="stroke-secondary" />
        {/* Racket */}
        <line x1="13" y1="-15" x2="18" y2="-20" className="stroke-white" strokeWidth="3" />
        <ellipse cx="23" cy="-25" rx="5" ry="9" className="stroke-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" strokeWidth="2" />
        <line x1="20" y1="-25" x2="26" y2="-25" className="stroke-white opacity-50" strokeWidth="1" />
        <line x1="23" y1="-30" x2="23" y2="-20" className="stroke-white opacity-50" strokeWidth="1" />
      </motion.g>
    </g>

    {/* Shuttlecock Flying */}
    <motion.g 
      animate={{ 
        x: [-10, 45, 80, 45, -10],
        y: [0, -25, 10, -25, 0],
        rotate: [-45, 45, 135, -135, -45]
      }} 
      transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
      className="drop-shadow-[0_0_10px_rgba(255,100,0,0.8)]"
    >
      <path d="M 30 20 L 25 10 L 35 10 Z" className="fill-primary" strokeWidth="2" strokeLinejoin="miter" />
      <circle cx="30" cy="22" r="3" className="fill-white stroke-none" />
    </motion.g>
  </svg>
);

export const AnimatedCarrom = ({ className }: IconProps) => (
  <svg viewBox="0 0 100 100" className={`w-full h-full ${className}`} fill="none" strokeWidth="5" strokeLinecap="round">
    {/* Board overhead abstract view */}
    <rect x="15" y="15" width="70" height="70" rx="5" className="stroke-muted-foreground opacity-30" strokeWidth="2" />
    <circle cx="20" cy="20" r="4" className="stroke-muted-foreground" />
    <circle cx="80" cy="20" r="4" className="stroke-muted-foreground" />
    <circle cx="20" cy="80" r="4" className="stroke-muted-foreground" />
    <circle cx="80" cy="80" r="4" className="stroke-muted-foreground" />
    <circle cx="50" cy="50" r="12" className="stroke-muted-foreground opacity-20" />

    {/* Hand pulling back to strike */}
    <motion.path 
      d="M50 95 L 50 85 M 45 90 L 50 85 L 55 90"
      className="stroke-secondary drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
      animate={{ y: [0, 10, -5, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.6, 0.7, 1] }}
    />
    
    {/* Striker (Primary) hitting a Coin (White) */}
    <motion.circle 
      cx="50" cy="72" r="5" 
      className="stroke-primary fill-primary drop-shadow-[0_0_10px_rgba(255,100,0,0.8)]"
      animate={{ y: [0, 0, -25, -25, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.6, 0.7, 0.9, 1] }}
    />

    <motion.circle 
      cx="50" cy="40" r="4" 
      className="stroke-white fill-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
      animate={{ x: [0, 0, 0, 25, 0], y: [0, 0, 0, -25, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.6, 0.7, 0.9, 1] }}
    />
  </svg>
);

export const AnimatedChess = ({ className }: IconProps) => (
  <svg viewBox="0 0 100 100" className={`w-full h-full ${className}`} fill="none" strokeWidth="5" strokeLinecap="round">
    {/* Board base */}
    <path d="M 10 75 L 90 75 L 80 85 L 20 85 Z" className="stroke-muted-foreground fill-background opacity-50" strokeWidth="2" />
    <line x1="30" y1="75" x2="35" y2="85" className="stroke-muted-foreground opacity-30" strokeWidth="2" />
    <line x1="50" y1="75" x2="50" y2="85" className="stroke-muted-foreground opacity-30" strokeWidth="2" />
    <line x1="70" y1="75" x2="65" y2="85" className="stroke-muted-foreground opacity-30" strokeWidth="2" />

    {/* Static Piece (Pawn silhouette) */}
    <g className="drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
      <path d="M 18 75 L 32 75 L 28 68 L 22 68 Z" className="fill-secondary stroke-none" />
      <path d="M 23 68 Q 25 60 23 55 L 27 55 Q 25 60 27 68 Z" className="fill-secondary stroke-none" />
      <line x1="22" y1="55" x2="28" y2="55" className="stroke-secondary" strokeWidth="2" />
      <circle cx="25" cy="48" r="5" className="fill-secondary stroke-none" />
    </g>

    {/* Moving Hand & Piece */}
    <motion.g 
      animate={{ x: [0, -40, -40, 0], y: [0, 20, 20, 0] }}
      transition={{ duration: 3, repeat: Infinity, times: [0, 0.3, 0.7, 1] }}
    >
      {/* Hand (Secondary) reaching in */}
      <path d="M 90 20 Q 75 30 65 52" className="stroke-primary drop-shadow-[0_0_8px_rgba(255,100,0,0.6)]" strokeWidth="6" />
      <circle cx="65" cy="52" r="2" className="stroke-primary fill-primary" />
      
      {/* Moved Piece (White Pawn, clearly recognizable) */}
      <g className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        <path d="M 58 75 L 72 75 L 68 68 L 62 68 Z" className="fill-white stroke-none" />
        <path d="M 63 68 Q 65 60 63 55 L 67 55 Q 65 60 67 68 Z" className="fill-white stroke-none" />
        <line x1="62" y1="55" x2="68" y2="55" className="stroke-white" strokeWidth="2" />
        <circle cx="65" cy="48" r="5" className="fill-white stroke-none" />
      </g>
    </motion.g>
  </svg>
);

export const AnimatedFootball = ({ className }: IconProps) => (
  <svg viewBox="0 0 100 100" className={`w-full h-full ${className}`} fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    {/* Goal net */}
    <path d="M 85 30 L 85 80 M 85 30 L 95 35 L 95 80 M 85 80 L 95 80" className="stroke-muted-foreground opacity-50" />
    <line x1="85" y1="40" x2="95" y2="45" className="stroke-muted-foreground opacity-30" strokeWidth="2" />
    <line x1="85" y1="50" x2="95" y2="55" className="stroke-muted-foreground opacity-30" strokeWidth="2" />
    <line x1="85" y1="60" x2="95" y2="65" className="stroke-muted-foreground opacity-30" strokeWidth="2" />
    <line x1="85" y1="70" x2="95" y2="75" className="stroke-muted-foreground opacity-30" strokeWidth="2" />
    
    <line x1="10" y1="80" x2="95" y2="80" className="stroke-muted-foreground opacity-40" />

    {/* Player (Primary/Orange) - Solid Human Body */}
    <circle cx="30" cy="30" r="4" className="fill-primary stroke-none drop-shadow-[0_0_8px_rgba(255,100,0,0.6)]" />
    {/* Torso */}
    <line x1="30" y1="36" x2="30" y2="58" className="stroke-primary" />
    {/* Non-kicking leg (Planted) */}
    <line x1="30" y1="58" x2="25" y2="80" className="stroke-primary" />
    {/* Arms (Running pose) */}
    <path d="M 20 50 L 30 42 L 40 46" className="stroke-primary" />
    
    {/* Kicking Leg - Anchored mathematically to the hip x=30 y=58 */}
    <g transform="translate(30, 58)">
      <motion.g 
        animate={{ rotate: [-30, 45, -30] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="0" y1="0" x2="12" y2="17" className="stroke-primary" />
      </motion.g>
    </g>

    {/* Ball (Cyan/Secondary) flying into net */}
    <motion.circle 
      cx="45" cy="80" r="5" 
      className="fill-secondary stroke-none drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]"
      animate={{ x: [0, 42, -5, 0], y: [0, -38, -5, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
    />
  </svg>
);

export const AnimatedTableTennis = ({ className }: IconProps) => (
  <svg viewBox="0 0 100 100" className={`w-full h-full ${className}`} fill="none" strokeWidth="5" strokeLinecap="round">
    {/* Table */}
    <path d="M 10 70 L 90 70 L 80 75 L 20 75 Z" className="stroke-muted-foreground opacity-50 fill-background" />
    <line x1="50" y1="65" x2="50" y2="72" className="stroke-muted-foreground" strokeWidth="3" />

    {/* Player 1 Left (Cyan/Secondary) Human */}
    <circle cx="20" cy="35" r="4" className="stroke-secondary fill-secondary" />
    <line x1="20" y1="40" x2="20" y2="60" className="stroke-secondary" />
    <path d="M 20 60 L 10 75 M 20 60 L 25 75" className="stroke-secondary" />
    
    {/* Swinging Right Arm */}
    <g transform="translate(20, 42)">
      <motion.g  
        animate={{ rotate: [-30, 50, -30] }} 
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="0" y1="0" x2="10" y2="10" className="stroke-secondary" />
        {/* Paddle */}
        <circle cx="14" cy="13" r="4" className="fill-secondary stroke-none drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]" />
      </motion.g>
    </g>

    {/* Player 2 Right (Orange/Primary) Human */}
    <circle cx="80" cy="35" r="4" className="stroke-primary fill-primary" />
    <line x1="80" y1="40" x2="80" y2="60" className="stroke-primary" />
    <path d="M 80 60 L 90 75 M 80 60 L 75 75" className="stroke-primary" />
    
    {/* Swinging Right Arm */}
    <g transform="translate(80, 42)">
      <motion.g 
        animate={{ rotate: [30, -50, 30] }} 
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <line x1="0" y1="0" x2="-10" y2="10" className="stroke-primary" />
        {/* Paddle */}
        <circle cx="-14" cy="13" r="4" className="fill-primary stroke-none drop-shadow-[0_0_5px_rgba(255,100,0,0.5)]" />
      </motion.g>
    </g>

    {/* Ball (White) bouncing between paddles */}
    <motion.circle 
      cx="34" cy="55" r="3" 
      className="fill-white stroke-none drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      animate={{ x: [0, 16, 32, 16, 0], y: [0, 10, 0, 10, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  </svg>
);

export const AnimatedTugOfWar = ({ className }: IconProps) => (
  <svg viewBox="0 0 100 100" className={`w-full h-full ${className}`} fill="none" strokeWidth="5" strokeLinecap="round">
    <line x1="10" y1="85" x2="90" y2="85" className="stroke-muted-foreground opacity-30" />
    
    {/* Rope oscillating */}
    <motion.path 
      d="M 25 60 Q 50 65 75 60" 
      className="stroke-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" strokeWidth="4"
      animate={{ d: ["M 25 60 Q 50 65 75 60", "M 20 60 Q 50 55 80 60", "M 25 60 Q 50 65 75 60"] }}
      transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
    />
    <motion.rect x="49" y="55" width="2" height="15" className="fill-sport-red stroke-none" animate={{ x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }} />

    {/* Left Team (Secondary) Human pulling back */}
    <motion.g animate={{ x: [-2, 2, -2] }} transition={{ duration: 0.5, repeat: Infinity }}>
      <circle cx="20" cy="35" r="5" className="fill-secondary stroke-none drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]" />
      <line x1="20" y1="41" x2="16" y2="65" className="stroke-secondary" />
      <path d="M 16 65 L 10 85 M 16 65 L 25 85" className="stroke-secondary" />
      <path d="M 17 45 L 25 60 L 30 62" className="stroke-secondary" /> {/* Arm pulling tight */}
    </motion.g>

    {/* Right Team (Primary) Human pulling back */}
    <motion.g animate={{ x: [2, -2, 2] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}>
      <circle cx="80" cy="35" r="5" className="fill-primary stroke-none drop-shadow-[0_0_8px_rgba(255,100,0,0.6)]" />
      <line x1="80" y1="41" x2="84" y2="65" className="stroke-primary" />
      <path d="M 84 65 L 75 85 M 84 65 L 90 85" className="stroke-primary" />
      <path d="M 83 45 L 75 60 L 70 62" className="stroke-primary" /> {/* Arm pulling tight */}
    </motion.g>
  </svg>
);

export const AnimatedVolleyball = ({ className }: IconProps) => (
  <svg viewBox="0 0 100 100" className={`w-full h-full ${className}`} fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    {/* Net & Floor */}
    <line x1="50" y1="40" x2="50" y2="90" className="stroke-muted-foreground opacity-50" />
    <line x1="10" y1="90" x2="90" y2="90" className="stroke-muted-foreground opacity-30" />
    
    {/* Jumping Player (Secondary/Cyan) - Anchor entire human to jump */}
    <motion.g animate={{ y: [15, -15, 15] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
      {/* Head */}
      <circle cx="25" cy="30" r="4" className="stroke-none fill-secondary drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]" />
      {/* Torso */}
      <line x1="25" y1="36" x2="25" y2="60" className="stroke-secondary" />
      {/* Legs */}
      <path d="M 25 60 L 15 75 M 25 60 L 30 70" className="stroke-secondary" />
      {/* Left arm (static balance) */}
      <line x1="25" y1="42" x2="15" y2="40" className="stroke-secondary" />
      
      {/* Swinging Right Arm (Anchored mathematically to torso at x=25 y=40, which is Bottom-Left of the arm bounding box) */}
      <g transform="translate(25, 40)">
        <motion.g 
          animate={{ rotate: [-40, 60, -40] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        >
          <line x1="0" y1="0" x2="10" y2="-15" className="stroke-secondary" />
        </motion.g>
      </g>
    </motion.g>

    {/* Receiving Player (Primary/Orange) static lower stance */}
    <circle cx="75" cy="60" r="4" className="stroke-none fill-primary drop-shadow-[0_0_8px_rgba(255,100,0,0.6)]" />
    <line x1="75" y1="65" x2="75" y2="78" className="stroke-primary" />
    <path d="M 75 78 L 65 90 M 75 78 L 85 90" className="stroke-primary" />
    <path d="M 75 68 L 65 72 L 70 65" className="stroke-primary" />

    {/* Glowing Ball (White) being spiked */}
    <motion.circle 
      cx="45" cy="15" r="5" 
      className="fill-white stroke-none drop-shadow-[0_0_12px_rgba(255,255,255,1)]"
      animate={{ x: [0, 20, 0], y: [0, 70, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }}
    />
  </svg>
);

export function AnimatedIcon({ eventId, className = "" }: { eventId: string, className?: string }) {
  const commonClass = `w-full h-full ${className}`;
  switch (eventId) {
    case 'arm-wrestling': return <AnimatedArmWrestling className={commonClass} />;
    case 'badminton': return <AnimatedBadminton className={commonClass} />;
    case 'carrom': return <AnimatedCarrom className={commonClass} />;
    case 'chess': return <AnimatedChess className={commonClass} />;
    case 'football': return <AnimatedFootball className={commonClass} />;
    case 'table-tennis': return <AnimatedTableTennis className={commonClass} />;
    case 'tug-of-war': return <AnimatedTugOfWar className={commonClass} />;
    case 'volleyball': return <AnimatedVolleyball className={commonClass} />;
    default: return <AnimatedFootball className={commonClass} />;
  }
}
