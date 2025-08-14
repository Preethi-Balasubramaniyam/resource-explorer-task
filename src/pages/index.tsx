import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '@/utils/api';
import Loader from '@/components/Loader';
import SearchBar from '@/components/SearchBar';
import CharacterCard from '@/components/CharacterCard';
import Pagination from '@/components/Pagination';
import { useState } from 'react';
import { Character } from '@/types/character';

interface CharactersResponse {
  results: Character[];
  info: {
    pages: number;
  };
}

export default function HomePage() {
  const router = useRouter();
  const page =
    typeof router.query.page === 'string'
      ? router.query.page
      : Array.isArray(router.query.page)
      ? router.query.page[0]
      : '1';

  const [search, setSearch] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('name-asc');

  const { data, isLoading, isError, refetch, error } = useQuery<CharactersResponse>({
    queryKey: ['characters', page, activeSearch, status],
    queryFn: async ({ signal }) => {
      return await fetchCharacters({
        page,
        name: activeSearch,
        status,
        signal,
      });
    },
  });

  const handleSearch = (val: string) => {
    setActiveSearch(val);
    router.push({ query: { ...router.query, page: 1 } });
  };

  const handlePageChange = (newPage: number) => {
    router.push({ query: { ...router.query, page: newPage } });
  };

  let results: Character[] = [];
  if (data?.results) {
    results = [...data.results];
    if (sort === 'name-asc') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name-desc') {
      results.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  const totalPages = data?.info?.pages ?? 1;

  return (
    <div className="container mx-auto p-4">
      <SearchBar
        initialValue={search}
        onSearch={handleSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
      />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="col-span-full flex flex-col items-center py-8">
          <div className="text-red-500 mb-2">
            Error: {error instanceof Error ? error.message : 'Failed to load data.'}
          </div>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {results.map((c) => (
            <CharacterCard key={c.id} character={c} />
          ))}
        </div>
      )}
      <Pagination page={Number(page)} totalPages={totalPages} onChange={handlePageChange} />
    </div>
  );
}
