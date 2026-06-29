// Spark the Robot mascot — pure SVG, no external assets needed
export default function Mascot({ mood = 'idle', size = 100 }) {
  const moods = {
    idle:       { body: '#6366f1', eye: '#fff', mouth: 'M38,60 Q50,68 62,60', arm: 0 },
    happy:      { body: '#22c55e', eye: '#fff', mouth: 'M36,58 Q50,72 64,58', arm: 15 },
    celebrate:  { body: '#f59e0b', eye: '#fff', mouth: 'M34,56 Q50,74 66,56', arm: 30 },
    encourage:  { body: '#3b82f6', eye: '#fff', mouth: 'M38,60 Q50,65 62,60', arm: -10 },
    thinking:   { body: '#8b5cf6', eye: '#fff', mouth: 'M40,62 Q50,60 60,62', arm: 0 },
  }
  const m = moods[mood] || moods.idle
  const s = size

  return (
    <svg width={s} height={s * 1.2} viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" aria-label="Spark the Robot mascot">
      {/* Antenna */}
      <line x1="50" y1="8" x2="50" y2="20" stroke={m.body} strokeWidth="3" strokeLinecap="round"/>
      <circle cx="50" cy="6" r="4" fill="#fbbf24"/>
      {/* Head */}
      <rect x="22" y="20" width="56" height="48" rx="14" fill={m.body}/>
      {/* Eyes */}
      <circle cx="37" cy="40" r="8" fill={m.eye}/>
      <circle cx="63" cy="40" r="8" fill={m.eye}/>
      <circle cx="37" cy="40" r="4" fill="#1e1b4b"/>
      <circle cx="63" cy="40" r="4" fill="#1e1b4b"/>
      <circle cx="38.5" cy="38.5" r="1.5" fill="#fff"/>
      <circle cx="64.5" cy="38.5" r="1.5" fill="#fff"/>
      {/* Mouth */}
      <path d={m.mouth} fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
      {/* Body */}
      <rect x="30" y="70" width="40" height="34" rx="10" fill={m.body}/>
      {/* Belly screen */}
      <rect x="37" y="76" width="26" height="18" rx="5" fill="#1e1b4b" opacity="0.4"/>
      <circle cx="44" cy="85" r="3" fill="#34d399" opacity="0.9"/>
      <circle cx="56" cy="85" r="3" fill="#fbbf24" opacity="0.9"/>
      {/* Left arm */}
      <rect
        x="14" y="72" width="16" height="8" rx="4" fill={m.body}
        transform={`rotate(${-m.arm}, 22, 76)`}
      />
      {/* Right arm */}
      <rect
        x="70" y="72" width="16" height="8" rx="4" fill={m.body}
        transform={`rotate(${m.arm}, 78, 76)`}
      />
      {/* Legs */}
      <rect x="34" y="103" width="12" height="14" rx="5" fill={m.body}/>
      <rect x="54" y="103" width="12" height="14" rx="5" fill={m.body}/>
    </svg>
  )
}
