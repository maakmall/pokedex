import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const PokemonCardSkeleton = () => {
  return (
    <Card className="overflow-hidden animate-pulse">
      <div className="relative p-4 bg-gradient-to-br from-muted/30 to-muted/60">
        <div className="absolute top-2 right-2">
          <Skeleton className="h-4 w-10 rounded-full" />
        </div>
        <div className="aspect-square flex items-center justify-center">
          <div className="relative w-32 h-32">
            <Skeleton className="absolute inset-0 rounded-full opacity-20" />
            <Skeleton className="absolute inset-4 rounded-full opacity-40" />
            <Skeleton className="absolute inset-8 rounded-full opacity-60" />
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col items-center gap-2">
        <Skeleton className="h-6 w-20 rounded-md" />
      </div>
    </Card>
  );
};

export default PokemonCardSkeleton;
