import { motion } from 'framer-motion';
import { Coins, Star, Calendar, Sun, Cloud, Snowflake, Leaf, Store, FastForward } from 'lucide-react';
import { ProgressBar } from '../ui';
import { usePlayerStore, useShopStore } from '../../stores';
import type { Season } from '../../types';

const EXPERIENCE_PER_LEVEL = 100;

const seasonIcons: Record<Season, React.ReactNode> = {
  spring: <Leaf className="text-green-400" size={18} />,
  summer: <Sun className="text-yellow-400" size={18} />,
  autumn: <Cloud className="text-orange-400" size={18} />,
  winter: <Snowflake className="text-blue-400" size={18} />,
};

const seasonNames: Record<Season, string> = {
  spring: 'Primavera',
  summer: 'Verao',
  autumn: 'Outono',
  winter: 'Inverno',
};

export function HUD() {
  const { player, advanceDay } = usePlayerStore();
  const { openShop } = useShopStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 px-4 py-3"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        {/* Info do jogador */}
        <div className="flex items-center gap-6">
          {/* Level */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{player.level}</span>
              </div>
              <motion.div
                key={player.level}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-1 -right-1 bg-yellow-500 rounded-full w-5 h-5 flex items-center justify-center"
              >
                <Star size={12} className="text-yellow-900" />
              </motion.div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold">{player.username}</span>
              <div className="w-32">
                <ProgressBar
                  value={player.experience}
                  max={EXPERIENCE_PER_LEVEL}
                  color="green"
                  size="sm"
                />
              </div>
              <span className="text-xs text-slate-400">
                {player.experience}/{EXPERIENCE_PER_LEVEL} XP
              </span>
            </div>
          </div>

          {/* Moedas */}
          <motion.div
            key={player.coins}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 bg-yellow-900/30 px-3 py-1.5 rounded-lg border border-yellow-700/50"
          >
            <Coins className="text-yellow-400" size={20} />
            <span className="text-yellow-400 font-semibold">{player.coins}</span>
          </motion.div>

          {/* Botao da Loja */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openShop}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 px-4 py-2 rounded-lg font-medium text-white shadow-lg transition-all"
          >
            <Store size={20} />
            <span>Loja</span>
          </motion.button>
        </div>

        {/* Info da estacao */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-700/50 px-3 py-1.5 rounded-lg">
            {seasonIcons[player.currentSeason]}
            <span className="text-slate-300">{seasonNames[player.currentSeason]}</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-700/50 px-3 py-1.5 rounded-lg">
            <Calendar className="text-slate-400" size={18} />
            <span className="text-slate-300">Dia {player.currentDay}/7</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={advanceDay}
            className="flex items-center gap-1.5 bg-slate-700/50 hover:bg-slate-600/50 px-3 py-1.5 rounded-lg transition-colors"
            title="Avancar dia"
          >
            <FastForward className="text-slate-400" size={16} />
            <span className="text-slate-300 text-sm">Dormir</span>
          </motion.button>
        </div>

        {/* Estatisticas rapidas */}
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div>
            <span className="text-emerald-400 font-semibold">
              {player.stats.totalPlantsHarvested}
            </span>{' '}
            colhidas
          </div>
          <div>
            <span className="text-blue-400 font-semibold">
              {player.stats.totalChallengesPassed}
            </span>{' '}
            desafios
          </div>
        </div>
      </div>
    </motion.div>
  );
}
