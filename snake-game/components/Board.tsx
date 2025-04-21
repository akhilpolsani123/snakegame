import type React from "react"
import { BOARD_SIZE, SCALE, getSnakeColor } from "../utils/gameUtils"

interface BoardProps {
  snakeDots: { x: number; y: number }[]
  apple: { x: number; y: number }
  isRainbowMode: boolean
  rainbowColors: string[]
}

const Board: React.FC<BoardProps> = ({ snakeDots, apple, isRainbowMode, rainbowColors }) => {
  return (
    <div
      style={{
        width: `${BOARD_SIZE * SCALE}px`,
        height: `${BOARD_SIZE * SCALE}px`,
        border: "1px solid #000",
        position: "relative",
      }}
    >
      {snakeDots.map((dot, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${SCALE}px`,
            height: `${SCALE}px`,
            backgroundColor: getSnakeColor(i, isRainbowMode, rainbowColors),
            left: `${dot.x * SCALE}px`,
            top: `${dot.y * SCALE}px`,
            zIndex: snakeDots.length - i,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          width: `${SCALE}px`,
          height: `${SCALE}px`,
          backgroundColor: "red",
          left: `${apple.x * SCALE}px`,
          top: `${apple.y * SCALE}px`,
        }}
      />
    </div>
  )
}

export default Board

