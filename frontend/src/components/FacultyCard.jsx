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
      style={{
        backgroundColor: 'white',
        padding: '22px',
        borderRadius: '18px',
        boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0',
        minHeight: '260px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <span
          style={{
            display: 'inline-block',
            backgroundColor: '#e6f0fa',
            color: '#003B71',
            padding: '6px 10px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 'bold',
            marginBottom: '14px'
          }}
        >
          {faculty.city}
        </span>

        <h2
          style={{
            color: '#003B71',
            fontSize: '21px',
            margin: '0 0 12px 0',
            lineHeight: 1.3
          }}
        >
          {faculty.name}
        </h2>

        <p
          style={{
            color: '#555',
            lineHeight: 1.6,
            margin: 0
          }}
        >
          {faculty.description}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '22px',
          flexWrap: 'wrap'
        }}
      >
        <Link
          to={`/faculties/${faculty.id}`}
          style={{
            padding: '10px 15px',
            backgroundColor: '#003B71',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          Detalji
        </Link>

        {isAdmin && (
          <>
            <button
              onClick={handleEdit}
              style={{
                padding: '10px 15px',
                backgroundColor: '#fff4db',
                color: '#8a5a00',
                border: '1px solid #f0c36d',
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Izmijeni
            </button>

            <button
              onClick={handleDelete}
              style={{
                padding: '10px 15px',
                backgroundColor: '#fdecec',
                color: '#b42318',
                border: '1px solid #f2b8b5',
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Obriši
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default FacultyCard;