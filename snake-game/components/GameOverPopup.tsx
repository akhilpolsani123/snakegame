"use client"

import type React from "react"
import { Button } from "@/components/ui/button"

interface GameOverPopupProps {
  score: number
  onRestart: () => void
  isDarkMode: boolean
}

const GameOverPopup: React.FC<GameOverPopupProps> = ({ score, onRestart, isDarkMode }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`
          ${isDarkMode ? "text-white border-gray-600" : "text-black border-gray-300"} 
          p-8 rounded-lg shadow-lg text-center
          bg-gradient-to-br 
          ${isDarkMode ? "from-gray-900 via-emerald-900 to-blue-900" : "from-white via-emerald-100 to-cyan-100"}
          border-2 
          animate-pulse
          backdrop-blur-sm
          motion-safe:animate-gradient
          relative
          overflow-hidden
        `}
      >
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid-8 -z-10"></div>
        <div
          className={`absolute -inset-1 ${isDarkMode ? "bg-emerald-600" : "bg-emerald-300"} rounded-lg blur opacity-20 -z-10`}
        ></div>
        <h2 className="text-3xl font-bold mb-4 relative z-10">Game Over</h2>
        <p className="text-xl mb-6 relative z-10">Your score: {score}</p>
        <Button
          onClick={onRestart}
          variant="default"
          className={`px-6 py-2 relative z-10 ${
            isDarkMode
              ? "bg-gradient-to-r from-emerald-800 to-blue-800 hover:from-emerald-700 hover:to-blue-700 text-white"
              : "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white"
          }`}
        >
          Play Again
        </Button>
      </div>
    </div>
  )
}

export default GameOverPopup

