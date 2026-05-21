import { NavLink } from 'react-router-dom';
import './Navbar.css';

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
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Početna
        </NavLink>

        <NavLink
          to="/faculties"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Fakulteti
        </NavLink>

        <NavLink
          to="/recommendation"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Pronađi fakultet
        </NavLink>

        <NavLink
          to="/saved"
          title="Sačuvani fakulteti"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          ★
        </NavLink>

        {user ? (
          <>
            <div className="nav-user-badge">
              {user.full_name}
            </div>

            <button
              onClick={onLogout}
              className="nav-auth-button-filled"
            >
              Odjava
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/faculties"
              className="nav-auth-button"
            >
              Prijava
            </NavLink>

            <NavLink
              to="/faculties"
              className="nav-auth-button-filled"
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