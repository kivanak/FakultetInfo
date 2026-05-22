import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import FacultyDetails from './components/FacultyDetails';

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
  };

  const handleCityClick = (cityName) => {
    setSearch('');
    setCityFilter(cityName);
  };

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
            <RecommendationPage
              user={user}
              faculties={faculties}
            />
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