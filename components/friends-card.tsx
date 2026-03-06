"use client"

import { useState, useEffect, useCallback } from "react"
import { AlertTriangle, Skull, ThumbsUp, PartyPopper, Beer, Flame } from "lucide-react"
import { Confetti } from "./confetti"
import { Screamer } from "./screamer"

const roasts = [
  {
    text: "Поздравляем с 8 марта! Да, вас тоже. Не спрашивайте почему",
    icon: AlertTriangle,
  },
  {
    text: "Сегодня единственный день, когда вам не стыдно дарить цветы.. Или, хотя бы маме позвоните, чтоли..",
    icon: Flame,
  },
  {
    text: "8 марта - это 8 марта, чего бубнеть то",
    icon: ThumbsUp,
  },
  {
    text: "С праздником! Надеемся, хоть кто-то из вас сегодня помоет посуду",
    icon: Skull,
  },
  {
    text: "Теперь у вас есть оправдание, почему вы не отвечали неделю - готовили подарок",
    icon: PartyPopper,
  },
]

const facts = [
  "92% парней покупают цветы в последний момент. Остальные 8% - это Виктор",
  "Среднестатистический мужик считает, что пиво и пильмени — это тоже романтика (пельмешки круто)",
  "Если ты прочитал это - значит у тебя ещё есть время купить подарок (мне)",
  "Факт: 8 марта - это праздник далеко не про женщин, собственно я по этому вас и поздравляю",
  "Напоминаю. Мамочку поздравь. И бабушку. И сестру. И коллегу. И соседку. И... ну ты понял",
  "Обнял, поднял, приподнял, Всё давайте, связь 🤙"
]

const survivalTips = [
  "Подарите хотя бы пылесос. Серьёзно",
  "«Ты и без подарка красивая» - тоже считаем подарком, все верно",
  "Если забыл купить цветы - скажи что они «эко-friendly» и ты спасаешь планету. ЙОУ",
  'Фраза «я думал 8 марта в апреле» - прокатит',
  "Лучший подарок - это тишина. Ваша. На весь день",
]

