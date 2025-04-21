"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Rainbow } from "lucide-react"
import SpeedMeter from "./SpeedMeter"

interface GameControlsProps {
  onStartGame: () => void
  onToggleTheme: () => void
  onToggleRainbow: () => void
  isDarkMode: boolean
  isRainbowMode: boolean
  speed: number
  onSpeedChange: (value: number) => void
}

const GameControls: React.FC<GameControlsProps> = ({
  onStartGame,
  onToggleTheme,
  onToggleRainbow,
  isDarkMode,
  isRainbowMode,
  speed,
  onSpeedChange,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          onClick={onStartGame}
          variant="default"
          className={isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}
        >
          Start Game
        </Button>
        <Button
          onClick={onToggleTheme}
          variant="outline"
          className={isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white border-gray-600" : ""}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button
          onClick={onToggleRainbow}
          variant={isRainbowMode ? "default" : "outline"}
          className={`
            ${isDarkMode && !isRainbowMode ? "bg-gray-700 hover:bg-gray-600 text-white border-gray-600" : ""}
            ${isRainbowMode ? "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500" : ""}
          `}
        >
          <Rainbow className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onSpeedChange(Math.min(speed + 10, 100))}
            variant="outline"
            className={isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white border-gray-600" : ""}
          >
            <span className="text-xs font-bold">-</span>
          </Button>
          <span className={isDarkMode ? "text-white" : "text-black"}>Speed: {Math.round(100 - speed + 10)}%</span>
          <Button
            onClick={() => onSpeedChange(Math.max(speed - 10, 50))}
            variant="outline"
            className={isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white border-gray-600" : ""}
          >
            <span className="text-xs font-bold">+</span>
          </Button>
        </div>
      </div>
      <SpeedMeter speed={speed} onSpeedChange={onSpeedChange} isDarkMode={isDarkMode} />
    </div>
  )
}

export default GameControls

