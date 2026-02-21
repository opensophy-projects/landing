import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatsProps {
  isNegative: boolean;
}

const generateWaveData = (count: number, seed: number, smoothness: number = 1) => {
  const points: number[] = [];
  for (let i = 0; i < count; i++) {
    const progress = i / (count - 1);
    const wave1 = Math.sin(i * 0.18 * smoothness + seed) * 0.28;
    const wave2 = Math.sin(i * 0.37 * smoothness + seed * 1.7) * 0.16;
    const wave3 = Math.sin(i * 0.6 * smoothness + seed * 0.9) * 0.09;
    const wave4 = Math.sin(i * 1.1 * smoothness + seed * 2.3) * 0.05;
    const trend = progress * 0.15;
    const base = 0.38 + trend;
    const val = Math.min(0.97, Math.max(0.04, base + wave1 + wave2 + wave3 + wave4));
    points.push(val);
  }
  return points;
};

const smoothPath = (points: { x: number; y: number }[]): string => {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const cp1x = points[i].x + (points[i + 1].x - (i > 0 ? points[i - 1].x : points[i].x)) / 6;
    const cp1y = points[i].y + (points[i + 1].y - (i > 0 ? points[i - 1].y : points[i].y)) / 6;
    const cp2x = points[i + 1].x - (i + 2 < points.length ? points[i + 2].x - points[i].x : points[i + 1].x - points[i].x) / 6;
    const cp2y = points[i + 1].y - (i + 2 < points.length ? points[i + 2].y - points[i].y : points[i + 1].y - points[i].y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${points[i + 1].x} ${points[i + 1].y}`;
  }
  return d;
};

interface WaveChartProps {
  isNegative: boolean;
}

const WaveChart: React.FC<WaveChartProps> = ({ isNegative }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 220 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0) setDimensions({ width: rect.width, height: rect.height });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const COUNT = 80;
  const { width, height } = dimensions;
  const padY = 8;
  const chartH = height - padY * 2;

  const mainData = generateWaveData(COUNT, 1.2, 1);
  const secondaryData = generateWaveData(COUNT, 2.8, 0.7).map(v => v * 0.55 + 0.02);

  const toPoints = (data: number[]) =>
    data.map((v, i) => ({
      x: (i / (COUNT - 1)) * width,
      y: padY + (1 - v) * chartH,
    }));

  const mainPts = toPoints(mainData);
  const secPts = toPoints(secondaryData);

  const mainLinePath = smoothPath(mainPts);
  const secLinePath = smoothPath(secPts);

  const areaPath = (pts: { x: number; y: number }[], linePath: string) =>
    `${linePath} L ${pts[pts.length - 1].x} ${height} L ${pts[0].x} ${height} Z`;

  const mainArea = areaPath(mainPts, mainLinePath);
  const secArea = areaPath(secPts, secLinePath);

  const uid = `wave-${isNegative ? 'dark' : 'light'}`;

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`${uid}-mainGrad`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isNegative ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.10)'} />
            <stop offset="100%" stopColor={isNegative ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)'} />
          </linearGradient>
          <linearGradient id={`${uid}-secGrad`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isNegative ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'} />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-10%" y="-80%" width="120%" height="260%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Clip path so area fills only inside viewbox */}
          <clipPath id={`${uid}-clip`}>
            <rect x="0" y="0" width={width} height={height} />
          </clipPath>
        </defs>

        <g clipPath={`url(#${uid}-clip)`}>
          {/* Secondary wave */}
          <path d={secArea} fill={`url(#${uid}-secGrad)`} />
          <path
            d={secLinePath}
            fill="none"
            stroke={isNegative ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.20)'}
            strokeWidth="1.2"
            strokeLinecap="round"
            style={{
              strokeDasharray: 6000,
              strokeDashoffset: 0,
              animation: 'waveDrawSec 2s ease-out forwards',
            }}
          />

          {/* Main wave */}
          <path d={mainArea} fill={`url(#${uid}-mainGrad)`} />
          <path
            d={mainLinePath}
            fill="none"
            stroke={isNegative ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.45)'}
            strokeWidth="1.6"
            strokeLinecap="round"
            filter={`url(#${uid}-glow)`}
            style={{
              strokeDasharray: 6000,
              strokeDashoffset: 0,
              animation: 'waveDrawMain 2s ease-out forwards',
            }}
          />
        </g>

        <style>{`
          @keyframes waveDrawMain {
            from { stroke-dashoffset: 6000; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes waveDrawSec {
            from { stroke-dashoffset: 6000; }
            to   { stroke-dashoffset: 0; }
          }
        `}</style>
      </svg>
    </div>
  );
};

export const Stats: React.FC<StatsProps> = ({ isNegative }) => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-visible py-12 sm:py-16 md:py-20 lg:py-28 ${
        isNegative ? 'bg-[#0a0a0a]' : 'bg-[#E8E7E3]'
      }`}
    >
      <div className="lg:container lg:mx-auto lg:px-4 xl:px-8">
        <div className="lg:max-w-7xl lg:mx-auto px-4 sm:px-6 md:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
                isNegative ? 'text-white' : 'text-black'
              }`}
              style={{ fontFamily: 'UnifixSP, sans-serif' }}
            >
              Контент который читают
            </h2>
            <p className={`text-lg sm:text-xl leading-relaxed max-w-3xl ${
              isNegative ? 'text-white/60' : 'text-black/60'
            }`}>
              Технические статьи, которые находят своего читателя — без воды и по существу.
            </p>
          </motion.div>

          {/* Numbers */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className={cn('border-y py-6 sm:py-8', isNegative ? 'border-white/10' : 'border-black/10')}
            >
              <p className={cn('text-base sm:text-lg', isNegative ? 'text-white/70' : 'text-black/70')}>
                <span className={cn('block text-3xl sm:text-4xl font-bold mb-2', isNegative ? 'text-white' : 'text-black')}>
                  9 000+
                </span>
                Просмотров в среднем.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className={cn('border-y py-6 sm:py-8', isNegative ? 'border-white/10' : 'border-black/10')}
            >
              <p className={cn('text-base sm:text-lg', isNegative ? 'text-white/70' : 'text-black/70')}>
                <span className={cn('block text-3xl sm:text-4xl font-bold mb-2', isNegative ? 'text-white' : 'text-black')}>
                  50 000+
                </span>
                Прочтений за последние месяцы.
              </p>
            </motion.div>
          </div>

          {/* Wave chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Subtle horizontal grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-0">
              {[0, 1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className={cn('w-full border-t', isNegative ? 'border-white/[0.04]' : 'border-black/[0.04]')}
                />
              ))}
            </div>

            <div className="h-48 sm:h-56 md:h-72 w-full relative">
              {inView && <WaveChart isNegative={isNegative} />}

              {/* Left fade */}
              <div
                className="absolute inset-y-0 left-0 w-24 sm:w-32 pointer-events-none"
                style={{
                  background: `linear-gradient(to right, ${isNegative ? '#0a0a0a' : '#E8E7E3'}, transparent)`,
                }}
              />
              {/* Right fade */}
              <div
                className="absolute inset-y-0 right-0 w-24 sm:w-32 pointer-events-none"
                style={{
                  background: `linear-gradient(to left, ${isNegative ? '#0a0a0a' : '#E8E7E3'}, transparent)`,
                }}
              />
            </div>

            <p className={cn(
              'text-center mt-6 text-sm sm:text-base italic',
              isNegative ? 'text-white/50' : 'text-black/50'
            )}>
              Охват растёт с каждой новой публикацией
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};