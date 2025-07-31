import { useState, useEffect } from "react";
import axios from "axios";
import './RCA.css';
import ReactMarkdown from "react-markdown";
import { useLocation, useNavigate } from "react-router-dom";

const RCAForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [defectDesc, setDefectDesc] = useState("");
  const [rcaResult, setRcaResult] = useState("");
  const [pastExperience, setPastExperience] = useState([]);

  useEffect(() => {
    if (location.state?.message) {
      setDefectDesc(location.state.message);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const rcaRes = await axios.post("http://localhost:4000/api/rca", {
        description: defectDesc,
      });
      setRcaResult(rcaRes.data.rca);

      // Use pastExperience from the same response
      if (rcaRes.data.pastExperience) {
        setPastExperience([rcaRes.data.pastExperience]);
      } else {
        setPastExperience([]);
      }
    } catch (err) {
      alert(
        "Error generating RCA: " +
        (err.response?.data?.details || err.message)
      );
      console.error(err);
    }
  };

  const handleWriteSolution = () => {
    navigate("/solution", { state: { problem: defectDesc } });
  };

  return (
    <div className="rca-container">
      <h2>Generate RCA</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Describe the defect..."
          value={defectDesc}
          onChange={(e) => setDefectDesc(e.target.value)}
          required
          rows={5}
        />
        <br />
        <button type="submit">Generate RCA</button>
        {rcaResult && (
          <button type="button" onClick={handleWriteSolution} style={{ marginLeft: "10px" }}>
            Write Solution
          </button>
        )}
      </form>

      {rcaResult && (
        <div className="rca-output">
          <h3>Root Cause Analysis (5 Whys)</h3>
          <ReactMarkdown>{rcaResult}</ReactMarkdown>
        </div>
      )}

      {pastExperience.length > 0 && (
        <div className="experience-section">
          <h3>Matched Past Experiences</h3>
          {pastExperience.map((exp, index) => (
            <div key={index} className="experience-card">
              <p><strong>Person:</strong> {exp.person}</p>
              <p><strong>Problem:</strong> {exp.problem}</p>
              <p><strong>Solution:</strong> {exp.solution}</p>
              <p><strong>Date:</strong> {exp.when}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RCAForm;
           
