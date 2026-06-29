import { useStore } from '../store/useStore'
import { TOPICS } from '../data/curriculum'
import Mascot from '../components/Mascot'

export default function SessionSummary({ grade, onHome, onPlayAgain }) {
  const { session, endSession } = useStore()

  if (!session?.complete) return null

  const { sessionStars, sessionXp, correct, total, weakSkills, newBadges } = session
  const accuracy = Math.round((correct / total) * 100)

  const stars = sessionStars || 0
  const allTopics = Object.values(TOPICS).flat()
  const weakLabels = (weakSkills || []).map(id => allTopics.find(t => t.id === id)?.label).filter(Boolean)

  const handleHome = () => { endSession(); onHome() }
  const handleAgain = () => { endSession(); onPlayAgain() }

  const starColor = (i) => i <= stars ? 'text-yellow-400' : 'text-gray-200'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-purple-50 p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
        {/* Mascot */}
        <div className="flex justify-center mb-2">
          <Mascot mood={stars >= 3 ? 'celebrate' : stars >= 2 ? 'happy' : 'encourage'} size={100}/>
        </div>

        <h2 className="text-3xl font-extrabold text-indigo-700 mb-1">Session Complete!</h2>

        {/* Stars */}
        <div className="flex justify-center gap-2 text-5xl my-4">
          {[1,2,3].map(i => (
            <span key={i} className={`transition-all ${starColor(i)} ${i <= stars ? 'scale-110' : 'opacity-40'}`}>
              ⭐
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 my-5">
          <div className="bg-green-50 rounded-2xl p-3">
            <div className="text-2xl font-extrabold text-green-600">{correct}/{total}</div>
            <div className="text-xs text-green-500 font-medium mt-0.5">Correct</div>
          </div>
          <div className="bg-indigo-50 rounded-2xl p-3">
            <div className="text-2xl font-extrabold text-indigo-600">{accuracy}%</div>
            <div className="text-xs text-indigo-500 font-medium mt-0.5">Accuracy</div>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-3">
            <div className="text-2xl font-extrabold text-yellow-600">+{sessionXp}</div>
            <div className="text-xs text-yellow-500 font-medium mt-0.5">XP earned</div>
          </div>
        </div>

        {/* New badges */}
        {newBadges?.length > 0 && (
          <div className="bg-purple-50 rounded-2xl p-4 mb-4 border-2 border-purple-200">
            <div className="font-bold text-purple-700 mb-1">🎖️ New Badge{newBadges.length > 1 ? 's' : ''} Earned!</div>
            {newBadges.map(b => (
              <div key={b} className="text-purple-600 text-sm">{b.replace(/_/g, ' ')}</div>
            ))}
          </div>
        )}

        {/* Weak skills */}
        {weakLabels.length > 0 && (
          <div className="bg-orange-50 rounded-2xl p-4 mb-4 border-2 border-orange-200 text-left">
            <div className="font-bold text-orange-700 mb-1">💪 Keep practicing:</div>
            {weakLabels.map(l => (
              <div key={l} className="text-orange-600 text-sm">• {l}</div>
            ))}
          </div>
        )}

        {/* Message */}
        <p className="text-gray-500 text-sm mb-5">
          {stars === 3 ? "Outstanding work! You're a math superstar! 🚀"
           : stars === 2 ? "Great job! Keep practicing to earn 3 stars! 💪"
           : stars === 1 ? "Good effort! Every practice makes you stronger! 🌱"
           : "Nice try! Practice makes perfect — you've got this! ❤️"}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleAgain}
            className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl text-lg transition-all active:scale-95"
          >
            Play Again 🔄
          </button>
          <button
            onClick={handleHome}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-2xl text-lg transition-all active:scale-95"
          >
            Home 🏠
          </button>
        </div>
      </div>
    </div>
  )
}
