function FilterPanel({ search, setSearch, cityFilter, setCityFilter }) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '28px',
        borderRadius: '22px',
        boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
        marginBottom: '30px',
        border: '1px solid #e5e7eb'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '22px'
        }}
      >
        <div>
          <p
            style={{
              margin: '0 0 8px',
              color: '#003B71',
              fontWeight: 'bold',
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.7px'
            }}
          >
            Pretraga
          </p>

          <h2
            style={{
              color: '#0f172a',
              margin: 0,
              fontSize: '28px',
              fontWeight: '800'
            }}
          >
            Pronađi fakultet
          </h2>

          <p
            style={{
              margin: '8px 0 0',
              color: '#64748b',
              fontSize: '15px',
              lineHeight: 1.6
            }}
          >
            Pretraži fakultete po nazivu i filtriraj ih prema gradu.
          </p>
        </div>

        <button
          onClick={() => {
            setSearch('');
            setCityFilter('');
          }}
          style={{
            backgroundColor: '#eef4fb',
            color: '#003B71',
            border: '1px solid #d8e4f2',
            padding: '11px 16px',
            borderRadius: '12px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Resetuj filtere
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '14px'
        }}
      >
        <div style={{ position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8',
              fontSize: '16px'
            }}
          >
            🔎
          </span>

          <input
            type="text"
            placeholder="Pretraži po nazivu fakulteta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '15px 16px 15px 44px',
              borderRadius: '14px',
              border: '1px solid #cbd5e1',
              fontSize: '15px',
              boxSizing: 'border-box',
              backgroundColor: '#f8fbff',
              color: '#0f172a',
              outline: 'none'
            }}
          />
        </div>

        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          style={{
            width: '100%',
            padding: '15px 16px',
            borderRadius: '14px',
            border: '1px solid #cbd5e1',
            fontSize: '15px',
            boxSizing: 'border-box',
            backgroundColor: '#f8fbff',
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
          <option value="Bar">Bar</option>
          <option value="Bijelo Polje">Bijelo Polje</option>
          
        </select>
      </div>
    </div>
  );
}

export default FilterPanel;