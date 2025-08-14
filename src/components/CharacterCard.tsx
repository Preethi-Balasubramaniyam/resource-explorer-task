import { Character } from '@/types/character';
import { useFavorites } from '@/hooks/useFavorites';
import Link from 'next/link';
import Image from 'next/image';

export default function CharacterCard({ character }: { character: Character }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.includes(character.id);

  return (
    <div className="border rounded p-4 shadow">
      <Image src={character.image} alt={character.name} width={300} height={300} className="rounded" />
      <h2 className="text-lg font-bold">{character.name}</h2>
      <p>{character.status} - {character.species}</p>
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={() => toggleFavorite(character.id)}
          aria-label={isFav ? 'Unfavorite' : 'Favorite'}
          className="p-2 rounded-full focus:outline-none"
        >
          {isFav ? (
            <svg width="24" height="24" fill="red" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          )}
        </button>
        <Link href={`/characters/${character.id}`}>
          <button className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-green-600">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
