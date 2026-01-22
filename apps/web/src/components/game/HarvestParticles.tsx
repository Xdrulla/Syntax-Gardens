import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface HarvestParticlesProps {
  isActive: boolean;
  quality: 'poor' | 'normal' | 'perfect';
}

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
  type: 'leaf' | 'sparkle' | 'coin';
}

const qualityColors = {
  poor: {
    primary: '#9CA3AF',
    secondary: '#6B7280',
    sparkle: '#D1D5DB',
  },
  normal: {
    primary: '#34D399',
    secondary: '#10B981',
    sparkle: '#FCD34D',
  },
  perfect: {
    primary: '#FBBF24',
    secondary: '#F59E0B',
    sparkle: '#FEF3C7',
  },
};

export function HarvestParticles({ isActive, quality }: HarvestParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    const count = quality === 'perfect' ? 20 : quality === 'normal' ? 12 : 6;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 120,
      y: -Math.random() * 80 - 40,
      rotation: Math.random() * 720 - 360,
      scale: 0.5 + Math.random() * 0.8,
      delay: Math.random() * 0.2,
      type: i % 3 === 0 ? 'coin' : i % 2 === 0 ? 'sparkle' : 'leaf',
    }));
  }, [quality]);

  const colors = qualityColors[quality];

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            opacity: [1, 1, 0],
            x: particle.x,
            y: particle.y,
            scale: [0, particle.scale, particle.scale * 0.5],
            rotate: particle.rotation,
          }}
          transition={{
            duration: 0.8,
            delay: particle.delay,
            ease: 'easeOut',
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {particle.type === 'leaf' && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill={colors.primary}>
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c4 0 8.4-1.8 11.4-7.5A14.28 14.28 0 0021 8a4.67 4.67 0 00-4 0z" />
            </svg>
          )}
          {particle.type === 'sparkle' && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill={colors.sparkle}>
              <path d="M12 2L13.09 8.26L19 7L14.74 11.74L21 13.65L14.74 15.26L19 20L13.09 18.74L12 25L10.91 18.74L5 20L9.26 15.26L3 13.65L9.26 11.74L5 7L10.91 8.26L12 2Z" />
            </svg>
          )}
          {particle.type === 'coin' && (
            <div
              className="w-3 h-3 rounded-full border-2"
              style={{
                backgroundColor: colors.secondary,
                borderColor: colors.primary,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
