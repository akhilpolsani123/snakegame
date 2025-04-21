export const BOARD_SIZE = 20
export const SNAKE_START = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
]
export const APPLE_START = { x: 5, y: 5 }
export const SCALE = 20
export const SPEED = 100
export const DIRECTIONS = {
  38: { x: 0, y: -1 }, // up
  40: { x: 0, y: 1 }, // down
  37: { x: -1, y: 0 }, // left
  39: { x: 1, y: 0 }, // right
}

export const checkCollision = (piece: { x: number; y: number }, snakeArray: { x: number; y: number }[]) =>
  snakeArray.some((segment) => segment.x === piece.x && segment.y === piece.y)

export const appleAte = (newSnake: { x: number; y: number }[], apple: { x: number; y: number }) =>
  newSnake[0].x === apple.x && newSnake[0].y === apple.y

export const generateApple = (snake: { x: number; y: number }[]) => {
  let newApple
  do {
    newApple = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    }
  } while (checkCollision(newApple, snake))
  return newApple
}

export const getRandomColor = () => {
  return `hsl(${Math.random() * 360}, 100%, 50%)`
}

export const getSnakeColor = (index: number, isRainbow: boolean, rainbowColors: string[]) => {
  if (isRainbow) {
    return rainbowColors[index % rainbowColors.length]
  }
  return index === 0 ? "#00ff00" : "#00cc00"
}

