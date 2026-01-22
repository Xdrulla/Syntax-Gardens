import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { useSeasonStore } from '../../stores/seasonStore';

export function SeasonalEventBanner() {
  const { activeEvent, setActiveEvent } = useSeasonStore();

  if (!activeEvent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-16 left-1/2 -translate-x-1/2 z-40"
      >
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-2xl px-6 py-3 flex items-center gap-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </motion.div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">{activeEvent.icon}</span>
            <div>
              <h4 className="text-white font-bold">{activeEvent.name}</h4>
              <p className="text-white/80 text-sm">{activeEvent.description}</p>
            </div>
          </div>

          <button
            onClick={() => setActiveEvent(null)}
            className="ml-4 p-1 rounded-lg hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
