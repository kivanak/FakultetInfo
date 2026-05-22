import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './FacultyDetails.css';

function FacultyDetails({ faculties, user }) {
  const { id } = useParams();

  const [programs, setPrograms] = useState([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewData, setReviewData] = useState({
    rating: '5',
    comment: ''
  });
  const [reviewMessage, setReviewMessage] = useState('');

  const [isSaved, setIsSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const faculty = faculties.find((f) => f.id === Number(id));

  useEffect(() => {
    fetch(`http://localhost:5000/faculties/${id}/programs`)
      .then((res) => res.json())
      .then((data) => {
        setPrograms(data);
        setLoadingPrograms(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingPrograms(false);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/faculties/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoadingReviews(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingReviews(false);
      });
  }, [id]);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5000/users/${user.id}/saved-faculties`)
      .then((res) => res.json())
      .then((data) => {
        const alreadySaved = data.some(
          (savedFaculty) => savedFaculty.id === Number(id)
        );

        setIsSaved(alreadySaved);
      })
      .catch((err) => console.error(err));
  }, [user, id]);

  const osnovnePrograms = programs.filter(
    (program) => program.degree_level === 'osnovne'
  );

  const masterPrograms = programs.filter(
    (program) => program.degree_level === 'master'
  );

  const doktorskePrograms = programs.filter(
    (program) => program.degree_level === 'doktorske'
  );

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + Number(review.rating), 0) /
          reviews.length
        ).toFixed(1)
      : '0.0';

  const handleReviewChange = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewMessage('');

    if (!user) {
      setReviewMessage('Morate biti prijavljeni da biste ostavili recenziju.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/faculties/${id}/reviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: user.id,
            rating: Number(reviewData.rating),
            comment: reviewData.comment
          })
        }
      );

      if (!response.ok) {
        setReviewMessage('Greška pri dodavanju recenzije.');
        return;
      }

      setReviewData({
        rating: '5',
        comment: ''
      });

      setReviewMessage('Recenzija je uspješno dodata.');

      const reviewsResponse = await fetch(
        `http://localhost:5000/faculties/${id}/reviews`
      );

      const reviewsData = await reviewsResponse.json();
      setReviews(reviewsData);
    } catch (err) {
      console.error(err);
      setReviewMessage('Server nije dostupan.');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const confirmed = window.confirm(
      'Da li ste sigurni da želite obrisati ovu recenziju?'
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/reviews/${reviewId}`,
        {
          method: 'DELETE'
        }
      );

      if (!response.ok) {
        alert('Greška pri brisanju recenzije.');
        return;
      }

      setReviews(
        reviews.filter((review) => review.id !== reviewId)
      );
    } catch (err) {
      console.error(err);
      alert('Server nije dostupan.');
    }
  };

  const handleSaveFaculty = async () => {
    setSaveMessage('');

    if (!user) {
      setSaveMessage('Morate biti prijavljeni da biste sačuvali fakultet.');
      return;
    }

    try {
      if (isSaved) {
        const response = await fetch(
          `http://localhost:5000/saved-faculties/${user.id}/${id}`,
          {
            method: 'DELETE'
          }
        );

        if (!response.ok) {
          setSaveMessage('Greška pri uklanjanju fakulteta.');
          return;
        }

        setIsSaved(false);
        setSaveMessage('Fakultet je uklonjen iz sačuvanih.');
      } else {
        const response = await fetch('http://localhost:5000/saved-faculties', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: user.id,
            faculty_id: Number(id)
          })
        });

        if (!response.ok) {
          setSaveMessage('Greška pri čuvanju fakulteta.');
          return;
        }

        setIsSaved(true);
        setSaveMessage('Fakultet je sačuvan.');
      }
    } catch (err) {
      console.error(err);
      setSaveMessage('Server nije dostupan.');
    }
  };

  const renderPrograms = (title, items) => {
    if (items.length === 0) return null;

    return (
      <div style={{ marginTop: '28px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            gap: '14px',
            flexWrap: 'wrap'
          }}
        >
          <h3
            style={{
              color: '#003B71',
              margin: 0,
              fontSize: '22px',
              fontWeight: '800'
            }}
          >
            {title}
          </h3>

          <span
            style={{
              backgroundColor: '#e8f1fb',
              color: '#003B71',
              padding: '7px 13px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          >
            {items.length} programa
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px'
          }}
        >
          {items.map((program) => (
            <div
              key={program.id}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow =
                  '0 16px 35px rgba(15, 23, 42, 0.12)';
                e.currentTarget.style.borderColor = '#b8d4ee';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 8px 22px rgba(15, 23, 42, 0.06)';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 8px 22px rgba(15, 23, 42, 0.06)',
                transition: '0.25s ease'
              }}
            >
              <h4
                style={{
                  margin: '0 0 12px',
                  color: '#0f172a',
                  fontSize: '16px',
                  lineHeight: 1.45,
                  fontWeight: '800'
                }}
              >
                {program.name}
              </h4>

              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#eef4fb',
                  color: '#003B71',
                  padding: '7px 10px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  lineHeight: 1.4
                }}
              >
                {program.field_area}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
      className="faculty-details-page"
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #f8fbff 0%, #eef6ff 45%, #ffffff 100%)',
        padding: '45px 30px 75px'
      }}
    >
      <div
        className="faculty-details-container"
        style={{
          maxWidth: '1180px',
          margin: '0 auto'
        }}
      >
        <Link
          to="/faculties"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginBottom: '25px',
            textDecoration: 'none',
            color: '#003B71',
            fontWeight: 'bold',
            backgroundColor: 'white',
            padding: '10px 15px',
            borderRadius: '999px',
            border: '1px solid #dbeafe',
            boxShadow: '0 8px 22px rgba(15, 23, 42, 0.06)'
          }}
        >
          ← Nazad na fakultete
        </Link>

        <section
          className="faculty-details-card"
          style={{
            backgroundColor: 'white',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 18px 45px rgba(15, 23, 42, 0.12)',
            border: '1px solid #dbeafe',
            marginBottom: '30px'
          }}
        >
          <div
            className="faculty-details-hero-image"
            style={{
              position: 'relative',
              height: '360px',
              overflow: 'hidden',
              backgroundColor: '#e8f1fb'
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

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0, 59, 113, 0.58))'
              }}
            />

            <div
              className="faculty-details-hero-content"
              style={{
                position: 'absolute',
                left: '38px',
                right: '38px',
                bottom: '34px',
                color: 'white'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                  marginBottom: '16px'
                }}
              >
                <span
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
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
                    backgroundColor: 'rgba(255, 255, 255, 0.18)',
                    color: 'white',
                    padding: '7px 12px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    border: '1px solid rgba(255,255,255,0.35)'
                  }}
                >
                  {faculty.type === 'drzavni'
                    ? 'Državni fakultet'
                    : 'Privatni fakultet'}
                </span>
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: '42px',
                  lineHeight: 1.15,
                  fontWeight: '800',
                  maxWidth: '850px'
                }}
              >
                {faculty.name}
              </h1>

              <p
                style={{
                  margin: '10px 0 0',
                  color: '#eaf4ff',
                  fontSize: '17px',
                  fontWeight: '600'
                }}
              >
                {faculty.university_name}
              </p>
            </div>
          </div>

          <div
            className="faculty-details-content"
            style={{ padding: '34px 38px 38px' }}
          >
            <div
              className="faculty-details-actions"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '18px',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginBottom: '30px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}
              >
                <button
                  onClick={handleSaveFaculty}
                  style={{
                    backgroundColor: isSaved ? 'white' : '#003B71',
                    color: isSaved ? '#003B71' : 'white',
                    border: '1px solid #003B71',
                    padding: '13px 20px',
                    borderRadius: '13px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: isSaved
                      ? 'none'
                      : '0 8px 20px rgba(0, 59, 113, 0.20)',
                    transition: '0.25s ease'
                  }}
                >
                  {isSaved ? '☆ Ukloni iz sačuvanih' : '☆ Sačuvaj fakultet'}
                </button>

                {faculty.website_url && (
                  <a
                    href={faculty.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#eef4fb',
                      color: '#003B71',
                      padding: '13px 20px',
                      borderRadius: '13px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      border: '1px solid #dbeafe'
                    }}
                  >
                    Posjeti zvanični sajt →
                  </a>
                )}
              </div>

              <div
                style={{
                  backgroundColor: '#f8fbff',
                  border: '1px solid #dbeafe',
                  borderRadius: '16px',
                  padding: '14px 18px',
                  minWidth: '160px',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    color: '#f59e0b',
                    fontSize: '22px',
                    fontWeight: '800'
                  }}
                >
                  ★ {averageRating}
                </div>

                <p
                  style={{
                    margin: '4px 0 0',
                    color: '#64748b',
                    fontSize: '13px',
                    fontWeight: 'bold'
                  }}
                >
                  {reviews.length} recenzija
                </p>
              </div>
            </div>

            {saveMessage && (
              <p
                style={{
                  margin: '-16px 0 24px',
                  color: '#003B71',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                {saveMessage}
              </p>
            )}

            <div
              className="faculty-info-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '18px',
                marginBottom: '30px'
              }}
            >
              <div
                style={{
                  backgroundColor: '#f8fbff',
                  padding: '22px',
                  borderRadius: '16px',
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
                  padding: '22px',
                  borderRadius: '16px',
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

            <section
              style={{
                backgroundColor: '#f8fbff',
                padding: '28px',
                borderRadius: '18px',
                border: '1px solid #e5e7eb',
                marginBottom: '28px'
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
                Informacije
              </p>

              <h2
                style={{
                  color: '#0f172a',
                  margin: '0 0 14px',
                  fontSize: '26px',
                  fontWeight: '800'
                }}
              >
                O fakultetu
              </h2>

              <p
                style={{
                  lineHeight: 1.85,
                  color: '#475569',
                  margin: 0,
                  fontSize: '16px'
                }}
              >
                {faculty.description}
              </p>
            </section>

            <section
              style={{
                backgroundColor: '#f8fbff',
                padding: '28px',
                borderRadius: '18px',
                border: '1px solid #e5e7eb',
                marginBottom: '28px'
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
                Programi
              </p>

              <h2
                style={{
                  color: '#0f172a',
                  margin: '0 0 8px',
                  fontSize: '26px',
                  fontWeight: '800'
                }}
              >
                Studijski programi
              </h2>

              <p
                style={{
                  margin: '0 0 18px',
                  color: '#64748b',
                  fontSize: '14px'
                }}
              >
                Pregled studijskih programa za izabrani fakultet.
              </p>

              {loadingPrograms ? (
                <p style={{ color: '#64748b', margin: 0 }}>
                  Učitavanje programa...
                </p>
              ) : programs.length === 0 ? (
                <p style={{ color: '#64748b', margin: 0 }}>
                  Za ovaj fakultet trenutno nema unesenih studijskih programa.
                </p>
              ) : (
                <>
                  {renderPrograms('Osnovne studije', osnovnePrograms)}
                  {renderPrograms('Master studije', masterPrograms)}
                  {renderPrograms('Doktorske studije', doktorskePrograms)}
                </>
              )}
            </section>

            <section
              style={{
                backgroundColor: '#f8fbff',
                padding: '28px',
                borderRadius: '18px',
                border: '1px solid #e5e7eb'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '20px',
                  alignItems: 'center',
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
                    Iskustva
                  </p>

                  <h2
                    style={{
                      color: '#0f172a',
                      margin: '0 0 8px',
                      fontSize: '26px',
                      fontWeight: '800'
                    }}
                  >
                    Recenzije studenata
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      color: '#64748b',
                      fontSize: '14px',
                      lineHeight: 1.6
                    }}
                  >
                    Pogledaj iskustva korisnika i ocjene za ovaj fakultet.
                  </p>
                </div>
              </div>

              {user ? (
                <form
                  onSubmit={handleReviewSubmit}
                  style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '18px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 8px 22px rgba(15, 23, 42, 0.06)',
                    marginBottom: '28px'
                  }}
                >
                  <h3
                    style={{
                      color: '#003B71',
                      margin: '0 0 16px',
                      fontSize: '19px'
                    }}
                  >
                    Ostavi recenziju
                  </h3>

                  <label
                    style={{
                      display: 'block',
                      color: '#003B71',
                      fontWeight: 'bold',
                      marginBottom: '10px'
                    }}
                  >
                    Ocjena
                  </label>

                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      marginBottom: '18px',
                      alignItems: 'center'
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setReviewData({
                            ...reviewData,
                            rating: String(star)
                          })
                        }
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          color:
                            star <= Number(reviewData.rating)
                              ? '#f59e0b'
                              : '#cbd5e1',
                          fontSize: '31px',
                          cursor: 'pointer',
                          padding: '0 2px',
                          transition: '0.2s ease',
                          lineHeight: 1
                        }}
                      >
                        ★
                      </button>
                    ))}

                    <span
                      style={{
                        marginLeft: '10px',
                        color: '#64748b',
                        fontWeight: 'bold',
                        fontSize: '14px'
                      }}
                    >
                      {reviewData.rating}/5
                    </span>
                  </div>

                  <label
                    style={{
                      display: 'block',
                      color: '#003B71',
                      fontWeight: 'bold',
                      marginBottom: '8px'
                    }}
                  >
                    Komentar
                  </label>

                  <textarea
                    name="comment"
                    placeholder="Napiši svoje iskustvo ili mišljenje..."
                    value={reviewData.comment}
                    onChange={handleReviewChange}
                    style={{
                      width: '100%',
                      minHeight: '105px',
                      padding: '13px 15px',
                      borderRadius: '12px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: 'white',
                      color: '#0f172a',
                      fontSize: '15px',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                      outline: 'none',
                      marginBottom: '16px'
                    }}
                  />

                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#003B71',
                      color: 'white',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      boxShadow: '0 8px 20px rgba(0, 59, 113, 0.20)'
                    }}
                  >
                    Dodaj recenziju
                  </button>

                  {reviewMessage && (
                    <p
                      style={{
                        margin: '14px 0 0',
                        color: '#003B71',
                        fontWeight: 'bold',
                        fontSize: '14px'
                      }}
                    >
                      {reviewMessage}
                    </p>
                  )}
                </form>
              ) : (
                <div
                  style={{
                    backgroundColor: 'white',
                    padding: '22px',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                    marginBottom: '24px',
                    boxShadow: '0 8px 22px rgba(15, 23, 42, 0.05)'
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: '#64748b',
                      lineHeight: 1.6
                    }}
                  >
                    Za dodavanje recenzije potrebno je da se prijavite.
                  </p>
                </div>
              )}

              {loadingReviews ? (
                <p style={{ color: '#64748b', margin: 0 }}>
                  Učitavanje recenzija...
                </p>
              ) : reviews.length === 0 ? (
                <div
                  style={{
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                    textAlign: 'center'
                  }}
                >
                  <h3
                    style={{
                      color: '#003B71',
                      margin: '0 0 8px'
                    }}
                  >
                    Još nema recenzija
                  </h3>

                  <p
                    style={{
                      color: '#64748b',
                      margin: 0
                    }}
                  >
                    Budi prvi/prva koji će ostaviti mišljenje o ovom fakultetu.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gap: '16px'
                  }}
                >
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      style={{
                        backgroundColor: 'white',
                        padding: '22px',
                        borderRadius: '18px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 8px 22px rgba(15, 23, 42, 0.06)'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: '12px',
                          marginBottom: '12px',
                          flexWrap: 'wrap',
                          alignItems: 'center'
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                          }}
                        >
                          <div
                            style={{
                              width: '42px',
                              height: '42px',
                              borderRadius: '50%',
                              backgroundColor: '#e8f1fb',
                              color: '#003B71',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold'
                            }}
                          >
                            {review.full_name?.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <strong style={{ color: '#003B71' }}>
                              {review.full_name}
                            </strong>

                            <div
                              style={{
                                color: '#f59e0b',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                marginTop: '3px'
                              }}
                            >
                              {'★'.repeat(review.rating)}
                              {'☆'.repeat(5 - review.rating)}
                            </div>
                          </div>
                        </div>

                        {user?.role === 'admin' && (
                          <button
                            onClick={() => handleDeleteReview(review.id)}
                            style={{
                              backgroundColor: '#fdecec',
                              color: '#b42318',
                              border: '1px solid #f2b8b5',
                              padding: '8px 12px',
                              borderRadius: '10px',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Obriši
                          </button>
                        )}
                      </div>

                      <p
                        style={{
                          margin: 0,
                          color: '#475569',
                          lineHeight: 1.7,
                          fontSize: '15px'
                        }}
                      >
                        {review.comment || 'Korisnik nije ostavio komentar.'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}

export default FacultyDetails;