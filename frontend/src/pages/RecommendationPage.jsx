import { useState } from 'react';
import { Link } from 'react-router-dom';
import './RecommendationPage.css';

function RecommendationPage({ user, faculties }) {
  const [answers, setAnswers] = useState({
    area: '',
    city: '',
    style: '',
    goal: ''
  });

  const [showResults, setShowResults] = useState(false);

  const areas = [
    'Tehnologija',
    'Medicina',
    'Ekonomija',
    'Pravo',
    'Umjetnost',
    'Sport',
    'Turizam',
    'Prirodne nauke',
    'Poljoprivreda'
  ];

  const cities = [
    'Svejedno',
    'Podgorica',
    'Nikšić',
    'Cetinje',
    'Kotor',
    'Bar',
    'Bijelo Polje'
  ];

  const styles = [
    'Praktičan rad',
    'Rad sa ljudima',
    'Kreativan rad',
    'Istraživanje',
    'Analitika i brojevi',
    'Organizacija i menadžment'
  ];

  const goals = [
    'Brzo zaposlenje',
    'Rad u struci',
    'Mogućnost napredovanja',
    'Rad u inostranstvu',
    'Pokretanje sopstvenog posla',
    'Akademska karijera'
  ];

  const handleAnswer = (name, value) => {
    setAnswers({
      ...answers,
      [name]: value
    });

    setShowResults(false);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({
      area: '',
      city: '',
      style: '',
      goal: ''
    });

    setShowResults(false);
  };

  const recommendedFaculties = faculties.filter((faculty) => {
    const text = `
      ${faculty.name || ''}
      ${faculty.description || ''}
      ${faculty.short_description || ''}
      ${faculty.city || ''}
    `.toLowerCase();

    const area = answers.area.toLowerCase();
    const style = answers.style.toLowerCase();
    const goal = answers.goal.toLowerCase();

    const matchesArea =
      !answers.area ||
      text.includes(area) ||
      (answers.area === 'Tehnologija' &&
        (text.includes('računar') ||
          text.includes('tehnolog') ||
          text.includes('elektro') ||
          text.includes('informat'))) ||
      (answers.area === 'Medicina' &&
        (text.includes('medicin') ||
          text.includes('zdrav') ||
          text.includes('fizioter'))) ||
      (answers.area === 'Ekonomija' &&
        (text.includes('ekonom') ||
          text.includes('menadž') ||
          text.includes('biznis'))) ||
      (answers.area === 'Pravo' &&
        (text.includes('prav') ||
          text.includes('polit') ||
          text.includes('bezbjed'))) ||
      (answers.area === 'Umjetnost' &&
        (text.includes('umjet') ||
          text.includes('likovn') ||
          text.includes('drams') ||
          text.includes('muzi') ||
          text.includes('arhitekt'))) ||
      (answers.area === 'Sport' &&
        (text.includes('sport') ||
          text.includes('fizičko'))) ||
      (answers.area === 'Turizam' &&
        (text.includes('turiz') ||
          text.includes('hotel') ||
          text.includes('pomor'))) ||
      (answers.area === 'Prirodne nauke' &&
        (text.includes('matemat') ||
          text.includes('fizik') ||
          text.includes('biolog') ||
          text.includes('hemij') ||
          text.includes('prirod'))) ||
      (answers.area === 'Poljoprivreda' &&
        (text.includes('poljopr') ||
          text.includes('bioteh') ||
          text.includes('voćar') ||
          text.includes('bilj')));

    const matchesCity =
      !answers.city ||
      answers.city === 'Nije mi presudno' ||
      faculty.city === answers.city;

    const matchesStyle =
      !answers.style ||
      text.includes(style) ||
      (answers.style === 'Praktičan rad' &&
        (text.includes('prakti') ||
          text.includes('primijen'))) ||
      (answers.style === 'Rad sa ljudima' &&
        (text.includes('medicin') ||
          text.includes('prav') ||
          text.includes('učitelj') ||
          text.includes('pedagog') ||
          text.includes('socijal'))) ||
      (answers.style === 'Kreativan rad' &&
        (text.includes('umjet') ||
          text.includes('arhitekt') ||
          text.includes('dizajn') ||
          text.includes('film') ||
          text.includes('drama'))) ||
      (answers.style === 'Istraživanje' &&
        (text.includes('nauk') ||
          text.includes('istraž') ||
          text.includes('biolog') ||
          text.includes('fizik') ||
          text.includes('hemij'))) ||
      (answers.style === 'Analitika i brojevi' &&
        (text.includes('matemat') ||
          text.includes('ekonom') ||
          text.includes('računar') ||
          text.includes('inženjer'))) ||
      (answers.style === 'Organizacija i menadžment' &&
        (text.includes('menadž') ||
          text.includes('organiz') ||
          text.includes('ekonom') ||
          text.includes('turiz')));

    const matchesGoal =
      !answers.goal ||
      text.includes(goal) ||
      (answers.goal === 'Brzo zaposlenje' &&
        (text.includes('primijen') ||
          text.includes('prakti') ||
          text.includes('tržište') ||
          text.includes('zapoš'))) ||
      (answers.goal === 'Rad u struci' &&
        (text.includes('struk') ||
          text.includes('profes') ||
          text.includes('prakti'))) ||
      (answers.goal === 'Mogućnost napredovanja' &&
        (text.includes('master') ||
          text.includes('doktor') ||
          text.includes('karijer') ||
          text.includes('razvoj'))) ||
      (answers.goal === 'Rad u inostranstvu' &&
        (text.includes('međunar') ||
          text.includes('evrops') ||
          text.includes('mobilnost') ||
          text.includes('inostran'))) ||
      (answers.goal === 'Pokretanje sopstvenog posla' &&
        (text.includes('biznis') ||
          text.includes('menadž') ||
          text.includes('preduzet') ||
          text.includes('ekonom'))) ||
      (answers.goal === 'Akademska karijera' &&
        (text.includes('nauk') ||
          text.includes('istraž') ||
          text.includes('doktor') ||
          text.includes('akadem')));

    return matchesArea && matchesCity && matchesStyle && matchesGoal;
  });

  const OptionButton = ({ name, value, selectedValue }) => (
    <button
      type="button"
      onClick={() => handleAnswer(name, value)}
      style={{
        backgroundColor: selectedValue === value ? '#003B71' : 'white',
        color: selectedValue === value ? 'white' : '#003B71',
        border:
          selectedValue === value
            ? '1px solid #003B71'
            : '1px solid #dbeafe',
        padding: '11px 15px',
        borderRadius: '999px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: '0.25s ease',
        boxShadow:
          selectedValue === value
            ? '0 8px 18px rgba(0, 59, 113, 0.18)'
            : '0 5px 14px rgba(15, 23, 42, 0.04)'
      }}
    >
      {value}
    </button>
  );

  return (
    <main
      className="recommendation-page"
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #f8fbff 0%, #eef6ff 45%, #ffffff 100%)',
        padding: '46px 30px 75px'
      }}
    >
      <div
        className="recommendation-container"
        style={{
          width: '92%',
          maxWidth: '1180px',
          margin: '0 auto'
        }}
      >
        <section
          className="recommendation-hero"
          style={{
            background:
              'linear-gradient(135deg, #003B71 0%, #0057a3 100%)',
            padding: '46px 42px',
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
              maxWidth: '780px'
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
              Preporuka fakulteta
            </p>

            <h1
              style={{
                margin: 0,
                fontSize: '46px',
                lineHeight: 1.12,
                fontWeight: '800'
              }}
            >
              Pronađi fakultet koji odgovara tvojim interesovanjima
            </h1>

            <p
              style={{
                margin: '18px 0 0',
                color: '#eaf4ff',
                fontSize: '17px',
                lineHeight: 1.75
              }}
            >
              Odgovori na nekoliko kratkih pitanja i dobićeš prijedloge
              fakulteta koji mogu odgovarati tvojim interesovanjima.
            </p>
          </div>
        </section>

        {!user && (
          <div
            style={{
              backgroundColor: 'white',
              border: '1px solid #dbeafe',
              borderRadius: '18px',
              padding: '18px 22px',
              marginBottom: '28px',
              boxShadow: '0 10px 28px rgba(15, 23, 42, 0.06)',
              color: '#64748b',
              lineHeight: 1.6
            }}
          >
            Možeš uraditi kviz i bez prijave, ali za čuvanje fakulteta i
            dodavanje recenzija potrebno je da budeš prijavljen/a.
          </div>
        )}

        <section
          className="recommendation-quiz-card"
          style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            border: '1px solid #dbeafe',
            boxShadow: '0 14px 36px rgba(15, 23, 42, 0.08)',
            padding: '30px',
            marginBottom: '30px'
          }}
        >
          <div
            style={{
              marginBottom: '26px'
            }}
          >
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
              Kviz
            </p>

            <h2
              style={{
                margin: 0,
                color: '#0f172a',
                fontSize: '30px',
                fontWeight: '800'
              }}
            >
              Odaberi ono što ti najviše odgovara
            </h2>

            <p
              style={{
                margin: '10px 0 0',
                color: '#64748b',
                lineHeight: 1.7
              }}
            >
              Ne moraš izabrati sve opcije. Što više odgovora odabereš,
              prijedlozi će biti precizniji.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: '24px'
            }}
          >
            <div
              className="recommendation-question-card"
              style={{
                backgroundColor: '#f8fbff',
                border: '1px solid #e5e7eb',
                borderRadius: '18px',
                padding: '24px'
              }}
            >
              <h3
                style={{
                  color: '#003B71',
                  margin: '0 0 14px',
                  fontSize: '20px'
                }}
              >
                1. Koja oblast te najviše zanima?
              </h3>

              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}
              >
                {areas.map((area) => (
                  <OptionButton
                    key={area}
                    name="area"
                    value={area}
                    selectedValue={answers.area}
                  />
                ))}
              </div>
            </div>

            <div
              className="recommendation-question-card"
              style={{
                backgroundColor: '#f8fbff',
                border: '1px solid #e5e7eb',
                borderRadius: '18px',
                padding: '24px'
              }}
            >
              <h3
                style={{
                  color: '#003B71',
                  margin: '0 0 14px',
                  fontSize: '20px'
                }}
              >
                2. U kom gradu bi najviše volio/voljela da studiraš?
              </h3>

              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}
              >
                {cities.map((city) => (
                  <OptionButton
                    key={city}
                    name="city"
                    value={city}
                    selectedValue={answers.city}
                  />
                ))}
              </div>
            </div>

            <div
              className="recommendation-question-card"
              style={{
                backgroundColor: '#f8fbff',
                border: '1px solid #e5e7eb',
                borderRadius: '18px',
                padding: '24px'
              }}
            >
              <h3
                style={{
                  color: '#003B71',
                  margin: '0 0 14px',
                  fontSize: '20px'
                }}
              >
                3. Kakav način rada ti najviše odgovara?
              </h3>

              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}
              >
                {styles.map((style) => (
                  <OptionButton
                    key={style}
                    name="style"
                    value={style}
                    selectedValue={answers.style}
                  />
                ))}
              </div>
            </div>

            <div
              className="recommendation-question-card"
              style={{
                backgroundColor: '#f8fbff',
                border: '1px solid #e5e7eb',
                borderRadius: '18px',
                padding: '24px'
              }}
            >
              <h3
                style={{
                  color: '#003B71',
                  margin: '0 0 14px',
                  fontSize: '20px'
                }}
              >
                4. Šta ti je najvažnije poslije studija?
              </h3>

              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}
              >
                {goals.map((goal) => (
                  <OptionButton
                    key={goal}
                    name="goal"
                    value={goal}
                    selectedValue={answers.goal}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="recommendation-actions"
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              marginTop: '28px'
            }}
          >
            <button
              onClick={handleSubmit}
              style={{
                backgroundColor: '#003B71',
                color: 'white',
                border: 'none',
                padding: '13px 22px',
                borderRadius: '13px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(0, 59, 113, 0.20)'
              }}
            >
              Prikaži prijedloge
            </button>

            <button
              onClick={handleReset}
              style={{
                backgroundColor: 'white',
                color: '#003B71',
                border: '1px solid #dbeafe',
                padding: '13px 22px',
                borderRadius: '13px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Resetuj kviz
            </button>
          </div>
        </section>

        {showResults && (
          <section
            className="recommendation-results"
            style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              border: '1px solid #dbeafe',
              boxShadow: '0 14px 36px rgba(15, 23, 42, 0.08)',
              padding: '30px'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                marginBottom: '24px'
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
                  Rezultat kviza
                </p>

                <h2
                  style={{
                    margin: 0,
                    color: '#0f172a',
                    fontSize: '30px',
                    fontWeight: '800'
                  }}
                >
                  Fakulteti koje vrijedi pogledati
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
                Pronađeno: {recommendedFaculties.length}
              </span>
            </div>

            <div
              style={{
                backgroundColor: '#f8fbff',
                border: '1px solid #e5e7eb',
                borderRadius: '18px',
                padding: '18px 20px',
                marginBottom: '24px',
                color: '#64748b',
                lineHeight: 1.7
              }}
            >
              Ovo su prijedlozi na osnovu odabranih interesovanja. Prije
              konačne odluke pogledaj detalje fakulteta i zvanične informacije
              o upisu.
            </div>

            {recommendedFaculties.length === 0 ? (
              <div
                style={{
                  backgroundColor: '#f8fbff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '20px',
                  padding: '42px 28px',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '18px',
                    backgroundColor: '#eef4fb',
                    color: '#003B71',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 18px',
                    fontSize: '28px'
                  }}
                >
                  🔎
                </div>

                <h3
                  style={{
                    margin: '0 0 10px',
                    color: '#003B71',
                    fontSize: '22px'
                  }}
                >
                  Nijesmo pronašli tačno poklapanje
                </h3>

                <p
                  style={{
                    margin: '0 auto',
                    color: '#64748b',
                    lineHeight: 1.7,
                    maxWidth: '540px'
                  }}
                >
                  Pokušaj da ukloniš grad kao uslov, izabereš opciju “Nije mi
                  presudno” ili odabereš širu oblast. Neki fakulteti mogu
                  odgovarati tvojim interesovanjima iako nijesu u izabranom
                  gradu.
                </p>
              </div>
            ) : (
              <div
                className="recommendation-results-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '22px'
                }}
              >
                {recommendedFaculties.map((faculty) => (
                  <div
                    key={faculty.id}
                    style={{
                      backgroundColor: '#f8fbff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 28px rgba(15, 23, 42, 0.06)'
                    }}
                  >
                    <img
                      src={faculty.cover_image || '/images/faculties/ucg.png'}
                      alt={faculty.name}
                      style={{
                        width: '100%',
                        height: '175px',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />

                    <div style={{ padding: '22px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          backgroundColor: '#e8f1fb',
                          color: '#003B71',
                          padding: '7px 11px',
                          borderRadius: '999px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          marginBottom: '14px'
                        }}
                      >
                        📍 {faculty.city}
                      </span>

                      <h3
                        style={{
                          margin: '0 0 10px',
                          color: '#0f172a',
                          fontSize: '20px',
                          lineHeight: 1.35
                        }}
                      >
                        {faculty.name}
                      </h3>

                      <p
                        style={{
                          margin: '0 0 18px',
                          color: '#64748b',
                          lineHeight: 1.65,
                          fontSize: '14px'
                        }}
                      >
                        {faculty.short_description || faculty.description}
                      </p>

                      <Link
                        to={`/faculties/${faculty.id}`}
                        style={{
                          display: 'inline-block',
                          backgroundColor: '#003B71',
                          color: 'white',
                          textDecoration: 'none',
                          padding: '11px 16px',
                          borderRadius: '12px',
                          fontWeight: 'bold',
                          fontSize: '14px'
                        }}
                      >
                        Pogledaj detalje →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default RecommendationPage;