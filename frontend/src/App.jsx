import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import FacultyDetails from './components/FacultyDetails';

import HomePage from './pages/HomePage';
import FacultiesPage from './pages/FacultiesPage';

import RecommendationPage from './pages/RecommendationPage';

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
        fontFamily: 'Inter, Arial, sans-serif'
      }}
    >
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage faculties={faculties} />
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