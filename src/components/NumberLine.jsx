export default function NumberLine({ start, end, mark, jump }) {
  const w = 300, h = 60, pad = 20
  const range = end - start
  const toX = n => pad + ((n - start) / range) * (w - pad * 2)
  const markX = toX(mark)
  const jumpEnd = toX(mark + jump)

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-label="Number line hint">
      <line x1={pad} y1={h/2} x2={w-pad} y2={h/2} stroke="#6366f1" strokeWidth="2"/>
      {Array.from({ length: end - start + 1 }, (_, i) => {
        const x = toX(start + i)
        return (
          <g key={i}>
            <line x1={x} y1={h/2-5} x2={x} y2={h/2+5} stroke="#6366f1" strokeWidth="1.5"/>
            <text x={x} y={h/2+18} textAnchor="middle" fontSize="9" fill="#4f46e5">{start + i}</text>
          </g>
        )
      })}
      {/* Jump arc */}
      <path
        d={`M ${markX} ${h/2-4} Q ${(markX+jumpEnd)/2} ${h/2-20} ${jumpEnd} ${h/2-4}`}
        fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2"
      />
      <circle cx={markX} cy={h/2} r="5" fill="#f59e0b"/>
      <circle cx={jumpEnd} cy={h/2} r="5" fill="#22c55e"/>
    </svg>
  )
}
