import { useParams, Link } from 'react-router-dom';

function FacultyDetails({ faculties }) {
  const { id } = useParams();

  const faculty = faculties.find((f) => f.id === Number(id));

  if (!faculty) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#f8fbff',
          padding: '50px 30px'
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            backgroundColor: 'white',
            padding: '35px',
            borderRadius: '18px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 28px rgba(15, 23, 42, 0.08)'
          }}
        >
          <h2 style={{ color: '#003B71', marginTop: 0 }}>
            Fakultet nije pronađen.
          </h2>

          <Link
            to="/faculties"
            style={{
              color: '#003B71',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            ← Nazad na fakultete
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fbff',
        padding: '45px 30px 70px'
      }}
    >
      <div
        style={{
          maxWidth: '1050px',
          margin: '0 auto'
        }}
      >
        <Link
          to="/faculties"
          style={{
            display: 'inline-block',
            marginBottom: '25px',
            textDecoration: 'none',
            color: '#003B71',
            fontWeight: 'bold'
          }}
        >
          ← Nazad na fakultete
        </Link>

        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '22px',
            overflow: 'hidden',
            boxShadow: '0 14px 35px rgba(15, 23, 42, 0.10)',
            border: '1px solid #e5e7eb'
          }}
        >
          <img
            src={faculty.cover_image || '/images/faculties/default.jpg'}
            alt={faculty.name}
            style={{
              width: '100%',
              height: '340px',
              objectFit: 'cover',
              display: 'block'
            }}
          />

          <div
            style={{
              padding: '38px'
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: '18px'
              }}
            >
              <span
                style={{
                  backgroundColor: '#eef4fb',
                  color: '#003B71',
                  padding: '7px 12px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}
              >
                📍 {faculty.city}
              </span>

              <span
                style={{
                  backgroundColor: '#f1f5f9',
                  color: '#64748b',
                  padding: '7px 12px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}
              >
                {faculty.type === 'drzavni' ? 'Državni fakultet' : 'Privatni fakultet'}
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                color: '#003B71',
                fontSize: '38px',
                lineHeight: 1.2
              }}
            >
              {faculty.name}
            </h1>

            <p
              style={{
                margin: '10px 0 30px',
                color: '#64748b',
                fontSize: '17px'
              }}
            >
              {faculty.university_name}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '18px',
                marginBottom: '30px'
              }}
            >
              <div
                style={{
                  backgroundColor: '#f8fbff',
                  padding: '20px',
                  borderRadius: '14px',
                  border: '1px solid #e5e7eb'
                }}
              >
                <h3
                  style={{
                    color: '#003B71',
                    margin: '0 0 8px',
                    fontSize: '17px'
                  }}
                >
                  Grad
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: '#334155'
                  }}
                >
                  {faculty.city}
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#f8fbff',
                  padding: '20px',
                  borderRadius: '14px',
                  border: '1px solid #e5e7eb'
                }}
              >
                <h3
                  style={{
                    color: '#003B71',
                    margin: '0 0 8px',
                    fontSize: '17px'
                  }}
                >
                  Adresa
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: '#334155'
                  }}
                >
                  {faculty.address || 'Nije unesena'}
                </p>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#f8fbff',
                padding: '26px',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                marginBottom: '28px'
              }}
            >
              <h2
                style={{
                  color: '#003B71',
                  margin: '0 0 12px',
                  fontSize: '24px'
                }}
              >
                O fakultetu
              </h2>

              <p
                style={{
                  lineHeight: 1.8,
                  color: '#475569',
                  margin: 0,
                  fontSize: '16px'
                }}
              >
                {faculty.description}
              </p>
            </div>

            {faculty.website_url && (
              <a
                href={faculty.website_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#003B71',
                  color: 'white',
                  padding: '13px 22px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  boxShadow: '0 8px 20px rgba(0, 59, 113, 0.20)'
                }}
              >
                Posjeti zvanični sajt →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyDetails;