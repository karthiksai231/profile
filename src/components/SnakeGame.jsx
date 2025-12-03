import React, { useState, useEffect, useCallback } from 'react';
import '../styles/SnakeGame.css';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: 0 };
const INITIAL_FOOD = { x: 15, y: 15 };

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Check if food spawns on snake
      const onSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  };

  const checkCollision = (head) => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    // Self collision
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    return false;
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted) return;

    setSnake((prevSnake) => {
      const newHead = {
        x: prevSnake[0].x + direction.x,
        y: prevSnake[0].y + direction.y,
      };

      if (checkCollision(newHead)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((prev) => prev + 1);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, gameStarted, generateFood]); // Removed checkCollision from dependencies as it uses snake state which is handled inside setSnake

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) {
            setDirection({ x: 0, y: -1 });
            setGameStarted(true);
          }
          break;
        case 'ArrowDown':
          if (direction.y !== -1) {
            setDirection({ x: 0, y: 1 });
            setGameStarted(true);
          }
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) {
            setDirection({ x: -1, y: 0 });
            setGameStarted(true);
          }
          break;
        case 'ArrowRight':
          if (direction.x !== -1) {
            setDirection({ x: 1, y: 0 });
            setGameStarted(true);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameOver]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  return (
    <div className="snake-game">
      <div className="game-header">
        <h2>Snake Game</h2>
        <p>Score: {score}</p>
      </div>
      
      <div 
        className="game-board"
        style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;
          const isHead = snake[0].x === x && snake[0].y === y;

          return (
            <div 
              key={index} 
              className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''} ${isHead ? 'head' : ''}`}
            />
          );
        })}
        
        {(!gameStarted && !gameOver) && (
          <div className="overlay">
            <p>Press Arrow Keys to Start</p>
          </div>
        )}

        {gameOver && (
          <div className="overlay game-over">
            <h3>Game Over!</h3>
            <p>Final Score: {score}</p>
            <button onClick={resetGame} className="btn btn-primary">Play Again</button>
          </div>
        )}
      </div>
      
      <div className="mobile-controls">
        <div className="control-row">
          <button onClick={() => { setDirection({ x: 0, y: -1 }); setGameStarted(true); }}>↑</button>
        </div>
        <div className="control-row">
          <button onClick={() => { setDirection({ x: -1, y: 0 }); setGameStarted(true); }}>←</button>
          <button onClick={() => { setDirection({ x: 0, y: 1 }); setGameStarted(true); }}>↓</button>
          <button onClick={() => { setDirection({ x: 1, y: 0 }); setGameStarted(true); }}>→</button>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
