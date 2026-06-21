export default function SortControls({ value, onChange }) {
  return (
    <label className="control-card">
      <span>Sort products</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Rating: High to Low</option>
        <option value="rating-asc">Rating: Low to High</option>
      </select>
    </label>
  );
}
