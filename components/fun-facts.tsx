"use client"

import { useState } from "react"

interface FunFactsProps {
  isNight: boolean
}

const funFacts = [
  { icon: "🍟", text: "Las papas fritas son perfectas para cualquier momento" },
  { icon: "🌷", text: "Los tulipanes representan el amor perfecto" },
  { icon: "🌅", text: "Los atardeceres me recuerdan a momentos especiales" },
  { icon: "⚔️", text: "Zoro nunca se pierde... bueno, casi nunca" },
  { icon: "👒", text: "Luffy nos enseña que los sueños valen la pena" },
]

export function FunFacts({ isNight }: FunFactsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
      {funFacts.map((fact, index) => (
        <div
          key={index}
          className={`relative p-4 md:p-6 rounded-xl cursor-pointer transition-all duration-500 ${
            activeIndex === index ? "scale-105" : "scale-100"
          }`}
          style={{
            background: isNight
              ? "linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8))"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 245, 245, 0.9))",
            boxShadow: activeIndex === index
              ? isNight
                ? "0 10px 40px rgba(100, 149, 237, 0.4)"
                : "0 10px 40px rgba(255, 100, 100, 0.3)"
              : "0 4px 20px rgba(0, 0, 0, 0.1)",
            animation: `fadeInUp 0.8s ease-out forwards`,
            animationDelay: `${index * 0.1 + 0.5}s`,
            opacity: 0,
          }}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <div className="text-3xl md:text-4xl mb-2 text-center animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
            {fact.icon}
          </div>
          <p
            className={`text-xs md:text-sm text-center transition-colors duration-500 ${
              isNight ? "text-blue-100/80" : "text-rose-600/80"
            }`}
          >
            {fact.text}
          </p>
          
          {/* Sparkle effect */}
          {activeIndex === index && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-twinkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
