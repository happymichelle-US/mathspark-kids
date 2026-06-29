import { useState } from 'react'
import { useStore } from './store/useStore'
import GradeSelect from './screens/GradeSelect'
import TopicSelect from './screens/TopicSelect'
import PracticeSession from './screens/PracticeSession'
import SessionSummary from './screens/SessionSummary'
import Dashboard from './screens/Dashboard'

export default function App() {
  const { grade: savedGrade, setGrade } = useStore()
  const [screen, setScreen] = useState('grade')
  const [selectedGrade, setSelectedGrade] = useState(savedGrade)
  const [selectedTopic, setSelectedTopic] = useState(null)

  const handleGradeSelect = (g) => {
    setSelectedGrade(g)
    setGrade(g)
    setScreen('topics')
  }

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId)
    setScreen('session')
  }

  const handleSessionComplete = () => setScreen('summary')

  const handleHome = () => {
    setSelectedTopic(null)
    setScreen('grade')
  }

  const handlePlayAgain = () => {
    setScreen('session')
  }

  return (
    <div className="font-sans">
      {screen !== 'session' && (
        <button
          onClick={() => setScreen(screen === 'dashboard' ? 'grade' : 'dashboard')}
          aria-label="Open progress dashboard"
          className="fixed top-4 right-4 z-50 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-2xl hover:scale-110 transition-transform"
        >
          📊
        </button>
      )}

      {screen === 'grade' && (
        <GradeSelect onSelect={handleGradeSelect} />
      )}

      {screen === 'topics' && selectedGrade && (
        <TopicSelect
          grade={selectedGrade}
          onSelect={handleTopicSelect}
          onBack={() => setScreen('grade')}
        />
      )}

      {screen === 'session' && selectedTopic && selectedGrade && (
        <PracticeSession
          key={`${selectedTopic}-${Date.now()}`}
          topicId={selectedTopic}
          grade={selectedGrade}
          onComplete={handleSessionComplete}
          onExit={handleHome}
        />
      )}

      {screen === 'summary' && (
        <SessionSummary
          grade={selectedGrade}
          onHome={handleHome}
          onPlayAgain={handlePlayAgain}
        />
      )}

      {screen === 'dashboard' && (
        <Dashboard onClose={() => setScreen('grade')} />
      )}
    </div>
  )
}
