"use client"

import { useEffect, useState } from "react"

interface Petal {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  delay: number
  duration: number
  color: string
}

export function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const colors = ["#f9a8d4", "#fda4af", "#fecdd3", "#ffe4e6", "#fce7f3"]
    const generated: Petal[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      rotation: Math.random() * 360,
      scale: 0.4 + Math.random() * 0.8,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setPetals(generated)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {petals.map((petal) => (
        <svg
          key={petal.id}
          className="absolute animate-fall"
          style={{
            left: `${petal.x}%`,
            top: `${petal.y}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            transform: `scale(${petal.scale}) rotate(${petal.rotation}deg)`,
          }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2C12 2 8 6 8 10C8 14 12 16 12 16C12 16 16 14 16 10C16 6 12 2 12 2Z"
            fill={petal.color}
            opacity="0.7"
          />
        </svg>
      ))}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(110vh) rotate(720deg) translateX(80px);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  )
}

export function FlowerBouquet({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stems */}
      <path d="M100 260 L90 160" stroke="#4ade80" strokeWidth="3" />
      <path d="M100 260 L110 150" stroke="#4ade80" strokeWidth="3" />
      <path d="M100 260 L80 170" stroke="#4ade80" strokeWidth="3" />
      <path d="M100 260 L120 165" stroke="#22c55e" strokeWidth="2.5" />
      <path d="M100 260 L95 155" stroke="#22c55e" strokeWidth="2.5" />

      {/* Leaves */}
      <ellipse cx="85" cy="200" rx="12" ry="6" fill="#4ade80" transform="rotate(-30 85 200)" />
      <ellipse cx="115" cy="210" rx="12" ry="6" fill="#22c55e" transform="rotate(25 115 210)" />

      {/* Flower 1 - Rose */}
      <circle cx="90" cy="140" r="22" fill="#fb7185" />
      <circle cx="90" cy="140" r="16" fill="#f43f5e" />
      <circle cx="90" cy="140" r="10" fill="#e11d48" />
      <circle cx="90" cy="140" r="5" fill="#be123c" />

      {/* Flower 2 - Tulip */}
      <path d="M110 130 Q110 110 100 100 Q110 95 115 110 Q120 95 130 100 Q120 110 120 130 Z" fill="#f472b6" />
      <path d="M112 125 Q112 112 106 105 Q112 102 115 112 Q118 102 122 105 Q118 112 118 125 Z" fill="#ec4899" />

      {/* Flower 3 - Daisy */}
      <circle cx="75" cy="155" r="5" fill="#fbbf24" />
      <ellipse cx="75" cy="143" rx="4" ry="8" fill="#fecdd3" />
      <ellipse cx="75" cy="167" rx="4" ry="8" fill="#fecdd3" />
      <ellipse cx="63" cy="155" rx="8" ry="4" fill="#fecdd3" />
      <ellipse cx="87" cy="155" rx="8" ry="4" fill="#fecdd3" />
      <ellipse cx="67" cy="147" rx="4" ry="8" fill="#ffe4e6" transform="rotate(45 67 147)" />
      <ellipse cx="83" cy="163" rx="4" ry="8" fill="#ffe4e6" transform="rotate(45 83 163)" />
      <ellipse cx="67" cy="163" rx="4" ry="8" fill="#ffe4e6" transform="rotate(-45 67 163)" />
      <ellipse cx="83" cy="147" rx="4" ry="8" fill="#ffe4e6" transform="rotate(-45 83 147)" />

      {/* Flower 4 */}
      <circle cx="125" cy="148" r="18" fill="#fda4af" />
      <circle cx="125" cy="148" r="13" fill="#fb7185" />
      <circle cx="125" cy="148" r="7" fill="#f43f5e" />

      {/* Flower 5 - small bud */}
      <path d="M95 145 Q95 130 90 125 Q95 122 98 132 Q101 122 106 125 Q100 130 100 145 Z" fill="#fca5a5" />

      {/* Wrapping */}
      <path d="M60 230 L70 180 L100 260 Z" fill="#fce7f3" opacity="0.7" />
      <path d="M140 230 L130 180 L100 260 Z" fill="#fce7f3" opacity="0.7" />
      <path d="M65 225 L100 260 L135 225" stroke="#f9a8d4" strokeWidth="2" fill="none" />
    </svg>
  )
}
