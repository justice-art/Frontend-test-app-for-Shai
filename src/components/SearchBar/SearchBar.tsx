
type Props = {
  query: string;
  onChange: (val: string) => void;
  onSearch: () => void;
};

export default function SearchBar({ query, onChange, onSearch }: Props) {
  return (
    <div className="mb-4 flex">
      <input
        className="border p-2 flex-1"
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      />
      <button className="ml-2 p-2 bg-blue-500 text-white" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}