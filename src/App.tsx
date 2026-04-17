/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Face } from './components/Face';
import { Portfolio } from './components/Portfolio';

export default function App() {
  const [isAwake, setIsAwake] = useState(false);
  const [wakeLevel, setWakeLevel] = useState(0); // 0 to 1
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const pulseCountRef = useRef(0);
  const lastPulseTimeRef = useRef(0);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });

    if (isAwake) return;

    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Check if mouse is over the center area (where the face is)
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const distToCenter = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

    // Only count rapid movements near the center
    if (distance > 40 && distToCenter < 200) {
      const now = Date.now();
      if (now - lastPulseTimeRef.current > 120) {
        setIsPulsing(true);
        pulseCountRef.current += 1;
        lastPulseTimeRef.current = now;
        
        const nextWakeLevel = Math.min(1, pulseCountRef.current / 10);
        setWakeLevel(nextWakeLevel);

        if (pulseCountRef.current >= 10) {
          setIsAwake(true);
        }

        setTimeout(() => setIsPulsing(false), 250);
      }
    }

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div className="min-h-screen bg-bg text-ink font-sans relative overflow-hidden">
      {/* Brand Mark Watermark */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 -rotate-90 text-[80px] font-black text-black opacity-[0.02] pointer-events-none whitespace-nowrap z-0 select-none">
        SAHAR JAFARI
      </div>

      <AnimatePresence mode="wait">
        {!showPortfolio ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            {/* Meta Top Nav */}
            <nav className="absolute top-10 w-full px-16 flex justify-between text-[11px] uppercase tracking-[0.15em] font-semibold opacity-60">
              <div>VISUAL DESIGNER & ARTIST</div>
              <div>DUBAI, UAE — 2024</div>
            </nav>

            {/* Background elements (Glow Aura) */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none"
              animate={{
                background: isAwake ? 'radial-gradient(circle, #FF00FF 0%, transparent 70%)' : 'radial-gradient(circle, #FFF44F 0%, transparent 70%)',
                opacity: isAwake ? 0.2 : 0.4
              }}
            />

            <div className="z-10 text-center flex flex-col items-center">
              <AnimatePresence>
                {!isAwake && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 text-xs uppercase tracking-[0.2em] font-medium text-ink max-w-[200px] leading-relaxed"
                  >
                    move the mouse to open his eyes to see my portfolio !
                  </motion.div>
                )}
              </AnimatePresence>

              <Face wakeLevel={wakeLevel} isPulsing={isPulsing} />
              
              <div className="mt-8 h-16">
                <AnimatePresence>
                  {!isAwake && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      className="text-[10px] uppercase tracking-[0.2em] font-medium text-ink/40"
                    >
                      {pulseCountRef.current === 0 ? "Wake up session" : `Waking... ${Math.round(wakeLevel * 100)}%`}
                    </motion.div>
                  )}
                  
                  {isAwake && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: '0 0 25px rgba(255, 0, 255, 0.4)',
                      }}
                      onClick={() => setShowPortfolio(true)}
                      aria-label="Show Portfolio"
                      className="px-10 py-4 bg-transparent border border-magenta rounded-full text-sm uppercase tracking-[0.2em] font-bold shadow-[0_0_20px_rgba(255,0,255,0.2)] transition-all text-magenta flex items-center gap-3 group"
                    >
                      Show My Portfolio
                      <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer Links */}
            <footer className="absolute bottom-10 w-full flex justify-center gap-10 opacity-50 text-[11px] uppercase font-medium">
              <a href="https://www.behance.net/saharjafari" target="_blank" className="hover:opacity-100 transition-opacity">BEHANCE</a>
              <a href="https://www.instagram.com/saharjafari.design" target="_blank" className="hover:opacity-100 transition-opacity">INSTAGRAM</a>
              <a href="https://wa.me/971581945779" target="_blank" className="hover:opacity-100 transition-opacity">WHATSAPP</a>
              <a href="#" className="hover:opacity-100 transition-opacity">CONTACT</a>
            </footer>
          </motion.div>
        ) : (
          <motion.div key="portfolio">
            <Portfolio />
          </motion.div>
        )}
      </AnimatePresence>


      {/* Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#FF00FF] pointer-events-none z-[100] mix-blend-difference"
        style={{ borderColor: '#FF00FF' }}
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isPulsing ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
    </div>
  );
}

