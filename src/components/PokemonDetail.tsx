import { Ruler, Weight } from 'lucide-react';
import { usePokemon } from '@/context/PokemonContext';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import TypeBadge from './TypeBadge';
import StatBar from './StatBar';
import { Skeleton } from '@/components/ui/skeleton';
import { typeColors } from '@/lib/pokemonTypes';

const PokemonDetail = () => {
  const { selectedPokemon, detailLoading, clearSelectedPokemon } = usePokemon();

  const isOpen = selectedPokemon !== null || detailLoading;
  const primaryType = selectedPokemon?.types[0]?.type.name || 'normal';
  const bgColor = typeColors[primaryType]?.bg || 'bg-pokemon-normal';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && clearSelectedPokemon()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden bg-card border-0">
        <DialogTitle className="sr-only">
          {selectedPokemon ? `${selectedPokemon.name} Details` : 'Loading Pokémon'}
        </DialogTitle>
        {detailLoading ? (
          <div className="p-8 space-y-6">
            <div className="flex justify-center">
              <Skeleton className="w-48 h-48 rounded-full" />
            </div>
            <Skeleton className="h-8 w-32 mx-auto" />
            <div className="flex justify-center gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        ) : selectedPokemon ? (
          <>
            <div className={`relative ${bgColor} p-8 pb-20`}>
              <div className="flex flex-col items-center">
                <span className="text-white/60 font-bold text-lg mb-2">
                  #{selectedPokemon.id.toString().padStart(3, '0')}
                </span>
                <img
                  src={selectedPokemon.sprites.other['official-artwork'].front_default}
                  alt={selectedPokemon.name}
                  className="w-48 h-48 object-contain drop-shadow-2xl animate-bounce-slow"
                />
              </div>
            </div>

            <div className="p-6 -mt-12 bg-card rounded-t-3xl relative">
              <h2 className="text-2xl font-bold capitalize text-center text-foreground mb-3">
                {selectedPokemon.name}
              </h2>

              <div className="flex justify-center gap-2 mb-6">
                {selectedPokemon.types.map(({ type }) => (
                  <TypeBadge key={type.name} type={type.name} size="md" />
                ))}
              </div>

              <div className="flex justify-center gap-8 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Ruler className="h-5 w-5" />
                  <span className="font-medium">{(selectedPokemon.height / 10).toFixed(1)} m</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Weight className="h-5 w-5" />
                  <span className="font-medium">{(selectedPokemon.weight / 10).toFixed(1)} kg</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-foreground mb-4">Base Stats</h3>
                {selectedPokemon.stats.map(({ stat, base_stat }) => (
                  <StatBar key={stat.name} name={stat.name} value={base_stat} />
                ))}
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default PokemonDetail;
