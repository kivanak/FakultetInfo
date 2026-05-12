import { Link } from 'react-router-dom';

function FacultyCard({ faculty, onDelete, onUpdate }) {
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
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <h2 style={{ color: '#003B71' }}>
        {faculty.name}
      </h2>

      <p>
        <strong>Grad:</strong> {faculty.city}
      </p>

      <p>{faculty.description}</p>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '15px',
          flexWrap: 'wrap'
        }}
      >
        <Link
          to={`/faculties/${faculty.id}`}
          style={{
            padding: '10px 14px',
            backgroundColor: '#003B71',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}
        >
          Detalji
        </Link>

        <button
          onClick={handleEdit}
          style={{
            padding: '10px 14px',
            backgroundColor: '#f9a825',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Izmijeni
        </button>

        <button
          onClick={handleDelete}
          style={{
            padding: '10px 14px',
            backgroundColor: '#c62828',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Obriši
        </button>
      </div>
    </div>
  );
}

export default FacultyCard;