import { useState } from 'react';
import mapImage from '../assets/montenegro-map.jpg';

function MontenegroMap({ onCityClick }) {
  const [hoveredCity, setHoveredCity] = useState(null);


  const cities = [
  { name: 'Podgorica', x: '48%', y: '64%' },
  { name: 'Nikšić', x: '30%', y: '43%' },
  { name: 'Cetinje', x: '32%', y: '59%' },
  { name: 'Kotor', x: '27%', y: '72%' },
  { name: 'Bar', x: '43%', y: '82%' },
  { name: 'Bijelo Polje', x: '63%', y: '27%' },
];

  return (
    <section
      style={{
        backgroundColor: 'white',
        borderRadius: '22px',
        padding: '18px',
        boxShadow: '0 10px 28px rgba(15, 23, 42, 0.08)',
        border: '1px solid #dbeafe',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ marginBottom: '14px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '12px',
            alignItems: 'center',
            marginBottom: '8px'
          }}
        >
          <p
            style={{
              margin: 0,
              color: '#003B71',
              fontWeight: 'bold',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.7px'
            }}
          >
            Mapa
          </p>

          <span
            style={{
              backgroundColor: '#eef4fb',
              color: '#003B71',
              padding: '6px 10px',
              borderRadius: '999px',
              fontWeight: 'bold',
              fontSize: '12px'
            }}
          >
            6 lokacija
          </span>
        </div>

        <h2
          style={{
            color: '#0f172a',
            margin: 0,
            fontSize: '21px',
            fontWeight: '800',
            lineHeight: 1.25
          }}
        >
          Lokacije
        </h2>

        <p
          style={{
            margin: '6px 0 0',
            color: '#64748b',
            fontSize: '13px',
            lineHeight: 1.5
          }}
        >
          Klikni na tačku i filtriraj fakultete po gradu.
        </p>
      </div>

      <div
        style={{
          position: 'relative',
          minHeight: '230px',
          flex: 1,
          backgroundImage: `url(${mapImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '18px',
          overflow: 'hidden',
          border: '1px solid #dbeafe',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.35)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.30))'
          }}
        />

        {cities.map((city) => (
          <div
            key={city.name}
            style={{
              position: 'absolute',
              left: city.x,
              top: city.y,
              transform: 'translate(-50%, -50%)',
              zIndex: 3
            }}
          >
            <button
              onClick={() => onCityClick(city.name)}
              onMouseEnter={() => setHoveredCity(city.name)}
              onMouseLeave={() => setHoveredCity(null)}
              style={{
                backgroundColor: '#003B71',
                border: '3px solid white',
                borderRadius: '50%',
                width: '21px',
                height: '21px',
                cursor: 'pointer',
                boxShadow: '0 5px 14px rgba(0, 59, 113, 0.35)',
                transition: '0.25s ease'
              }}
            />

            {hoveredCity === city.name && (
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '32px',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'white',
                  color: '#003B71',
                  padding: '6px 10px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  boxShadow: '0 6px 16px rgba(15, 23, 42, 0.18)',
                  border: '1px solid #dbeafe',
                  whiteSpace: 'nowrap'
                }}
              >
                {city.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default MontenegroMap;