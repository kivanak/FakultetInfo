import { Link } from 'react-router-dom';

function FacultyCard({ faculty, onDelete, onUpdate, isAdmin }) {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Da li ste sigurni da želite obrisati fakultet?'
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/faculties/${faculty.id}`,
        {
          method: 'DELETE'
        }
      );

      if (response.ok) {
        onDelete(faculty.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async () => {
    const newName = window.prompt(
      'Unesite novi naziv fakulteta:',
      faculty.name
    );

    if (!newName) return;

    const updatedFaculty = {
      ...faculty,
      name: newName
    };

    try {
      const response = await fetch(
        `http://localhost:5000/faculties/${faculty.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedFaculty)
        }
      );

      if (response.ok) {
        const data = await response.json();
        onUpdate(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow =
          '0 18px 40px rgba(15, 23, 42, 0.13)';
        e.currentTarget.style.borderColor = '#b8d4ee';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow =
          '0 10px 28px rgba(15, 23, 42, 0.07)';
        e.currentTarget.style.borderColor = '#e5e7eb';
      }}
      style={{
        backgroundColor: 'white',
        borderRadius: '22px',
        boxShadow: '0 10px 28px rgba(15, 23, 42, 0.07)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: '0.25s ease',
        height: '100%'
      }}
    >
      <div
        style={{
          position: 'relative',
          height: '190px',
          overflow: 'hidden',
          backgroundColor: '#eef4fb'
        }}
      >
        <img
          src={faculty.cover_image || '/images/faculties/default.jpg'}
          alt={faculty.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />

        <span
          style={{
            position: 'absolute',
            left: '16px',
            top: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            color: '#003B71',
            padding: '7px 11px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: '800',
            boxShadow: '0 6px 16px rgba(15, 23, 42, 0.14)'
          }}
        >
          📍 {faculty.city}
        </span>
      </div>

      <div
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: '0 0 8px',
              color: '#64748b',
              fontSize: '12px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.7px'
            }}
          >
            Univerzitet Crne Gore
          </p>

          <h2
            style={{
              color: '#0f172a',
              fontSize: '21px',
              margin: '0 0 12px',
              lineHeight: 1.35,
              fontWeight: '800'
            }}
          >
            {faculty.name}
          </h2>

          <p
            style={{
              color: '#64748b',
              lineHeight: 1.65,
              margin: 0,
              fontSize: '14px'
            }}
          >
            {faculty.short_description || faculty.description}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginTop: '24px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}
        >
          <Link
            to={`/faculties/${faculty.id}`}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow =
                '0 8px 18px rgba(0, 59, 113, 0.28)';
              e.currentTarget.style.backgroundColor = '#00509a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.backgroundColor = '#003B71';
            }}
            style={{
              padding: '11px 16px',
              backgroundColor: '#003B71',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: '800',
              fontSize: '14px',
              transition: '0.25s ease'
            }}
          >
            Detalji →
          </Link>

          {isAdmin && (
            <>
              <button
                onClick={handleEdit}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 18px rgba(138, 90, 0, 0.22)';
                  e.currentTarget.style.backgroundColor = '#ffe8a3';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.backgroundColor = '#fff4db';
                }}
                style={{
                  padding: '11px 15px',
                  backgroundColor: '#fff4db',
                  color: '#8a5a00',
                  border: '1px solid #f0c36d',
                  borderRadius: '12px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: '0.25s ease'
                }}
              >
                Izmijeni
              </button>

              <button
                onClick={handleDelete}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 18px rgba(180, 35, 24, 0.22)';
                  e.currentTarget.style.backgroundColor = '#ffdada';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.backgroundColor = '#fdecec';
                }}
                style={{
                  padding: '11px 15px',
                  backgroundColor: '#fdecec',
                  color: '#b42318',
                  border: '1px solid #f2b8b5',
                  borderRadius: '12px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: '0.25s ease'
                }}
              >
                Obriši
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FacultyCard;