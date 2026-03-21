import posterVolleyball from "@/assets/poster-volleyball.png";
import posterArmWrestling from "@/assets/poster-arm_wrestling.png";
import posterBadminton from "@/assets/poster-badminton.png";
import posterCarrom from "@/assets/poster-carrom.png";
import posterTableTennis from "@/assets/poster-table_tennis.png";
import posterTugOfWar from "@/assets/poster-tug_of_war.png";
import posterFootball from "@/assets/poster-football.png";
import posterChess from "@/assets/poster-chess.png";

export interface Captain {
  name: string;
  role: string;
  program: string;
  phone: string;
}

export interface EventData {
  id: string;
  name: string;
  emoji: string;
  type: "team" | "individual" | "duo";
  date: string;
  time: string;
  image: string;
  poster?: string;
  facultyIncharges: string[];
  captains: Captain[];
  generalRules: string[];
  fouls: string[];
  whatsappLink?: string;
}

export const events: EventData[] = [
  {
    id: "volleyball",
    name: "Volleyball",
    emoji: "🏐",
    type: "team",
    date: "25 March 2026",
    time: "03:00 PM - 05:00 PM",
    image: "event-volleyball",
    poster: posterVolleyball,
    whatsappLink: " https://chat.whatsapp.com/H2rrKcLKy7j1KDf4uPqCyI?mode=gi_t",
    facultyIncharges: ["Sh. J.R. Bhowate", "Dr. Preeti Bedi"],
    captains: [
      { name: "Abhinav", role: "Captain", program: "B.Tech DS", phone: "9111422551" },
      { name: "Gaurav", role: "Vice Captain", program: "BCA", phone: "8700493886" },
      { name: "Priyansh", role: "Captain", program: "BCA", phone: "9582455736" },
    ],
    generalRules: [
      "Team Size: 6 players on the court per team (plus substitutes).",
      "Scoring: Best-of-3 sets format. Each set is played to 15 or 25 points (rally scoring). Must win by 2 points.",
      "Touches: Maximum of three touches to return the ball over the net. A block does not count as a touch.",
      "Rotation: Players must rotate clockwise after winning the serve.",
    ],
    fouls: [
      "Foot Fault: Stepping on or over the baseline while serving.",
      "Net Touch: Any player touching the net while the ball is in play.",
      "Lift/Carry: Catching, throwing, or resting the ball in the hands instead of a clean hit.",
      "Double Touch: A player hitting the ball twice in succession (except when blocking).",
      "HOLD: Players cannot hold the ball.",
    ],
  },
  {
    id: "arm-wrestling",
    name: "Arm Wrestling",
    emoji: "💪",
    type: "individual",
    date: "25 March 2026",
    time: "2:00 PM - 4:00 PM",
    image: "event-armwrestling",
    poster: posterArmWrestling,
    whatsappLink: "https://chat.whatsapp.com/HxfcsqmqTk21J2Di8T97Uj?mode=gi_t",
    facultyIncharges: ["Dr. Ajith Kumar", "Sh. S.K. Awasthi", "Mrs. S.P. Meenu Kalra"],
    captains: [
      { name: "Devansh", role: "Captain", program: "B.Tech DS", phone: "9625903335" },
      { name: "Mayur", role: "Vice Captain", program: "B.Tech DS", phone: "7827864231" },
    ],
    generalRules: [
      "Stance: Both competitors must have one elbow resting squarely on the elbow pad. The opposite hand must grip the provided peg.",
      "Grip: Thumbs must be interlocked. The referee will ensure the grip is fair and centered before starting with 'Ready, Go!'.",
      "Winning: Pinning the opponent's hand/wrist to the touch pad.",
    ],
    fouls: [
      "Elbow Foul: Lifting the elbow off the pad or sliding it completely outside the pad area.",
      "Slip Out: If hands slip apart intentionally to avoid a loss, it is a foul.",
      "False Start: Starting the pull before the referee says 'Go'.",
      "Note: Two fouls result in a loss of the match.",
    ],
  },
  {
    id: "badminton",
    name: "Badminton",
    emoji: "🏸",
    type: "duo",
    date: "24 March 2026",
    time: "11:00 AM - 1:00 PM",
    image: "event-badminton",
    poster: posterBadminton,
    whatsappLink: "https://chat.whatsapp.com/LYBUaOIEemv7UhHqDJUvbX?mode=gi_t",
    facultyIncharges: ["Sh. G.T.V.LN. Charyulu", "Mrs. Meenu Kalra"],
    captains: [
      { name: "Yash", role: "Captain", program: "B.Tech AI", phone: "8588868696" },
      { name: "Mahima", role: "Captain", program: "B.Tech AI", phone: "9266713969" },
      { name: "Moksh", role: "Vice Captain", program: "BFSI", phone: "9315333281" },
    ],
    generalRules: [
      "Format: Matches can be Singles or Doubles. Best-of-3 sets, played to 15 or 21 points.",
      "Serving: The serve must be hit below the waist. Server must stand in the correct service court and serve diagonally.",
      "Scoring: Rally scoring (a point is scored on every serve, regardless of who serves).",
    ],
    fouls: [
      "Service Fault: Striking the shuttlecock above the waist or stepping on boundary lines while serving.",
      "Net Touch: Touching the net with the racket or body while the shuttlecock is in play.",
      "Double Hit: Hitting the shuttlecock twice in a row by the same player or team.",
      "Out of Bounds: The shuttlecock landing outside the court boundaries.",
    ],
  },
  {
    id: "chess",
    name: "Chess",
    emoji: "♟",
    type: "individual",
    date: "24 March 2026",
    time: "2:00 PM - 4:00 PM",
    image: "event-chess",
    poster: posterChess,
    whatsappLink: "https://chat.whatsapp.com/J0teu29xJmiJmZUe4czPeC?mode=gi_t",
    facultyIncharges: ["Sh. Deepak Sharma", "Dr. Kaushal Mehta"],
    captains: [
      { name: "Mehul", role: "Captain", program: "B.Tech AI", phone: "9560014212" },
    ],
    generalRules: [
      "Time Control: Matches will be played with a clock (e.g., 10 minutes per player for rapid matches).",
      "Touch-Move Rule: If a player intentionally touches one of their pieces, they must move it (if a legal move exists).",
      "Winning: Checkmate, opponent's resignation, or opponent's time running out.",
    ],
    fouls: [
      "Illegal Move: Making a move that violates the rules of chess.",
      "Clock Foul: Forgetting to press the clock, or using the wrong hand to press the clock.",
      "Note: Making two illegal moves in a single game usually results in an automatic loss.",
    ],
  },
  {
    id: "carrom",
    name: "Carrom",
    emoji: "🎯",
    type: "individual",
    date: "25 March 2026",
    time: "TBD",
    image: "event-carrom",
    poster: posterCarrom,
    whatsappLink: "https://chat.whatsapp.com/HwiyFb3MK659Z0kqLxCBXc?mode=gi_t",
    facultyIncharges: ["Dr. Mamta Mittal"],
    captains: [
      { name: "TBD", role: "Captain", program: "To be decided", phone: "-" },
    ],
    generalRules: [
      "Breaking: The first player breaks the center cluster. If no coins leave the center circle, the turn passes.",
      "The Queen: The Red Queen can be pocketed any time after a player has pocketed at least one of their own pieces.",
      "Covering the Queen: To claim the Queen, the player must immediately pocket one of their own coins on the very next shot.",
    ],
    fouls: [
      "Striker Foul: Pocketing the striker costs the player one coin and loss of turn.",
      "Line Foul: The striker must be placed touching both baselines; it cannot cut the diagonal arrows.",
      "Board Touch: Touching any coins on the board with fingers or body during a shot.",
    ],
  },
  {
    id: "table-tennis",
    name: "Table Tennis",
    emoji: "🏓",
    type: "individual",
    date: "24 March 2026",
    time: "2:00 PM - 4:00 PM",
    image: "event-tabletennis",
    poster: posterTableTennis,
    whatsappLink: "https://chat.whatsapp.com/GyPVMfXNyRmFJKusx37d2C?mode=gi_t",
    facultyIncharges: ["Dr. P. Preeti Bedi", "Sh. Chitre"],
    captains: [
      { name: "Abhinandan", role: "Captain", program: "BFSI", phone: "6307567506" },
    ],
    generalRules: [
      "Scoring: Matches are played to 11 points (must win by 2). Best-of-3 or Best-of-5 games.",
      "Serving: Ball must rest on open palm, tossed vertically at least 6 inches and struck so it bounces once on each side.",
      "Alternating Serves: Each player serves twice in a row, then the serve switches.",
    ],
    fouls: [
      "Table Touch: Touching the playing surface with the free hand while the ball is in play.",
      "Hidden Serve: Hiding the ball with the body or arm during the serve.",
      "Volleying: Hitting the ball before it bounces on your side of the table.",
    ],
  },
  {
    id: "tug-of-war",
    name: "Tug of War",
    emoji: "🪢",
    type: "team",
    date: "25 March 2026",
    time: "1:00 PM",
    image: "event-tugofwar",
    poster: posterTugOfWar,
    whatsappLink: "https://chat.whatsapp.com/LlHnyU6JZFs8I7Mq6iUIuJ?mode=gi_t",
    facultyIncharges: ["Sh. J.R. Bhowate", "Dr. Preeti Bedi"],
    captains: [
      { name: "TBD", role: "Captain", program: "To be decided", phone: "-" },
    ],
    generalRules: [
      "Team Size: Typically 8 to 10 players per team. Both teams must have an equal number of participants.",
      "The Pull: Teams hold the rope tight. The referee blows the whistle to start.",
      "Winning: A team wins when they pull the rope so the center marker crosses their winning line.",
    ],
    fouls: [
      "Locking/Wrapping: Wrapping the rope around the arms, waist, or hands is not allowed.",
      "Sitting/Falling: Intentionally sitting on the ground or falling to hold ground. Players must remain on their feet.",
      "Footwear Foul: Wearing spikes or cleats is strictly prohibited; only standard sports shoes are allowed.",
    ],
  },
  {
    id: "football",
    name: "Football",
    emoji: "⚽",
    type: "team",
    date: "25 March 2026",
    time: "11:00 AM - 1:00 PM",
    image: "event-football",
    poster: posterFootball,
    whatsappLink: "https://chat.whatsapp.com/IZWg4grwQlLJeqqe1lbLK3?mode=gi_t",
    facultyIncharges: ["Sh. J.R. Bhowate"],
    captains: [
      { name: "Sahil", role: "Captain", program: "BFSI", phone: "6203486221" },
      { name: "Manish", role: "Vice Captain", program: "B.Tech AI", phone: "9560316352" },
    ],
    generalRules: [
      "Standard 5-a-side or 7-a-side rules apply depending on ground availability.",
      "Match duration will be decided by officials on the day.",
      "Offside rule may or may not be applied based on officials' discretion.",
      "All participants must follow fair play and sportsmanship.",
    ],
    fouls: [
      "Handball: Intentionally touching the ball with hands or arms.",
      "Dangerous play: Any action that endangers an opponent.",
      "Unsporting behaviour may lead to yellow or red card.",
      "Decisions of referees/officials are final.",
    ],
  },
];

export const generalRulesForAll = [
  "All participants must follow fair play and sportsmanship.",
  "Decisions of referees/officials are final.",
  "Misconduct may lead to disqualification.",
  "Proper sports attire is required.",
  "Matches must start on time.",
  "Any disputes should be reported to organizers immediately.",
];
