import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import AddFacultyForm from './components/AddFacultyForm';
import FacultyCard from './components/FacultyCard';
import FacultyDetails from './components/FacultyDetails';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import MontenegroMap from './components/MontenegroMap';
import FilterPanel from './components/FilterPanel';

import HomePage from './pages/HomePage';

function App() {
  const [faculties, setFaculties] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const [cityFilter, setCityFilter] = useState('');

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

  const filteredFaculties = faculties.filter((faculty) => {
    const matchesSearch =
      faculty.name.toLowerCase().includes(search.toLowerCase()) ||
      faculty.description.toLowerCase().includes(search.toLowerCase());

    const matchesCity =
      cityFilter === '' || faculty.city === cityFilter;

    return matchesSearch && matchesCity;
  });

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
  };

  const handleCityClick = (cityName) => {
    setCityFilter(cityName);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#eef4fb',
        fontFamily: 'Arial'
      }}
    >
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/faculties"
          element={
            <main
              style={{
                maxWidth: '1250px',
                margin: '0 auto',
                padding: '40px 30px 50px'
              }}
            >
              {!user && (
                <section
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    marginBottom: '30px'
                  }}
                >
                  <RegisterForm />
                  <LoginForm onLogin={handleLogin} />
                </section>
              )}

              {user?.role === 'admin' && (
                <section style={{ marginBottom: '30px' }}>
                  <AddFacultyForm onFacultyAdded={handleFacultyAdded} />
                </section>
              )}

              <FilterPanel
                search={search}
                setSearch={setSearch}
                cityFilter={cityFilter}
                setCityFilter={setCityFilter}
              />

              <section
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 420px',
                  gap: '25px',
                  alignItems: 'start'
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '18px'
                    }}
                  >
                    <h2 style={{ color: '#003B71', margin: 0 }}>
                      Fakulteti
                    </h2>

                    <span style={{ color: '#666' }}>
                      Pronađeno: {filteredFaculties.length}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '20px'
                    }}
                  >
                    {filteredFaculties.map((faculty) => (
                      <FacultyCard
                        key={faculty.id}
                        faculty={faculty}
                        onDelete={handleDeleteFaculty}
                        onUpdate={handleUpdateFaculty}
                        isAdmin={user?.role === 'admin'}
                      />
                    ))}
                  </div>
                </div>

                <MontenegroMap onCityClick={handleCityClick} />
              </section>
            </main>
          }
        />

        <Route
          path="/faculties/:id"
          element={<FacultyDetails faculties={faculties} />}
        />
      </Routes>
    </div>
  );
}

export default App;