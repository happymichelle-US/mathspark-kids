import { useState, useEffect, useCallback } from 'react'
import { useStore } from '../store/useStore'
import { generateProblem } from '../engine/generators'
import Mascot from '../components/Mascot'
import Keypad from '../components/Keypad'
import AnalogClock from '../components/AnalogClock'
import NumberLine from '../components/NumberLine'

const ENCOURAGEMENTS = ['Amazing! 🎉', 'You got it! ⭐', 'Fantastic! 🌟', 'Keep it up! 💪', 'Brilliant! ✨', 'Superstar! 🚀']
const TRIES_AGAIN = ['Almost! Try once more 💭', 'So close! Give it another go 🤔', 'Great try! One more chance 💡']
const REVEALS = ['Nice effort! Here\'s the answer 🎓', 'Good try! Let\'s see the answer 📚', 'Almost there! The answer is 🌈']

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)] }

export default function PracticeSession({ topicId, grade, onComplete, onExit }) {
  const { session, startSession, recordAnswer, allowRetry, pauseSession } = useStore()

  const [problem, setProblem] = useState(null)
  const [fillInput, setFillInput] = useState('')
  const [feedback, setFeedback] = useState(null) // null | 'correct' | 'retry' | 'reveal'
  const [showHint, setShowHint] = useState(false)
  const [mascotMood, setMascotMood] = useState('idle')
  const [revealed, setRevealed] = useState(false)
  const [prevProblemKey, setPrevProblemKey] = useState(null)
  const [answered, setAnswered] = useState(0)

  const tier = session?.tier || 1

  const nextProblem = useCallback(() => {
    let p
    let key
    let tries = 0
    do {
      p = generateProblem(topicId, tier)
      key = JSON.stringify({ q: p?.question, a: p?.answer })
      tries++
    } while (key === prevProblemKey && tries < 10)
    setProblem(p)
    setPrevProblemKey(key)
    setFillInput('')
    setFeedback(null)
    setShowHint(false)
    setRevealed(false)
    setMascotMood('idle')
  }, [topicId, tier, prevProblemKey])

  useEffect(() => {
    startSession(topicId, grade)
  }, [topicId, grade])

  useEffect(() => {
    if (session && !session.complete && problem === null) {
      nextProblem()
    }
  }, [session])

  useEffect(() => {
    if (session?.complete) {
      onComplete()
    }
  }, [session?.complete])

  if (!session || !problem) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-indigo-600 animate-pulse">Loading... 🔢</div>
    </div>
  )

  const checkAnswer = (selected) => {
    const correct = String(selected).trim().toLowerCase() === String(problem.answer).trim().toLowerCase()
    const isRetry = feedback === 'retry'
    const assisted = showHint

    if (correct) {
      setFeedback('correct')
      setMascotMood('celebrate')
      setAnswered(n => n + 1)
      setTimeout(() => {
        recordAnswer(true, assisted)
        nextProblem()
      }, 1200)
    } else if (!isRetry && session.retryAllowed !== false) {
      setFeedback('retry')
      setMascotMood('encourage')
      allowRetry()
    } else {
      setFeedback('reveal')
      setRevealed(true)
      setMascotMood('thinking')
      setAnswered(n => n + 1)
      setTimeout(() => {
        recordAnswer(false, assisted)
        nextProblem()
      }, 2500)
    }
  }

  const handleMC = (choice) => {
    if (feedback) return
    checkAnswer(choice)
  }

  const handleFill = () => {
    if (!fillInput) return
    checkAnswer(fillInput)
  }

  const progress = (answered / session.total) * 100

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-blue-50">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 gap-2">
        <button
          onClick={onExit}
          aria-label="Exit session"
          className="text-gray-400 hover:text-red-400 text-2xl px-2"
        >✕</button>
        <div className="flex-1 mx-3">
          <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-indigo-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
              aria-label={`Progress: ${answered} of ${session.total}`}
            />
          </div>
          <div className="text-xs text-center text-gray-500 mt-0.5">
            {answered} / {session.total} problems
          </div>
        </div>
        <button
          onClick={pauseSession}
          aria-label={session.paused ? 'Resume' : 'Pause'}
          className="text-gray-400 hover:text-indigo-500 text-xl px-2"
        >
          {session.paused ? '▶' : '⏸'}
        </button>
      </div>

      {session.paused && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-10 text-center shadow-2xl">
            <div className="text-5xl mb-4">⏸</div>
            <div className="text-2xl font-bold text-indigo-700 mb-4">Paused</div>
            <button
              onClick={pauseSession}
              className="bg-indigo-500 text-white px-8 py-3 rounded-2xl text-xl font-bold hover:bg-indigo-600"
            >
              Continue ▶
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-4">
        {/* Mascot + feedback */}
        <div className="flex flex-col items-center">
          <Mascot mood={mascotMood} size={80}/>
          {feedback === 'correct' && (
            <div className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold text-lg mt-2 animate-bounce">
              {pickRandom(ENCOURAGEMENTS)}
            </div>
          )}
          {feedback === 'retry' && (
            <div className="bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full font-bold text-lg mt-2">
              {pickRandom(TRIES_AGAIN)}
            </div>
          )}
          {feedback === 'reveal' && (
            <div className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-bold text-lg mt-2">
              {pickRandom(REVEALS)}
            </div>
          )}
        </div>

        {/* Problem card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-md text-center">
          {/* Tier badge */}
          <div className="text-xs text-indigo-300 font-semibold mb-2 uppercase tracking-wide">
            {['', 'Starter', 'Builder', 'Challenge'][tier]}
          </div>

          {/* Clock visual */}
          {problem.isClockProblem && problem.clockTime && (
            <div className="flex justify-center mb-4">
              <AnalogClock hours={problem.clockTime.hours} mins={problem.clockTime.mins} size={130}/>
            </div>
          )}

          {/* Question — never show the spoiler display text for clock problems */}
          <div className="text-2xl font-extrabold text-gray-800 mb-4 leading-snug">
            {problem.isClockProblem ? problem.question : (problem.display || problem.question)}
          </div>

          {/* Reveal answer */}
          {revealed && (
            <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-3 mb-4 text-blue-800 font-bold text-xl">
              ✅ Answer: {problem.answer}
            </div>
          )}

          {/* Hint */}
          {showHint && !revealed && (
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-3 mb-4 text-yellow-800 text-sm font-medium">
              💡 {problem.hint}
              {problem.hintVisual === 'numberline' && problem.hintArgs && (
                <div className="flex justify-center mt-2">
                  <NumberLine {...problem.hintArgs}/>
                </div>
              )}
            </div>
          )}

          {/* Answer input */}
          {!feedback || feedback === 'retry' ? (
            <div>
              {problem.type === 'mc' && (
                <div className="grid grid-cols-2 gap-3">
                  {(problem.choices || []).map((c, i) => (
                    <button
                      key={i}
                      onClick={() => handleMC(c)}
                      disabled={!!feedback && feedback !== 'retry'}
                      aria-label={`Answer option: ${c}`}
                      className="bg-indigo-100 hover:bg-indigo-200 active:scale-95 text-indigo-800 font-bold text-xl py-4 rounded-2xl transition-all min-h-[56px]"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
              {problem.type === 'fill' && (
                <div className="flex flex-col items-center gap-3">
                  <Keypad value={fillInput} onChange={setFillInput} onSubmit={handleFill}/>
                </div>
              )}
              {problem.type === 'tf' && (
                <div className="flex gap-4 justify-center">
                  {['True', 'False'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleMC(opt)}
                      className={`px-8 py-4 rounded-2xl font-bold text-xl text-white transition-all active:scale-95
                        ${opt === 'True' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-400 hover:bg-red-500'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Hint button */}
        {!showHint && !revealed && tier < 3 && problem.hint && (
          <button
            onClick={() => setShowHint(true)}
            aria-label="Show hint"
            className="text-yellow-600 underline text-sm font-medium hover:text-yellow-700"
          >
            💡 Need a hint?
          </button>
        )}

        {/* Score */}
        <div className="text-sm text-gray-400 font-medium">
          ✅ {session.correct} correct so far
        </div>
      </div>
    </div>
  )
}
