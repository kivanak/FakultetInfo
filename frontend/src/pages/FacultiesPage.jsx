import { useState } from 'react';

import AddFacultyForm from '../components/AddFacultyForm';
import FacultyCard from '../components/FacultyCard';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import MontenegroMap from '../components/MontenegroMap';
import FilterPanel from '../components/FilterPanel';

function FacultiesPage({
  user,
  search,
  setSearch,
  cityFilter,
  setCityFilter,
  filteredFaculties,
  onLogin,
  onFacultyAdded,
  onDeleteFaculty,
  onUpdateFaculty,
  onCityClick
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [authForm, setAuthForm] = useState(null);

  const firstRowFaculties = filteredFaculties.slice(0, 2);
  const remainingFaculties = filteredFaculties.slice(2);

  return (
    <main
      style={{
        width: '94%',
        maxWidth: '1520px',
        margin: '0 auto',
        padding: '46px 0 70px'
      }}
    >
      <section
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
            maxWidth: '830px'
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
            Fakulteti
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: '46px',
              lineHeight: 1.12,
              fontWeight: '800'
            }}
          >
            Istraži fakultete Univerziteta Crne Gore
          </h1>

          <p
            style={{
              margin: '18px 0 0',
              color: '#eaf4ff',
              fontSize: '17px',
              lineHeight: 1.75
            }}
          >
            Pretraži fakultete, filtriraj ih po gradovima, pogledaj lokacije na mapi
            i pronađi detalje o studijskim programima.
          </p>
        </div>
      </section>

      {!user && (
        <section
          style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '20px',
            boxShadow: '0 10px 28px rgba(15, 23, 42, 0.08)',
            border: '1px solid #e5e7eb',
            marginBottom: '30px',
            textAlign: 'center'
          }}
        >
          <h2
            style={{
              color: '#003B71',
              margin: '0 0 8px',
              fontSize: '26px'
            }}
          >
            Korisnički nalog
          </h2>

          <p
            style={{
              color: '#64748b',
              margin: '0 0 20px',
              fontSize: '14px'
            }}
          >
            Prijavite se ili napravite nalog za dodatne opcije.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '14px',
              marginBottom: authForm ? '24px' : '0'
            }}
          >
            <button
              onClick={() => setAuthForm(authForm === 'login' ? null : 'login')}
              style={{
                backgroundColor: authForm === 'login' ? '#003B71' : 'white',
                color: authForm === 'login' ? 'white' : '#003B71',
                border: '1px solid #003B71',
                padding: '12px 22px',
                borderRadius: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: '0.25s ease'
              }}
            >
              Prijava
            </button>

            <button
              onClick={() =>
                setAuthForm(authForm === 'register' ? null : 'register')
              }
              style={{
                backgroundColor: authForm === 'register' ? '#003B71' : 'white',
                color: authForm === 'register' ? 'white' : '#003B71',
                border: '1px solid #003B71',
                padding: '12px 22px',
                borderRadius: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: '0.25s ease'
              }}
            >
              Registracija
            </button>
          </div>

          {authForm === 'login' && (
            <div
              style={{
                maxWidth: '480px',
                margin: '0 auto',
                textAlign: 'left'
              }}
            >
              <LoginForm onLogin={onLogin} />
            </div>
          )}

          {authForm === 'register' && (
            <div
              style={{
                maxWidth: '520px',
                margin: '0 auto',
                textAlign: 'left'
              }}
            >
              <RegisterForm />
            </div>
          )}
        </section>
      )}

      {user?.role === 'admin' && (
        <section
          style={{
            marginBottom: '30px',
            textAlign: 'center'
          }}
        >
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              backgroundColor: '#003B71',
              color: 'white',
              border: 'none',
              padding: '12px 22px',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(0, 59, 113, 0.18)'
            }}
          >
            {showAddForm ? 'Sakrij formu' : '+ Dodaj fakultet'}
          </button>

          {showAddForm && (
            <div style={{ marginTop: '22px' }}>
              <AddFacultyForm onFacultyAdded={onFacultyAdded} />
            </div>
          )}
        </section>
      )}

      <FilterPanel
        search={search}
        setSearch={setSearch}
        cityFilter={cityFilter}
        setCityFilter={setCityFilter}
      />

      <section>
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '22px',
            padding: '24px 28px',
            marginBottom: '24px',
            boxShadow: '0 10px 28px rgba(15, 23, 42, 0.06)',
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
              Rezultati pretrage
            </p>

            <h2
              style={{
                color: '#0f172a',
                margin: 0,
                fontSize: '30px',
                fontWeight: '800'
              }}
            >
              Fakulteti
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
            Pronađeno: {filteredFaculties.length}
          </span>
        </div>

        {filteredFaculties.length === 0 ? (
          <div
            style={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '22px',
              padding: '42px 28px',
              textAlign: 'center',
              boxShadow: '0 10px 28px rgba(15, 23, 42, 0.06)'
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
              Nema pronađenih fakulteta
            </h3>

            <p
              style={{
                margin: 0,
                color: '#64748b',
                lineHeight: 1.7
              }}
            >
              Pokušaj da promijeniš pretragu ili izabereš drugi grad.
            </p>
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: '28px',
                alignItems: 'stretch',
                marginBottom: '28px'
              }}
            >
              {firstRowFaculties.map((faculty) => (
                <FacultyCard
                  key={faculty.id}
                  faculty={faculty}
                  onDelete={onDeleteFaculty}
                  onUpdate={onUpdateFaculty}
                  isAdmin={user?.role === 'admin'}
                />
              ))}

              <MontenegroMap onCityClick={onCityClick} />
            </div>

            {remainingFaculties.length > 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: '28px'
                }}
              >
                {remainingFaculties.map((faculty) => (
                  <FacultyCard
                    key={faculty.id}
                    faculty={faculty}
                    onDelete={onDeleteFaculty}
                    onUpdate={onUpdateFaculty}
                    isAdmin={user?.role === 'admin'}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default FacultiesPage;