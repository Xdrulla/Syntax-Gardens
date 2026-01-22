import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { ValidationResult } from '../../types';

interface TestResultsProps {
  result: ValidationResult | null;
  isLoading?: boolean;
}

export function TestResults({ result, isLoading = false }: TestResultsProps) {
  if (isLoading) {
    return (
      <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
        <div className="flex items-center gap-3">
          <div className="animate-spin h-5 w-5 border-2 border-emerald-500 border-t-transparent rounded-full" />
          <span className="text-slate-300">Executando testes...</span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
        <div className="flex items-center gap-3 text-slate-400">
          <AlertCircle size={20} />
          <span>Clique em "Testar Codigo" para verificar sua solucao</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg border ${
        result.success
          ? 'bg-emerald-900/30 border-emerald-700'
          : 'bg-red-900/30 border-red-700'
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        {result.success ? (
          <>
            <CheckCircle className="text-emerald-400" size={24} />
            <span className="text-emerald-400 font-semibold text-lg">
              Todos os testes passaram!
            </span>
          </>
        ) : (
          <>
            <XCircle className="text-red-400" size={24} />
            <span className="text-red-400 font-semibold text-lg">
              {result.passedTests}/{result.totalTests} testes passaram
            </span>
          </>
        )}
      </div>

      {result.errors.length > 0 && (
        <div className="space-y-2">
          {result.errors.map((error, index) => (
            <div
              key={index}
              className="p-3 bg-slate-900/50 rounded-lg text-sm font-mono text-red-300 whitespace-pre-wrap"
            >
              {error}
            </div>
          ))}
        </div>
      )}

      {result.success && (
        <p className="text-emerald-300 text-sm mt-2">
          Excelente trabalho! Sua planta foi regada com sucesso.
        </p>
      )}
    </motion.div>
  );
}
