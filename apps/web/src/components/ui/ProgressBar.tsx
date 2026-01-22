import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: 'green' | 'blue' | 'yellow' | 'red';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

const colors = {
  green: 'bg-emerald-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
};

const sizes = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export function ProgressBar({
  value,
  max,
  color = 'green',
  size = 'md',
  showLabel = false,
  label,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between mb-1 text-sm">
          <span className="text-slate-400">{label}</span>
          <span className="text-slate-300">
            {value}/{max}
          </span>
        </div>
      )}
      <div className={`w-full bg-slate-700 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full rounded-full ${colors[color]}`}
        />
      </div>
    </div>
  );
}
