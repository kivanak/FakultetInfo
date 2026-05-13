import { useParams, Link } from 'react-router-dom';

function FacultyDetails({ faculties }) {
  const { id } = useParams();

  const faculty = faculties.find((f) => f.id === Number(id));

  if (!faculty) {
    return (
      <div
        style={{
          padding: '40px',
          fontFamily: 'Arial'
        }}
      >
        <h2>Fakultet nije pronađen.</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f4f7fb',
        padding: '40px',
        fontFamily: 'Arial'
      }}
    >
      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginBottom: '25px',
          textDecoration: 'none',
          color: '#003B71',
          fontWeight: 'bold'
        }}
      >
        ← Nazad na početnu
      </Link>

      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '18px',
          overflow: 'hidden',
          boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
          maxWidth: '950px',
          margin: '0 auto'
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #003B71, #0057a3)',
            color: 'white',
            padding: '50px 40px'
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: '38px'
            }}
          >
            {faculty.name}
          </h1>

          <p
            style={{
              marginTop: '12px',
              opacity: 0.9,
              fontSize: '18px'
            }}
          >
            {faculty.university_name}
          </p>
        </div>

        <div
          style={{
            padding: '35px'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '30px'
            }}
          >
            <div
              style={{
                backgroundColor: '#f4f7fb',
                padding: '20px',
                borderRadius: '12px'
              }}
            >
              <h3 style={{ color: '#003B71', marginTop: 0 }}>
                Grad
              </h3>

              <p>{faculty.city}</p>
            </div>

            <div
              style={{
                backgroundColor: '#f4f7fb',
                padding: '20px',
                borderRadius: '12px'
              }}
            >
              <h3 style={{ color: '#003B71', marginTop: 0 }}>
                Adresa
              </h3>

              <p>{faculty.address}</p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#f8fbff',
              padding: '25px',
              borderRadius: '12px',
              marginBottom: '25px'
            }}
          >
            <h2
              style={{
                color: '#003B71',
                marginTop: 0
              }}
            >
              O fakultetu
            </h2>

            <p
              style={{
                lineHeight: '1.7',
                color: '#444'
              }}
            >
              {faculty.description}
            </p>
          </div>

          <a
            href={faculty.website_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: '#003B71',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Posjeti zvanični sajt
          </a>
        </div>
      </div>
    </div>
  );
}

export default FacultyDetails;