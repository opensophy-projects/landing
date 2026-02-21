import React from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  isNegative?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isNegative = true }) => {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${
        isNegative ? 'bg-[#0a0a0a]' : 'bg-[#E8E7E3]'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-16 h-16"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke={isNegative ? '#E8E7E3' : '#0a0a0a'}
              strokeWidth="2"
              opacity="0.2"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke={isNegative ? '#E8E7E3' : '#0a0a0a'}
              strokeWidth="2"
              strokeDasharray="88 352"
              strokeLinecap="round"
              fill="none"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -352 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
