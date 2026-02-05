import { statNames, statColors } from '@/lib/pokemonTypes';
import { cn } from '@/lib/utils';

interface StatBarProps {
  name: string;
  value: number;
  maxValue?: number;
}

const StatBar = ({ name, value, maxValue = 255 }: StatBarProps) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const displayName = statNames[name] || name;
  const barColor = statColors[name] || 'bg-gray-500';

  return (
    <div className="flex items-center gap-3">
      <span className="w-20 text-sm font-medium text-muted-foreground">{displayName}</span>
      <span className="w-10 text-sm font-bold text-foreground text-right">{value}</span>
      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', barColor)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default StatBar;
