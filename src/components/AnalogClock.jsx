export default function AnalogClock({ hours, mins, size = 120 }) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 4

  const hourAngle = ((hours % 12) + mins / 60) * 30 - 90
  const minAngle = mins * 6 - 90

  const toRad = deg => (deg * Math.PI) / 180
  const handEnd = (angle, length) => [
    cx + Math.cos(toRad(angle)) * length,
    cy + Math.sin(toRad(angle)) * length,
  ]

  const [hx, hy] = handEnd(hourAngle, r * 0.55)
  const [mx, my] = handEnd(minAngle, r * 0.78)

  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = toRad(i * 30 - 90)
    const x1 = cx + Math.cos(a) * (r - 8), y1 = cy + Math.sin(a) * (r - 8)
    const x2 = cx + Math.cos(a) * (r - 2), y2 = cy + Math.sin(a) * (r - 2)
    return { x1, y1, x2, y2, num: i === 0 ? 12 : i }
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={`Clock showing ${hours}:${String(mins).padStart(2,'0')}`}>
      <circle cx={cx} cy={cy} r={r} fill="#fff" stroke="#6366f1" strokeWidth="3"/>
      {ticks.map(({ x1, y1, x2, y2, num }) => (
        <g key={num}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6366f1" strokeWidth="2"/>
        </g>
      ))}
      {/* Hour hand */}
      <line x1={cx} y1={cy} x2={hx} y2={hy} stroke="#1e1b4b" strokeWidth="4" strokeLinecap="round"/>
      {/* Minute hand */}
      <line x1={cx} y1={cy} x2={mx} y2={my} stroke="#6366f1" strokeWidth="3" strokeLinecap="round"/>
      {/* Center */}
      <circle cx={cx} cy={cy} r="4" fill="#1e1b4b"/>
    </svg>
  )
}
