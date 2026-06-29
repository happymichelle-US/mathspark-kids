import { useStore } from '../store/useStore'
import { TOPICS, GRADES } from '../data/curriculum'

export default function TopicSelect({ grade, onSelect, onBack }) {
  const { topicData } = useStore()
  const topics = TOPICS[grade] || []
  const gradeInfo = GRADES.find(g => g.id === grade)

  const getStatus = (topicId) => {
    const td = topicData[topicId]
    if (!td) return 'new'
    const avg = td.accuracy?.length
      ? td.accuracy.reduce((s, v) => s + v, 0) / td.accuracy.length
      : 0
    if (td.mastered) return 'mastered'
    if (avg >= 0.85) return 'green'
    if (avg >= 0.6) return 'yellow'
    if (avg > 0) return 'red'
    return 'new'
  }

  const statusStyles = {
    mastered: 'border-green-500 bg-green-50 ring-2 ring-green-400',
    green:    'border-green-400 bg-green-50',
    yellow:   'border-yellow-400 bg-yellow-50',
    red:      'border-red-400 bg-red-50',
    new:      'border-gray-200 bg-white',
  }

  const statusLabel = {
    mastered: '🌟 Mastered',
    green:    '✅ Great',
    yellow:   '📈 Learning',
    red:      '💪 Practice more',
    new:      '✨ New',
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      {/* Header */}
      <div className="flex items-center w-full max-w-2xl mb-6 gap-3">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="text-3xl hover:scale-110 transition-transform"
        >
          ←
        </button>
        <div>
          <h2 className="text-3xl font-extrabold text-indigo-700">
            {gradeInfo?.emoji} {gradeInfo?.label} Topics
          </h2>
          <p className="text-indigo-400">Pick a topic to practice!</p>
        </div>
      </div>

      {/* Topic grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {topics.map(topic => {
          const status = getStatus(topic.id)
          const td = topicData[topic.id]
          return (
            <button
              key={topic.id}
              onClick={() => onSelect(topic.id)}
              aria-label={`Practice ${topic.label}`}
              className={`
                flex items-center gap-4 p-5 rounded-2xl border-2 shadow-sm
                text-left font-bold text-gray-800 transition-transform hover:scale-[1.02] active:scale-100
                ${statusStyles[status]}
              `}
            >
              <span className="text-4xl">{topic.emoji}</span>
              <div className="flex-1">
                <div className="text-lg">{topic.label}</div>
                <div className="text-xs text-gray-500 font-normal mt-0.5">{topic.ccss}</div>
                <div className="text-xs font-semibold mt-1">{statusLabel[status]}</div>
                {td && (
                  <div className="text-xs text-gray-400 mt-0.5">
                    Tier {td.tier} · {td.sessions} session{td.sessions !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
