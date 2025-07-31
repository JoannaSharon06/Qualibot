import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useLocation, useNavigate } from "react-router-dom";

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    marginTop:"45px",
    paddingTop: "60px",
     backgroundImage: 'url("/bg-image.jpg")',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#fff",
  },
  formBox: {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    padding: "30px",
    width: "90%",
    maxWidth: "800px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "20px",
    textAlign: "center",
  },
  textarea: {
    width: "100%",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "16px",
    resize: "vertical",
  },
  buttonGroup: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    background: "#fff",
    color: "#330000",
    fontWeight: "bold",
  },
  outputBox: {
    marginTop: "30px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "15px",
    padding: "20px",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  experienceCard: {
    marginTop: "15px",
    padding: "15px",
    background: "rgba(255, 255, 255, 0.15)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
};

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
      const rcaRes = await axios.post("https://qualibot.onrender.com/api/rca", {
        description: defectDesc,
      });
      setRcaResult(rcaRes.data.rca);

      if (rcaRes.data.pastExperience) {
        setPastExperience([rcaRes.data.pastExperience]);
      } else {
        setPastExperience([]);
      }
    } catch (err) {
      alert("Error generating RCA: " + (err.response?.data?.details || err.message));
      console.error(err);
    }
  };

  const handleWriteSolution = () => {
    navigate("/solution", { state: { problem: defectDesc } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>Generate RCA</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Describe the defect..."
            value={defectDesc}
            onChange={(e) => setDefectDesc(e.target.value)}
            required
            rows={5}
            style={styles.textarea}
          />
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.button}>Generate RCA</button>
            {rcaResult && (
              <button type="button" onClick={handleWriteSolution} style={styles.button}>
                Write Solution
              </button>
            )}
          </div>
        </form>

        {rcaResult && (
          <div style={styles.outputBox}>
            <h3>Root Cause Analysis (5 Whys)</h3>
            <ReactMarkdown>{rcaResult}</ReactMarkdown>
          </div>
        )}

        {pastExperience.length > 0 && (
          <div style={styles.outputBox}>
            <h3>Matched Past Experiences</h3>
            {pastExperience.map((exp, index) => (
              <div key={index} style={styles.experienceCard}>
                <p><strong>Person:</strong> {exp.person}</p>
                <p><strong>Problem:</strong> {exp.problem}</p>
                <p><strong>Solution:</strong> {exp.solution}</p>
                <p><strong>Date:</strong> {exp.when}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RCAForm;