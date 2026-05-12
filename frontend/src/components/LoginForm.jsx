import { useState } from 'react';

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    color: '#222'
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
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Greška pri login-u.');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      onLogin(data.user);

      setMessage('Login uspješan.');

      setFormData({
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
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '450px',
        margin: '30px auto'
      }}
    >
      <h2 style={{ color: '#003B71', marginTop: 0 }}>
        Prijava
      </h2>

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
          padding: '12px 18px',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Prijavi se
      </button>

      {message && (
        <p style={{ marginTop: '15px', color: '#003B71', fontWeight: 'bold' }}>
          {message}
        </p>
      )}
    </form>
  );
}

export default LoginForm;