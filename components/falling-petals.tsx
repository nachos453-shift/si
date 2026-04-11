"use client"

import { useEffect, useState, useCallback } from "react"

interface Petal {
  id: number
  x: number
  color: string
  size: number
  duration: number
  delay: number
  swayAmount: number
}

const petalColors = [
  "#ff4d6d",
  "#ffc0cb",
  "#ff85a2",
  "#ff758f",
  "#ffb3c1",
  "#ff8fab",
]

export function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([])
  const [petalId, setPetalId] = useState(0)

  const createPetal = useCallback(() => {
    const newPetal: Petal = {
      id: petalId,
      x: Math.random() * 100,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      size: 8 + Math.random() * 8,
      duration: 6 + Math.random() * 4,
      delay: 0,
      swayAmount: 50 + Math.random() * 100,
    }
    setPetalId((prev) => prev + 1)
    setPetals((prev) => [...prev, newPetal])

    setTimeout(() => {
      setPetals((prev) => prev.filter((p) => p.id !== newPetal.id))
    }, (newPetal.duration + newPetal.delay) * 1000)
  }, [petalId])

  useEffect(() => {
    const interval = setInterval(createPetal, 300)
    return () => clearInterval(interval)
  }, [createPetal])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute rounded-full"
          style={{
            left: `${petal.x}%`,
            top: "-20px",
            width: `${petal.size}px`,
            height: `${petal.size * 1.5}px`,
            background: `linear-gradient(135deg, ${petal.color}, ${petal.color}dd)`,
            boxShadow: `0 2px 4px rgba(0,0,0,0.1)`,
            animation: `fall ${petal.duration}s linear forwards`,
            animationDelay: `${petal.delay}s`,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            ["--sway-amount" as string]: `${petal.swayAmount}px`,
          }}
        />
      ))}
    </div>
  )
}
