import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AddFacultyForm from './components/AddFacultyForm';

import FacultyCard from './components/FacultyCard';
import FacultyDetails from './components/FacultyDetails';

function App() {
  const [faculties, setFaculties] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/faculties')
      .then((res) => res.json())
      .then((data) => setFaculties(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredFaculties = faculties.filter((faculty) =>
    faculty.name.toLowerCase().includes(search.toLowerCase()) ||
    faculty.city.toLowerCase().includes(search.toLowerCase())
  );
  const handleFacultyAdded = (newFaculty) => {
  setFaculties([...faculties, newFaculty]);
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
             <AddFacultyForm onFacultyAdded={handleFacultyAdded} />
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
                fontSize: '16px'
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
                <FacultyCard key={faculty.id} faculty={faculty} />
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