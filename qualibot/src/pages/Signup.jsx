import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/logsign.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', role: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.success) navigate('/dash');
    else alert(data.message);
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="glass-form">
        <h2>Sign Up</h2>
        <input type="text" name="name" onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" onChange={handleChange} placeholder="Email Address" required />
        <input type="tel" name="phone" onChange={handleChange} placeholder="Phone Number" required />
        <select name="role" onChange={handleChange} required>
          <option value="">Select Role</option>
          <option>Quality Engineer</option>
          <option>Production Supervisor</option>
          <option>Line Manager</option>
          <option>Compliance Officer</option>
        </select>
        <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
        <button type="submit">Sign Up</button>
        <p>Already have an account? <a href="/">Login</a></p>
      </form>
    </div>
  );
};

export default Signup;
