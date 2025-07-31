// src/components/AnomalyDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnomalyDashboard.css'; // Import the CSS file

const Anomalies = () => {
  const [anomalies, setAnomalies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://qualibot-python.onrender.com/api/anomalies")
      .then(res => res.json())
      .then(data => setAnomalies(data))
      .catch(err => console.error(err));
  }, []);

  const handleViewRCA = (anomaly) => {
    const message = anomaly.message;
    navigate('/rca', { state: { message } });
  };

  return (
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
          <div className="anomaly-action">
            <button onClick={() => handleViewRCA(anomaly)} className="rca-button">View RCA</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Anomalies;
