import React, { useRef } from 'react';
import { HOMEPAGE_DATA } from '../constants';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import WorldMap from './WorldMap';
import GearShowcase from './GearShowcase';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className="bg-black text-white">
      {/* Hero Section - Full Screen */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">

        {/* Background Ambience */}
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-neon-blue/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <motion.div
          style={{ opacity, scale, y }}
          className="z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="px-4 py-1.5 rounded-full border border-white/10 text-white/60 text-xs uppercase tracking-[0.2em] font-medium bg-white/5 backdrop-blur-md mb-8"
          >
            Portfolio 2025
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-9xl font-black tracking-tighter mb-6 leading-none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 bg-[length:200%_auto] animate-gradient-x"
          >
            {HOMEPAGE_DATA.name.toUpperCase()}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-3xl text-gray-400 font-light max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {HOMEPAGE_DATA.role}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-6"
          >
            <button
              onClick={onExplore}
              className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                探索作品 <ArrowRight size={18} />
              </span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-gray-600"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* World Map Section */}
      <WorldMap />

      {/* Gear Showcase Section */}
      <GearShowcase />

    </div>
  );
};

export default Hero;