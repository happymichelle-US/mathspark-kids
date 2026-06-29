import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const today = () => new Date().toDateString()

const defaultProgress = () => ({
  grade: null,
  xp: 0,
  stars: 0,
  badges: [],
  streak: 0,
  lastSessionDate: null,
  topicData: {}, // topicId -> { tier, accuracy, sessions, weakSkill }
  wordProblemCount: 0,
})

export const useStore = create(
  persist(
    (set, get) => ({
      // ── Learner state ──────────────────────────────────────────────────────
      ...defaultProgress(),

      // ── Session state (not persisted beyond session) ───────────────────────
      session: null,

      setGrade: (grade) => set({ grade }),

      startSession: (topicId, grade) => {
        const { topicData } = get()
        const td = topicData[topicId] || { tier: 1, accuracy: [], sessions: 0 }
        set({
          session: {
            topicId,
            grade,
            tier: td.tier,
            problems: [],
            current: 0,
            total: 10,
            correct: 0,
            attempts: 0,
            startTime: Date.now(),
            paused: false,
            complete: false,
            retryAllowed: true,
          },
        })
      },

      recordAnswer: (correct, assisted) => {
        const s = get().session
        if (!s) return
        const problems = [
          ...s.problems,
          { correct, assisted, time: Date.now() - s.startTime },
        ]
        const nextCorrect = s.correct + (correct ? 1 : 0)
        const nextAttempts = s.attempts + 1
        const complete = nextAttempts >= s.total

        set({ session: { ...s, problems, correct: nextCorrect, attempts: nextAttempts, retryAllowed: !correct, complete } })

        if (complete) get()._finalizeSession()
      },

      allowRetry: () => set(st => ({ session: { ...st.session, retryAllowed: false } })),

      pauseSession: () => set(st => ({ session: { ...st.session, paused: !st.session.paused } })),

      _finalizeSession: () => {
        const { session, topicData, xp, stars, streak, lastSessionDate, badges, wordProblemCount } = get()
        if (!session) return

        const accuracy = session.correct / session.total
        const sessionXp = session.problems.reduce((sum, p) => sum + (p.correct ? (p.assisted ? 5 : 10) : 0), 0)
        const sessionStars = accuracy >= 0.9 ? 3 : accuracy >= 0.75 ? 2 : accuracy >= 0.6 ? 1 : 0

        // Update streak
        const todayStr = today()
        const newStreak = lastSessionDate === todayStr
          ? streak
          : (lastSessionDate === new Date(Date.now() - 86400000).toDateString() ? streak + 1 : 1)

        // Update topic data
        const td = topicData[session.topicId] || { tier: 1, accuracy: [], sessions: 0 }
        const accHistory = [...(td.accuracy || []), accuracy].slice(-5)
        const avgAcc = accHistory.reduce((s, v) => s + v, 0) / accHistory.length

        let newTier = td.tier
        if (avgAcc >= 0.8 && td.tier < 3) newTier = td.tier + 1
        else if (avgAcc < 0.6 && td.tier > 1) newTier = td.tier - 1

        const newTopicData = {
          ...topicData,
          [session.topicId]: {
            tier: newTier,
            accuracy: accHistory,
            sessions: (td.sessions || 0) + 1,
            weakSkill: avgAcc < 0.6,
            mastered: avgAcc >= 0.85 && accHistory.length >= 3,
          },
        }

        // Check badges
        const newBadges = [...badges]
        const addBadge = (id) => { if (!newBadges.includes(id)) newBadges.push(id) }

        if (accuracy === 1) {
          if (['add20','add100','add100r','add1000','add1000r'].includes(session.topicId)) addBadge('addition_ace')
          if (['sub20','sub100','sub1000'].includes(session.topicId)) addBadge('subtraction_star')
        }
        if (newTopicData['mult3']?.mastered) addBadge('times_titan')
        if (newTopicData['frac3']?.mastered) addBadge('fraction_friend')
        if (['time1','time2','time3'].some(t => newTopicData[t]?.mastered)) addBadge('clock_watcher')
        if (newTopicData['money2']?.mastered) addBadge('money_maestro')
        if (newStreak >= 7) addBadge('streak_7')

        const wpTopics = ['word2', 'word3']
        const newWpCount = wordProblemCount + (wpTopics.includes(session.topicId) ? session.correct : 0)
        if (newWpCount >= 100) addBadge('problem_solver')

        set({
          xp: xp + sessionXp,
          stars: stars + sessionStars,
          streak: newStreak,
          lastSessionDate: todayStr,
          topicData: newTopicData,
          badges: newBadges,
          wordProblemCount: newWpCount,
          session: {
            ...session,
            complete: true,
            sessionXp,
            sessionStars,
            accuracy,
            newBadges: newBadges.filter(b => !badges.includes(b)),
            weakSkills: Object.entries(newTopicData)
              .filter(([, v]) => v.weakSkill)
              .map(([k]) => k)
              .slice(0, 2),
          },
        })
      },

      endSession: () => set({ session: null }),

      resetProgress: () => set(defaultProgress()),
    }),
    {
      name: 'mathspark-progress',
      partialize: (state) => {
        const { session, ...rest } = state
        return rest
      },
    }
  )
)
