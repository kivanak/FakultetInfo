import { useParams } from 'react-router-dom';

function FacultyDetails({ faculties }) {
  const { id } = useParams();

  const faculty = faculties.find((f) => f.id === Number(id));

  if (!faculty) {
    return <h2>Fakultet nije pronađen.</h2>;
  }

  return (
    <div
      style={{
        padding: '40px',
        fontFamily: 'Arial',
        backgroundColor: '#f4f7fb',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: '800px',
          margin: '0 auto'
        }}
      >
        <h1 style={{ color: '#003B71' }}>
          {faculty.name}
        </h1>

        <p>
          <strong>Univerzitet:</strong> {faculty.university_name}
        </p>

        <p>
          <strong>Grad:</strong> {faculty.city}
        </p>

        <p>
          <strong>Adresa:</strong> {faculty.address}
        </p>

        <p>
          <strong>Opis:</strong> {faculty.description}
        </p>

        <a
          href={faculty.website_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#003B71',
            fontWeight: 'bold'
          }}
        >
          Posjeti zvanični sajt
        </a>
      </div>
    </div>
  );
}

export default FacultyDetails;