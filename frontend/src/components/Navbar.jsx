function Navbar({ user, onLogout }) {
  return (
    <nav
      style={{
        backgroundColor: 'white',
        height: '78px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 45px',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 100
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
            borderRadius: '12px',
            backgroundColor: '#e8f1fb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#003B71',
            fontWeight: 'bold',
            fontSize: '18px'
          }}
        >
          🎓
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              color: '#003B71',
              fontSize: '24px'
            }}
          >
            FakultetInfo
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: '12px',
              color: '#666'
            }}
          >
            Univerzitet Crne Gore
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}
      >
        <button
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  style={{
    backgroundColor: 'transparent',
    border: 'none',
    color: '#444',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '15px'
  }}
>
  Početna
</button>

<button
  onClick={() => {
    document
      .getElementById('faculties-section')
      ?.scrollIntoView({ behavior: 'smooth' });
  }}
  style={{
    backgroundColor: 'transparent',
    border: 'none',
    color: '#444',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '15px'
  }}
>
  Fakulteti
</button>

        {user ? (
          <>
            <div
              style={{
                backgroundColor: '#eef4fb',
                padding: '10px 14px',
                borderRadius: '10px',
                color: '#003B71',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              {user.full_name}
            </div>

            <button
              onClick={onLogout}
              style={{
                backgroundColor: '#003B71',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #003B71',
                color: '#003B71',
                padding: '10px 16px',
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Prijava
            </button>

            <button
              style={{
                backgroundColor: '#003B71',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Registracija
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;