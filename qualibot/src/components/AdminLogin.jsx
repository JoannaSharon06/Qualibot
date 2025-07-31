import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.success) {
      const role = data.user.email;
      if (role === 'admin@gmail.com') {
        localStorage.setItem('token', data.token);
        navigate('/admindash');
      } else {
        alert('Unauthorized! Not an Admin.');
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="glass-form">
        <h2>Admin Login</h2>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Admin Email"
          required
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
