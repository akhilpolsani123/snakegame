"use client"

import type React from "react"
import { Slider } from "@/components/ui/slider"

interface SpeedMeterProps {
  speed: number
  onSpeedChange: (value: number) => void
  isDarkMode: boolean
}

const SpeedMeter: React.FC<SpeedMeterProps> = ({ speed, onSpeedChange, isDarkMode }) => {
  // Convert speed value (100-50) to slider value (1-5)
  const sliderValue = 6 - Math.round(speed / 10)

  const handleSliderChange = (value: number[]) => {
    // Convert slider value (1-5) back to speed value (100-50)
    const newSpeed = (6 - value[0]) * 10
    onSpeedChange(newSpeed)
  }

  return (
    <div className={`flex flex-col items-center ${isDarkMode ? "text-white" : "text-black"} w-full max-w-xs`}>
      <div className="flex justify-between w-full mb-1">
        <span>Slow</span>
        <span>Speed</span>
        <span>Fast</span>
      </div>
      <Slider
        defaultValue={[sliderValue]}
        max={5}
        min={1}
        step={1}
        value={[sliderValue]}
        onValueChange={handleSliderChange}
        className={isDarkMode ? "bg-gray-700" : ""}
      />
    </div>
  )
}

export default SpeedMeter

