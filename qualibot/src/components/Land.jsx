// src/pages/Land.jsx
import { useNavigate } from 'react-router-dom';
import './Land.css';

const Land = () => {
  const navigate = useNavigate();

  return (
    <div className="land-container">
      <div className="landing-options">
        <div className="box" onClick={() => navigate('/adminlogin')}>
          <h2>Admin</h2>
        </div>
        <div className="box" onClick={() => navigate('/login')}>
          <h2>User</h2>
        </div>
      </div>
    </div>
  );
};

export default Land;
