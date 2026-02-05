import { usePokemon } from '@/context/PokemonContext';
import { Card } from '@/components/ui/card';

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
}

const PokemonCard = ({ id, name, image }: PokemonCardProps) => {
  const { fetchPokemonDetail } = usePokemon();

  const handleClick = () => {
    fetchPokemonDetail(id);
  };

  return (
    <Card
      onClick={handleClick}
      className="pokemon-card group cursor-pointer overflow-hidden bg-card hover:shadow-pokemon transition-all duration-300 hover:-translate-y-2"
    >
      <div className="relative p-4 bg-gradient-to-br from-muted/50 to-muted">
        <span className="absolute top-2 right-2 text-sm font-bold text-muted-foreground">
          #{id.toString().padStart(3, '0')}
        </span>
        <div className="aspect-square flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
            loading="lazy"
          />
        </div>
      </div>
      <div className="p-4 text-center">
        <h3 className="font-bold text-lg capitalize text-foreground">{name}</h3>
      </div>
    </Card>
  );
};

export default PokemonCard;
