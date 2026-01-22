import { motion } from 'framer-motion';
import { Sprout, Check } from 'lucide-react';
import { useInventoryStore } from '../../stores';
import { basicPlants } from '../../data/plants';

export function SeedBag() {
  const { items, selectedSeedId, selectSeed } = useInventoryStore();

  const seeds = items.filter((item) => item.itemType === 'seed');

  const handleSelectSeed = (seedId: string) => {
    if (selectedSeedId === seedId) {
      selectSeed(null);
    } else {
      selectSeed(seedId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 p-4"
    >
      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
        <Sprout className="text-emerald-400" size={20} />
        Sementes
      </h3>

      {seeds.length === 0 ? (
        <p className="text-slate-400 text-sm">Nenhuma semente no inventario</p>
      ) : (
        <div className="space-y-2">
          {seeds.map((seed) => {
            const plantDef = basicPlants.find((p) => p.id === seed.itemId);
            const isSelected = selectedSeedId === seed.itemId;

            return (
              <motion.button
                key={seed.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectSeed(seed.itemId)}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-lg
                  transition-colors border
                  ${isSelected
                    ? 'bg-emerald-900/40 border-emerald-600'
                    : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700'
                  }
                `}
              >
                <div
                  className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    ${isSelected ? 'bg-emerald-800' : 'bg-slate-600'}
                  `}
                >
                  <Sprout
                    size={20}
                    className={isSelected ? 'text-emerald-400' : 'text-slate-400'}
                  />
                </div>

                <div className="flex-1 text-left">
                  <p className={`font-medium ${isSelected ? 'text-emerald-300' : 'text-white'}`}>
                    {plantDef?.displayName || seed.itemId}
                  </p>
                  <p className="text-xs text-slate-400">
                    Quantidade: {seed.quantity}
                  </p>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-emerald-600 rounded-full p-1"
                  >
                    <Check size={14} className="text-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      {selectedSeedId && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm text-emerald-400 text-center"
        >
          Clique em um canteiro vazio para plantar
        </motion.p>
      )}
    </motion.div>
  );
}
