import { useState } from 'react';
import mapImage from '../assets/montenegro-map.jpg';

function MontenegroMap({ onCityClick }) {
  const [hoveredCity, setHoveredCity] = useState(null);

  const cities = [
    { name: 'Podgorica', x: '49%', y: '58%' },
    { name: 'Nikšić', x: '31%', y: '38%' },
    { name: 'Cetinje', x: '39%', y: '64%' },
    { name: 'Kotor', x: '25%', y: '68%' },
    { name: 'Bar', x: '43%', y: '78%' },
    { name: 'Bijelo Polje', x: '62%', y: '20%' },
    { name: 'Herceg Novi', x: '18%', y: '61%' }
  ];

  return (
    <section
      style={{
        backgroundColor: 'white',
        borderRadius: '24px',
        padding: '24px',
        boxShadow: '0 14px 36px rgba(15, 23, 42, 0.09)',
        border: '1px solid #dbeafe',
        marginBottom: '30px'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '20px'
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
            Mapa
          </p>

          <h2
            style={{
              color: '#0f172a',
              margin: 0,
              fontSize: '28px',
              fontWeight: '800'
            }}
          >
            Lokacije u Crnoj Gori
          </h2>

          <p
            style={{
              margin: '8px 0 0',
              color: '#64748b',
              fontSize: '14px',
              lineHeight: 1.6
            }}
          >
            Pređi preko tačke za naziv grada ili klikni za filtriranje fakulteta.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#eef4fb',
            color: '#003B71',
            padding: '9px 13px',
            borderRadius: '999px',
            fontWeight: 'bold',
            fontSize: '13px'
          }}
        >
          7 lokacija
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          height: '310px',
          backgroundImage: `url(${mapImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '20px',
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
              'linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.32))'
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
                width: '23px',
                height: '23px',
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
                  top: '34px',
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