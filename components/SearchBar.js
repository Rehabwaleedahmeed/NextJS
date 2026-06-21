export default function SearchBar({ value, onChange, isPending }) {
  return (
    <label className="control-card">
      <span>Search products</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by title, brand, or category"
      />
      <small>{isPending ? 'Updating results...' : 'Search uses deferred rendering for smoother typing.'}</small>
    </label>
  );
}
