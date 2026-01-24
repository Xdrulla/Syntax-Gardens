import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, BookOpen, Code, Lightbulb, CheckCircle, EyeOff } from 'lucide-react';
import { Button } from '../ui';
import { useTutorialStore } from '../../stores/tutorialStore';
import type { ConceptTutorial } from '../../data/tutorials';

interface TutorialModalProps {
  isOpen: boolean;
  tutorial: ConceptTutorial | null;
  onClose: () => void;
  onComplete: () => void;
}

type Step = 'intro' | 'analogy' | 'code' | 'keypoints';

const steps: Step[] = ['intro', 'analogy', 'code', 'keypoints'];

export function TutorialModal({ isOpen, tutorial, onClose, onComplete }: TutorialModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const { markTutorialSeen, setSkipAllTutorials } = useTutorialStore();

  const currentStepIndex = steps.indexOf(currentStep);
  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  const handleNext = useCallback(() => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  }, [currentStepIndex, isLastStep]);

  const handlePrev = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  }, [currentStepIndex, isFirstStep]);

  const handleComplete = useCallback(() => {
    if (tutorial) {
      markTutorialSeen(tutorial.conceptId);
    }
    setCurrentStep('intro');
    onComplete();
  }, [tutorial, markTutorialSeen, onComplete]);

  const handleSkip = useCallback(() => {
    if (tutorial) {
      markTutorialSeen(tutorial.conceptId);
    }
    setCurrentStep('intro');
    onClose();
  }, [tutorial, markTutorialSeen, onClose]);

  const handleSkipAll = useCallback(() => {
    setSkipAllTutorials(true);
    if (tutorial) {
      markTutorialSeen(tutorial.conceptId);
    }
    setCurrentStep('intro');
    onClose();
  }, [setSkipAllTutorials, tutorial, markTutorialSeen, onClose]);

  if (!tutorial) return null;

  const stepContent: Record<Step, { icon: typeof BookOpen; title: string; content: React.ReactNode }> = {
    intro: {
      icon: BookOpen,
      title: 'O que vamos aprender',
      content: (
        <div className="space-y-4">
          <div className="text-5xl text-center">{tutorial.icon}</div>
          <p className="text-slate-300 whitespace-pre-line leading-relaxed">
            {tutorial.introduction}
          </p>
        </div>
      ),
    },
    analogy: {
      icon: Lightbulb,
      title: 'Analogia com Jardinagem',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <Lightbulb size={24} />
            <span className="font-medium">Pensando como um jardineiro...</span>
          </div>
          <div className="p-4 bg-amber-900/20 border border-amber-700/50 rounded-lg">
            <p className="text-slate-300 whitespace-pre-line leading-relaxed">
              {tutorial.analogy}
            </p>
          </div>
        </div>
      ),
    },
    code: {
      icon: Code,
      title: 'Exemplo de Codigo',
      content: (
        <div className="space-y-4">
          <pre className="p-4 bg-slate-900 rounded-lg overflow-x-auto text-sm">
            <code className="text-emerald-400 font-mono whitespace-pre">
              {tutorial.codeExample}
            </code>
          </pre>
          <div className="p-4 bg-slate-700/50 rounded-lg">
            <h4 className="font-medium text-slate-200 mb-2">Explicacao:</h4>
            <p className="text-slate-400 text-sm whitespace-pre-line">
              {tutorial.codeExplanation}
            </p>
          </div>
        </div>
      ),
    },
    keypoints: {
      icon: CheckCircle,
      title: 'Pontos-Chave',
      content: (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm">
            Lembre-se destes pontos importantes:
          </p>
          <ul className="space-y-3">
            {tutorial.keyPoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-slate-300">{point}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-700/50 rounded-lg">
            <p className="text-emerald-300 text-center">
              Pronto para colocar em pratica! Vamos resolver o primeiro desafio.
            </p>
          </div>
        </div>
      ),
    },
  };

  const CurrentIcon = stepContent[currentStep].icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleSkip}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-slate-800 rounded-xl shadow-2xl border border-slate-700 max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-gradient-to-r from-emerald-900/20 to-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/50">
                  <BookOpen size={20} className="text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">{tutorial.title}</h2>
                  <p className="text-sm text-slate-400">Tutorial introdutorio</p>
                </div>
              </div>
              <button
                onClick={handleSkip}
                className="p-1 rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="px-6 py-3 border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                {steps.map((step, index) => (
                  <div key={step} className="flex items-center">
                    <button
                      onClick={() => setCurrentStep(step)}
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
                        ${index <= currentStepIndex
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-700 text-slate-400'
                        }
                      `}
                    >
                      {index + 1}
                    </button>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-8 h-1 mx-1 rounded ${
                          index < currentStepIndex ? 'bg-emerald-500' : 'bg-slate-700'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-slate-400">
                <CurrentIcon size={16} />
                <span>{stepContent[currentStep].title}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {stepContent[currentStep].content}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-700 bg-slate-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSkipAll}
                    className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    <EyeOff size={14} />
                    Nao mostrar tutoriais
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {!isFirstStep && (
                    <Button variant="secondary" onClick={handlePrev}>
                      <ChevronLeft size={18} />
                      Anterior
                    </Button>
                  )}

                  <Button variant="primary" onClick={handleNext}>
                    {isLastStep ? (
                      <>
                        Iniciar Desafio
                        <ChevronRight size={18} />
                      </>
                    ) : (
                      <>
                        Proximo
                        <ChevronRight size={18} />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
