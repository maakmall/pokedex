import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePokemon } from '@/context/PokemonContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = usePokemon();

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 h-12 text-lg bg-card border-2 border-border focus:border-primary transition-colors rounded-full shadow-sm"
      />
    </div>
  );
};

export default SearchBar;
