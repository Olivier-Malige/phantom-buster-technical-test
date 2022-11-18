import { useSearchParams } from 'react-router-dom';

const KEY = 'search';

const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      if (e.target.value === '') {
        prev.delete(KEY);
      } else {
        prev.set(KEY, e.target.value);
      }
      return prev;
    });
  };

  return (
    <input
      value={searchParams.get(KEY) || ''}
      onChange={handleChange}
      type="text"
      placeholder="Search"
      className="input-bordered input input-md mb-8 w-full max-w-xs"
    />
  );
};

export { SearchInput };
