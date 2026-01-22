import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Star, Sparkles, TrendingUp } from 'lucide-react';

export type HarvestQuality = 'poor' | 'normal' | 'perfect';

export interface HarvestRewardData {
  plantName: string;
  quality: HarvestQuality;
  baseCoins: number;
  baseXp: number;
  bonusCoins: number;
  bonusXp: number;
  totalCoins: number;
  totalXp: number;
}

interface HarvestRewardProps {
  isVisible: boolean;
  data: HarvestRewardData | null;
  onClose: () => void;
}

const qualityConfig = {
  poor: {
    label: 'Comum',
    color: 'from-gray-500 to-gray-600',
    textColor: 'text-gray-300',
    icon: Star,
    stars: 1,
    multiplier: '0.75x',
  },
  normal: {
    label: 'Bom',
    color: 'from-emerald-500 to-teal-600',
    textColor: 'text-emerald-300',
    icon: Star,
    stars: 2,
    multiplier: '1x',
  },
  perfect: {
    label: 'Perfeito!',
    color: 'from-amber-400 to-yellow-500',
    textColor: 'text-yellow-300',
    icon: Sparkles,
    stars: 3,
    multiplier: '1.5x',
  },
};

export function HarvestReward({ isVisible, data, onClose }: HarvestRewardProps) {
  if (!data) return null;

  const config = qualityConfig[data.quality];
  const IconComponent = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 50 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-80 bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
          >
            <div className={`bg-gradient-to-r ${config.color} p-4`}>
              <div className="flex items-center justify-center gap-2">
                {data.quality === 'perfect' && (
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                )}
                <h3 className="text-xl font-bold text-white">Colheita {config.label}</h3>
                {data.quality === 'perfect' && (
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </div>
              <div className="flex justify-center gap-1 mt-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1 * (i + 1), type: 'spring' }}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        i < config.stars ? 'text-yellow-300 fill-yellow-300' : 'text-white/30'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="text-center">
                <p className="text-slate-400 text-sm">Voce colheu</p>
                <p className="text-white text-lg font-semibold">{data.plantName}</p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <span className="text-slate-300">Moedas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">{data.baseCoins}</span>
                    {data.bonusCoins > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-emerald-400 font-medium"
                      >
                        +{data.bonusCoins}
                      </motion.span>
                    )}
                    {data.bonusCoins < 0 && (
                      <span className="text-red-400 font-medium">{data.bonusCoins}</span>
                    )}
                    <span className="text-yellow-400 font-bold">= {data.totalCoins}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    <span className="text-slate-300">Experiencia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">{data.baseXp}</span>
                    {data.bonusXp > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-emerald-400 font-medium"
                      >
                        +{data.bonusXp}
                      </motion.span>
                    )}
                    {data.bonusXp < 0 && (
                      <span className="text-red-400 font-medium">{data.bonusXp}</span>
                    )}
                    <span className="text-purple-400 font-bold">= {data.totalXp} XP</span>
                  </div>
                </div>
              </div>

              {data.quality === 'perfect' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-sm text-yellow-400"
                >
                  Bonus perfeito! {config.multiplier} de recompensas!
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors"
              >
                Continuar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
