"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import Image from "next/image"
import { Volume2 } from "lucide-react"

interface ScreamerProps {
  onComplete: () => void
}

export function Screamer({ onComplete }: ScreamerProps) {
  const [stage, setStage] = useState<"bait" | "scare" | "done">("bait")
  const [countdown, setCountdown] = useState(3)
  const [showCountdown, setShowCountdown] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  const playScream = useCallback(() => {
    try {
      const ctx = new AudioContext()
      audioContextRef.current = ctx

      // Create a harsh, startling screech
      const oscillator1 = ctx.createOscillator()
      const oscillator2 = ctx.createOscillator()
      const oscillator3 = ctx.createOscillator()
      const gainNode = ctx.createGain()
      const distortion = ctx.createWaveShaper()

      // Create distortion curve
      const curve = new Float32Array(256)
      for (let i = 0; i < 256; i++) {
        const x = (i * 2) / 256 - 1
        curve[i] = ((3 + 20) * x * (Math.PI / 180)) / (Math.PI + 20 * Math.abs(x))
      }
      distortion.curve = curve

      // High pitch screech
      oscillator1.type = "sawtooth"
      oscillator1.frequency.setValueAtTime(800, ctx.currentTime)
      oscillator1.frequency.linearRampToValueAtTime(2000, ctx.currentTime + 0.1)
      oscillator1.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.5)

      // Low rumble
      oscillator2.type = "square"
      oscillator2.frequency.setValueAtTime(150, ctx.currentTime)
      oscillator2.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3)

      // Extra high screech
      oscillator3.type = "sawtooth"
      oscillator3.frequency.setValueAtTime(3000, ctx.currentTime)
      oscillator3.frequency.linearRampToValueAtTime(4000, ctx.currentTime + 0.2)
      oscillator3.frequency.linearRampToValueAtTime(2500, ctx.currentTime + 0.6)

      gainNode.gain.setValueAtTime(0.7, ctx.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.3)
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5)

      oscillator1.connect(distortion)
      oscillator2.connect(distortion)
      oscillator3.connect(distortion)
      distortion.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator1.start(ctx.currentTime)
      oscillator2.start(ctx.currentTime)
      oscillator3.start(ctx.currentTime)

      oscillator1.stop(ctx.currentTime + 1.5)
      oscillator2.stop(ctx.currentTime + 1.5)
      oscillator3.stop(ctx.currentTime + 1.5)
    } catch {
      // Audio not supported — still show visual scare
    }
  }, [])

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const handleClick = useCallback(() => {
    setShowCountdown(true)

    // Fake calm countdown
    let count = 3
    setCountdown(count)

    const interval = setInterval(() => {
      count--
      setCountdown(count)

      if (count <= 0) {
        clearInterval(interval)
        // SCREAMER
        setStage("scare")
        playScream()

        // End scare after 2.5 seconds
        setTimeout(() => {
          setStage("done")
          onComplete()
        }, 2500)
      }
    }, 1000)
  }, [playScream, onComplete])

  if (stage === "scare") {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center animate-screamer-flash">
        <div className="relative w-full h-full animate-screamer-shake">
          <Image
            src="/images/screamer.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        <style jsx>{`
          @keyframes screamer-shake {
            0%, 100% { transform: translate(0, 0) scale(1); }
            10% { transform: translate(-10px, -5px) scale(1.05); }
            20% { transform: translate(8px, 10px) scale(1.02); }
            30% { transform: translate(-12px, 5px) scale(1.06); }
            40% { transform: translate(10px, -8px) scale(1.03); }
            50% { transform: translate(-5px, 12px) scale(1.07); }
            60% { transform: translate(12px, -10px) scale(1.04); }
            70% { transform: translate(-8px, 8px) scale(1.05); }
            80% { transform: translate(5px, -12px) scale(1.03); }
            90% { transform: translate(-10px, 5px) scale(1.06); }
          }
          .animate-screamer-shake {
            animation: screamer-shake 0.15s ease-in-out infinite;
          }
          @keyframes screamer-flash {
            0%, 50%, 100% { background: black; }
            25%, 75% { background: #1a0000; }
          }
          .animate-screamer-flash {
            animation: screamer-flash 0.2s ease-in-out infinite;
          }
        `}</style>
      </div>
    )
  }

  // Bait stage - calm and inviting
  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Soft decorative elements */}
        <div className="mb-8 animate-in fade-in duration-1000">
          <div className="text-6xl md:text-7xl font-serif font-bold text-accent mb-2">8</div>
          <div className="text-2xl md:text-3xl font-serif text-background/80">Марта</div>
        </div>

        <div className="rounded-2xl bg-background/5 border border-background/10 p-8 mb-8 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-background mb-4 text-balance">
            Специальное поздравление
          </h2>
          <p className="text-background/60 leading-relaxed mb-6">
            Я подготовила для тебя особенное интерактивное поздравление с музыкой и эффектами.
          </p>

          <div className="flex items-center justify-center gap-2 rounded-xl bg-accent/20 px-4 py-3 mb-6">
            <Volume2 className="h-5 w-5 text-accent animate-pulse" />
            <span className="text-accent font-medium text-sm">
              Пожалуйста, включи звук для лучшего эффекта
            </span>
          </div>

          {!showCountdown ? (
            <button
              onClick={handleClick}
              className="cursor-pointer w-full rounded-xl bg-accent px-8 py-4 text-accent-foreground font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30 active:scale-95"
            >
              Начать поздравление
            </button>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <p className="text-background/50 text-sm">Загружаем поздравление...</p>
              <div className="text-6xl font-bold text-accent animate-pulse font-serif">
                {countdown}
              </div>
              <div className="w-48 h-1 rounded-full bg-background/10 overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <p className="text-background/20 text-xs">
          * Лучше всего смотреть на полном экране
        </p>
      </div>
    </div>
  )
}
