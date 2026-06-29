import { useStore } from '../store/useStore'
import { GRADES } from '../data/curriculum'
import Mascot from '../components/Mascot'

export default function GradeSelect({ onSelect }) {
  const { xp, stars, streak, grade: savedGrade } = useStore()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <Mascot mood="celebrate" size={110}/>
        <h1 className="text-5xl font-extrabold text-indigo-700 mt-3 drop-shadow">
          🔢 MathSpark Kids
        </h1>
        <p className="text-xl text-indigo-500 mt-1">Let's practice math today!</p>
      </div>

      {/* Stats bar */}
      {(xp > 0 || stars > 0) && (
        <div className="flex gap-6 mb-8 bg-white/70 rounded-2xl px-8 py-3 shadow text-lg font-bold text-indigo-700">
          <span>⭐ {stars} stars</span>
          <span>✨ {xp} XP</span>
          <span>🔥 {streak} day streak</span>
        </div>
      )}

      {/* Grade cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
        {GRADES.map(g => (
          <button
            key={g.id}
            onClick={() => onSelect(g.id)}
            aria-label={`Select ${g.label}`}
            className={`
              relative flex flex-col items-center p-8 rounded-3xl shadow-lg
              text-white font-extrabold text-2xl transition-transform hover:scale-105 active:scale-95
              ${g.color}
              ${savedGrade === g.id ? 'ring-4 ring-white ring-offset-2' : ''}
            `}
          >
            <span className="text-5xl mb-2">{g.emoji}</span>
            <span>{g.label}</span>
            <span className="text-sm font-semibold opacity-80 mt-1">{g.ages}</span>
            {savedGrade === g.id && (
              <span className="absolute top-2 right-3 text-xs bg-white/30 rounded-full px-2 py-0.5">
                My Grade
              </span>
            )}
          </button>
        ))}
      </div>

      <p className="mt-8 text-gray-500 text-sm">Choose your grade to start practicing!</p>
    </div>
  )
}
