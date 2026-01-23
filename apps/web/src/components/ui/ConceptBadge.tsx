import { motion } from 'framer-motion';
import { Award, Star, Crown, Circle } from 'lucide-react';
import type { ConceptProgress } from '../../types';

interface ConceptBadgeProps {
  progress: ConceptProgress;
  conceptName: string;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const badgeConfig = {
  none: {
    icon: Circle,
    color: 'text-gray-400',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-300',
    label: 'Iniciante',
  },
  bronze: {
    icon: Award,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-400',
    label: 'Bronze',
  },
  silver: {
    icon: Star,
    color: 'text-slate-400',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-400',
    label: 'Prata',
  },
  gold: {
    icon: Crown,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-400',
    label: 'Ouro',
  },
};

const sizeConfig = {
  sm: { icon: 16, padding: 'p-1.5', text: 'text-xs' },
  md: { icon: 20, padding: 'p-2', text: 'text-sm' },
  lg: { icon: 28, padding: 'p-3', text: 'text-base' },
};

export function ConceptBadge({ progress, conceptName, showDetails = false, size = 'md' }: ConceptBadgeProps) {
  const config = badgeConfig[progress.badge];
  const sizeStyles = sizeConfig[size];
  const Icon = config.icon;

  const totalCompleted = progress.beginnerCompleted + progress.practitionerCompleted + progress.masterCompleted;
  const totalChallenges = progress.beginnerTotal + progress.practitionerTotal + progress.masterTotal;
  const percentage = totalChallenges > 0 ? Math.round((totalCompleted / totalChallenges) * 100) : 0;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`${config.bgColor} ${config.borderColor} border-2 rounded-lg ${sizeStyles.padding} flex flex-col items-center gap-1`}
    >
      <div className={`${config.color} flex items-center gap-1`}>
        <Icon size={sizeStyles.icon} />
        {size !== 'sm' && (
          <span className={`font-semibold ${sizeStyles.text}`}>{config.label}</span>
        )}
      </div>

      {showDetails && (
        <div className="text-center">
          <p className={`font-medium ${sizeStyles.text} text-gray-700`}>{conceptName}</p>
          <p className="text-xs text-gray-500">
            {totalCompleted}/{totalChallenges} ({percentage}%)
          </p>

          {/* Barras de progresso por tier */}
          <div className="mt-2 space-y-1 w-full min-w-[120px]">
            <TierProgress
              label="Iniciante"
              completed={progress.beginnerCompleted}
              total={progress.beginnerTotal}
              color="bg-green-400"
            />
            <TierProgress
              label="Praticante"
              completed={progress.practitionerCompleted}
              total={progress.practitionerTotal}
              color="bg-blue-400"
            />
            <TierProgress
              label="Mestre"
              completed={progress.masterCompleted}
              total={progress.masterTotal}
              color="bg-purple-400"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

interface TierProgressProps {
  label: string;
  completed: number;
  total: number;
  color: string;
}

function TierProgress({ label, completed, total, color }: TierProgressProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-16 text-gray-500 text-right">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
      <span className="w-8 text-gray-500">
        {completed}/{total}
      </span>
    </div>
  );
}

// Componente para mostrar todos os badges do jogador
interface AllBadgesSummaryProps {
  badges: { bronze: number; silver: number; gold: number };
}

export function AllBadgesSummary({ badges }: AllBadgesSummaryProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <Crown size={16} className="text-yellow-500" />
        <span className="text-sm font-semibold">{badges.gold}</span>
      </div>
      <div className="flex items-center gap-1">
        <Star size={16} className="text-slate-400" />
        <span className="text-sm font-semibold">{badges.silver}</span>
      </div>
      <div className="flex items-center gap-1">
        <Award size={16} className="text-amber-600" />
        <span className="text-sm font-semibold">{badges.bronze}</span>
      </div>
    </div>
  );
}

// Componente para mostrar o tier atual de um desafio
interface DifficultyTierBadgeProps {
  tier: 'beginner' | 'practitioner' | 'master';
}

export function DifficultyTierBadge({ tier }: DifficultyTierBadgeProps) {
  const tierConfig = {
    beginner: { label: 'Iniciante', color: 'bg-green-100 text-green-700 border-green-300' },
    practitioner: { label: 'Praticante', color: 'bg-blue-100 text-blue-700 border-blue-300' },
    master: { label: 'Mestre', color: 'bg-purple-100 text-purple-700 border-purple-300' },
  };

  const config = tierConfig[tier];

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${config.color}`}>
      {config.label}
    </span>
  );
}
