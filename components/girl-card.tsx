"use client"

import { useState, useEffect, useRef } from "react"
import { Heart, Sparkles, Camera, Check, Loader2 } from "lucide-react"
import { FloatingPetals, FlowerBouquet } from "./flower-animation"
import { Confetti } from "./confetti"

const wishes = [
  "Пусть каждый день приносит улыбку",
  "Пусть мечты сбываются легко",
  "Пусть весна живёт в твоём сердце",
  "Пусть счастье будет бесконечным",
  "Пусть любовь окружает тебя всегда",
]

export function GirlCard() {
  const [stage, setStage] = useState<"envelope" | "opening" | "card">("envelope")
  const [showConfetti, setShowConfetti] = useState(false)
  const [visibleWishes, setVisibleWishes] = useState(0)
  const [heartCount, setHeartCount] = useState(0)
  const [sendingLove, setSendingLove] = useState(false)
  const [photoSent, setPhotoSent] = useState(false)
  const [sendingPhoto, setSendingPhoto] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const openEnvelope = () => {
    setStage("opening")
    setTimeout(() => {
      setStage("card")
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }, 800)
  }

  useEffect(() => {
    if (stage === "card") {
      const interval = setInterval(() => {
        setVisibleWishes((prev) => {
          if (prev >= wishes.length) {
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, 600)
      return () => clearInterval(interval)
    }
  }, [stage])

  const sendLove = async () => {
    setHeartCount((p) => p + 1)
    setSendingLove(true)
    
    try {
      await fetch("/api/send-love", { method: "POST" })
    } catch {
      // Silent fail
    } finally {
      setSendingLove(false)
    }
  }

  const handlePhotoClick = () => {
    fileInputRef.current?.click()
  }

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSendingPhoto(true)
    
    try {
      const formData = new FormData()
      formData.append("photo", file)
      
      const response = await fetch("/api/send-photo", {
        method: "POST",
        body: formData
      })
      
      if (response.ok) {
        setPhotoSent(true)
      }
    } catch {
      // Silent fail
    } finally {
      setSendingPhoto(false)
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingPetals />
      <Confetti active={showConfetti} />

      {/* Envelope Stage */}
      {(stage === "envelope" || stage === "opening") && (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div
            className={`transition-all duration-800 ${
              stage === "opening"
                ? "scale-150 opacity-0"
                : "scale-100 opacity-100"
            }`}
          >
            <button
              onClick={openEnvelope}
              className="group relative cursor-pointer"
              aria-label="Открыть конверт"
            >
              {/* Envelope SVG */}
              <svg
                width="280"
                height="200"
                viewBox="0 0 280 200"
                fill="none"
                className="drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
              >
                {/* Envelope body */}
                <rect
                  x="10"
                  y="40"
                  width="260"
                  height="150"
                  rx="8"
                  fill="#fce7f3"
                  stroke="#f9a8d4"
                  strokeWidth="2"
                />
                {/* Flap */}
                <path
                  d="M10 48 L140 120 L270 48"
                  fill="#fdf2f8"
                  stroke="#f9a8d4"
                  strokeWidth="2"
                  className="transition-all duration-300 group-hover:-translate-y-2"
                />
                {/* Heart seal */}
                <circle cx="140" cy="80" r="20" fill="#f43f5e" className="transition-transform duration-300 group-hover:scale-110" />
                <Heart className="absolute" x="131" y="71" width="18" height="18" fill="white" stroke="white" />
              </svg>

              <p className="text-center mt-6 text-muted-foreground text-sm animate-pulse">
                Тыкай, чтобы открыть
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Card Stage */}
      {stage === "card" && (
        <div className="min-h-screen flex items-center justify-center px-4 py-16 animate-in fade-in duration-1000">
          <div className="max-w-lg w-full">
            {/* Main card */}
            <div className="relative bg-card rounded-3xl shadow-2xl shadow-primary/10 overflow-hidden border border-border">
              {/* Top decorative bar */}
              <div className="h-2 bg-primary" />

              <div className="p-8 md:p-12">
                {/* Flower */}
                <div className="flex justify-center mb-8 animate-in slide-in-from-bottom duration-700">
                  <FlowerBouquet className="w-32 h-40" />
                </div>

                {/* Title */}
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-center text-foreground mb-2 animate-in slide-in-from-bottom duration-700 delay-200">
                  С 8 Марта!
                </h1>

                <div className="flex justify-center gap-1 mb-8 animate-in fade-in duration-700 delay-300">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <Sparkles className="h-4 w-4 text-accent" />
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>

                {/* Message */}
                <div className="space-y-4 mb-8">
                  <p className="text-center text-foreground/90 text-lg leading-relaxed animate-in fade-in duration-700 delay-500">
                    Поздравляю тебя с этим прекрасным весенним
                    праздником! Ты делаешь этот мир ярче и теплее одним своим
                    присутствием
                  </p>
                  <p className="text-center text-foreground/80 leading-relaxed animate-in fade-in duration-700 delay-700">
                    Ты заслуживаешь всего самого лучшего
                    Становись с каждым днем всё лучше и лучше
                    Прям как винишко 🍷
                  </p>
                </div>

                {/* Wishes */}
                <div className="space-y-3 mb-8">
                  {wishes.map((wish, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 transition-all duration-500 ${
                        i < visibleWishes
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4"
                      }`}
                    >
                      <Heart className="h-4 w-4 text-primary flex-shrink-0" fill="currentColor" />
                      <span className="text-foreground/80">{wish}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive heart button */}
                <div className="text-center space-y-4">
                  <button
                    onClick={sendLove}
                    disabled={sendingLove}
                    className="group relative inline-flex items-center gap-2 cursor-pointer rounded-full bg-primary px-8 py-4 text-primary-foreground font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {sendingLove ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Heart className="h-5 w-5 transition-transform group-hover:scale-125" fill="currentColor" />
                    )}
                    <span>Отправить "ЛАЙК"</span>
                    {heartCount > 0 && (
                      <span className="ml-1 rounded-full bg-primary-foreground/20 px-2 py-0.5 text-xs">
                        {heartCount}
                      </span>
                    )}
                  </button>

                  {/* Photo upload button */}
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={handlePhotoClick}
                      disabled={sendingPhoto || photoSent}
                      className={`inline-flex items-center gap-2 cursor-pointer rounded-full px-6 py-3 font-medium transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed ${
                        photoSent 
                          ? "bg-green-500 text-white" 
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {sendingPhoto ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : photoSent ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Camera className="h-4 w-4" />
                      )}
                      <span>
                        {sendingPhoto ? "Отправка..." : photoSent ? "Фото отправлено!" : "Отправить фото с цветами"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Flying hearts */}
                {heartCount > 0 && (
                  <div className="pointer-events-none relative h-0">
                    {Array.from({ length: Math.min(heartCount, 20) }, (_, i) => (
                      <Heart
                        key={`heart-${heartCount}-${i}`}
                        className="absolute text-primary animate-float-heart"
                        style={{
                          left: `${30 + Math.random() * 40}%`,
                          bottom: "0",
                          animationDelay: `${i * 0.1}s`,
                          fontSize: `${14 + Math.random() * 10}px`,
                        }}
                        fill="currentColor"
                        size={16 + Math.random() * 12}
                      />
                    ))}
                  </div>
                )}

                {/* Signature */}
                <p className="text-center mt-8 text-muted-foreground font-serif italic text-lg">
                  С праздником!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
