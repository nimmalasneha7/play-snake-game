import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music as MusicIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "Synthwave Horizon",
    artist: "AI Gen: Neural Drift",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/synth1/200/200"
  },
  {
    id: 2,
    title: "Neon Pulse",
    artist: "AI Gen: Cyber Rhythm",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/seed/synth2/200/200"
  },
  {
    id: 3,
    title: "Midnight Matrix",
    artist: "AI Gen: Digital Ghost",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/seed/synth3/200/200"
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleNext = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-md border border-neon-cyan/30 rounded-2xl p-6 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-neon-cyan/20">
        <div 
          className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.8)] transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center gap-6">
        <motion.div 
          key={currentTrack.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-24 h-24 rounded-lg overflow-hidden border border-neon-magenta/40 flex-shrink-0"
        >
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <MusicIcon className="w-8 h-8 text-neon-cyan animate-pulse" />
              </motion.div>
            </div>
          )}
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white truncate neon-glow-cyan">{currentTrack.title}</h3>
          <p className="text-sm text-zinc-400 truncate">{currentTrack.artist}</p>
          
          <div className="mt-4 flex items-center justify-between">
            <button onClick={handlePrev} className="p-2 hover:text-neon-cyan transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={togglePlay} 
              className="p-3 bg-neon-cyan/20 hover:bg-neon-cyan/30 rounded-full border border-neon-cyan/50 text-neon-cyan transition-all transform hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(0,243,255,0.2)]"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
            </button>
            <button onClick={handleNext} className="p-2 hover:text-neon-cyan transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
            <div className="hidden sm:block ml-2 p-2 text-zinc-500">
               <Volume2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />
      
      {/* Visualizer bars placeholder */}
      <div className="mt-6 flex items-end justify-between h-8 gap-1">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="w-full bg-neon-magenta/40 rounded-t-sm"
            animate={{ 
              height: isPlaying ? [4, Math.random() * 32 + 4, 4] : 4,
              backgroundColor: isPlaying ? ['#ff00ff40', '#00f3ff40', '#ff00ff40'] : '#ff00ff20'
            }}
            transition={{ 
              duration: 0.5 + Math.random(), 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};
