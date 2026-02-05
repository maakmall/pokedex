import { PokemonProvider } from '@/context/PokemonContext';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import PokemonList from '@/components/PokemonList';
import Pagination from '@/components/Pagination';
import PokemonDetail from '@/components/PokemonDetail';

const Index = () => {
  return (
    <PokemonProvider>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <SearchBar />
          </div>
          
          <PokemonList />
          <Pagination />
        </main>

        <PokemonDetail />
      </div>
    </PokemonProvider>
  );
};

export default Index;
