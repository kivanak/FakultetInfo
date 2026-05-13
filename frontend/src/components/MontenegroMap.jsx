import mapImage from '../assets/montenegro-map.jpg';

function MontenegroMap({ onCityClick }) {
  const cities = [
    { name: 'Podgorica', x: '49%', y: '58%' },
    { name: 'Nikšić', x: '31%', y: '38%' },
    { name: 'Cetinje', x: '39%', y: '64%' },
    { name: 'Kotor', x: '25%', y: '68%' }
  ];

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '25px',
        minHeight: '420px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <h2 style={{ color: '#003B71', marginTop: 0 }}>
        Fakulteti po gradovima
      </h2>

      <div
        style={{
          position: 'relative',
          height: '380px',
          backgroundImage: `url(${mapImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '14px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(255,255,255,0.35)'
          }}
        />

        {cities.map((city) => (
          <button
            key={city.name}
            onClick={() => onCityClick(city.name)}
            title={city.name}
            style={{
              position: 'absolute',
              left: city.x,
              top: city.y,
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#003B71',
              border: '3px solid white',
              borderRadius: '50%',
              width: '22px',
              height: '22px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
              zIndex: 2
            }}
          />
        ))}

        {cities.map((city) => (
          <span
            key={`${city.name}-label`}
            style={{
              position: 'absolute',
              left: city.x,
              top: `calc(${city.y} + 18px)`,
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              color: '#003B71',
              padding: '4px 8px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 'bold',
              boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
              zIndex: 2
            }}
          >
            {city.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default MontenegroMap;