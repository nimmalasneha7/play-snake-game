import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RotateCcw, Play } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const BASE_SPEED = 150;

type Point = { x: number; y: number };

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [highScore, setHighScore] = useState(0);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const hitSnake = currentSnake.some(s => s.x === newFood?.x && s.y === newFood?.y);
      if (!hitSnake) break;
    }
    return newFood;
  }, []);

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake(prevSnake => {
      const newHead = {
        x: (prevSnake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (prevSnake[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        setIsPaused(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => {
          const newScore = s + 10;
          if (newScore > highScore) setHighScore(newScore);
          return newScore;
        });
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isPaused, generateFood, highScore]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        case 'Enter':
          if (isGameOver) resetGame();
          else togglePause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isGameOver]);

  useEffect(() => {
    const speed = Math.max(70, BASE_SPEED - Math.floor(score / 50) * 10);
    gameLoopRef.current = setInterval(moveSnake, speed);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake, score]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setFood(generateFood(INITIAL_SNAKE));
  };

  const togglePause = () => setIsPaused(!isPaused);

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* HUD */}
      <div className="w-full max-w-[400px] flex justify-between items-center bg-zinc-900/50 p-4 rounded-xl border border-neon-cyan/20">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono">Score</span>
          <span className="text-2xl font-bold text-neon-cyan font-mono">{score.toString().padStart(4, '0')}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono">High Score</span>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-neon-yellow" />
            <span className="text-xl font-bold text-neon-magenta font-mono">{highScore.toString().padStart(4, '0')}</span>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative group">
        <div 
          className="grid gap-0 bg-zinc-950 border-4 border-neon-magenta/50 rounded-lg overflow-hidden relative shadow-[0_0_30px_rgba(255,0,255,0.2)]"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: 'min(90vw, 400px)',
            height: 'min(90vw, 400px)',
          }}
        >
          {/* Background Grid */}
          {[...Array(GRID_SIZE * GRID_SIZE)].map((_, i) => (
            <div key={i} className="border-[0.5px] border-zinc-900/10" />
          ))}

          {/* Snake */}
          {snake.map((segment, i) => (
            <div
              key={`${segment.x}-${segment.y}-${i}`}
              className={`absolute rounded-sm transition-all duration-100 ${
                i === 0 ? 'bg-neon-lime z-10 shadow-[0_0_10px_#39ff14]' : 'bg-neon-lime/60'
              }`}
              style={{
                left: `${(segment.x / GRID_SIZE) * 100}%`,
                top: `${(segment.y / GRID_SIZE) * 100}%`,
                width: `${100 / GRID_SIZE}%`,
                height: `${100 / GRID_SIZE}%`,
              }}
            />
          ))}

          {/* Food */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute bg-neon-magenta rounded-full shadow-[0_0_15px_#ff00ff]"
            style={{
              left: `${(food.x / GRID_SIZE) * 100}%`,
              top: `${(food.y / GRID_SIZE) * 100}%`,
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
              padding: '2px',
            }}
          />

          <AnimatePresence>
            {(isGameOver || isPaused) && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 backdrop-blur-sm"
              >
                {isGameOver ? (
                  <>
                    <h2 className="text-4xl font-black text-neon-magenta mb-2 italic">GAME OVER</h2>
                    <p className="text-zinc-400 mb-6 font-mono">NEURAL LINK SEVERED</p>
                    <button 
                      onClick={resetGame}
                      className="flex items-center gap-2 px-8 py-3 bg-neon-magenta/20 border border-neon-magenta text-neon-magenta rounded-full hover:bg-neon-magenta hover:text-white transition-all transform hover:scale-105"
                    >
                      <RotateCcw className="w-5 h-5" /> REBOOT
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-4xl font-black text-neon-cyan mb-8 italic">PAUSED</h2>
                    <button 
                      onClick={togglePause}
                      className="flex items-center gap-2 px-8 py-3 bg-neon-cyan/20 border border-neon-cyan text-neon-cyan rounded-full hover:bg-neon-cyan hover:text-white transition-all transform hover:scale-105"
                    >
                      <Play className="w-5 h-5" /> RESUME
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Glow effect overlays */}
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 blur-xl -z-10 group-hover:opacity-100 opacity-60 transition-opacity" />
      </div>

      <div className="flex gap-4 items-center text-zinc-500 text-xs font-mono uppercase tracking-[0.2em]">
        <span>WASD to Move</span>
        <span className="w-1 h-1 rounded-full bg-zinc-700" />
        <span>Enter to Pause</span>
      </div>
    </div>
  );
};
