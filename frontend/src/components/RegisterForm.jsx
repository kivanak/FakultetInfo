import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function RegisterForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    marginBottom: '14px',
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    fontSize: '15px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    color: '#0f172a',
    outline: 'none'
  };

  const passwordInputStyle = {
    ...inputStyle,
    paddingRight: '48px',
    marginBottom: 0
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Greška pri registraciji.');
        return;
      }

      setMessage('Registracija uspješna.');

      setFormData({
        full_name: '',
        email: '',
        password: ''
      });

      setShowPassword(false);
    } catch (err) {
      console.error(err);
      setMessage('Server nije dostupan.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: 'white',
        padding: '28px',
        borderRadius: '18px',
        boxShadow: '0 10px 28px rgba(15, 23, 42, 0.08)',
        border: '1px solid #e5e7eb'
      }}
    >
      <h2
        style={{
          color: '#003B71',
          margin: '0 0 6px',
          fontSize: '26px'
        }}
      >
        Registracija
      </h2>

      <p
        style={{
          color: '#64748b',
          margin: '0 0 22px',
          fontSize: '14px'
        }}
      >
        Napravite nalog za korišćenje dodatnih opcija.
      </p>

      <input
        style={inputStyle}
        name="full_name"
        placeholder="Ime i prezime"
        value={formData.full_name}
        onChange={handleChange}
        required
      />

      <input
        style={inputStyle}
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <div
        style={{
          position: 'relative',
          marginBottom: '14px'
        }}
      >
        <input
          style={passwordInputStyle}
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Lozinka"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Sakrij lozinku' : 'Prikaži lozinku'}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {showPassword ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.89 1 12a11.7 11.7 0 0 1 5.06-5.94" />
              <path d="M10.58 10.58A2 2 0 0 0 12 14a2 2 0 0 0 1.42-.58" />
              <path d="M9.88 4.24A10.7 10.7 0 0 1 12 4c5 0 9.27 3.11 11 8a11.5 11.5 0 0 1-2.16 3.19" />
              <path d="M1 1l22 22" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: '#003B71',
          color: 'white',
          border: 'none',
          padding: '13px 18px',
          borderRadius: '12px',
          fontWeight: 'bold',
          cursor: 'pointer',
          width: '100%',
          fontSize: '15px',
          boxShadow: '0 8px 20px rgba(0, 59, 113, 0.18)'
        }}
      >
        Registruj se
      </button>

      {message && (
        <p
          style={{
            margin: '15px 0 0',
            color: '#003B71',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}

export default RegisterForm;