import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

interface Pokemon {
  id: number;
  name: string;
  url: string;
  image: string;
  types?: string[];
}

interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

interface PokemonContextType {
  pokemon: Pokemon[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  selectedPokemon: PokemonDetail | null;
  detailLoading: boolean;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  fetchPokemon: () => Promise<void>;
  fetchPokemonDetail: (id: number) => Promise<void>;
  clearSelectedPokemon: () => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

const ITEMS_PER_PAGE = 20;

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Fetch all Pokemon names for search (lightweight)
  const fetchAllPokemonNames = useCallback(async () => {
    if (allPokemon.length > 0) return;
    
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1500');
      if (!response.ok) throw new Error('Failed to fetch Pokémon names');
      
      const data = await response.json();
      const pokemonList = data.results.map((p: { name: string; url: string }) => {
        const id = parseInt(p.url.split('/').filter(Boolean).pop() || '0');
        return {
          ...p,
          id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
      });
      
      setAllPokemon(pokemonList);
      setTotalCount(data.count);
    } catch (err) {
      console.error('Failed to fetch all pokemon names:', err);
    }
  }, [allPokemon.length]);

  const fetchPokemon = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const offset = (currentPage - 1) * ITEMS_PER_PAGE;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`);
      if (!response.ok) throw new Error('Failed to fetch Pokémon');
      
      const data = await response.json();
      setTotalCount(data.count);
      
      const pokemonWithImages = data.results.map((p: { name: string; url: string }) => {
        const id = parseInt(p.url.split('/').filter(Boolean).pop() || '0');
        return {
          ...p,
          id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
      });
      
      setPokemon(pokemonWithImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  // Search through all Pokemon (client-side filter of names list)
  const searchPokemon = useCallback(async (term: string) => {
    if (!term.trim()) {
      fetchPokemon();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const filtered = allPokemon.filter(p =>
        p.name.toLowerCase().includes(term.toLowerCase())
      );
      
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
      
      setPokemon(paginated);
      setTotalCount(filtered.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [allPokemon, currentPage, fetchPokemon]);

  // Fetch all names on mount for search functionality
  useEffect(() => {
    fetchAllPokemonNames();
  }, [fetchAllPokemonNames]);

  // Fetch Pokemon when page changes or search term changes
  useEffect(() => {
    if (searchTerm) {
      searchPokemon(searchTerm);
    } else {
      fetchPokemon();
    }
  }, [currentPage, searchTerm, searchPokemon, fetchPokemon]);

  const fetchPokemonDetail = useCallback(async (id: number) => {
    setDetailLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) throw new Error('Failed to fetch Pokémon details');
      
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const clearSelectedPokemon = useCallback(() => {
    setSelectedPokemon(null);
  }, []);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <PokemonContext.Provider
      value={{
        pokemon,
        loading,
        error,
        searchTerm,
        currentPage,
        totalPages,
        totalCount,
        selectedPokemon,
        detailLoading,
        setSearchTerm: (term) => {
          setSearchTerm(term);
          setCurrentPage(1);
        },
        setCurrentPage,
        fetchPokemon,
        fetchPokemonDetail,
        clearSelectedPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};
