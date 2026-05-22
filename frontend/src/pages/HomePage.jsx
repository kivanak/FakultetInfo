import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage({ faculties, onCityClick }) {
  const navigate = useNavigate();

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

  const handleCityCardClick = (cityName) => {
    if (onCityClick) {
      onCityClick(cityName);
    }

    navigate('/faculties');
  };

  const cities = [
    {
      id: 1,
      name: 'Podgorica',
      count: '11 fakulteta',
      image: '/images/cities/podgorica.png'
    },
    {
      id: 2,
      name: 'Nikšić',
      count: '3 fakulteta',
      image: '/images/cities/niksic.png'
    },
    {
      id: 3,
      name: 'Cetinje',
      count: '3 fakulteta',
      image: '/images/cities/cetinje.png'
    },
    {
      id: 4,
      name: 'Kotor',
      count: '2 fakulteta',
      image: '/images/cities/kotor.png'
    },
    {
      id: 5,
      name: 'Bar',
      count: 'studijski programi',
      image: '/images/cities/bar.png'
    },
    {
      id: 6,
      name: 'Bijelo Polje',
      count: 'studijski programi',
      image: '/images/cities/bijelo-polje.png'
    }
  ];

  const news = [
    {
      id: 1,
      title: 'Informacije o upisu',
      text: 'Pratite najvažnije informacije o upisu, rokovima, dokumentaciji i studijskim programima Univerziteta Crne Gore.',
      tag: 'Upis'
    },
    {
      id: 2,
      title: 'Studijski programi',
      text: 'Pregledajte osnovne, master i doktorske studije po fakultetima i lakše pronađite oblast koja vam odgovara.',
      tag: 'Studije'
    },
    {
      id: 3,
      title: 'Studentski vodič',
      text: 'Koristite preporuke, filtere, recenzije i sačuvane fakultete kako biste lakše donijeli odluku o izboru fakulteta.',
      tag: 'Vodič'
    }
  ];

  return (
    <div className="homepage">
      <section className="home-hero-section">
        <div className="home-hero-container">
          <div className="home-hero-left">
            <p className="home-hero-badge">
              Univerzitet Crne Gore
            </p>

            <h1 className="home-hero-title">
              Vodič kroz obrazovanje
              <br />
              <span>
                na Univerzitetu Crne Gore
              </span>
            </h1>

            <p className="home-hero-description">
              Sve što ti treba da izabereš pravi fakultet — programi,
              iskustva studenata, uslovi upisa i korisne informacije na jednom mjestu.
            </p>

            <div className="home-hero-buttons">
              <Link to="/faculties" className="hero-primary-btn">
                Pretraži fakultete
              </Link>

              <Link to="/recommendation" className="hero-secondary-btn">
                Pronađi fakultet za sebe
              </Link>
            </div>

            <div className="home-hero-stats">
              <div className="home-hero-stat-card">
                <div className="home-hero-stat-icon">
                  🏛️
                </div>

                <div>
                  <h2>
                    19
                  </h2>

                  <p>
                    fakulteta
                  </p>
                </div>
              </div>

              <div className="home-hero-stat-card">
                <div className="home-hero-stat-icon">
                  🎓
                </div>

                <div>
                  <h2>
                    140+
                  </h2>

                  <p>
                    studijskih programa
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="home-hero-right">
            <div className="home-hero-image-card">
              <img
                src="/images/hero/rektorat.jpg"
                alt="Univerzitet Crne Gore"
              />

              <div className="home-hero-floating-card">
                <div className="home-hero-floating-icon">
                  🎓
                </div>

                <div>
                  <h3>
                    Istraži 19 fakulteta UCG
                  </h3>

                  <p>
                    Programi, gradovi, recenzije i preporuke na jednom mjestu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <div className="section-header center">
            <p>
              Mogućnosti
            </p>

            <h2>
              Kako FakultetInfo pomaže?
            </h2>

            <span>
              Aplikacija ti pomaže da lakše istražiš fakultete, programe i iskustva drugih studenata.
            </span>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔎</div>
              <h3>01 Pametna pretraga</h3>
              <p>Brzo pronađi fakultete po nazivu, gradu i oblastima koje te zanimaju.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>02 Preporuke za tebe</h3>
              <p>Odgovori na pitanja i dobij prijedlog fakulteta koji odgovara tvojim interesovanjima.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>03 Recenzije studenata</h3>
              <p>Pročitaj iskustva korisnika i ocjene koje mogu pomoći pri izboru fakulteta.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">☆</div>
              <h3>04 Sačuvani fakulteti</h3>
              <p>Sačuvaj fakultete koji ti se sviđaju i vrati im se kasnije.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section cities-section">
        <div className="home-container">
          <div className="section-header row">
            <div>
              <p>
                Lokacije
              </p>

              <h2>
                Fakulteti i programi po gradovima
              </h2>

              <span>
                Istraži gdje se nalaze fakulteti i studijski programi Univerziteta Crne Gore.
              </span>
            </div>

            <Link to="/faculties">
              Pogledaj sve →
            </Link>
          </div>

          <div className="cities-grid">
            {cities.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => handleCityCardClick(city.name)}
                className="city-card"
                style={{
                  border: 'none',
                  textAlign: 'inherit',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                <div className="city-image-box">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="city-image"
                  />
                </div>

                <div className="city-card-content">
                  <h3>
                    {city.name}
                  </h3>

                  <p>
                    {city.count}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section guide-section">
        <div className="home-container">
          <div className="section-header center">
            <p>
              Vodič
            </p>

            <h2>
              Kako odabrati fakultet?
            </h2>

            <span>
              Izbor fakulteta je važna odluka, zato je korisno proći kroz nekoliko jasnih koraka.
            </span>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">
                1
              </div>

              <h3>
                Istraži svoja interesovanja
              </h3>

              <p>
                Razmisli koje oblasti te najviše zanimaju i u čemu želiš da se razvijaš.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">
                2
              </div>

              <h3>
                Uporedi programe
              </h3>

              <p>
                Pogledaj studijske programe, gradove, opise fakulteta i mogućnosti nakon studija.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">
                3
              </div>

              <h3>
                Donesi odluku
              </h3>

              <p>
                Sačuvaj favorite, pročitaj recenzije i izaberi fakultet koji ti najviše odgovara.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section featured-section">
        <div className="home-container">
          <div className="section-header row">
            <div>
              <p>
                Izdvojeno
              </p>

              <h2>
                Izdvojeni fakulteti
              </h2>

              <span>
                Pogledaj neke od fakulteta i istraži njihove studijske programe.
              </span>
            </div>

            <Link to="/faculties">
              Vidi sve →
            </Link>
          </div>

          <div className="featured-grid">
            {featuredFaculties.map((faculty) => (
              <div key={faculty.id} className="home-faculty-card">
                <img
                  src={faculty.cover_image || '/images/faculties/ucg.png'}
                  alt={faculty.name}
                  loading="lazy"
                />

                <div className="home-faculty-content">
                  <div className="faculty-badges">
                    <span className="small-badge-blue">
                      📍 {faculty.city}
                    </span>

                    <span className="small-badge-gray">
                      Fakultet
                    </span>
                  </div>

                  <h3>
                    {faculty.name}
                  </h3>

                  <p>
                    {faculty.short_description || faculty.description}
                  </p>

                  <Link to={`/faculties/${faculty.id}`}>
                    Detalji →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section news-section">
        <div className="home-container">
          <div className="section-header center">
            <p>
              Aktuelno
            </p>

            <h2>
              Vijesti i obavještenja
            </h2>

            <span>
              Najvažnije informacije za buduće i trenutne studente Univerziteta Crne Gore.
            </span>
          </div>

          <div className="news-grid">
            {news.map((item) => (
              <div key={item.id} className="news-card">
                <span className="news-tag">
                  {item.tag}
                </span>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>
            Tvoja budućnost počinje pravim izborom.
          </h2>

          <p>
            Istraži sve fakultete Univerziteta Crne Gore i pronađi smjer koji te vodi ka uspjehu.
          </p>

          <div className="cta-buttons">
            <Link to="/faculties" className="cta-primary-btn">
              Pretraži sve fakultete
            </Link>

            <Link to="/recommendation" className="cta-secondary-btn">
              Pronađi fakultet za sebe
            </Link>

            <Link to="/saved" className="cta-light-btn">
              Sačuvani fakulteti
            </Link>
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

            <Link to="/recommendation">
              Pronađi fakultet
            </Link>

            <Link to="/saved">
              Sačuvani
            </Link>
          </div>

          <div className="footer-column">
            <h4>
              Lokacije
            </h4>

            <p>Podgorica</p>
            <p>Nikšić</p>
            <p>Cetinje</p>
            <p>Kotor</p>
            <p>Bar</p>
            <p>Bijelo Polje</p>
          </div>

          <div className="footer-column">
            <h4>
              Univerzitet
            </h4>

            <a
              href="https://www.ucg.ac.me"
              target="_blank"
              rel="noreferrer"
            >
              Zvanični sajt UCG
            </a>

            <a
              href="https://www.ucg.ac.me/studije"
              target="_blank"
              rel="noreferrer"
            >
              Studije
            </a>

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