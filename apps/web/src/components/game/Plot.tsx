import { motion } from 'framer-motion';
import { Sprout, Flower2, TreeDeciduous, Droplets } from 'lucide-react';
import { HarvestParticles } from './HarvestParticles';
import { getAnyPlantById } from '../../data/plants';
import { useChallengeProgressionStore, getTierColor } from '../../stores';
import type { Plot as PlotType } from '../../types';
import type { GrowthStage } from '../../types';
import type { HarvestQuality } from './HarvestReward';

interface PlotProps {
  plot: PlotType;
  isSelected: boolean;
  isHarvesting?: boolean;
  harvestQuality?: HarvestQuality;
  onSelect: () => void;
  onWater: () => void;
  onHarvest: () => void;
}

const getPlantIcon = (stage: GrowthStage) => {
  switch (stage) {
    case 'seed':
      return <div className="w-3 h-3 bg-amber-700 rounded-full" />;
    case 'sprout':
      return <Sprout className="w-8 h-8 text-green-400" />;
    case 'growing':
      return <Flower2 className="w-10 h-10 text-green-500" />;
    case 'mature':
      return <TreeDeciduous className="w-12 h-12 text-emerald-400" />;
    default:
      return null;
  }
};

const getStageColor = (stage: GrowthStage) => {
  switch (stage) {
    case 'seed':
      return 'from-amber-900/50 to-amber-800/30';
    case 'sprout':
      return 'from-green-900/50 to-green-800/30';
    case 'growing':
      return 'from-green-800/50 to-emerald-700/30';
    case 'mature':
      return 'from-emerald-700/50 to-emerald-600/30';
    default:
      return '';
  }
};

export function Plot({
  plot,
  isSelected,
  isHarvesting = false,
  harvestQuality = 'normal',
  onSelect,
  onWater,
  onHarvest,
}: PlotProps) {
  const hasPlant = plot.plant !== null;
  const isHarvestable = plot.plant?.isHarvestable ?? false;

  // Obtém informações de progresso do conceito da planta
  const { getConceptCompletionInfo } = useChallengeProgressionStore();
  const plantDef = hasPlant ? getAnyPlantById(plot.plant!.plantDefinitionId) : null;
  const conceptProgress = plantDef ? getConceptCompletionInfo(plantDef.type) : null;

  const handleClick = () => {
    if (!hasPlant) {
      onSelect();
    } else if (isHarvestable) {
      onHarvest();
    } else {
      onWater();
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`
        relative aspect-square rounded-xl cursor-pointer
        transition-all duration-200
        border-2
        ${isSelected
          ? 'border-emerald-400 shadow-lg shadow-emerald-500/30'
          : 'border-slate-600 hover:border-slate-500'
        }
        ${hasPlant
          ? `bg-gradient-to-br ${getStageColor(plot.plant!.growthStage)}`
          : 'bg-gradient-to-br from-amber-950/40 to-amber-900/20'
        }
      `}
    >
      {/* Textura do solo */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]" />
      </div>

      {/* Conteudo do plot */}
      <div className="relative w-full h-full flex items-center justify-center">
        {hasPlant ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="flex flex-col items-center"
          >
            {getPlantIcon(plot.plant!.growthStage)}

            {/* Barra de progresso */}
            <div className="absolute bottom-2 left-2 right-2">
              <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${plot.plant!.growthProgress}%` }}
                  className={`h-full rounded-full ${
                    isHarvestable ? 'bg-yellow-400' : 'bg-emerald-400'
                  }`}
                />
              </div>
            </div>

            {/* Indicador de progresso do conceito */}
            {conceptProgress && !isHarvestable && (
              <div className="absolute top-1 left-1 right-1">
                <div className={`text-center text-[10px] font-medium ${getTierColor(conceptProgress.currentTier)}`}>
                  {conceptProgress.completed}/{conceptProgress.total}
                </div>
              </div>
            )}

            {/* Indicador de colheita */}
            {isHarvestable && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-1 -right-1"
              >
                <span className="flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-yellow-500 items-center justify-center text-xs">
                    !
                  </span>
                </span>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center gap-1 text-slate-500">
            <Droplets className="w-6 h-6" />
            <span className="text-xs">Vazio</span>
          </div>
        )}
      </div>

      {/* Indicador de selecao */}
      {isSelected && !hasPlant && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-emerald-500/10 rounded-xl flex items-center justify-center"
        >
          <span className="text-emerald-400 text-sm font-medium">
            Selecione uma semente
          </span>
        </motion.div>
      )}

      {/* Particulas de colheita */}
      <HarvestParticles isActive={isHarvesting} quality={harvestQuality} />
    </motion.div>
  );
}
