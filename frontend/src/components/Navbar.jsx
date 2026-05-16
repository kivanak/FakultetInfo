import { NavLink } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const linkStyle = ({ isActive }) => ({
    textDecoration: 'none',
    backgroundColor: isActive ? '#003B71' : 'transparent',
    color: isActive ? 'white' : '#444',
    padding: '10px 16px',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontSize: '15px'
  });

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
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: '#e8f1fb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }}
       >
          <img
           src="/images/logo/ucg.png"
         alt="UCG logo"
        style={{
        width: '34px',
         height: '34px',
         objectFit: 'contain'
            }}
           />
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
        <NavLink to="/" style={linkStyle}>
          Početna
        </NavLink>

        <NavLink to="/faculties" style={linkStyle}>
          Fakulteti
        </NavLink>

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
            <NavLink
              to="/faculties"
              style={{
                textDecoration: 'none',
                backgroundColor: 'transparent',
                border: '1px solid #003B71',
                color: '#003B71',
                padding: '10px 16px',
                borderRadius: '10px',
                fontWeight: 'bold'
              }}
            >
              Prijava
            </NavLink>

            <NavLink
              to="/faculties"
              style={{
                textDecoration: 'none',
                backgroundColor: '#003B71',
                color: 'white',
                padding: '10px 16px',
                borderRadius: '10px',
                fontWeight: 'bold'
              }}
            >
              Registracija
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;