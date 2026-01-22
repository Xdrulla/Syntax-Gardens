import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, Coins, ShoppingBag, Sparkles, Leaf } from 'lucide-react';
import { Modal } from '../../components/ui';
import { ShopItem } from './ShopItem';
import { useShopStore, usePlayerStore, useInventoryStore, useUnlockStore } from '../../stores';
import { basicPlants, seasonalPlants, allPlants } from '../../data/plants';
import type { PlantDefinition } from '../../types';

type ShopTab = 'seeds' | 'seasonal' | 'all';

export function ShopModal() {
  const { isOpen, closeShop } = useShopStore();
  const { player, spendCoins } = usePlayerStore();
  const { addItem, getItemQuantity } = useInventoryStore();
  const { isPlantUnlocked } = useUnlockStore();
  const [activeTab, setActiveTab] = useState<ShopTab>('seeds');
  const [purchaseAnimation, setPurchaseAnimation] = useState<string | null>(null);

  const seasonNames: Record<string, string> = {
    spring: 'Primavera',
    summer: 'Verao',
    autumn: 'Outono',
    winter: 'Inverno',
  };

  const checkUnlockStatus = (plant: PlantDefinition): { unlocked: boolean; reason?: string } => {
    if (isPlantUnlocked(plant.id)) {
      return { unlocked: true };
    }

    if (!plant.unlockRequirement) {
      return { unlocked: true };
    }

    const { level, prerequisitePlants, season } = plant.unlockRequirement;
    const reasons: string[] = [];

    if (level && player.level < level) {
      reasons.push(`Nivel ${level}`);
    }

    if (season && player.currentSeason !== season) {
      reasons.push(`Apenas na ${seasonNames[season]}`);
    }

    if (prerequisitePlants && prerequisitePlants.length > 0) {
      const harvestedPlants = player.stats.harvestedPlants || {};
      const missingPlants = prerequisitePlants.filter(
        (plantId) => !(harvestedPlants[plantId] && harvestedPlants[plantId] > 0)
      );
      if (missingPlants.length > 0) {
        const plantNames = missingPlants
          .map((id) => allPlants.find((p) => p.id === id)?.displayName || id)
          .join(', ');
        reasons.push(`Colha: ${plantNames}`);
      }
    }

    if (reasons.length > 0) {
      return { unlocked: false, reason: reasons.join(' | ') };
    }

    return { unlocked: true };
  };

  const handleBuy = (plant: PlantDefinition) => {
    if (spendCoins(plant.shopPrice)) {
      addItem('seed', plant.id, 1);
      setPurchaseAnimation(plant.id);
      setTimeout(() => setPurchaseAnimation(null), 1000);
    }
  };

  const getDisplayedPlants = (): PlantDefinition[] => {
    let plants: PlantDefinition[];
    switch (activeTab) {
      case 'seeds':
        plants = basicPlants;
        break;
      case 'seasonal':
        plants = seasonalPlants;
        break;
      case 'all':
      default:
        plants = allPlants;
        break;
    }

    return [...plants].sort((a, b) => {
      const aUnlocked = checkUnlockStatus(a).unlocked;
      const bUnlocked = checkUnlockStatus(b).unlocked;
      if (aUnlocked && !bUnlocked) return -1;
      if (!aUnlocked && bUnlocked) return 1;
      return a.tier - b.tier;
    });
  };

  const displayedPlants = getDisplayedPlants();

  return (
    <Modal isOpen={isOpen} onClose={closeShop} title="Loja do Jardim" size="xl">
      <div className="flex flex-col h-full">
        {/* Header com saldo */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
              <Store size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Bem-vindo!</h3>
              <p className="text-sm text-slate-400">Compre sementes para seu jardim</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-700/50 px-4 py-2 rounded-xl">
            <Coins size={24} className="text-yellow-500" />
            <span className="text-2xl font-bold text-yellow-400">{player.coins}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('seeds')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
              ${activeTab === 'seeds'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }
            `}
          >
            <ShoppingBag size={18} />
            Basicas
          </button>
          <button
            onClick={() => setActiveTab('seasonal')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
              ${activeTab === 'seasonal'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }
            `}
          >
            <Leaf size={18} />
            Sazonais
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
              ${activeTab === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }
            `}
          >
            <Sparkles size={18} />
            Todas
          </button>
        </div>

        {/* Grid de itens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto flex-1 pr-2">
          {displayedPlants.map((plant) => {
            const { unlocked, reason } = checkUnlockStatus(plant);
            const canAfford = player.coins >= plant.shopPrice;
            const ownedQuantity = getItemQuantity(plant.id);

            return (
              <div key={plant.id} className="relative">
                <ShopItem
                  plant={plant}
                  isUnlocked={unlocked}
                  canAfford={canAfford}
                  ownedQuantity={ownedQuantity}
                  onBuy={() => handleBuy(plant)}
                  unlockReason={reason}
                />

                {/* Animacao de compra */}
                <AnimatePresence>
                  {purchaseAnimation === plant.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.5, y: -50 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                    >
                      <div className="bg-emerald-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg">
                        +1 Semente!
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footer com dica */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <p className="text-sm text-slate-400 text-center">
            Complete desafios e colha plantas para ganhar mais moedas!
          </p>
        </div>
      </div>
    </Modal>
  );
}
