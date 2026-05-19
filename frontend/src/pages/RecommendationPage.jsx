import { useState } from 'react';
import { Link } from 'react-router-dom';

function RecommendationPage({ user, faculties }) {
  const [answers, setAnswers] = useState({
    area: '',
    city: '',
    workStyle: '',
    goal: ''
  });

  const [recommendedFaculties, setRecommendedFaculties] = useState([]);

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value
    });
  };

  const getRecommendedNames = () => {
    let names = [];

    if (answers.area === 'tehnika') {
      names = [
        'Elektrotehnički fakultet',
        'Prirodno-matematički fakultet',
        'Mašinski fakultet',
        'Građevinski fakultet'
      ];
    }

    if (answers.area === 'medicina') {
      names = [
        'Medicinski fakultet'
      ];
    }

    if (answers.area === 'pravo') {
      names = [
        'Pravni fakultet',
        'Fakultet političkih nauka'
      ];
    }

    if (answers.area === 'ekonomija') {
      names = [
        'Ekonomski fakultet',
        'Fakultet za turizam i hotelijerstvo'
      ];
    }

    if (answers.area === 'umjetnost') {
      names = [
        'Fakultet dramskih umjetnosti',
        'Fakultet likovnih umjetnosti',
        'Muzička akademija',
        'Arhitektonski fakultet'
      ];
    }

    if (answers.area === 'jezici') {
      names = [
        'Filološki fakultet',
        'Filozofski fakultet'
      ];
    }

    if (answers.area === 'prirodne') {
      names = [
        'Prirodno-matematički fakultet',
        'Biotehnički fakultet',
        'Metalurško-tehnološki fakultet'
      ];
    }

    if (answers.area === 'sport') {
      names = [
        'Fakultet za sport i fizičko vaspitanje'
      ];
    }

    if (answers.area === 'pomorstvo') {
      names = [
        'Fakultet za pomorstvo',
        'Fakultet za turizam i hotelijerstvo'
      ];
    }

    if (answers.goal === 'kreativnost') {
      names = [
        ...names,
        'Fakultet dramskih umjetnosti',
        'Fakultet likovnih umjetnosti',
        'Muzička akademija'
      ];
    }

    if (answers.goal === 'stabilnost') {
      names = [
        ...names,
        'Pravni fakultet',
        'Medicinski fakultet',
        'Ekonomski fakultet'
      ];
    }

    if (answers.goal === 'tehnologija') {
      names = [
        ...names,
        'Elektrotehnički fakultet',
        'Prirodno-matematički fakultet',
        'Mašinski fakultet'
      ];
    }

    return [...new Set(names)];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const recommendedNames = getRecommendedNames();

    let result = faculties.filter((faculty) =>
      recommendedNames.includes(faculty.name)
    );

    if (answers.city !== 'svejedno' && answers.city !== '') {
      result = result.filter((faculty) => faculty.city === answers.city);
    }

    setRecommendedFaculties(result);
  };

  if (!user) {
    return (
      <div
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
          <h1
            style={{
              color: '#003B71',
              margin: '0 0 12px'
            }}
          >
            Pronađi fakultet za sebe
          </h1>

          <p
            style={{
              color: '#64748b',
              lineHeight: 1.7,
              marginBottom: '25px'
            }}
          >
            Da bi koristio/la vodič za izbor fakulteta, potrebno je da se prvo
            prijaviš ili registruješ.
          </p>

          <Link
            to="/faculties"
            style={{
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
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fbff',
        padding: '60px 30px 80px'
      }}
    >
      <div
        style={{
          maxWidth: '1050px',
          margin: '0 auto'
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '38px'
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
              marginBottom: '18px'
            }}
          >
            Vodič za izbor
          </p>

          <h1
            style={{
              color: '#0f172a',
              fontSize: '42px',
              margin: 0
            }}
          >
            Pronađi fakultet za sebe
          </h1>

          <p
            style={{
              color: '#64748b',
              fontSize: '17px',
              maxWidth: '720px',
              margin: '16px auto 0',
              lineHeight: 1.7
            }}
          >
            Odgovori na nekoliko pitanja i dobićeš preporuku fakulteta koji
            mogu odgovarati tvojim interesovanjima.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '22px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
            marginBottom: '35px'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '18px'
            }}
          >
            <div>
              <label style={{ fontWeight: 'bold', color: '#003B71' }}>
                Koja oblast te najviše zanima?
              </label>

              <select
                name="area"
                value={answers.area}
                onChange={handleChange}
                required
                style={selectStyle}
              >
                <option value="">Izaberi oblast</option>
                <option value="tehnika">Tehnika i računarstvo</option>
                <option value="medicina">Medicina i zdravlje</option>
                <option value="pravo">Pravo i društvo</option>
                <option value="ekonomija">Ekonomija i biznis</option>
                <option value="umjetnost">Umjetnost i kreativnost</option>
                <option value="jezici">Jezici i humanističke nauke</option>
                <option value="prirodne">Prirodne nauke</option>
                <option value="sport">Sport i fizička kultura</option>
                <option value="pomorstvo">Pomorstvo i turizam</option>
              </select>
            </div>

            <div>
              <label style={{ fontWeight: 'bold', color: '#003B71' }}>
                Koji grad ti najviše odgovara?
              </label>

              <select
                name="city"
                value={answers.city}
                onChange={handleChange}
                required
                style={selectStyle}
              >
                <option value="">Izaberi grad</option>
                <option value="svejedno">Svejedno</option>
                <option value="Podgorica">Podgorica</option>
                <option value="Nikšić">Nikšić</option>
                <option value="Cetinje">Cetinje</option>
                <option value="Kotor">Kotor</option>
              </select>
            </div>

            <div>
              <label style={{ fontWeight: 'bold', color: '#003B71' }}>
                Kakav način učenja ti više odgovara?
              </label>

              <select
                name="workStyle"
                value={answers.workStyle}
                onChange={handleChange}
                required
                style={selectStyle}
              >
                <option value="">Izaberi odgovor</option>
                <option value="teorija">Više teorijski rad</option>
                <option value="praksa">Više praktičan rad</option>
                <option value="kombinovano">Kombinacija teorije i prakse</option>
              </select>
            </div>

            <div>
              <label style={{ fontWeight: 'bold', color: '#003B71' }}>
                Šta ti je najvažnije poslije studija?
              </label>

              <select
                name="goal"
                value={answers.goal}
                onChange={handleChange}
                required
                style={selectStyle}
              >
                <option value="">Izaberi cilj</option>
                <option value="tehnologija">Rad u tehnologiji ili industriji</option>
                <option value="ljudi">Rad sa ljudima</option>
                <option value="kreativnost">Kreativan posao</option>
                <option value="stabilnost">Stabilna profesija</option>
                <option value="istrazivanje">Nauka i istraživanje</option>
                <option value="biznis">Biznis i preduzetništvo</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            style={{
              marginTop: '26px',
              width: '100%',
              backgroundColor: '#003B71',
              color: 'white',
              border: 'none',
              padding: '14px 22px',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '16px',
              boxShadow: '0 8px 20px rgba(0, 59, 113, 0.20)'
            }}
          >
            Prikaži preporuke
          </button>
        </form>

        {recommendedFaculties.length > 0 && (
          <section
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '22px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)'
            }}
          >
            <h2
              style={{
                color: '#003B71',
                margin: '0 0 10px'
              }}
            >
              Preporučeni fakulteti
            </h2>

            <p
              style={{
                color: '#64748b',
                margin: '0 0 24px'
              }}
            >
              Na osnovu tvojih odgovora, ovi fakulteti mogu biti dobar izbor.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px'
              }}
            >
              {recommendedFaculties.map((faculty) => (
                <div
                  key={faculty.id}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#f8fbff'
                  }}
                >
                  <img
                    src={faculty.cover_image || '/images/faculties/default.jpg'}
                    alt={faculty.name}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />

                  <div style={{ padding: '18px' }}>
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

                    <h3
                      style={{
                        margin: '0 0 10px',
                        color: '#0f172a'
                      }}
                    >
                      {faculty.name}
                    </h3>

                    <p
                      style={{
                        color: '#64748b',
                        lineHeight: 1.6,
                        fontSize: '14px'
                      }}
                    >
                      {faculty.short_description || faculty.description}
                    </p>

                    <Link
                      to={`/faculties/${faculty.id}`}
                      style={{
                        color: '#003B71',
                        fontWeight: 'bold',
                        textDecoration: 'none'
                      }}
                    >
                      Pogledaj detalje →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

const selectStyle = {
  width: '100%',
  marginTop: '8px',
  padding: '14px 16px',
  borderRadius: '12px',
  border: '1px solid #cbd5e1',
  fontSize: '15px',
  boxSizing: 'border-box',
  backgroundColor: 'white',
  color: '#0f172a',
  outline: 'none'
};

export default RecommendationPage;