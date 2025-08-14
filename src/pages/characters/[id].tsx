import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '@/utils/api';
import Loader from '@/components/Loader';
import ErrorState from '@/components/ErrorState';
import { useFavorites } from '@/hooks/useFavorites';
import Image from 'next/image';

export default function CharacterDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { favorites, toggleFavorite } = useFavorites();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id as string),
    enabled: !!id
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorState onRetry={refetch} />;

  const isFav = favorites.includes(data.id);

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold shadow hover:scale-105 transition-transform"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="mr-2">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
        <div className="flex flex-col items-center">
          <Image
            src={data.image}
            alt={data.name}
            className="rounded-full mb-4"
            width={128}
            height={128}
            style={{ objectFit: 'cover', border: '4px solid #e5e7eb' }}
          />
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 bg-clip-text text-transparent">{data.name}</h1>
          <p className="text-gray-600 mb-4">{data.status} - {data.species}</p>
          <button
            onClick={() => toggleFavorite(data.id)}
            className="flex items-center gap-2 mt-2 px-4 py-2 rounded-full border transition-colors duration-200"
            style={{
              background: isFav ? '#fee2e2' : '#f3f4f6',
              borderColor: isFav ? '#f87171' : '#d1d5db',
              color: isFav ? '#ef4444' : '#374151'
            }}
            aria-label={isFav ? 'Unfavorite' : 'Favorite'}
          >
            {isFav ? (
              <svg width="24" height="24" fill="#ef4444" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            )}
            {isFav ? 'Unfavorite' : 'Favorite'}
          </button>
        </div>
      </div>
    </div>
  );
}
