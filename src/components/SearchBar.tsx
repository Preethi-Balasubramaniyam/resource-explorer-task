import { useState, useEffect, useRef } from 'react';
import { debounce } from '@/utils/debounce';

export default function SearchBar({
  initialValue,
  onSearch,
  status,
  setStatus,
  sort,
  setSort,
}: {
  initialValue: string;
  onSearch: (value: string) => void;
  status: string;
  setStatus: (val: string) => void;
  sort: string;
  setSort: (val: string) => void;
}) {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useRef(
    debounce((val: string) => {
      onSearch(val);
      setLoading(false);
    }, 400)
  ).current;

  useEffect(() => {
    setLoading(true);
    debouncedSearch(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleClear = () => setValue('');

  return (
    <div className="relative w-full mb-2 flex justify-center">
      <div className="flex gap-4 w-full max-w-xl">
        <div className="flex items-center border p-2 rounded bg-white flex-1">
          <span className="text-gray-400" aria-label="Search">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="text"
            className="flex-1 outline-none text-black bg-transparent"
            placeholder="Search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Search input"
          />
          {value && (
            <button
              type="button"
              className="ml-2 text-gray-400 hover:text-gray-600"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex items-center border p-2 rounded bg-white flex-1">
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="w-full bg-gray-50 text-gray-700 border-none outline-none"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
        </div>
        <div className="flex items-center border p-2 rounded bg-white flex-1">
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-full bg-gray-50 text-gray-700 border-none outline-none"
          >
            <option value="">Status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>
    </div>
  );
}
