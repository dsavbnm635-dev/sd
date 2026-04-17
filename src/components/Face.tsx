import React from 'react';
import { motion, useAnimation } from 'motion/react';

interface FaceProps {
  wakeLevel: number; // 0 (sleeping) to 1 (awake)
  isPulsing: boolean;
}

export const Face: React.FC<FaceProps> = ({ wakeLevel, isPulsing }) => {
  const isFullyAwake = wakeLevel >= 1;
  return (
    <motion.div
      className="relative w-80 h-96 flex items-center justify-center translate-y-4"
      animate={{
        scale: isPulsing ? 1.02 : 1,
        y: isPulsing ? -4 : 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Background Glow */}
      <motion.div 
        className="absolute w-[120%] h-[120%] rounded-full blur-[60px] pointer-events-none"
        animate={{
          background: wakeLevel > 0.5 ? 'radial-gradient(circle, rgba(255, 0, 255, 0.15) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(255, 244, 79, 0.1) 0%, transparent 70%)'
        }}
      />

      <svg
        viewBox="0 0 200 240"
        className="w-full h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={isFullyAwake ? "An awake, welcoming face" : "A sleeping face illustration"}
      >
        {/* Neck */}
        <path d="M 85 180 Q 100 190 115 180 V 210 Q 100 220 85 210 V 180" fill="#DEDBD3" opacity="0.6" />
        
        {/* Face Shape - Organic Oval */}
        <motion.path
          d="M 100 30 C 60 30 40 60 40 105 C 40 160 70 195 100 195 C 130 195 160 160 160 105 C 160 60 140 30 100 30 Z"
          fill="#DEDBD3"
          animate={{
            fill: wakeLevel > 0.8 ? "#E8E6E0" : "#DEDBD3",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Shadow on Face */}
        <path d="M 160 105 C 160 160 130 195 100 195 C 115 195 140 170 145 105" fill="#1A1A1A" opacity="0.03" />

        {/* Minimal Hair - Artistic Line */}
        <motion.path
          d="M 40 105 Q 40 30 100 30 Q 160 30 160 105"
          stroke="#1A1A1A"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.1"
          animate={{
            opacity: 0.1 + (wakeLevel * 0.2)
          }}
        />

        {/* Eyes - Left */}
        <g transform="translate(70, 110)">
          {/* Eye Socket/Shadow */}
          <circle cx="0" cy="0" r="14" fill="#1A1A1A" opacity="0.02" />
          
          {/* Eye Lid */}
          <motion.path
            d="M -12 0 Q 0 -12 12 0"
            stroke="#FF00FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{
              scaleY: 1 - wakeLevel,
              opacity: 0.8 - (wakeLevel * 0.5)
            }}
          />

          {/* Eye Shape */}
          <motion.ellipse
            cx="0"
            cy="0"
            rx="12"
            ry="8"
            fill="#E5E5E1"
            stroke="#FF00FF"
            strokeWidth="1.5"
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: wakeLevel,
              opacity: wakeLevel,
            }}
            style={{ filter: "drop-shadow(0 0 4px rgba(255, 0, 255, 0.4))" }}
          />

          {/* Pupil */}
          <motion.circle
            cx="0"
            cy="0"
            r="4"
            fill="#1A1A1A"
            animate={{
              scale: wakeLevel,
              opacity: wakeLevel,
            }}
          />
        </g>

        {/* Eyes - Right */}
        <g transform="translate(130, 110)">
          {/* Eye Socket/Shadow */}
          <circle cx="0" cy="0" r="14" fill="#1A1A1A" opacity="0.02" />

          {/* Eye Lid */}
          <motion.path
            d="M -12 0 Q 0 -12 12 0"
            stroke="#FF00FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{
              scaleY: 1 - wakeLevel,
              opacity: 0.8 - (wakeLevel * 0.5)
            }}
          />

          {/* Eye Shape */}
          <motion.ellipse
            cx="0"
            cy="0"
            rx="12"
            ry="8"
            fill="#E5E5E1"
            stroke="#FF00FF"
            strokeWidth="1.5"
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: wakeLevel,
              opacity: wakeLevel,
            }}
            style={{ filter: "drop-shadow(0 0 4px rgba(255, 0, 255, 0.4))" }}
          />

          {/* Pupil */}
          <motion.circle
            cx="0"
            cy="0"
            r="4"
            fill="#1A1A1A"
            animate={{
              scale: wakeLevel,
              opacity: wakeLevel,
            }}
          />
        </g>

        {/* Nose - Minimal Dot */}
        <circle cx="100" cy="135" r="1.5" fill="#1A1A1A" opacity="0.1" />

        {/* Mouth */}
        <motion.path
          d="M 88 155 Q 100 157 112 155"
          stroke="#FF00FF"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            d: wakeLevel > 0.8 ? "M 85 155 Q 100 170 115 155" : "M 88 155 Q 100 157 112 155",
            opacity: 0.3 + (wakeLevel * 0.7)
          }}
        />
      </svg>
    </motion.div>
  );
};


