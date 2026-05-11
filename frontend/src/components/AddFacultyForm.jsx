import { useState } from 'react';

function AddFacultyForm({ onFacultyAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    university_name: 'Univerzitet Crne Gore',
    city: '',
    address: '',
    type: 'drzavni',
    description: '',
    website_url: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/faculties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const newFaculty = await response.json();

    onFacultyAdded(newFaculty);

    setFormData({
      name: '',
      university_name: 'Univerzitet Crne Gore',
      city: '',
      address: '',
      type: 'drzavni',
      description: '',
      website_url: ''
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '35px'
      }}
    >
      <h2 style={{ color: '#003B71' }}>Dodaj fakultet</h2>

      <input
        name="name"
        placeholder="Naziv fakulteta"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        name="city"
        placeholder="Grad"
        value={formData.city}
        onChange={handleChange}
        required
      />

      <input
        name="address"
        placeholder="Adresa"
        value={formData.address}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Opis fakulteta"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        name="website_url"
        placeholder="Link sajta"
        value={formData.website_url}
        onChange={handleChange}
      />

      <button type="submit">
        Dodaj
      </button>
    </form>
  );
}

export default AddFacultyForm;