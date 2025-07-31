import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/logsign.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
  e.preventDefault();

  try {
    // 1. Admin Login Short-circuit
    if (
      formData.email === 'admin@gmail.com' &&
      formData.password === 'admin123'
    ) {
      navigate('/admindash');
      return;
    }

    // 2. Check if profile exists
    const profileRes = await fetch(`https://qualibot.onrender.com/api/profiles/check?email=${formData.email}`);
    if (!profileRes.ok) throw new Error('Profile check failed');
    const profileCheck = await profileRes.json();

    if (!profileCheck.exists) {
      alert('Profile not found. Please contact Admin.');
      return;
    }

    // 3. Attempt Login
    const loginRes = await fetch('https://qualibot.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!loginRes.ok) {
      alert('Login failed. Please check your credentials.');
      return;
    }

    const loginData = await loginRes.json();
    localStorage.setItem('token', loginData.token);
    localStorage.setItem('user', JSON.stringify(loginData.user));
    localStorage.setItem('userEmail', loginData.user.email);

    // 4. Redirect to dashboard after successful login
    navigate('/dash');

  } catch (err) {
    console.error('Login error:', err);
    alert('Server error. Please try again later.');
  }
};


  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="glass-form">
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email Address"
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

export default Login;
