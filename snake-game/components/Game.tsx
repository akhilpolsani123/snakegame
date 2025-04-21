"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import Board from "./Board"
import GameControls from "./GameControls"
import GameOverPopup from "./GameOverPopup"
import {
  SNAKE_START,
  APPLE_START,
  DIRECTIONS,
  SPEED,
  checkCollision,
  appleAte,
  generateApple,
  BOARD_SIZE,
  getRandomColor,
} from "../utils/gameUtils"

const Game: React.FC = () => {
  const [snake, setSnake] = useState(SNAKE_START)
  const [apple, setApple] = useState(APPLE_START)
  const [dir, setDir] = useState<{ x: number; y: number }>(DIRECTIONS[39])
  const [speed, setSpeed] = useState<number | null>(null)
  const [gameSpeed, setGameSpeed] = useState(SPEED)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isRainbowMode, setIsRainbowMode] = useState(false)
  const [rainbowColors, setRainbowColors] = useState<string[]>([])

  const moveSnake = useCallback(() => {
    const newSnake = [...snake]
    const newSnakeHead = { x: newSnake[0].x + dir.x, y: newSnake[0].y + dir.y }

    if (
      newSnakeHead.x < 0 ||
      newSnakeHead.x >= BOARD_SIZE ||
      newSnakeHead.y < 0 ||
      newSnakeHead.y >= BOARD_SIZE ||
      checkCollision(newSnakeHead, snake)
    ) {
      setGameOver(true)
      return
    }

    newSnake.unshift(newSnakeHead)
    if (appleAte(newSnake, apple)) {
      setApple(generateApple(newSnake))
      setScore((prevScore) => prevScore + 1)
    } else {
      newSnake.pop()
    }
    setSnake(newSnake)
  }, [snake, dir, apple])

  const startGame = useCallback(() => {
    setSnake(SNAKE_START)
    setApple(APPLE_START)
    setDir(DIRECTIONS[39])
    setSpeed(gameSpeed)
    setGameOver(false)
    setScore(0)
    setRainbowColors(Array(SNAKE_START.length).fill("").map(getRandomColor))
  }, [gameSpeed])

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

  const toggleRainbow = () => {
    setIsRainbowMode((prev) => !prev)
  }

  const handleSpeedChange = (newSpeed: number) => {
    setGameSpeed(newSpeed)
    if (speed !== null) {
      setSpeed(newSpeed)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.keyCode
      if (key >= 37 && key <= 40) {
        setDir(DIRECTIONS[key])
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (gameOver) {
      setSpeed(null)
      setHighScore((prev) => Math.max(prev, score))
    }
  }, [gameOver, score])

  useEffect(() => {
    if (!gameOver && speed) {
      const interval = setInterval(moveSnake, speed)
      return () => clearInterval(interval)
    }
  }, [moveSnake, gameOver, speed])

  useEffect(() => {
    if (isRainbowMode) {
      const interval = setInterval(() => {
        setRainbowColors((prev) => {
          const newColors = [...prev]
          newColors.pop()
          newColors.unshift(getRandomColor())
          return newColors
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isRainbowMode])

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen relative overflow-hidden
    ${
      isDarkMode
        ? "text-white bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800"
        : "text-black bg-gradient-to-br from-blue-50 via-cyan-100 to-blue-50"
    }`}
    >
      <div className="absolute inset-0 bg-grid-white/[0.1] bg-grid-16 -z-10"></div>
      {isDarkMode && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/40 to-gray-900 -z-10"></div>
      )}
      <h1 className="text-4xl font-bold mb-4">Snake Game</h1>
      <div className="mb-4 text-xl">
        <span className="mr-4">Score: {score}</span>
        <span>High Score: {highScore}</span>
      </div>
      <Board snakeDots={snake} apple={apple} isRainbowMode={isRainbowMode} rainbowColors={rainbowColors} />
      {gameOver && <GameOverPopup score={score} onRestart={startGame} isDarkMode={isDarkMode} />}
      <GameControls
        onStartGame={startGame}
        onToggleTheme={toggleTheme}
        onToggleRainbow={toggleRainbow}
        isDarkMode={isDarkMode}
        isRainbowMode={isRainbowMode}
        speed={gameSpeed}
        onSpeedChange={handleSpeedChange}
      />
    </div>
  )
}

export default Game

