import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function RegisterForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

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

      <input
        style={inputStyle}
        name="password"
        type="password"
        placeholder="Lozinka"
        value={formData.password}
        onChange={handleChange}
        required
      />

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