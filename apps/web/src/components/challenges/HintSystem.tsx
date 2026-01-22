import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

interface HintSystemProps {
  hints: string[];
}

export function HintSystem({ hints }: HintSystemProps) {
  const [revealedHints, setRevealedHints] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const revealNextHint = () => {
    if (revealedHints < hints.length) {
      setRevealedHints((prev) => prev + 1);
      setIsExpanded(true);
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex items-center gap-2 text-yellow-400">
          <Lightbulb size={18} />
          <span className="font-medium">
            Dicas ({revealedHints}/{hints.length})
          </span>
        </div>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 pt-0 space-y-2">
              {hints.slice(0, revealedHints).map((hint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-2 bg-yellow-900/20 border border-yellow-800/50 rounded-lg text-yellow-200 text-sm"
                >
                  <span className="font-semibold text-yellow-400">
                    Dica {index + 1}:
                  </span>{' '}
                  {hint}
                </motion.div>
              ))}

              {revealedHints < hints.length && (
                <button
                  onClick={revealNextHint}
                  className="w-full p-2 text-sm text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20 rounded-lg transition-colors"
                >
                  Revelar proxima dica
                </button>
              )}

              {revealedHints === 0 && (
                <p className="text-slate-400 text-sm text-center py-2">
                  Clique no botao acima para revelar uma dica
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
