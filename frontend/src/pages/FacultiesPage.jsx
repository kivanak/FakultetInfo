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
  return (
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
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '18px',
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
  onMouseEnter={(e) => {
    if (authForm !== 'login') {
      e.currentTarget.style.backgroundColor = '#003B71';
      e.currentTarget.style.color = 'white';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 59, 113, 0.20)';
      e.currentTarget.style.transform = 'translateY(-3px)';
    }
  }}
  onMouseLeave={(e) => {
    if (authForm !== 'login') {
      e.currentTarget.style.backgroundColor = 'white';
      e.currentTarget.style.color = '#003B71';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }}
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
  onMouseEnter={(e) => {
    if (authForm !== 'register') {
      e.currentTarget.style.backgroundColor = '#003B71';
      e.currentTarget.style.color = 'white';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 59, 113, 0.20)';
      e.currentTarget.style.transform = 'translateY(-3px)';
    }
  }}
  onMouseLeave={(e) => {
    if (authForm !== 'register') {
      e.currentTarget.style.backgroundColor = 'white';
      e.currentTarget.style.color = '#003B71';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }}
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
                onDelete={onDeleteFaculty}
                onUpdate={onUpdateFaculty}
                isAdmin={user?.role === 'admin'}
              />
            ))}
          </div>
        </div>

        <div
  style={{
    position: 'sticky',
    top: '100px'
  }}
>
  <MontenegroMap onCityClick={onCityClick} />
</div>
      </section>
    </main>
  );
}

export default FacultiesPage;