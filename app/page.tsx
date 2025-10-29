'use client'

import { useState, useEffect, useRef } from 'react'

interface Session {
  id: string
  title: string
  duration: number
  type: 'meditation' | 'breathing' | 'sleep'
  color: string
  icon: string
}

const sessions: Session[] = [
  { id: '1', title: 'Morning Peace', duration: 10, type: 'meditation', color: 'from-orange-400 to-pink-500', icon: '🌅' },
  { id: '2', title: 'Deep Breathing', duration: 5, type: 'breathing', color: 'from-blue-400 to-teal-500', icon: '💨' },
  { id: '3', title: 'Stress Relief', duration: 15, type: 'meditation', color: 'from-purple-400 to-pink-500', icon: '🧘‍♀️' },
  { id: '4', title: 'Sleep Sounds', duration: 20, type: 'sleep', color: 'from-indigo-500 to-purple-600', icon: '🌙' },
  { id: '5', title: 'Focus Flow', duration: 12, type: 'meditation', color: 'from-teal-400 to-blue-500', icon: '🎯' },
  { id: '6', title: 'Box Breathing', duration: 8, type: 'breathing', color: 'from-cyan-400 to-blue-500', icon: '⬜' },
]

export default function Home() {
  const [activeSession, setActiveSession] = useState<Session | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const breathIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsPlaying(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying, timeLeft])

  useEffect(() => {
    if (isPlaying && activeSession?.type === 'breathing') {
      const phases: Array<'inhale' | 'hold' | 'exhale' | 'pause'> = ['inhale', 'hold', 'exhale', 'pause']
      let currentPhaseIndex = 0

      breathIntervalRef.current = setInterval(() => {
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length
        setBreathPhase(phases[currentPhaseIndex])
      }, 4000)
    }
    return () => {
      if (breathIntervalRef.current) clearInterval(breathIntervalRef.current)
    }
  }, [isPlaying, activeSession])

  const startSession = (session: Session) => {
    setActiveSession(session)
    setTimeLeft(session.duration * 60)
    setIsPlaying(true)
    setBreathPhase('inhale')
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const stopSession = () => {
    setActiveSession(null)
    setTimeLeft(0)
    setIsPlaying(false)
    setBreathPhase('inhale')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getBreathPhaseText = () => {
    switch (breathPhase) {
      case 'inhale': return 'Breathe In'
      case 'hold': return 'Hold'
      case 'exhale': return 'Breathe Out'
      case 'pause': return 'Pause'
    }
  }

  if (activeSession) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br ${activeSession.color} transition-all duration-1000`}>
        <button
          onClick={stopSession}
          className="absolute top-8 left-6 text-white/90 text-4xl hover:scale-110 transition-transform"
        >
          ×
        </button>

        <div className="text-center">
          <div className="text-8xl mb-8 animate-pulse">{activeSession.icon}</div>
          <h1 className="text-4xl font-bold text-white mb-4 text-shadow">{activeSession.title}</h1>

          {activeSession.type === 'breathing' && (
            <div className="mb-8">
              <div className={`text-2xl font-semibold text-white/90 mb-6 transition-all duration-500 ${
                breathPhase === 'inhale' ? 'scale-110' : breathPhase === 'exhale' ? 'scale-90' : 'scale-100'
              }`}>
                {getBreathPhaseText()}
              </div>
              <div className={`w-32 h-32 mx-auto rounded-full bg-white/30 transition-all duration-4000 ${
                breathPhase === 'inhale' ? 'scale-150' : breathPhase === 'exhale' ? 'scale-75' : 'scale-100'
              }`} style={{ transitionDuration: '4000ms' }} />
            </div>
          )}

          <div className="text-7xl font-light text-white mb-12 tabular-nums">
            {formatTime(timeLeft)}
          </div>

          <div className="flex gap-6 justify-center">
            <button
              onClick={togglePlayPause}
              className="w-20 h-20 rounded-full bg-white/30 ios-blur flex items-center justify-center text-white text-3xl hover:bg-white/40 active:scale-95 transition-all"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button
              onClick={stopSession}
              className="w-20 h-20 rounded-full bg-white/30 ios-blur flex items-center justify-center text-white text-3xl hover:bg-white/40 active:scale-95 transition-all"
            >
              ⏹
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen px-6 py-12 pb-24">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-ios-blue to-ios-purple bg-clip-text text-transparent mb-3">
            Mindful
          </h1>
          <p className="text-gray-600 text-lg">Find your inner peace</p>
        </header>

        <div className="ios-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Daily Streak</p>
              <p className="text-3xl font-bold text-ios-blue">7 Days 🔥</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Total Time</p>
              <p className="text-3xl font-bold text-ios-purple">2.5 hrs</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 px-2">Quick Sessions</h2>
        </div>

        <div className="grid gap-4">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => startSession(session)}
              className="ios-card p-6 hover:scale-[1.02] active:scale-[0.98] transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${session.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                    {session.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{session.title}</h3>
                    <p className="text-sm text-gray-500">{session.duration} minutes</p>
                  </div>
                </div>
                <div className="text-ios-blue text-2xl">›</div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 ios-card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Today's Tip</h3>
          <p className="text-gray-600 leading-relaxed">
            Try meditation in the morning to set a positive tone for your day. Even 5 minutes can make a difference.
          </p>
        </div>
      </div>
    </main>
  )
}
