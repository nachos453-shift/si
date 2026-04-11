"use client"

import { useMemo } from "react"

interface TulipProps {
  delay: number
  position: number
  onClick?: () => void
}

const petalColors = [
  "#ff4d6d",
  "#ff85a2", 
  "#ffc0cb",
  "#ff758f",
  "#ff6b8a",
  "#e84a73",
]

export function Tulip({ delay, position, onClick }: TulipProps) {
  const colors = useMemo(() => {
    return [
      petalColors[Math.floor(Math.random() * petalColors.length)],
      petalColors[Math.floor(Math.random() * petalColors.length)],
      petalColors[Math.floor(Math.random() * petalColors.length)],
    ]
  }, [])

  const swayDelay = useMemo(() => Math.random() * 2, [])
  const height = useMemo(() => 60 + Math.random() * 40, [])

  return (
    <div
      className="absolute bottom-0 cursor-pointer group"
      style={{ 
        left: `${position}%`,
        animationDelay: `${swayDelay}s`,
      }}
      onClick={onClick}
    >
      {/* Stem */}
      <div
        className="w-1 bg-gradient-to-t from-green-800 to-green-500 rounded-full mx-auto origin-bottom animate-sway"
        style={{
          height: `${height}px`,
          animation: `grow 2s ease-out forwards, sway 3s ease-in-out ${delay + 2}s infinite`,
          animationDelay: `${delay}s, ${delay + 2}s`,
        }}
      >
        {/* Leaf left */}
        <div
          className="absolute w-4 h-8 bg-gradient-to-r from-green-700 to-green-500 rounded-full -left-3 top-1/2 origin-right"
          style={{
            transform: "rotate(-30deg) scale(0)",
            animation: `bloom 0.5s ease-out forwards`,
            animationDelay: `${delay + 1.5}s`,
          }}
        />
        {/* Leaf right */}
        <div
          className="absolute w-4 h-8 bg-gradient-to-l from-green-700 to-green-500 rounded-full -right-3 top-1/3 origin-left"
          style={{
            transform: "rotate(30deg) scale(0)",
            animation: `bloom 0.5s ease-out forwards`,
            animationDelay: `${delay + 1.7}s`,
          }}
        />
      </div>

      {/* Flower head */}
      <div
        className="absolute -top-6 left-1/2 w-8 h-10 group-hover:scale-110 transition-transform duration-300"
        style={{
          transform: "translateX(-50%) scale(0)",
          animation: `bloom 1s ease-out forwards`,
          animationDelay: `${delay + 1.8}s`,
        }}
      >
        {/* Petals */}
        <div
          className="absolute w-5 h-7 rounded-t-full rounded-b-lg shadow-inner -left-1"
          style={{
            background: colors[0],
            transform: "rotate(-20deg)",
            boxShadow: "inset -2px -2px 5px rgba(0,0,0,0.2)",
          }}
        />
        <div
          className="absolute w-5 h-7 rounded-t-full rounded-b-lg shadow-inner -right-1"
          style={{
            background: colors[1],
            transform: "rotate(20deg)",
            boxShadow: "inset 2px -2px 5px rgba(0,0,0,0.2)",
          }}
        />
        <div
          className="absolute w-5 h-8 rounded-t-full rounded-b-lg shadow-inner left-1/2 -translate-x-1/2 -top-1"
          style={{
            background: colors[2],
            boxShadow: "inset 0px -2px 5px rgba(0,0,0,0.15)",
          }}
        />
        {/* Center accent */}
        <div
          className="absolute w-2 h-3 rounded-full left-1/2 -translate-x-1/2 top-2"
          style={{
            background: "linear-gradient(to bottom, #ffeb3b, #ff9800)",
          }}
        />
      </div>
    </div>
  )
}
