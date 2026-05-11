import { Link } from 'react-router-dom';

function FacultyCard({ faculty }) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <h2 style={{ color: '#003B71' }}>{faculty.name}</h2>

      <p>
        <strong>Grad:</strong> {faculty.city}
      </p>

      <p>{faculty.description}</p>

      <Link
        to={`/faculties/${faculty.id}`}
        style={{
          display: 'inline-block',
          marginTop: '10px',
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
    </div>
  );
}

export default FacultyCard;