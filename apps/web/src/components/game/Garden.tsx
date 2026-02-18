import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plot } from './Plot';
import { HarvestReward } from './HarvestReward';
import { TutorialModal } from '../tutorials';
import type { HarvestQuality, HarvestRewardData } from './HarvestReward';
import { useGardenStore, useInventoryStore, usePlayerStore, useChallengeProgressionStore } from '../../stores';
import { useTutorialStore } from '../../stores/tutorialStore';
import { getAnyPlantById } from '../../data/plants';
import { getTutorialByConceptId } from '../../data/tutorials';
import type { ConceptTutorial } from '../../data/tutorials';
import { useSound } from '../../hooks';

function calculateHarvestQuality(): HarvestQuality {
  const rand = Math.random();
  if (rand < 0.15) return 'poor';
  if (rand < 0.75) return 'normal';
  return 'perfect';
}

function getQualityMultiplier(quality: HarvestQuality): number {
  switch (quality) {
    case 'poor':
      return 0.75;
    case 'normal':
      return 1;
    case 'perfect':
      return 1.5;
  }
}

export function Garden() {
  const {
    garden,
    selectedPlotId,
    selectPlot,
    plantSeed,
    harvestPlant,
    setActiveChallenge,
  } = useGardenStore();

  const { selectedSeedId, removeItem } = useInventoryStore();
  const { addCoins, addExperience, incrementHarvested } = usePlayerStore();
  const { playSound } = useSound();
  console.log("Teste de PR")

  const [harvestReward, setHarvestReward] = useState<HarvestRewardData | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [harvestingPlotId, setHarvestingPlotId] = useState<string | null>(null);
  const [harvestQuality, setHarvestQuality] = useState<HarvestQuality>('normal');

  // Estado para o tutorial
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentTutorial, setCurrentTutorial] = useState<ConceptTutorial | null>(null);
  const [pendingChallengeInfo, setPendingChallengeInfo] = useState<{ challengeId: string; plotId: string } | null>(null);
  const { hasSeenTutorial } = useTutorialStore();

  const gridSize = Math.sqrt(garden.size);

  const handleSelectPlot = (plotId: string) => {
    if (selectedSeedId) {
      const success = removeItem(selectedSeedId, 1);
      if (success) {
        plantSeed(plotId, selectedSeedId);
      }
    } else {
      selectPlot(plotId === selectedPlotId ? null : plotId);
    }
  };

  // Usa o store de progressão para seleção sequencial de desafios
  const { getNextChallenge } = useChallengeProgressionStore();

  const handleWaterPlant = (plotId: string) => {
    const plot = garden.plots.find((p) => p.id === plotId);
    if (!plot?.plant) return;

    const plantDef = getAnyPlantById(plot.plant.plantDefinitionId);
    if (!plantDef) return;

    // Seleciona o próximo desafio na sequência progressiva
    const nextChallengeInfo = getNextChallenge(plantDef.type);
    if (!nextChallengeInfo) return;

    // Verifica se é o primeiro desafio do conceito e se o tutorial ainda não foi visto
    if (nextChallengeInfo.isFirstOfConcept && !hasSeenTutorial(plantDef.type)) {
      // Busca o tutorial para este conceito
      const tutorial = getTutorialByConceptId(plantDef.type);
      if (tutorial) {
        // Guarda as informações do desafio para abrir após o tutorial
        setPendingChallengeInfo({ challengeId: nextChallengeInfo.challengeId, plotId });
        setCurrentTutorial(tutorial);
        setShowTutorial(true);
        return;
      }
    }

    // Se não precisa de tutorial, vai direto para o desafio
    setActiveChallenge(nextChallengeInfo.challengeId, plotId);
  };

  // Callback quando o tutorial é completado
  const handleTutorialComplete = useCallback(() => {
    setShowTutorial(false);
    // Abre o desafio que estava pendente
    if (pendingChallengeInfo) {
      setActiveChallenge(pendingChallengeInfo.challengeId, pendingChallengeInfo.plotId);
      setPendingChallengeInfo(null);
    }
    setCurrentTutorial(null);
  }, [pendingChallengeInfo, setActiveChallenge]);

  // Callback quando o tutorial é fechado/pulado
  const handleTutorialClose = useCallback(() => {
    setShowTutorial(false);
    setPendingChallengeInfo(null);
    setCurrentTutorial(null);
  }, []);

  const handleHarvestPlant = useCallback((plotId: string) => {
    const plot = garden.plots.find((p) => p.id === plotId);
    if (!plot?.plant) return;

    const plantDef = getAnyPlantById(plot.plant.plantDefinitionId);
    if (!plantDef) return;

    const quality = calculateHarvestQuality();
    const multiplier = getQualityMultiplier(quality);

    const baseCoins = plantDef.value;
    const baseXp = plantDef.experienceGain;
    const totalCoins = Math.round(baseCoins * multiplier);
    const totalXp = Math.round(baseXp * multiplier);
    const bonusCoins = totalCoins - baseCoins;
    const bonusXp = totalXp - baseXp;

    setHarvestQuality(quality);
    setHarvestingPlotId(plotId);

    playSound(`harvest-${quality}`);

    setTimeout(() => {
      const harvestedPlant = harvestPlant(plotId);
      if (harvestedPlant) {
        addCoins(totalCoins);
        addExperience(totalXp);
        incrementHarvested(plantDef.id);

        setHarvestReward({
          plantName: plantDef.displayName,
          quality,
          baseCoins,
          baseXp,
          bonusCoins,
          bonusXp,
          totalCoins,
          totalXp,
        });
        setShowReward(true);
      }
      setHarvestingPlotId(null);
    }, 600);
  }, [garden.plots, harvestPlant, addCoins, addExperience, incrementHarvested, playSound]);

  const handleCloseReward = useCallback(() => {
    setShowReward(false);
    setHarvestReward(null);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto"
      >
        <div
          className="grid gap-3 p-4 bg-slate-800/50 rounded-2xl border border-slate-700"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {garden.plots.map((plot) => (
            <Plot
              key={plot.id}
              plot={plot}
              isSelected={selectedPlotId === plot.id}
              isHarvesting={harvestingPlotId === plot.id}
              harvestQuality={harvestingPlotId === plot.id ? harvestQuality : undefined}
              onSelect={() => handleSelectPlot(plot.id)}
              onWater={() => handleWaterPlant(plot.id)}
              onHarvest={() => handleHarvestPlant(plot.id)}
            />
          ))}
        </div>
      </motion.div>

      <HarvestReward
        isVisible={showReward}
        data={harvestReward}
        onClose={handleCloseReward}
      />

      <TutorialModal
        isOpen={showTutorial}
        tutorial={currentTutorial}
        onClose={handleTutorialClose}
        onComplete={handleTutorialComplete}
      />
    </>
  );
}
