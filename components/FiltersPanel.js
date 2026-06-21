export default function FiltersPanel({ brands, selectedBrand, onChange }) {
  return (
    <label className="control-card">
      <span>Filter by brand</span>
      <select value={selectedBrand} onChange={(event) => onChange(event.target.value)}>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand === 'all' ? 'All brands' : brand}
          </option>
        ))}
      </select>
    </label>
  );
}
