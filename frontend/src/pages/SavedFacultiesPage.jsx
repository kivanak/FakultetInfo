import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SavedFacultiesPage({ user }) {
  const [savedFaculties, setSavedFaculties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/users/${user.id}/saved-faculties`)
      .then((res) => res.json())
      .then((data) => {
        setSavedFaculties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  const handleRemove = async (facultyId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/saved-faculties/${user.id}/${facultyId}`,
        {
          method: 'DELETE'
        }
      );

      if (response.ok) {
        setSavedFaculties(
          savedFaculties.filter((faculty) => faculty.id !== facultyId)
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <main
        style={{
          minHeight: '100vh',
          backgroundColor: '#f8fbff',
          padding: '70px 30px'
        }}
      >
        <div
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            backgroundColor: 'white',
            padding: '35px',
            borderRadius: '20px',
            textAlign: 'center',
            border: '1px solid #e5e7eb',
            boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)'
          }}
        >
          <h1 style={{ color: '#003B71', marginTop: 0 }}>
            Sačuvani fakulteti
          </h1>

          <p style={{ color: '#64748b', lineHeight: 1.7 }}>
            Da bi vidio/la sačuvane fakultete, potrebno je da se prvo prijaviš.
          </p>

          <Link
            to="/faculties"
            style={{
              display: 'inline-block',
              marginTop: '18px',
              backgroundColor: '#003B71',
              color: 'white',
              padding: '13px 22px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Idi na prijavu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fbff',
        padding: '60px 30px 80px'
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto'
        }}
      >
        <div
          style={{
            marginBottom: '32px',
            textAlign: 'center'
          }}
        >
          <p
            style={{
              display: 'inline-block',
              backgroundColor: '#e8f1fb',
              color: '#003B71',
              fontWeight: 'bold',
              fontSize: '14px',
              padding: '10px 18px',
              borderRadius: '999px',
              marginBottom: '16px'
            }}
          >
            Moja lista
          </p>

          <h1
            style={{
              color: '#0f172a',
              fontSize: '40px',
              margin: 0
            }}
          >
            Sačuvani fakulteti
          </h1>

          <p
            style={{
              color: '#64748b',
              fontSize: '16px',
              marginTop: '12px'
            }}
          >
            Ovdje možeš pregledati fakultete koje si sačuvao/la.
          </p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#64748b' }}>
            Učitavanje sačuvanih fakulteta...
          </p>
        ) : savedFaculties.length === 0 ? (
          <div
            style={{
              backgroundColor: 'white',
              padding: '35px',
              borderRadius: '20px',
              textAlign: 'center',
              border: '1px solid #e5e7eb',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)'
            }}
          >
            <h2 style={{ color: '#003B71', marginTop: 0 }}>
              Nema sačuvanih fakulteta.
            </h2>

            <p style={{ color: '#64748b' }}>
              Kada sačuvaš fakultet, prikazaće se ovdje.
            </p>

            <Link
              to="/faculties"
              style={{
                display: 'inline-block',
                marginTop: '16px',
                backgroundColor: '#003B71',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Pretraži fakultete
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '22px'
            }}
          >
            {savedFaculties.map((faculty) => (
              <div
                key={faculty.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 10px 28px rgba(15, 23, 42, 0.08)'
                }}
              >
                <img
                  src={faculty.cover_image || '/images/faculties/default.jpg'}
                  alt={faculty.name}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                <div style={{ padding: '22px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#eef4fb',
                      color: '#003B71',
                      padding: '6px 10px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      marginBottom: '12px'
                    }}
                  >
                    📍 {faculty.city}
                  </span>

                  <h2
                    style={{
                      color: '#003B71',
                      fontSize: '21px',
                      margin: '0 0 10px'
                    }}
                  >
                    {faculty.name}
                  </h2>

                  <p
                    style={{
                      color: '#64748b',
                      lineHeight: 1.6,
                      fontSize: '14px'
                    }}
                  >
                    {faculty.short_description || faculty.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      flexWrap: 'wrap',
                      marginTop: '18px'
                    }}
                  >
                    <Link
                      to={`/faculties/${faculty.id}`}
                      style={{
                        backgroundColor: '#003B71',
                        color: 'white',
                        padding: '10px 15px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '14px'
                      }}
                    >
                      Detalji
                    </Link>

                    <button
                      onClick={() => handleRemove(faculty.id)}
                      style={{
                        backgroundColor: '#fdecec',
                        color: '#b42318',
                        border: '1px solid #f2b8b5',
                        padding: '10px 15px',
                        borderRadius: '10px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Ukloni
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default SavedFacultiesPage;