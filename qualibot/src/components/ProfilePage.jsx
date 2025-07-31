import { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';

const emptyProfile = {
  name: '',
  email: '',
  password: '',
  role: '',
  dob: '',
  education: '',
  phone: '',
  skills: '',
  experience: [
    { company: '', role: '', duration: '', achievements: '' }
  ]
};

const ProfilePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [form, setForm] = useState(emptyProfile);

  useEffect(() => {
    fetch('http://localhost:4000/api/profiles')
      .then(res => res.json())
      .then(data => setProfiles(data));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/profiles/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        alert("Delete failed: " + err.error);
        return;
      }
      setProfiles(profiles.filter(p => p._id !== id));
    } catch (err) {
      alert("Network error while deleting profile",err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleExpChange = (idx, e) => {
    const newExp = [...form.experience];
    newExp[idx][e.target.name] = e.target.value;
    setForm({ ...form, experience: newExp });
  };

  const addExperience = () => {
    setForm({
      ...form,
      experience: [...form.experience, { company: '', role: '', duration: '', achievements: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = {
      ...form,
      skills: form.skills.split(',').map(s => s.trim())
    };
    if (!profileData.password) {
      alert("Password is required");
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to add profile");
        return;
      }
      const data = await res.json();
      setProfiles([...profiles, data]);
      setForm(emptyProfile);
    } catch (err) {
      alert("Network or server error",err);
    }
  };

  return (
    <div style={styles.page}>
      <AdminNavbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>User Profile</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.subheading}>Add New Profile</h3>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" style={styles.input} required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" style={styles.input} required />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" style={styles.input} required />
          <input name="role" value={form.role} onChange={handleChange} placeholder="Role" style={styles.input} required />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" style={styles.input} required />
          <input name="dob" value={form.dob} onChange={handleChange} placeholder="DOB" style={styles.input} required />
          <input name="education" value={form.education} onChange={handleChange} placeholder="Education" style={styles.input} required />
          <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" style={styles.input} required />

          <div>
            <h4 style={styles.sectionTitle}>Experience</h4>
            {form.experience.map((exp, idx) => (
              <div key={idx} style={styles.experienceGroup}>
                <input name="role" value={exp.role} onChange={e => handleExpChange(idx, e)} placeholder="Role" style={styles.input} required />
                <input name="company" value={exp.company} onChange={e => handleExpChange(idx, e)} placeholder="Company" style={styles.input} required />
                <input name="duration" value={exp.duration} onChange={e => handleExpChange(idx, e)} placeholder="Duration" style={styles.input} required />
                <input name="achievements" value={exp.achievements} onChange={e => handleExpChange(idx, e)} placeholder="Highlights" style={styles.input} required />
              </div>
            ))}
            <button type="button" onClick={addExperience} style={styles.buttonSecondary}>Add Experience</button>
          </div>
          <button type="submit" style={styles.button}>Add Profile</button>
        </form>

        {profiles.map((profile) => (
          <div key={profile._id} style={styles.profileCard}>
            <div>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Role:</strong> {profile.role}</p>
              <p><strong>DOB:</strong> {profile.dob}</p>
              <p><strong>Education:</strong> {profile.education}</p>
              <p><strong>Skills:</strong> {Array.isArray(profile.skills) ? profile.skills.join(', ') : profile.skills}</p>
              <div>
                <strong>Experience:</strong>
                <ul>
                  {profile.experience?.map((exp, i) => (
                    <li key={i}>
                      <b>{exp.role}</b> @ {exp.company} <br />
                      <b>Duration:</b> {exp.duration} <br />
                      <b>Highlights:</b> {exp.achievements}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button onClick={() => handleDelete(profile._id)} style={styles.deleteButton}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
const styles = {
  page: {
    backgroundImage: 'url("/bg-image.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '20px',
    color: '#fff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    maxWidth: '1000px',
    margin: '100px auto 40px auto',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.2rem',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  subheading: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '16px',
  },
  form: {
    marginBottom: '40px',
  },
  input: {
    width: '97%',
    padding: '10px',
    margin: '8px 0',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    marginTop: '12px',
    padding: '10px 20px',
    backgroundColor: '#243b55',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
  },
  buttonSecondary: {
    marginTop: '10px',
    padding: '8px 16px',
    backgroundColor: '#444',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
  sectionTitle: {
    marginTop: '20px',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#eee',
  },
  experienceGroup: {
    marginBottom: '20px',
    padding: '10px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
  },
  profileCard: {
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
  },
  deleteButton: {
    marginTop: '10px',
    backgroundColor: '#b00020',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};
