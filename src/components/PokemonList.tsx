import { usePokemon } from '@/context/PokemonContext';
import PokemonCard from './PokemonCard';
import PokemonCardSkeleton from './PokemonCardSkeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const PokemonList = () => {
  const { pokemon, loading, error, fetchPokemon } = usePokemon();

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-3">
          {error}
          <Button variant="outline" size="sm" onClick={fetchPokemon}>
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(20)].map((_, i) => (
          <PokemonCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No Pokémon found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} id={p.id} name={p.name} image={p.image} />
      ))}
    </div>
  );
};

export default PokemonList;
