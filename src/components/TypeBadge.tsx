import { typeColors } from '@/lib/pokemonTypes';
import { cn } from '@/lib/utils';

interface TypeBadgeProps {
  type: string;
  size?: 'sm' | 'md';
}

const TypeBadge = ({ type, size = 'sm' }: TypeBadgeProps) => {
  const colors = typeColors[type] || { bg: 'bg-gray-400', text: 'text-white' };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-semibold capitalize rounded-full',
        colors.bg,
        colors.text,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-4 py-1 text-sm'
      )}
    >
      {type}
    </span>
  );
};

export default TypeBadge;
