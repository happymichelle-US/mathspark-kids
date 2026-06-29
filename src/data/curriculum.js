export const GRADES = [
  { id: 1, label: 'Grade 1', emoji: '⭐', color: 'bg-yellow-400', ages: 'Ages 6–7' },
  { id: 2, label: 'Grade 2', emoji: '🌟', color: 'bg-green-400', ages: 'Ages 7–8' },
  { id: 3, label: 'Grade 3', emoji: '💫', color: 'bg-blue-400', ages: 'Ages 8–9' },
]

export const TOPICS = {
  1: [
    { id: 'add20', label: 'Addition within 20', emoji: '➕', ccss: '1.OA.C.6' },
    { id: 'sub20', label: 'Subtraction within 20', emoji: '➖', ccss: '1.OA.C.6' },
    { id: 'place1', label: 'Place Value (Tens & Ones)', emoji: '🔢', ccss: '1.NBT.B.2' },
    { id: 'add100', label: 'Addition within 100', emoji: '💯', ccss: '1.NBT.C.4' },
    { id: 'time1', label: 'Telling Time', emoji: '🕐', ccss: '1.MD.B.3' },
    { id: 'shapes1', label: 'Shapes & Geometry', emoji: '🔷', ccss: '1.G.A.1' },
    { id: 'compare1', label: 'Comparing Numbers', emoji: '⚖️', ccss: '1.NBT.B.3' },
  ],
  2: [
    { id: 'add100r', label: 'Addition within 100', emoji: '➕', ccss: '2.NBT.B.5' },
    { id: 'sub100', label: 'Subtraction within 100', emoji: '➖', ccss: '2.NBT.B.5' },
    { id: 'add1000', label: 'Addition within 1000', emoji: '💯', ccss: '2.NBT.B.7' },
    { id: 'place2', label: 'Place Value (Hundreds)', emoji: '🔢', ccss: '2.NBT.A.1' },
    { id: 'skip2', label: 'Skip Counting', emoji: '🦘', ccss: '2.NBT.A.2' },
    { id: 'odd2', label: 'Odd & Even Numbers', emoji: '🔄', ccss: '2.OA.C.3' },
    { id: 'time2', label: 'Telling Time', emoji: '🕐', ccss: '2.MD.C.7' },
    { id: 'money2', label: 'Money', emoji: '💰', ccss: '2.MD.C.8' },
    { id: 'word2', label: 'Word Problems', emoji: '📖', ccss: '2.OA.A.1' },
    { id: 'compare2', label: 'Comparing Numbers', emoji: '⚖️', ccss: '2.NBT.A.4' },
  ],
  3: [
    { id: 'mult3', label: 'Multiplication (0–10)', emoji: '✖️', ccss: '3.OA.A.1' },
    { id: 'div3', label: 'Division (0–10)', emoji: '➗', ccss: '3.OA.A.2' },
    { id: 'add1000r', label: 'Addition within 1000', emoji: '➕', ccss: '3.NBT.A.2' },
    { id: 'sub1000', label: 'Subtraction within 1000', emoji: '➖', ccss: '3.NBT.A.2' },
    { id: 'round3', label: 'Rounding', emoji: '🎯', ccss: '3.NBT.A.1' },
    { id: 'frac3', label: 'Fractions', emoji: '🍕', ccss: '3.NF.A.1' },
    { id: 'time3', label: 'Telling Time', emoji: '🕐', ccss: '3.MD.A.1' },
    { id: 'word3', label: 'Word Problems', emoji: '📖', ccss: '3.OA.D.8' },
    { id: 'shapes3', label: 'Shapes & Geometry', emoji: '🔷', ccss: '3.G.A.1' },
  ],
}

export const BADGES = [
  { id: 'addition_ace', label: 'Addition Ace ➕', desc: '100% accuracy on an addition session', emoji: '➕' },
  { id: 'subtraction_star', label: 'Subtraction Star ⭐', desc: '100% accuracy on a subtraction session', emoji: '⭐' },
  { id: 'times_titan', label: 'Times Table Titan ✖️', desc: 'Master all multiplication facts', emoji: '✖️' },
  { id: 'fraction_friend', label: 'Fraction Friend 🍕', desc: 'Master all fraction skills', emoji: '🍕' },
  { id: 'clock_watcher', label: 'Clock Watcher 🕐', desc: 'Master all time-telling skills', emoji: '🕐' },
  { id: 'money_maestro', label: 'Money Maestro 💰', desc: 'Master all money skills', emoji: '💰' },
  { id: 'streak_7', label: '7-Day Streak 🔥', desc: '7 consecutive days practiced', emoji: '🔥' },
  { id: 'problem_solver', label: 'Problem Solver 🧩', desc: 'Complete 100 word problems', emoji: '🧩' },
  { id: 'graduate', label: 'Grade Graduate 🎓', desc: 'All topics reach Mastery', emoji: '🎓' },
]
