"use client"

import Image from "next/image"
import { useState } from "react"

interface CharacterCardProps {
  name: string
  image: string
  quote: string
  isNight: boolean
  delay?: number
}

export function CharacterCard({ name, image, quote, isNight, delay = 0 }: CharacterCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showHeart, setShowHeart] = useState(false)

  const handleClick = () => {
    setShowHeart(true)
    setTimeout(() => setShowHeart(false), 1000)
  }

  return (
    <div
      className="relative group cursor-pointer"
      style={{
        animation: `fadeInUp 1s ease-out forwards`,
        animationDelay: `${delay}s`,
        opacity: 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div
        className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
          isHovered ? "scale-105" : "scale-100"
        }`}
        style={{
          background: isNight
            ? "linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 240, 240, 0.9))",
          boxShadow: isHovered
            ? isNight
              ? "0 20px 60px rgba(100, 149, 237, 0.4), 0 0 30px rgba(147, 197, 253, 0.3)"
              : "0 20px 60px rgba(255, 100, 100, 0.3), 0 0 30px rgba(255, 150, 150, 0.4)"
            : isNight
              ? "0 10px 40px rgba(0, 0, 0, 0.4)"
              : "0 10px 40px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Image container */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: isNight
                ? "linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 60%)"
                : "linear-gradient(to top, rgba(255, 240, 240, 0.8) 0%, transparent 60%)",
              opacity: isHovered ? 1 : 0.6,
            }}
          />
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <h3
            className={`text-xl md:text-2xl font-bold mb-2 transition-colors duration-500 ${
              isNight ? "text-blue-200" : "text-rose-600"
            }`}
          >
            {name}
          </h3>
          <p
            className={`text-sm md:text-base italic transition-colors duration-500 ${
              isNight ? "text-blue-100/80" : "text-rose-500/80"
            }`}
          >
            {`"${quote}"`}
          </p>
        </div>

        {/* Decorative corner */}
        <div
          className={`absolute top-0 right-0 w-16 h-16 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: isNight
              ? "linear-gradient(135deg, transparent 50%, rgba(100, 149, 237, 0.3) 50%)"
              : "linear-gradient(135deg, transparent 50%, rgba(255, 150, 150, 0.4) 50%)",
          }}
        />
      </div>

      {/* Heart animation on click */}
      {showHeart && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-heartbeat pointer-events-none">
          <span className="text-5xl">♥️</span>
        </div>
      )}
    </div>
  )
}
