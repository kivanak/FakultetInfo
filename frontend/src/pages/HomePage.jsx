import { Link } from 'react-router-dom';
import MontenegroMap from '../components/MontenegroMap';

function HomePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fbff'
      }}
    >
      <section
        style={{
          padding: '100px 30px 60px',
          textAlign: 'center'
        }}
      >
        <p
          style={{
            color: '#003B71',
            fontWeight: 'bold',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}
        >
          Univerzitet Crne Gore
        </p>

        <h1
          style={{
            fontSize: '64px',
            lineHeight: 1.05,
            margin: '0 auto',
            maxWidth: '950px',
            color: '#0f172a'
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
            maxWidth: '760px'
          }}
        >
          Istražite fakultete, gradove i osnovne informacije
          o studijskim programima Univerziteta Crne Gore.
        </p>

        <Link
          to="/faculties"
          style={{
            display: 'inline-block',
            marginTop: '38px',
            backgroundColor: '#003B71',
            color: 'white',
            textDecoration: 'none',
            padding: '16px 30px',
            borderRadius: '14px',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          Pogledaj fakultete
        </Link>
      </section>

      <section
        style={{
          maxWidth: '950px',
          margin: '0 auto',
          padding: '0 30px 80px'
        }}
      >
        <MontenegroMap onCityClick={() => {}} />
      </section>
    </div>
  );
}

export default HomePage;