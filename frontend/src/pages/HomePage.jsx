import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage({ faculties }) {
    const featuredFaculties = useMemo(() => {
  const copiedFaculties = [...faculties];
  const selectedFaculties = [];

  while (selectedFaculties.length < 3 && copiedFaculties.length > 0) {
    const randomIndex = Math.floor(Math.random() * copiedFaculties.length);
    const selectedFaculty = copiedFaculties.splice(randomIndex, 1)[0];

    selectedFaculties.push(selectedFaculty);
  }

  return selectedFaculties;
}, [faculties]);
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fbff'
      }}
    >
      <section
        style={{
          padding: '90px 30px 70px',
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
            marginBottom: '24px'
          }}
        >
          Univerzitet Crne Gore
        </p>

        <h1
          style={{
            fontSize: '64px',
            lineHeight: 1.05,
            margin: '0 auto',
            maxWidth: '1000px',
            color: '#0f172a',
            fontWeight: '800'
          }}
        >
          Vodič kroz obrazovanje
          <br />
          <span style={{ color: '#003B71' }}>
            na Univerzitetu Crne Gore
          </span>
        </h1>

        <p
          style={{
            margin: '28px auto 0',
            fontSize: '20px',
            lineHeight: 1.7,
            color: '#5b6472',
            maxWidth: '780px'
          }}
        >
          Istražite fakultete, studijske programe i mogućnosti obrazovanja
          na vodećem univerzitetu u Crnoj Gori
        </p>

        <Link to="/faculties" className="home-search-box">
          Pretraži fakultete po nazivu ili gradu...
        </Link>

        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">FAKULTETA</p>
            <h2 className="stat-number">19</h2>
          </div>

          <div className="stat-card">
            <p className="stat-label">STUDIJSKIH PROGRAMA</p>
            <h2 className="stat-number">43+</h2>
          </div>

          <div className="stat-card">
            <p className="stat-label">GRADOVA U CRNOJ GORI</p>
            <h2 className="stat-number">4</h2>
          </div>

          <div className="stat-card">
            <p className="stat-label">UPISANIH STUDENATA</p>
            <h2 className="stat-number">18k+</h2>
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundColor: 'white',
          borderTop: '1px solid #e5e7eb',
          padding: '70px 30px 80px'
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'end',
              marginBottom: '32px'
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: '#0f172a',
                  fontSize: '28px',
                  fontWeight: '800'
                }}
              >
                Izdvojeni Fakulteti
              </h2>

              <p
                style={{
                  margin: '8px 0 0',
                  color: '#64748b',
                  fontSize: '14px'
                }}
              >
                Najtraženije akademske jedinice u proteklom mjesecu.
              </p>
            </div>

            <Link
              to="/faculties"
              style={{
                color: '#003B71',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              Vidi sve →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px'
            }}
          >
            {featuredFaculties.map((faculty) => (
              <div
                key={faculty.id}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '14px',
                  overflow: 'hidden'
                }}
              >
               <img
                src={faculty.cover_image}
                alt={faculty.name}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

                <div
                  style={{
                    padding: '20px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      marginBottom: '12px',
                      flexWrap: 'wrap'
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: '#eef4fb',
                        color: '#003B71',
                        padding: '5px 8px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}
                    >
                      📍 {faculty.city}
                    </span>

                    <span
                      style={{
                        backgroundColor: '#f1f5f9',
                        color: '#64748b',
                        padding: '5px 8px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}
                    >
                      Fakultet
                    </span>
                  </div>

                  <h3
                    style={{
                      margin: 0,
                      color: '#0f172a',
                      fontSize: '17px'
                    }}
                  >
                    {faculty.name}
                  </h3>

                  <p
                    style={{
                      margin: '10px 0 18px',
                      color: '#64748b',
                      fontSize: '14px',
                      lineHeight: 1.5
                    }}
                  >
                    {faculty.description}
                  </p>

                  <Link
                    to={`/faculties/${faculty.id}`}
                    style={{
                      color: '#003B71',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}
                  >
                    Detalji →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
            </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>
            Spreman za upis?
          </h2>

          <p>
            Istraži sve fakultete Univerziteta Crne Gore i pronađi studijski
            program koji odgovara tvojim interesovanjima.
          </p>

          <div className="cta-buttons">
            <Link to="/faculties" className="cta-primary-btn">
              Pretraži sve fakultete
            </Link>

            <a
              href="https://www.ucg.ac.me"
              target="_blank"
              rel="noreferrer"
              className="cta-secondary-btn"
            >
              Zvanična stranica UCG →
            </a>
          </div>
        </div>
      </section>
                <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-column footer-brand">
            <h3>
              FakultetInfo
            </h3>

            <p>
              Vodič kroz fakultete, gradove i studijske programe
              Univerziteta Crne Gore.
            </p>
          </div>

          <div className="footer-column">
            <h4>
              Brzi linkovi
            </h4>

            <Link to="/">
              Početna
            </Link>

            <Link to="/faculties">
              Fakulteti
            </Link>
          </div>

          <div className="footer-column">
            <h4>
              UCG
            </h4>

            <a
              href="https://www.ucg.ac.me"
              target="_blank"
              rel="noreferrer"
            >
              Zvanični sajt
            </a>

            <a
              href="https://www.ucg.ac.me/studije"
              target="_blank"
              rel="noreferrer"
            >
              Studije
            </a>
          </div>

          <div className="footer-column">
            <h4>
              Kontakt
            </h4>

            <p>
              Univerzitet Crne Gore
            </p>

            <p>
              Podgorica, Crna Gora
            </p>

            <p>
              info@ucg.ac.me
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 FakultetInfo. Sva prava zadržana.
        </div>
      </footer>
    </div>
  );
}

export default HomePage;