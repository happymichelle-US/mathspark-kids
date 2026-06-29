import { useStore } from '../store/useStore'
import { TOPICS, BADGES } from '../data/curriculum'

export default function Dashboard({ onClose }) {
  const { xp, stars, streak, badges, topicData, grade, resetProgress } = useStore()
  const allTopics = Object.values(TOPICS).flat()

  const getColor = (topicId) => {
    const td = topicData[topicId]
    if (!td?.accuracy?.length) return 'bg-gray-100 text-gray-400'
    const avg = td.accuracy.reduce((s, v) => s + v, 0) / td.accuracy.length
    if (td.mastered || avg >= 0.85) return 'bg-green-200 text-green-800'
    if (avg >= 0.6) return 'bg-yellow-200 text-yellow-800'
    return 'bg-red-200 text-red-800'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onClose} className="text-3xl hover:scale-110 transition-transform" aria-label="Close">←</button>
          <h2 className="text-3xl font-extrabold text-indigo-700">📊 My Progress</h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 text-center shadow">
            <div className="text-3xl font-extrabold text-yellow-500">{stars}</div>
            <div className="text-sm text-gray-500 mt-1">⭐ Stars</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow">
            <div className="text-3xl font-extrabold text-indigo-500">{xp}</div>
            <div className="text-sm text-gray-500 mt-1">✨ XP</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow">
            <div className="text-3xl font-extrabold text-orange-500">{streak}</div>
            <div className="text-sm text-gray-500 mt-1">🔥 Day Streak</div>
          </div>
        </div>

        {/* Topic accuracy */}
        <div className="bg-white rounded-2xl shadow p-5 mb-5">
          <h3 className="font-extrabold text-indigo-700 text-lg mb-3">Topic Progress</h3>
          <div className="grid grid-cols-2 gap-2">
            {allTopics.map(t => (
              <div key={t.id} className={`rounded-xl px-3 py-2 text-sm font-semibold flex items-center gap-2 ${getColor(t.id)}`}>
                <span>{t.emoji}</span>
                <span className="truncate">{t.label}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-3 text-xs text-gray-400 font-medium">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-300 inline-block"/> ≥85% Mastered</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-300 inline-block"/> 60–84%</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-300 inline-block"/> &lt;60%</span>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl shadow p-5 mb-5">
          <h3 className="font-extrabold text-indigo-700 text-lg mb-3">Badges</h3>
          <div className="grid grid-cols-3 gap-3">
            {BADGES.map(b => (
              <div
                key={b.id}
                className={`rounded-2xl p-3 text-center ${badges.includes(b.id) ? 'bg-purple-100' : 'bg-gray-50 opacity-40'}`}
                title={b.desc}
                aria-label={`${b.label}: ${badges.includes(b.id) ? 'earned' : 'not yet earned'}`}
              >
                <div className="text-3xl">{b.emoji}</div>
                <div className="text-xs font-bold text-purple-700 mt-1 leading-tight">{b.label.split(' ')[0]} {b.label.split(' ')[1]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reset */}
        <div className="text-center">
          <button
            onClick={() => { if (confirm('Reset all progress? This cannot be undone.')) resetProgress() }}
            className="text-red-400 text-sm underline hover:text-red-600"
          >
            Reset all progress
          </button>
        </div>
      </div>
    </div>
  )
}
