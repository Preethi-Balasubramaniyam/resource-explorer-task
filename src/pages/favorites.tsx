import { useFavorites } from '@/hooks/useFavorites';
import { useQueries } from '@tanstack/react-query';
import { fetchCharacterById } from '@/utils/api';
import Loader from '@/components/Loader';
import CharacterCard from '@/components/CharacterCard';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const queries = useQueries({
    queries: favorites.map(id => ({
      queryKey: ['character', id],
      queryFn: () => fetchCharacterById(id.toString())
    }))
  });

  if (!favorites.length) return <p className="p-4">No favorites yet.</p>;
  if (queries.some(q => q.isLoading)) return <Loader />;

  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      {queries.map(q => q.data && <CharacterCard key={q.data.id} character={q.data} />)}
    </div>
  );
}
