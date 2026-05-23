import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import FacultyDetails from './components/FacultyDetails';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

import HomePage from './pages/HomePage';
import FacultiesPage from './pages/FacultiesPage';
import RecommendationPage from './pages/RecommendationPage';
import SavedFacultiesPage from './pages/SavedFacultiesPage';

function App() {
  const [faculties, setFaculties] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const [cityFilter, setCityFilter] = useState('');
  const [locationFaculties, setLocationFaculties] = useState([]);
  const [authForm, setAuthForm] = useState('login');

  useEffect(() => {
    fetch('http://localhost:5000/faculties')
      .then((res) => res.json())
      .then((data) => setFaculties(data))
      .catch((err) => console.error(err));

    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (!cityFilter) {
      setLocationFaculties([]);
      return;
    }

    fetch(`http://localhost:5000/faculties-by-location/${cityFilter}`)
      .then((res) => res.json())
      .then((data) => setLocationFaculties(data))
      .catch((err) => console.error(err));
  }, [cityFilter]);

  const filteredFaculties = (cityFilter ? locationFaculties : faculties).filter(
    (faculty) => {
      const facultyName = faculty.name || '';
      const facultyDescription = faculty.description || '';
      const facultyShortDescription = faculty.short_description || '';

      const matchesSearch =
        facultyName.toLowerCase().includes(search.toLowerCase()) ||
        facultyDescription.toLowerCase().includes(search.toLowerCase()) ||
        facultyShortDescription.toLowerCase().includes(search.toLowerCase());

      return matchesSearch;
    }
  );

  const handleFacultyAdded = (newFaculty) => {
    setFaculties([...faculties, newFaculty]);
  };

  const handleDeleteFaculty = (id) => {
    setFaculties(
      faculties.filter((faculty) => faculty.id !== id)
    );
  };

  const handleUpdateFaculty = (updatedFaculty) => {
    setFaculties(
      faculties.map((faculty) =>
        faculty.id === updatedFaculty.id ? updatedFaculty : faculty
      )
    );
  };

  const handleLogin = (loggedUser) => {
    setUser(loggedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setAuthForm('login');
  };

  const handleCityClick = (cityName) => {
    setSearch('');
    setCityFilter(cityName);
  };

  const recommendationAuthScreen = (
    <main
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #f8fbff 0%, #eef6ff 45%, #ffffff 100%)',
        padding: '60px 30px'
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '34px',
          border: '1px solid #dbeafe',
          boxShadow: '0 18px 45px rgba(15, 23, 42, 0.12)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '26px' }}>
          <div
            style={{
              width: '66px',
              height: '66px',
              borderRadius: '20px',
              backgroundColor: '#eef4fb',
              color: '#003B71',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px',
              fontSize: '30px'
            }}
          >
            🎯
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
            Pronađi fakultet za sebe
          </p>

          <h1
            style={{
              color: '#0f172a',
              margin: 0,
              fontSize: '32px',
              fontWeight: '800'
            }}
          >
            Prijava je potrebna
          </h1>

          <p
            style={{
              color: '#64748b',
              margin: '12px 0 0',
              lineHeight: 1.7
            }}
          >
            Da bi koristio/la kviz za preporuku fakulteta, potrebno je da se
            prijaviš ili napraviš nalog.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px'
          }}
        >
          <button
            onClick={() => setAuthForm('login')}
            style={{
              flex: 1,
              backgroundColor: authForm === 'login' ? '#003B71' : 'white',
              color: authForm === 'login' ? 'white' : '#003B71',
              border: '1px solid #003B71',
              padding: '12px',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Prijava
          </button>

          <button
            onClick={() => setAuthForm('register')}
            style={{
              flex: 1,
              backgroundColor: authForm === 'register' ? '#003B71' : 'white',
              color: authForm === 'register' ? 'white' : '#003B71',
              border: '1px solid #003B71',
              padding: '12px',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Registracija
          </button>
        </div>

        {authForm === 'login' ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <RegisterForm />
        )}
      </div>
    </main>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#eef4fb',
        fontFamily: 'Inter, Arial, sans-serif'
      }}
    >
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              faculties={faculties}
              onCityClick={handleCityClick}
            />
          }
        />

        <Route
          path="/faculties"
          element={
            <FacultiesPage
              user={user}
              search={search}
              setSearch={setSearch}
              cityFilter={cityFilter}
              setCityFilter={setCityFilter}
              filteredFaculties={filteredFaculties}
              onLogin={handleLogin}
              onFacultyAdded={handleFacultyAdded}
              onDeleteFaculty={handleDeleteFaculty}
              onUpdateFaculty={handleUpdateFaculty}
              onCityClick={handleCityClick}
            />
          }
        />

        <Route
          path="/recommendation"
          element={
            user ? (
              <RecommendationPage
                user={user}
                faculties={faculties}
              />
            ) : (
              recommendationAuthScreen
            )
          }
        />

        <Route
          path="/saved"
          element={
            <SavedFacultiesPage user={user} />
          }
        />

        <Route
          path="/faculties/:id"
          element={
            <FacultyDetails
              faculties={faculties}
              user={user}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;