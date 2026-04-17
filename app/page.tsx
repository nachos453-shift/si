"use client"

import { useState, useEffect, useCallback } from "react"
import { Sky } from "@/components/sky"
import { Grass } from "@/components/grass"
import { FallingPetals } from "@/components/falling-petals"
import { AnimatedText } from "@/components/animated-text"
import { CharacterCard } from "@/components/character-card"
import { FunFacts } from "@/components/fun-facts"
import { DayNightToggle } from "@/components/day-night-toggle"

const messages = [
  "Para ti mi negra ♥️",
  "Eres lo más bonito que me ha pasado 🌷",
  "Los mejores momentos son a tu lado ✨",
  "Como un atardecer, iluminas todo 🌅",
  "Eres mi nakama favorita 🏴‍☠️",
]

export default function HomePage() {
  const [isNight, setIsNight] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto transition to night after 8 seconds
  useEffect(() => {
    if (mounted) {
      const nightTimer = setTimeout(() => {
        setIsNight(true)
      }, 8000)

      return () => clearTimeout(nightTimer)
    }
  }, [mounted])

  // Change messages periodically
  useEffect(() => {
    if (mounted) {
      const messageTimer = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length)
      }, 5000)

      return () => clearInterval(messageTimer)
    }
  }, [mounted])

  const toggleDayNight = useCallback(() => {
    setIsNight((prev) => !prev)
  }, [])

  const handleTulipClick = useCallback(() => {
    setClickCount((prev) => prev + 1)
    if (clickCount >= 4) {
      setMessageIndex((prev) => (prev + 1) % messages.length)
      setClickCount(0)
    }
  }, [clickCount])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-200 to-orange-300">
        <div className="text-2xl text-white animate-pulse">Cargando algo especial...</div>
      </div>
    )
  }

  return (
    <main
      className="min-h-screen overflow-x-hidden transition-colors duration-[6000ms]"
      style={{
        background: isNight
          ? "linear-gradient(to bottom, #0f172a, #1e293b)"
          : "linear-gradient(to bottom, #fff7ed, #ffedd5)",
      }}
    >
      {/* Day/Night Toggle */}
      <DayNightToggle isNight={isNight} onToggle={toggleDayNight} />

      {/* Falling Petals */}
      <FallingPetals />

      {/* Sky Section with sun/moon */}
      <section className="relative h-[70vh] overflow-hidden">
        <Sky isNight={isNight} />
        <AnimatedText messages={messages} currentIndex={messageIndex} isNight={isNight} />
      </section>

      {/* Grass with Tulips */}
      <Grass isNight={isNight} onTulipClick={handleTulipClick} />

      {/* Content Sections */}
      <section
        className="relative z-10 py-12 md:py-20 px-4 md:px-8 transition-colors duration-[6000ms]"
        style={{
          background: isNight
            ? "linear-gradient(to bottom, #1e293b, #0f172a)"
            : "linear-gradient(to bottom, #fff7ed, #fef3c7)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <h2
            className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 animate-fade-in-up"
            style={{
              color: isNight ? "#93c5fd" : "#e11d48",
              textShadow: isNight
                ? "0 0 20px rgba(147, 197, 253, 0.5)"
                : "0 0 20px rgba(225, 29, 72, 0.2)",
            }}
          >
            Cosas que nos gustan 🌸
          </h2>

          {/* Character Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            <CharacterCard
              name="Roronoa Zoro"
              image="/images/zoro.png"
              quote="Aquí no paso nada... "
              isNight={isNight}
              delay={0.2}
            />
            <CharacterCard
              name="Monkey D. Luffy"
              image="/images/luffy.png"
              quote="¡Seré el Rey de los Piratas!"
              isNight={isNight}
              delay={0.4}
            />
          </div>

          {/* Fun Facts */}
          <div className="mb-12 md:mb-16">
            <h3
              className="text-xl md:text-2xl font-semibold text-center mb-6 md:mb-8"
              style={{
                color: isNight ? "#a5b4fc" : "#f43f5e",
              }}
            >
              Pequeños detalles especiales ✨
            </h3>
            <FunFacts isNight={isNight} />
          </div>

          {/* Final Message */}
          <div
            className="text-center p-6 md:p-10 rounded-2xl transition-all duration-500"
            style={{
              background: isNight
                ? "linear-gradient(135deg, rgba(30, 58, 95, 0.6), rgba(15, 23, 42, 0.8))"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 228, 230, 0.9))",
              boxShadow: isNight
                ? "0 10px 40px rgba(100, 149, 237, 0.2)"
                : "0 10px 40px rgba(225, 29, 72, 0.1)",
              animation: "fadeInUp 1s ease-out forwards",
              animationDelay: "1s",
              opacity: 0,
            }}
          >
            <p
              className="text-lg md:text-2xl font-medium mb-4"
              style={{ color: isNight ? "#e0e7ff" : "#881337" }}
            >
              Gracias por existir en mi vida
            </p>
            <p
              className="text-sm md:text-base opacity-80"
              style={{ color: isNight ? "#a5b4fc" : "#be185d" }}
            >
              Cada día a tu lado es una aventura que vale la pena vivir 🌅
            </p>
            <div className="mt-6 animate-heartbeat">
              <span className="text-4xl md:text-5xl">♥️</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-6 text-center transition-colors duration-[6000ms]"
        style={{
          background: isNight ? "#0f172a" : "#fef3c7",
          color: isNight ? "#64748b" : "#92400e",
        }}
      >
        <p className="text-sm">
          Hecho con mucho ♥️ para alguien muy especial
        </p>
      </footer>
    </main>
  )
}
