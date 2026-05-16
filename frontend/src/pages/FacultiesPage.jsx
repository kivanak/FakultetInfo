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
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '30px'
          }}
        >
          <RegisterForm />
          <LoginForm onLogin={onLogin} />
        </section>
      )}

      {user?.role === 'admin' && (
        <section style={{ marginBottom: '30px' }}>
          <AddFacultyForm onFacultyAdded={onFacultyAdded} />
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

        <MontenegroMap onCityClick={onCityClick} />
      </section>
    </main>
  );
}

export default FacultiesPage;