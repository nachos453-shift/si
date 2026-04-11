"use client"

import { useEffect, useState, useMemo } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

interface SkyProps {
  isNight: boolean
}

export function Sky({ isNight }: SkyProps) {
  const [stars, setStars] = useState<Star[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isNight && stars.length === 0) {
      const newStars: Star[] = []
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          delay: Math.random() * 3,
          duration: Math.random() * 2 + 1,
        })
      }
      setStars(newStars)
    }
  }, [isNight, stars.length])

  const sunPosition = useMemo(() => {
    return isNight ? { bottom: "-150px" } : { bottom: "30px" }
  }, [isNight])

  if (!mounted) return null

  return (
    <div
      className="absolute inset-0 overflow-hidden transition-all duration-[6000ms] ease-in-out"
      style={{
        background: isNight
          ? "linear-gradient(to top, #0f2027, #203a43, #2c5364)"
          : "linear-gradient(to top, #ff7e5f, #feb47b, #ffd89b)",
      }}
    >
      {/* Sun/Moon */}
      <div
        className="absolute left-1/2 -translate-x-1/2 transition-all duration-[6000ms] ease-in-out"
        style={sunPosition}
      >
        <div
          className={`w-24 h-24 md:w-32 md:h-32 rounded-full transition-all duration-[6000ms] ${
            isNight ? "bg-gradient-radial" : "animate-pulse-glow"
          }`}
          style={{
            background: isNight
              ? "radial-gradient(circle, #f5f5f5, #e0e0e0)"
              : "radial-gradient(circle, #ffcc70, #ff8c00)",
            boxShadow: isNight
              ? "0 0 60px rgba(255, 255, 255, 0.4), 0 0 100px rgba(255, 255, 255, 0.2)"
              : "0 0 80px rgba(255, 140, 0, 0.9), 0 0 120px rgba(255, 100, 0, 0.5)",
          }}
        />
      </div>

      {/* Stars */}
      {isNight && (
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Clouds (daytime only) */}
      {!isNight && (
        <>
          <div
            className="absolute w-32 h-12 md:w-48 md:h-16 bg-white/30 rounded-full blur-sm animate-float"
            style={{ top: "15%", left: "10%", animationDelay: "0s" }}
          />
          <div
            className="absolute w-24 h-10 md:w-36 md:h-12 bg-white/25 rounded-full blur-sm animate-float"
            style={{ top: "25%", right: "15%", animationDelay: "1s" }}
          />
          <div
            className="absolute w-20 h-8 md:w-28 md:h-10 bg-white/20 rounded-full blur-sm animate-float"
            style={{ top: "10%", left: "50%", animationDelay: "2s" }}
          />
        </>
      )}
    </div>
  )
}
