import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import AddFacultyForm from './components/AddFacultyForm';
import FacultyCard from './components/FacultyCard';
import FacultyDetails from './components/FacultyDetails';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() {
  const [faculties, setFaculties] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);

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

  const filteredFaculties = faculties.filter((faculty) =>
    faculty.name.toLowerCase().includes(search.toLowerCase()) ||
    faculty.city.toLowerCase().includes(search.toLowerCase())
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
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div
            style={{
              minHeight: '100vh',
              backgroundColor: '#f4f7fb',
              padding: '40px',
              fontFamily: 'Arial'
            }}
          >
            <h1 style={{ textAlign: 'center', color: '#003B71' }}>
              FakultetInfo
            </h1>

            <p style={{ textAlign: 'center', color: '#555', marginBottom: '30px' }}>
              Vodič za izbor fakulteta Univerziteta Crne Gore
            </p>

            {user ? (
              <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                <p style={{ color: '#003B71', fontWeight: 'bold' }}>
                  Prijavljeni ste kao: {user.full_name} ({user.role})
                </p>

                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: '#c62828',
                    color: 'white',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Odjavi se
                </button>
              </div>
            ) : (
              <>
                <RegisterForm />
                <LoginForm onLogin={handleLogin} />
              </>
            )}

            {user?.role === 'admin' && (
              <AddFacultyForm onFacultyAdded={handleFacultyAdded} />
            )}

            <input
              type="text"
              placeholder="Pretraži po nazivu ili gradu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                display: 'block',
                width: '100%',
                maxWidth: '500px',
                margin: '0 auto 35px',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '16px',
                backgroundColor: 'white',
                color: '#222'
              }}
            />

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
        }
      />

      <Route
        path="/faculties/:id"
        element={<FacultyDetails faculties={faculties} />}
      />
    </Routes>
  );
}

export default App;