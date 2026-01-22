import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Unlock, X, Sparkles } from 'lucide-react';
import { useUnlockStore, usePlayerStore } from '../../stores';
import { basicPlants } from '../../data/plants';

export function UnlockNotification() {
  const { notifications, dismissNotification, checkAndUnlockPlants } = useUnlockStore();
  const { player } = usePlayerStore();

  useEffect(() => {
    const harvestedPlants = player.stats.harvestedPlants || {};
    checkAndUnlockPlants(basicPlants, player.level, harvestedPlants);
  }, [player.level, player.stats.harvestedPlants, checkAndUnlockPlants]);

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className="relative bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"
              />
            </div>

            <div className="relative p-4">
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center flex-shrink-0">
                  <div className="relative">
                    <Unlock size={28} className="text-yellow-300" />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute -top-1 -right-1"
                    >
                      <Sparkles size={14} className="text-yellow-200" />
                    </motion.div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    Nova Planta!
                  </h4>
                  <p className="text-emerald-100 font-medium">
                    {notification.plantName}
                  </p>
                  <p className="text-emerald-200/70 text-sm mt-1">
                    Agora disponivel na loja!
                  </p>
                </div>

                <button
                  onClick={() => dismissNotification(notification.id)}
                  className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X size={18} className="text-white/70" />
                </button>
              </div>

              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 5, ease: 'linear' }}
                onAnimationComplete={() => dismissNotification(notification.id)}
                className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400/50 origin-left"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
