import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Sun, Cloud, Snowflake } from 'lucide-react';
import { useSeasonStore } from '../../stores/seasonStore';
import { usePlayerStore } from '../../stores';
import type { Season } from '../../types';

const seasonConfig: Record<
  Season,
  {
    icon: React.ReactNode;
    name: string;
    color: string;
    bgGradient: string;
    particles: string[];
  }
> = {
  spring: {
    icon: <Leaf className="w-16 h-16" />,
    name: 'Primavera',
    color: 'text-green-400',
    bgGradient: 'from-green-900/90 via-emerald-800/90 to-teal-900/90',
    particles: ['🌸', '🌷', '🌱', '🦋'],
  },
  summer: {
    icon: <Sun className="w-16 h-16" />,
    name: 'Verao',
    color: 'text-yellow-400',
    bgGradient: 'from-yellow-900/90 via-orange-800/90 to-red-900/90',
    particles: ['☀️', '🌻', '🐝', '🌴'],
  },
  autumn: {
    icon: <Cloud className="w-16 h-16" />,
    name: 'Outono',
    color: 'text-orange-400',
    bgGradient: 'from-orange-900/90 via-amber-800/90 to-yellow-900/90',
    particles: ['🍂', '🍁', '🌰', '🍄'],
  },
  winter: {
    icon: <Snowflake className="w-16 h-16" />,
    name: 'Inverno',
    color: 'text-blue-400',
    bgGradient: 'from-blue-900/90 via-indigo-800/90 to-slate-900/90',
    particles: ['❄️', '🌨️', '⛄', '🧊'],
  },
};

interface FloatingParticleProps {
  emoji: string;
  delay: number;
  x: number;
}

function FloatingParticle({ emoji, delay, x }: FloatingParticleProps) {
  return (
    <motion.div
      initial={{ y: '100vh', x: `${x}vw`, opacity: 0, rotate: 0 }}
      animate={{
        y: '-20vh',
        opacity: [0, 1, 1, 0],
        rotate: 360,
      }}
      transition={{
        duration: 4,
        delay,
        ease: 'easeOut',
      }}
      className="absolute text-3xl pointer-events-none"
    >
      {emoji}
    </motion.div>
  );
}

export function SeasonTransition() {
  const { player } = usePlayerStore();
  const { seasonTransitioning, activeEvent, clearTransition } = useSeasonStore();

  const config = seasonConfig[player.currentSeason];

  useEffect(() => {
    if (seasonTransitioning) {
      const timer = setTimeout(() => {
        clearTransition();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [seasonTransitioning, clearTransition]);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: config.particles[i % config.particles.length],
    delay: Math.random() * 2,
    x: Math.random() * 100,
  }));

  return (
    <AnimatePresence>
      {seasonTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br ${config.bgGradient}`}
        >
          {particles.map((p) => (
            <FloatingParticle key={p.id} emoji={p.emoji} delay={p.delay} x={p.x} />
          ))}

          <div className="text-center z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 1 }}
              className={config.color}
            >
              {config.icon}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`text-4xl font-bold mt-6 ${config.color}`}
            >
              {config.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-white/80 text-lg mt-2"
            >
              Uma nova estacao comeca!
            </motion.p>

            {activeEvent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-6 bg-white/10 backdrop-blur rounded-xl p-4 max-w-sm mx-auto"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">{activeEvent.icon}</span>
                  <span className="text-white font-bold">{activeEvent.name}</span>
                </div>
                <p className="text-white/70 text-sm">{activeEvent.description}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
