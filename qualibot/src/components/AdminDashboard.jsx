// src/components/AnomalyDashboard.jsx
import { useEffect, useState } from 'react';
import './AnomalyDashboard.css'; // Import the CSS file
import AdminNavbar from './AdminNavbar';

const Anomalies = () => {
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    fetch("https://qualibot-python.onrender.com/api/anomalies")
      .then(res => res.json())
      .then(data => setAnomalies(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
    <AdminNavbar/>
    <div className="anomaly-container">
      <h2 className="anomaly-heading">Detected Anomalies</h2>
      {anomalies.map((anomaly, index) => (
        <div className="anomaly-card" key={index}>
          <div className="anomaly-details">
            <p><strong>Defect:</strong> {anomaly.defect}</p>
            <p><strong>Machine:</strong> {anomaly.machine}</p>
            <p><strong>Shift:</strong> {anomaly.shift}</p>
            <p><strong>Message:</strong> {anomaly.message}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Anomalies;
