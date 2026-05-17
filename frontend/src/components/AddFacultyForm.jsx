import { useState } from 'react';

function AddFacultyForm({ onFacultyAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    university_name: 'Univerzitet Crne Gore',
    city: '',
    address: '',
    type: 'drzavni',
    description: '',
    website_url: '',
    cover_image: ''
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
      const response = await fetch('http://localhost:5000/faculties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        setMessage('Greška pri dodavanju fakulteta.');
        return;
      }

      const newFaculty = await response.json();

      onFacultyAdded(newFaculty);

      setFormData({
        name: '',
        university_name: 'Univerzitet Crne Gore',
        city: '',
        address: '',
        type: 'drzavni',
        description: '',
        website_url: '',
        cover_image: ''
      });

      setMessage('Fakultet je uspješno dodat.');
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
        marginBottom: '35px',
        maxWidth: '760px',
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '1px solid #e5e7eb'
      }}
    >
      <h2
        style={{
          color: '#003B71',
          margin: '0 0 6px',
          textAlign: 'center',
          fontSize: '26px'
        }}
      >
        Dodaj fakultet
      </h2>

      <p
        style={{
          color: '#64748b',
          textAlign: 'center',
          margin: '0 0 22px',
          fontSize: '14px'
        }}
      >
        Unesite osnovne informacije o fakultetu.
      </p>

      <input
        style={inputStyle}
        name="name"
        placeholder="Naziv fakulteta"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        style={inputStyle}
        name="city"
        placeholder="Grad"
        value={formData.city}
        onChange={handleChange}
        required
      />

      <input
        style={inputStyle}
        name="address"
        placeholder="Adresa"
        value={formData.address}
        onChange={handleChange}
      />

      <textarea
        style={{
          ...inputStyle,
          minHeight: '100px',
          resize: 'vertical'
        }}
        name="description"
        placeholder="Opis fakulteta"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        style={inputStyle}
        name="website_url"
        placeholder="Link sajta"
        value={formData.website_url}
        onChange={handleChange}
      />

      <input
        style={inputStyle}
        name="cover_image"
        placeholder="Putanja slike, npr. /images/faculties/etf.jpg"
        value={formData.cover_image}
        onChange={handleChange}
      />

      <div style={{ textAlign: 'center' }}>
        <button
          type="submit"
          style={{
            backgroundColor: '#003B71',
            color: 'white',
            border: 'none',
            padding: '12px 22px',
            borderRadius: '10px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Dodaj fakultet
        </button>
      </div>

      {message && (
        <p
          style={{
            marginTop: '15px',
            color: '#003B71',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}

export default AddFacultyForm;