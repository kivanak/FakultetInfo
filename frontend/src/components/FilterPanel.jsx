function FilterPanel({ search, setSearch, cityFilter, setCityFilter }) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '26px',
        borderRadius: '18px',
        boxShadow: '0 10px 28px rgba(15, 23, 42, 0.08)',
        marginBottom: '28px',
        border: '1px solid #e5e7eb'
      }}
    >
      <div
        style={{
          marginBottom: '18px'
        }}
      >
        <h2
          style={{
            color: '#003B71',
            margin: 0,
            fontSize: '26px'
          }}
        >
          Pretraga fakulteta
        </h2>

        <p
          style={{
            margin: '6px 0 0',
            color: '#64748b',
            fontSize: '14px'
          }}
        >
          Pretraži fakultete po nazivu ili gradu.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '14px'
        }}
      >
        <input
          type="text"
          placeholder="Pretraži po nazivu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: '12px',
            border: '1px solid #cbd5e1',
            fontSize: '15px',
            boxSizing: 'border-box',
            backgroundColor: 'white',
            color: '#0f172a',
            outline: 'none'
          }}
        />

        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 16px',
            borderRadius: '12px',
            border: '1px solid #cbd5e1',
            fontSize: '15px',
            boxSizing: 'border-box',
            backgroundColor: 'white',
            color: '#0f172a',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="">Svi gradovi</option>
          <option value="Podgorica">Podgorica</option>
          <option value="Nikšić">Nikšić</option>
          <option value="Cetinje">Cetinje</option>
          <option value="Kotor">Kotor</option>
        </select>
      </div>
    </div>
  );
}

export default FilterPanel;