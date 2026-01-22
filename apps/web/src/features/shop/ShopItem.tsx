import { motion } from 'framer-motion';
import { Sprout, Lock, Coins, Check, Leaf, Sun, Cloud, Snowflake } from 'lucide-react';
import type { PlantDefinition } from '../../types';
import { Button } from '../../components/ui';

const seasonIcons: Record<string, React.ReactNode> = {
  spring: <Leaf className="w-4 h-4 text-green-400" />,
  summer: <Sun className="w-4 h-4 text-yellow-400" />,
  autumn: <Cloud className="w-4 h-4 text-orange-400" />,
  winter: <Snowflake className="w-4 h-4 text-blue-400" />,
};

const seasonNames: Record<string, string> = {
  spring: 'Primavera',
  summer: 'Verao',
  autumn: 'Outono',
  winter: 'Inverno',
};

interface ShopItemProps {
  plant: PlantDefinition;
  isUnlocked: boolean;
  canAfford: boolean;
  ownedQuantity: number;
  onBuy: () => void;
  unlockReason?: string;
}

export function ShopItem({
  plant,
  isUnlocked,
  canAfford,
  ownedQuantity,
  onBuy,
  unlockReason,
}: ShopItemProps) {
  const tierColors = {
    1: 'from-green-500 to-emerald-600',
    2: 'from-blue-500 to-cyan-600',
    3: 'from-purple-500 to-violet-600',
    4: 'from-orange-500 to-amber-600',
    5: 'from-red-500 to-rose-600',
  };

  const tierBorders = {
    1: 'border-green-600',
    2: 'border-blue-600',
    3: 'border-purple-600',
    4: 'border-orange-600',
    5: 'border-red-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={isUnlocked ? { scale: 1.02 } : undefined}
      className={`
        relative rounded-xl border-2 overflow-hidden
        ${isUnlocked ? tierBorders[plant.tier] : 'border-slate-600'}
        ${isUnlocked ? 'bg-slate-800' : 'bg-slate-800/50'}
      `}
    >
      {!isUnlocked && (
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4">
          <Lock className="text-slate-400 mb-2" size={32} />
          <p className="text-slate-400 text-sm text-center">{unlockReason}</p>
        </div>
      )}

      <div className={`h-2 bg-gradient-to-r ${tierColors[plant.tier]}`} />

      <div className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`
              w-14 h-14 rounded-lg flex items-center justify-center
              bg-gradient-to-br ${tierColors[plant.tier]}
            `}
          >
            <Sprout size={28} className="text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-white truncate">{plant.displayName}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-slate-400">Tier {plant.tier}</p>
              {plant.unlockRequirement?.season && (
                <div className="flex items-center gap-1 bg-slate-700/50 px-1.5 py-0.5 rounded">
                  {seasonIcons[plant.unlockRequirement.season]}
                  <span className="text-xs text-slate-300">
                    {seasonNames[plant.unlockRequirement.season]}
                  </span>
                </div>
              )}
            </div>
          </div>

          {ownedQuantity > 0 && (
            <div className="flex items-center gap-1 bg-emerald-900/50 px-2 py-1 rounded-full">
              <Check size={12} className="text-emerald-400" />
              <span className="text-xs text-emerald-400">{ownedQuantity}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-slate-300 mt-3 line-clamp-2">{plant.description}</p>

        <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
          <span>Regas: {plant.growthTime}</span>
          <span>Valor: {plant.value}</span>
          <span>XP: {plant.experienceGain}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Coins size={18} className="text-yellow-500" />
            <span className="font-semibold text-yellow-400">{plant.shopPrice}</span>
          </div>

          <Button
            variant={canAfford ? 'primary' : 'secondary'}
            size="sm"
            onClick={onBuy}
            disabled={!isUnlocked || !canAfford}
          >
            {canAfford ? 'Comprar' : 'Sem moedas'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
