import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    closeMenu();
  };

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: 'white',
        minHeight: '78px',
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
        className="navbar-brand"
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
  src="/logo/ucg.png"
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

      <button
        type="button"
        className="hamburger-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Otvori meni"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div
        className={menuOpen ? 'navbar-links open' : 'navbar-links'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}
      >
        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Početna
        </NavLink>

        <NavLink
          to="/faculties"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Fakulteti
        </NavLink>

        <NavLink
          to="/recommendation"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Pronađi fakultet
        </NavLink>

        <NavLink
          to="/saved"
          onClick={closeMenu}
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
              onClick={handleLogoutClick}
              className="nav-auth-button-filled"
            >
              Odjava
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/faculties"
              onClick={closeMenu}
              className="nav-auth-button"
            >
              Prijava
            </NavLink>

            <NavLink
              to="/faculties"
              onClick={closeMenu}
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