import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Sparkles, Lightbulb, RefreshCw } from 'lucide-react';
import { Modal, Button } from '../ui';
import { DifficultyTierBadge } from '../ui/ConceptBadge';
import { CodeEditor } from './CodeEditor';
import { TestResults } from './TestResults';
import { HintSystem } from './HintSystem';
import { validateCode } from '../../lib/validators/codeValidator';
import { getChallengeById } from '../../data/challenges';
import { useGardenStore, usePlayerStore, useChallengeProgressionStore, getTierDisplayName, getTierBgColor } from '../../stores';
import { useConceptProgressStore } from '../../stores/conceptProgressStore';
import { useLearningCurveStore } from '../../stores/learningCurveStore';
import type { ValidationResult } from '../../types';

export function ChallengeModal() {
  const { activeChallengeId, currentPlantId, setActiveChallenge, waterPlant } = useGardenStore();
  const { addExperience, incrementChallengesPassed } = usePlayerStore();
  const { markChallengeComplete, getDifficultyTier } = useConceptProgressStore();
  const { getChallengePosition, markChallengeCompleted } = useChallengeProgressionStore();
  const {
    startChallenge,
    recordAttempt,
    completeChallenge: completeLearningChallenge,
    abandonChallenge,
    shouldShowAutoHint,
  } = useLearningCurveStore();

  const [code, setCode] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [showAutoHintSuggestion, setShowAutoHintSuggestion] = useState(false);

  const challenge = activeChallengeId ? getChallengeById(activeChallengeId) : null;

  // Obtém informações de posição do desafio na progressão
  const challengePositionInfo = useMemo(() => {
    if (!activeChallengeId) return null;
    return getChallengePosition(activeChallengeId);
  }, [activeChallengeId, getChallengePosition]);

  // Inicia tracking quando abre desafio
  useEffect(() => {
    if (activeChallengeId) {
      startChallenge(activeChallengeId);
      setShowAutoHintSuggestion(false);
    }
  }, [activeChallengeId, startChallenge]);

  const handleClose = useCallback(() => {
    abandonChallenge();
    setActiveChallenge(null, null);
    setCode('');
    setResult(null);
    setHasCompleted(false);
    setShowAutoHintSuggestion(false);
  }, [setActiveChallenge, abandonChallenge]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
    setResult(null);
  }, []);

  const handleTest = useCallback(async () => {
    if (!challenge) return;

    // Registra tentativa para curva de aprendizado
    recordAttempt(challenge.id);

    setIsLoading(true);
    try {
      const validationResult = await validateCode(code, challenge.testCases);
      setResult(validationResult);

      if (validationResult.success && !hasCompleted) {
        setHasCompleted(true);
      } else if (!validationResult.success) {
        // Verifica se deve sugerir dica automática
        if (shouldShowAutoHint(challenge.id)) {
          setShowAutoHintSuggestion(true);
        }
      }
    } catch {
      setResult({
        success: false,
        passedTests: 0,
        totalTests: challenge.testCases.length,
        errors: ['Erro ao executar o codigo'],
      });
    } finally {
      setIsLoading(false);
    }
  }, [challenge, code, hasCompleted, recordAttempt, shouldShowAutoHint]);

  const handleComplete = useCallback(() => {
    if (!challenge || !currentPlantId || !result?.success) return;

    waterPlant(currentPlantId);
    addExperience(challenge.experienceReward);
    incrementChallengesPassed();
    markChallengeComplete(challenge.id, challenge.plantType);
    markChallengeCompleted(challenge.id, challenge.plantType); // Marca no store de progressão
    completeLearningChallenge(challenge.id, challenge.plantType);
    handleClose();
  }, [challenge, currentPlantId, result, waterPlant, addExperience, incrementChallengesPassed, markChallengeComplete, markChallengeCompleted, completeLearningChallenge, handleClose]);

  if (!challenge) return null;

  const difficultyTier = getDifficultyTier(challenge.id);

  return (
    <Modal
      isOpen={!!activeChallengeId}
      onClose={handleClose}
      title={challenge.title}
      size="xl"
    >
      <div className="space-y-6">
        {/* Indicador de progressão e dificuldade */}
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <DifficultyTierBadge tier={difficultyTier} />
              {challengePositionInfo && (
                <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getTierBgColor(challengePositionInfo.tier)}`}>
                  {getTierDisplayName(challengePositionInfo.tier)} {challengePositionInfo.tierPosition}/{challengePositionInfo.tierTotal}
                </span>
              )}
            </div>
            {challengePositionInfo && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                {challengePositionInfo.isReview && (
                  <span className="flex items-center gap-1 text-amber-400">
                    <RefreshCw size={14} />
                    Revisão
                  </span>
                )}
                <span>
                  Desafio {challengePositionInfo.position} de {challengePositionInfo.total}
                </span>
              </div>
            )}
          </div>
          <p className="text-slate-300">{challenge.description}</p>
          <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
            <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
              <Droplets size={16} />
              Instrucoes
            </h4>
            <pre className="text-slate-300 text-sm whitespace-pre-wrap font-sans">
              {challenge.instructions}
            </pre>
          </div>
        </div>

        {/* Editor de codigo */}
        <div>
          <h4 className="text-sm font-semibold text-slate-400 mb-2">Seu Codigo</h4>
          <CodeEditor
            initialCode={challenge.starterCode || ''}
            onChange={handleCodeChange}
            disabled={isLoading}
          />
        </div>

        {/* Sugestão automática de dica */}
        {showAutoHintSuggestion && !hasCompleted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-amber-900/30 border border-amber-600/50 rounded-lg flex items-center gap-3"
          >
            <Lightbulb size={20} className="text-amber-400 flex-shrink-0" />
            <p className="text-amber-200 text-sm">
              Parece que você está com dificuldade. Que tal dar uma olhada nas dicas abaixo?
            </p>
          </motion.div>
        )}

        {/* Sistema de dicas */}
        <HintSystem hints={challenge.hints} />

        {/* Resultados dos testes */}
        <TestResults result={result} isLoading={isLoading} />

        {/* Botoes de acao */}
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleTest}
            isLoading={isLoading}
            disabled={!code.trim()}
          >
            Testar Codigo
          </Button>
          {result?.success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Button
                variant="success"
                onClick={handleComplete}
                className="flex items-center gap-2"
              >
                <Sparkles size={18} />
                Regar Planta (+{challenge.experienceReward} XP)
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </Modal>
  );
}
