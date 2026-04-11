"use client"

import { useState, useEffect, useCallback } from "react"
import { Tulip } from "./tulip"

interface GrassProps {
  isNight: boolean
  onTulipClick?: () => void
}

interface TulipData {
  id: number
  position: number
  delay: number
}

export function Grass({ isNight, onTulipClick }: GrassProps) {
  const [tulips, setTulips] = useState<TulipData[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const addTulips = useCallback(() => {
    const newTulips: TulipData[] = []
    for (let i = 0; i < 25; i++) {
      newTulips.push({
        id: i,
        position: Math.random() * 95 + 2.5,
        delay: i * 0.15,
      })
    }
    setTulips(newTulips)
  }, [])

  useEffect(() => {
    if (mounted) {
      addTulips()
    }
  }, [mounted, addTulips])

  if (!mounted) return null

  return (
    <div
      className="relative h-[30vh] md:h-[35vh] overflow-hidden transition-all duration-[6000ms]"
      style={{
        background: isNight
          ? "linear-gradient(to top, #0d3320, #1a5c38, #2e7d4a)"
          : "linear-gradient(to top, #1b5e20, #4caf50, #66bb6a)",
      }}
    >
      {/* Grass blades effect */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-1 bg-gradient-to-t from-green-900 to-transparent rounded-t-full animate-sway"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${20 + Math.random() * 30}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Tulips */}
      {tulips.map((tulip) => (
        <Tulip
          key={tulip.id}
          position={tulip.position}
          delay={tulip.delay}
          onClick={onTulipClick}
        />
      ))}

      {/* Fireflies at night */}
      {isNight && (
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                boxShadow: "0 0 10px rgba(255, 255, 0, 0.8), 0 0 20px rgba(255, 255, 0, 0.5)",
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
