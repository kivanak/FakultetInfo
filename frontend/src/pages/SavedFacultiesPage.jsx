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
    const confirmed = window.confirm(
      'Da li želite ukloniti ovaj fakultet iz sačuvanih?'
    );

    if (!confirmed) return;

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
          background:
            'linear-gradient(180deg, #f8fbff 0%, #eef6ff 45%, #ffffff 100%)',
          padding: '70px 30px'
        }}
      >
        <div
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            backgroundColor: 'white',
            padding: '42px 36px',
            borderRadius: '24px',
            textAlign: 'center',
            border: '1px solid #dbeafe',
            boxShadow: '0 16px 38px rgba(15, 23, 42, 0.10)'
          }}
        >
          <div
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '22px',
              backgroundColor: '#eef4fb',
              color: '#003B71',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '32px'
            }}
          >
            ☆
          </div>

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
            Moja lista
          </p>

          <h1
            style={{
              color: '#0f172a',
              margin: 0,
              fontSize: '38px',
              fontWeight: '800'
            }}
          >
            Sačuvani fakulteti
          </h1>

          <p
            style={{
              color: '#64748b',
              lineHeight: 1.7,
              margin: '16px auto 0',
              maxWidth: '520px'
            }}
          >
            Da bi vidio/la sačuvane fakultete, potrebno je da se prvo prijaviš.
          </p>

          <Link
            to="/faculties"
            style={{
              display: 'inline-block',
              marginTop: '24px',
              backgroundColor: '#003B71',
              color: 'white',
              padding: '13px 22px',
              borderRadius: '13px',
              textDecoration: 'none',
              fontWeight: 'bold',
              boxShadow: '0 8px 20px rgba(0, 59, 113, 0.20)'
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
        background:
          'linear-gradient(180deg, #f8fbff 0%, #eef6ff 45%, #ffffff 100%)',
        padding: '46px 30px 80px'
      }}
    >
      <div
        style={{
          width: '92%',
          maxWidth: '1180px',
          margin: '0 auto'
        }}
      >
        <section
          style={{
            background:
              'linear-gradient(135deg, #003B71 0%, #0057a3 100%)',
            padding: '44px 40px',
            borderRadius: '26px',
            color: 'white',
            marginBottom: '30px',
            boxShadow: '0 18px 42px rgba(0, 59, 113, 0.22)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: '-70px',
              top: '-70px',
              width: '230px',
              height: '230px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.10)'
            }}
          />

          <div
            style={{
              position: 'absolute',
              right: '110px',
              bottom: '-90px',
              width: '190px',
              height: '190px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)'
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: '760px'
            }}
          >
            <p
              style={{
                margin: '0 0 12px',
                color: '#dbeafe',
                fontWeight: 'bold',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.8px'
              }}
            >
              Moja lista
            </p>

            <h1
              style={{
                margin: 0,
                fontSize: '44px',
                lineHeight: 1.12,
                fontWeight: '800'
              }}
            >
              Sačuvani fakulteti
            </h1>

            <p
              style={{
                margin: '18px 0 0',
                color: '#eaf4ff',
                fontSize: '17px',
                lineHeight: 1.75
              }}
            >
              Ovdje se nalaze fakulteti koje si označio/la za kasnije
              upoređivanje i pregled.
            </p>
          </div>
        </section>

        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid #dbeafe',
            borderRadius: '22px',
            padding: '24px 28px',
            marginBottom: '26px',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.07)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
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
              Pregled
            </p>

            <h2
              style={{
                margin: 0,
                color: '#0f172a',
                fontSize: '28px',
                fontWeight: '800'
              }}
            >
              Tvoja sačuvana lista
            </h2>
          </div>

          <span
            style={{
              backgroundColor: '#eef4fb',
              color: '#003B71',
              padding: '10px 14px',
              borderRadius: '999px',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Sačuvano: {savedFaculties.length}
          </span>
        </div>

        {loading ? (
          <div
            style={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '22px',
              padding: '36px',
              textAlign: 'center',
              color: '#64748b',
              boxShadow: '0 10px 28px rgba(15, 23, 42, 0.06)'
            }}
          >
            Učitavanje sačuvanih fakulteta...
          </div>
        ) : savedFaculties.length === 0 ? (
          <div
            style={{
              backgroundColor: 'white',
              padding: '42px 30px',
              borderRadius: '22px',
              textAlign: 'center',
              border: '1px solid #e5e7eb',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)'
            }}
          >
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '22px',
                backgroundColor: '#eef4fb',
                color: '#003B71',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '32px'
              }}
            >
              ☆
            </div>

            <h2
              style={{
                color: '#003B71',
                margin: '0 0 10px',
                fontSize: '24px'
              }}
            >
              Nema sačuvanih fakulteta
            </h2>

            <p
              style={{
                color: '#64748b',
                margin: '0 auto',
                lineHeight: 1.7,
                maxWidth: '520px'
              }}
            >
              Kada sačuvaš fakultet, prikazaće se ovdje i moći ćeš brzo da mu
              se vratiš.
            </p>

            <Link
              to="/faculties"
              style={{
                display: 'inline-block',
                marginTop: '22px',
                backgroundColor: '#003B71',
                color: 'white',
                padding: '13px 22px',
                borderRadius: '13px',
                textDecoration: 'none',
                fontWeight: 'bold',
                boxShadow: '0 8px 20px rgba(0, 59, 113, 0.20)'
              }}
            >
              Pretraži fakultete
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}
          >
            {savedFaculties.map((faculty) => (
              <div
                key={faculty.id}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow =
                    '0 18px 40px rgba(15, 23, 42, 0.13)';
                  e.currentTarget.style.borderColor = '#b8d4ee';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow =
                    '0 10px 28px rgba(15, 23, 42, 0.08)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 10px 28px rgba(15, 23, 42, 0.08)',
                  transition: '0.25s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    height: '190px',
                    backgroundColor: '#eef4fb',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={faculty.cover_image || '/images/faculties/ucg.png'}
                    alt={faculty.name}
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
                    Sačuvano za kasnije
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
                      fontSize: '14px',
                      margin: 0,
                      flex: 1
                    }}
                  >
                    {faculty.short_description || faculty.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      flexWrap: 'wrap',
                      marginTop: '22px'
                    }}
                  >
                    <Link
                      to={`/faculties/${faculty.id}`}
                      style={{
                        backgroundColor: '#003B71',
                        color: 'white',
                        padding: '11px 16px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        boxShadow: '0 8px 18px rgba(0, 59, 113, 0.18)'
                      }}
                    >
                      Detalji →
                    </Link>

                    <button
                      onClick={() => handleRemove(faculty.id)}
                      style={{
                        backgroundColor: '#fdecec',
                        color: '#b42318',
                        border: '1px solid #f2b8b5',
                        padding: '11px 16px',
                        borderRadius: '12px',
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