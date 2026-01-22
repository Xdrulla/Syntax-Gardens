import { useCallback, useRef } from 'react';

type SoundType = 'harvest-poor' | 'harvest-normal' | 'harvest-perfect' | 'plant' | 'water';

const SOUND_FREQUENCIES: Record<SoundType, number[]> = {
  'harvest-poor': [220, 196],
  'harvest-normal': [330, 392, 440],
  'harvest-perfect': [440, 523, 659, 784],
  plant: [261, 329],
  water: [392, 440, 392],
};

const SOUND_DURATIONS: Record<SoundType, number> = {
  'harvest-poor': 150,
  'harvest-normal': 120,
  'harvest-perfect': 100,
  plant: 100,
  water: 80,
};

export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback(
    (frequency: number, duration: number, delay: number = 0, volume: number = 0.3) => {
      try {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        const startTime = ctx.currentTime + delay;
        const endTime = startTime + duration / 1000;

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, endTime);

        oscillator.start(startTime);
        oscillator.stop(endTime + 0.1);
      } catch {
        // Audio not supported
      }
    },
    [getAudioContext]
  );

  const playSound = useCallback(
    (type: SoundType) => {
      const frequencies = SOUND_FREQUENCIES[type];
      const duration = SOUND_DURATIONS[type];

      frequencies.forEach((freq, i) => {
        playTone(freq, duration, i * (duration / 1000) * 0.8, type.includes('perfect') ? 0.4 : 0.3);
      });
    },
    [playTone]
  );

  return { playSound };
}
