/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Activity, Radio, Cpu, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] relative flex flex-col items-center justify-center px-4 py-8">
      {/* Decorative scanning line effect */}
      <div className="scanline" />
      
      {/* Glitch Overlay Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute top-0 left-0 w-full h-[150%] bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent animate-pulse" />
      </div>

      <header className="mb-8 text-center relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-zinc-900">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-neon-magenta/10 rounded-xl border border-neon-magenta/30 shadow-[0_0_15px_rgba(255,0,255,0.1)]">
            <Cpu className="w-8 h-8 text-neon-magenta" />
          </div>
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white neon-glow-cyan uppercase">
              NEON BEATS
            </h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.3em]">Neural Interface v2.4.0</p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-zinc-400 font-mono text-[10px] uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-neon-lime animate-pulse" />
            <span>Connection: STABLE</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-neon-cyan" />
            <span>Sync: 99.8%</span>
          </div>
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-neon-magenta" />
            <span>Mode: HYPERDRIVE</span>
          </div>
        </div>
      </header>

      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Sidebar Left: Extra info or decorative */}
        <div className="lg:col-span-3 hidden lg:flex flex-col gap-6 h-full">
          <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-xl flex-1">
             <h3 className="text-zinc-500 font-mono text-[10px] uppercase mb-4 tracking-wider">System Logs</h3>
             <div className="space-y-4 font-mono text-[10px]">
                <div className="flex gap-2">
                   <span className="text-neon-cyan">[OK]</span>
                   <span className="text-zinc-400">Audio driver initialized</span>
                </div>
                <div className="flex gap-2">
                   <span className="text-neon-cyan">[OK]</span>
                   <span className="text-zinc-400">Snake core loaded</span>
                </div>
                <div className="flex gap-2 text-neon-magenta">
                   <span>[WRN]</span>
                   <span>High performance detected</span>
                </div>
                <div className="flex gap-2">
                   <span className="text-neon-cyan">[OK]</span>
                   <span className="text-zinc-400">Neon buffers flushed</span>
                </div>
             </div>
          </div>
          
          <div className="bg-neon-magenta/5 border border-neon-magenta/20 p-6 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2">
               <div className="w-2 h-2 rounded-full bg-neon-magenta shadow-[0_0_8px_#ff00ff]" />
            </div>
            <p className="text-neon-magenta font-mono text-xs mb-1">PRO TIP</p>
            <p className="text-zinc-300 text-sm italic">"The music pulses with your score. Keep the rhythm to unlock neural flow."</p>
          </div>
        </div>

        {/* Center: Snake Game */}
        <div className="lg:col-span-6 flex justify-center py-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full h-full flex items-center justify-center lg:items-start"
          >
            <SnakeGame />
          </motion.div>
        </div>

        {/* Sidebar Right: Music Player */}
        <div className="lg:col-span-3 flex flex-col gap-8 h-full">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <MusicPlayer />
          </motion.div>
          
          <div className="hidden lg:block bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl flex-1 overflow-y-auto max-h-[300px]">
             <h3 className="text-zinc-500 font-mono text-[10px] uppercase mb-6 tracking-wider border-b border-zinc-800 pb-2 flex justify-between">
                <span>Playlist Architecture</span>
                <span>03 TRACKS</span>
             </h3>
             <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center text-[10px] text-zinc-500">01</div>
                   <div>
                      <p className="text-sm font-bold text-white leading-none mb-1">Synthwave Horizon</p>
                      <p className="text-[10px] text-zinc-500 font-mono italic">Neural Drift</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center text-[10px] text-zinc-500 text-neon-cyan border border-neon-cyan/30">02</div>
                   <div>
                      <p className="text-sm font-bold text-white leading-none mb-1">Neon Pulse</p>
                      <p className="text-[10px] text-zinc-500 font-mono italic">Cyber Rhythm</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center text-[10px] text-zinc-500">03</div>
                   <div>
                      <p className="text-sm font-bold text-white leading-none mb-1">Midnight Matrix</p>
                      <p className="text-[10px] text-zinc-500 font-mono italic">Digital Ghost</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 text-zinc-600 font-mono text-[8px] uppercase tracking-[0.5em] pb-4 relative z-10">
        Design & Interface // AI Generated // Build 2026.04.18
      </footer>
    </div>
  );
}
