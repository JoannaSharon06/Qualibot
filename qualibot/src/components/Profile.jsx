import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem('userEmail'); // ✅ Get email from localStorage
        const res = await axios.get(`https://qualibot.onrender.com/api/profiles/me/${email}`);
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.glass}>  
          <div>
            <h2 style={styles.name}>{profile.name}</h2>
            <p><strong>Role:</strong> {profile.role}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>DOB:</strong> {profile.dob}</p>
          </div>
        <div style={styles.section}>
          <h3 style={styles.heading}>Experience</h3>
          <ul style={{ paddingLeft: 20 }}>
            {profile.experience?.map((exp, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <h4>{exp.role} @ {exp.company}</h4>
                <p><strong>Duration:</strong> {exp.duration}</p>
                <p><strong>Highlights:</strong> {exp.achievements}</p>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>Education</h3>
          <p>{profile.education}</p>
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>Skills</h3>
          <p>{profile.skills?.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundImage: `url("/qualibotbg.jpg")`, // Ensure this image is in your public folder
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    padding: '20px',
    color: '#fff',
  },
  glass: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '30px',
    width: '90%',
    maxWidth: '800px',
    
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    margin: '70px auto',
  },
  header: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    borderBottom: '1px solid #aaa',
    paddingBottom: '20px',
    marginBottom: '20px',
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid white',
  },
  name: {
    margin: '0 0 10px 0',
  },
  section: {
    marginBottom: '20px',
  },
  heading: {
    borderBottom: '1px solid #fff',
    paddingBottom: '5px',
    marginBottom: '10px',
  },
};

export default Profile;
