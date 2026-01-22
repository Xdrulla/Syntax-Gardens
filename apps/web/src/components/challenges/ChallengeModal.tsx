import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Sparkles } from 'lucide-react';
import { Modal, Button } from '../ui';
import { CodeEditor } from './CodeEditor';
import { TestResults } from './TestResults';
import { HintSystem } from './HintSystem';
import { validateCode } from '../../lib/validators/codeValidator';
import { getChallengeById } from '../../data/challenges';
import { useGardenStore, usePlayerStore } from '../../stores';
import type { ValidationResult } from '../../types';

export function ChallengeModal() {
  const { activeChallengeId, currentPlantId, setActiveChallenge, waterPlant } = useGardenStore();
  const { addExperience, incrementChallengesPassed } = usePlayerStore();

  const [code, setCode] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const challenge = activeChallengeId ? getChallengeById(activeChallengeId) : null;

  const handleClose = useCallback(() => {
    setActiveChallenge(null, null);
    setCode('');
    setResult(null);
    setHasCompleted(false);
  }, [setActiveChallenge]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
    setResult(null);
  }, []);

  const handleTest = useCallback(async () => {
    if (!challenge) return;

    setIsLoading(true);
    try {
      const validationResult = await validateCode(code, challenge.testCases);
      setResult(validationResult);

      if (validationResult.success && !hasCompleted) {
        setHasCompleted(true);
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
  }, [challenge, code, hasCompleted]);

  const handleComplete = useCallback(() => {
    if (!challenge || !currentPlantId || !result?.success) return;

    waterPlant(currentPlantId);
    addExperience(challenge.experienceReward);
    incrementChallengesPassed();
    handleClose();
  }, [challenge, currentPlantId, result, waterPlant, addExperience, incrementChallengesPassed, handleClose]);

  if (!challenge) return null;

  return (
    <Modal
      isOpen={!!activeChallengeId}
      onClose={handleClose}
      title={challenge.title}
      size="xl"
    >
      <div className="space-y-6">
        {/* Descricao e instrucoes */}
        <div className="space-y-3">
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