export function FriendsCard() {
  const [stage, setStage] = useState<"screamer" | "warning" | "card">("screamer")
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentRoast, setCurrentRoast] = useState(0)
  const [showFacts, setShowFacts] = useState(false)
  const [showTips, setShowTips] = useState(false)
  const [panicClicks, setPanicClicks] = useState(0)
  const [shakeScreen, setShakeScreen] = useState(false)

  const enter = () => {
    setStage("card")
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  useEffect(() => {
    if (stage === "card") {
      const interval = setInterval(() => {
        setCurrentRoast((prev) => (prev + 1) % roasts.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [stage])

  const handlePanic = useCallback(() => {
    setPanicClicks((p) => p + 1)
    setShakeScreen(true)
    setTimeout(() => setShakeScreen(false), 500)
  }, [])

  const panicMessages = [
    "ПАНИКА НЕ ПОМОЖЕТ",
    "БЕГОМ В МАГАЗИН",
    "ЕЩЁ МОЖНО УСПЕТЬ",
    "ХОТЯ, НАВЕРНОЕ, УЖЕ НЕТ",
    "ЗАКАЖИ ДОСТАВКУ",
    "ИЛИ НАРИСУЙ ОТКРЫТКУ",
    "ГЛАВНОЕ — ИСКРЕННОСТЬ",
    "...ИЛИ НЕТ",
    "УДАЧИ, СУБО БРАТИК",
    "ТЫ ОБРЕЧЁН",
  ]

  return (
    <div className={`min-h-screen bg-foreground text-background relative overflow-hidden transition-transform duration-100 ${shakeScreen ? "animate-shake" : ""}`}>
      <Confetti active={showConfetti} />

      {/* Screamer Stage */}
      {stage === "screamer" && (
        <Screamer onComplete={() => setStage("warning")} />
      )}

      {/* Warning Stage */}
      {stage === "warning" && (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md animate-in zoom-in duration-500">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent mb-8 animate-pulse">
              <AlertTriangle className="h-12 w-12 text-accent-foreground" />
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">
              ВНИМАНИЕ!
            </h1>
            <p className="text-background/70 text-lg mb-4 leading-relaxed">
              Данная открытка содержит повышенный уровень кринжа, кринжа, еще раз кринжа, еще и частичной правды.
            </p>
            <p className="text-background/50 text-sm mb-8">
              Просмотр может привести к осознанию собственной бесполезности на кухне.
            </p>

            <button
              onClick={enter}
              className="cursor-pointer rounded-xl bg-accent px-8 py-4 text-accent-foreground font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30 active:scale-95"
            >
              Я готов. Погнали.
            </button>
          </div>
        </div>
      )}

      {/* Card Stage */}
      {stage === "card" && (
        <div className="min-h-screen px-4 py-20">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center animate-in slide-in-from-bottom duration-700">
              <div className="flex justify-center gap-3 mb-4">
                <Beer className="h-8 w-8 text-accent" />
                <PartyPopper className="h-8 w-8 text-accent" />
                <Beer className="h-8 w-8 text-accent" />
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-2">
                С 8 Марта, Бро!
              </h1>
              <p className="text-background/50 text-lg">
                Да, и тебя тоже это касается
              </p>
            </div>

            {/* Rotating Roasts */}
            <div className="animate-in slide-in-from-bottom duration-700 delay-200">
              <div className="rounded-2xl bg-background/10 backdrop-blur-sm border border-background/10 p-6">
                <div className="flex items-start gap-4">
                  {(() => {
                    const IconComp = roasts[currentRoast].icon
                    return <IconComp className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  })()}
                  <p className="text-lg leading-relaxed transition-all duration-500">
                    {roasts[currentRoast].text}
                  </p>
                </div>
                <div className="flex gap-1.5 mt-4 justify-center">
                  {roasts.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentRoast(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === currentRoast
                          ? "w-8 bg-accent"
                          : "w-1.5 bg-background/30"
                      }`}
                      aria-label={`Подкол ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="animate-in slide-in-from-bottom duration-700 delay-300">
              <button
                onClick={() => setShowFacts(!showFacts)}
                className="w-full cursor-pointer rounded-2xl bg-background/5 border border-background/10 p-5 text-left transition-all duration-300 hover:bg-background/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Flame className="h-5 w-5 text-accent" />
                    <span className="font-bold text-lg">Суровая статистика</span>
                  </div>
                  <span className={`text-2xl transition-transform duration-300 ${showFacts ? "rotate-45" : ""}`}>
                    +
                  </span>
                </div>
              </button>
              {showFacts && (
                <div className="mt-3 space-y-3 animate-in slide-in-from-top duration-300">
                  {facts.map((fact, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-background/5 p-4 border border-background/5 animate-in fade-in duration-300"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <p className="text-background/80 text-sm leading-relaxed">
                        <span className="text-accent font-bold mr-2">#{i + 1}</span>
                        {fact}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Survival Guide */}
            <div className="animate-in slide-in-from-bottom duration-700 delay-500">
              <button
                onClick={() => setShowTips(!showTips)}
                className="w-full cursor-pointer rounded-2xl bg-background/5 border border-background/10 p-5 text-left transition-all duration-300 hover:bg-background/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skull className="h-5 w-5 text-accent" />
                    <span className="font-bold text-lg">Гайд по выживанию 8 марта</span>
                  </div>
                  <span className={`text-2xl transition-transform duration-300 ${showTips ? "rotate-45" : ""}`}>
                    +
                  </span>
                </div>
              </button>
              {showTips && (
                <div className="mt-3 space-y-3 animate-in slide-in-from-top duration-300">
                  {survivalTips.map((tip, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-accent/10 p-4 border border-accent/20 animate-in fade-in duration-300"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <p className="text-background/80 text-sm leading-relaxed">
                        <span className="text-accent font-bold mr-2">Совет {i + 1}:</span>
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Panic Button */}
            <div className="text-center animate-in slide-in-from-bottom duration-700 delay-700">
              <p className="text-background/40 text-sm mb-4">
                Если ты ещё не купил подарок:
              </p>
              <button
                onClick={handlePanic}
                className="cursor-pointer relative rounded-2xl bg-red-600 px-10 py-5 text-white font-bold text-xl transition-all duration-300 hover:scale-105 hover:bg-red-500 active:scale-95 hover:shadow-lg hover:shadow-red-600/30"
              >
                ПАНИКА
              </button>
              {panicClicks > 0 && (
                <p className="mt-4 text-accent font-bold text-lg animate-in zoom-in duration-300">
                  {panicMessages[Math.min(panicClicks - 1, panicMessages.length - 1)]}
                </p>
              )}
            </div>

            {/* Final message */}
            <div className="text-center pt-8 pb-12 animate-in fade-in duration-700 delay-1000">
              <div className="inline-block rounded-2xl bg-background/5 border border-background/10 p-8">
                <p className="text-background/60 text-sm mb-3">А если серьёзно...</p>
                <p className="text-xl leading-relaxed mb-4">
                  С праздником, бразе! Будьте достойными мужиками, уважайте
                  своих женщин, и пусть вам сегодня не прилетит за забытые цветы
                </p>
                <p className="text-accent font-serif text-2xl font-bold italic">
                  Мир, дружба, да и вам там чего-нибудь ещё по теме. С 8 марта!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
