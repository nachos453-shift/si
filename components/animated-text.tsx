"use client"

import { useState, useEffect } from "react"

interface AnimatedTextProps {
  messages: string[]
  currentIndex: number
  isNight: boolean
}

export function AnimatedText({ messages, currentIndex, isNight }: AnimatedTextProps) {
  const [visible, setVisible] = useState(false)
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    setVisible(false)
    setDisplayText("")
    
    const timeout = setTimeout(() => {
      setDisplayText(messages[currentIndex])
      setVisible(true)
    }, 500)

    return () => clearTimeout(timeout)
  }, [currentIndex, messages])

  return (
    <div className="absolute top-[15%] md:top-[20%] left-0 right-0 z-30 px-4">
      <h1
        className={`text-2xl md:text-4xl lg:text-5xl font-bold text-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{
          color: isNight ? "#fff" : "#fff",
          textShadow: isNight
            ? "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(100, 149, 237, 0.5)"
            : "0 0 20px rgba(0, 0, 0, 0.3), 2px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        {displayText}
      </h1>
    </div>
  )
}
