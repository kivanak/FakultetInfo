function FilterPanel({ search, setSearch, cityFilter, setCityFilter }) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '14px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '25px'
      }}
    >
      <h2 style={{ color: '#003B71', marginTop: 0 }}>
        Pretraga fakulteta
      </h2>

      <input
        type="text"
        placeholder="Pretraži po nazivu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
          marginBottom: '12px',
          boxSizing: 'border-box'
        }}
      />

      <select
        value={cityFilter}
        onChange={(e) => setCityFilter(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
          boxSizing: 'border-box'
        }}
      >
        <option value="">Svi gradovi</option>
        <option value="Podgorica">Podgorica</option>
        <option value="Nikšić">Nikšić</option>
        <option value="Cetinje">Cetinje</option>
        <option value="Kotor">Kotor</option>
      </select>
    </div>
  );
}

export default FilterPanel;