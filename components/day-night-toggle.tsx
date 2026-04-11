"use client"

interface DayNightToggleProps {
  isNight: boolean
  onToggle: () => void
}

export function DayNightToggle({ isNight, onToggle }: DayNightToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full transition-all duration-500 hover:scale-110 active:scale-95"
      style={{
        background: isNight
          ? "linear-gradient(135deg, #1e3a5f, #0f172a)"
          : "linear-gradient(135deg, #ffd89b, #ff8c00)",
        boxShadow: isNight
          ? "0 4px 20px rgba(100, 149, 237, 0.4), 0 0 40px rgba(100, 149, 237, 0.2)"
          : "0 4px 20px rgba(255, 140, 0, 0.5), 0 0 40px rgba(255, 200, 100, 0.3)",
      }}
      aria-label={isNight ? "Cambiar a día" : "Cambiar a noche"}
    >
      <span className="text-2xl md:text-3xl transition-transform duration-500" style={{
        display: "inline-block",
        transform: isNight ? "rotate(0deg)" : "rotate(360deg)",
      }}>
        {isNight ? "🌙" : "☀️"}
      </span>
    </button>
  )
}
