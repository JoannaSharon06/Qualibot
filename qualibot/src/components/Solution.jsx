import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Solution = () => {
  const location = useLocation();
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [personName, setPersonName] = useState("");
  const [when, setWhen] = useState("");

  useEffect(() => {
    if (location.state && location.state.problem) {
      setProblem(location.state.problem);
    }
    const today = new Date().toISOString().slice(0, 10);
    setWhen(today);
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/solutions/add", {
        personName,
        problem,
        solution,
        when,
      });
      alert("Solution submitted successfully!");
      setSolution("");
      setPersonName("");
    } catch (err) {
      alert("Error submitting solution.");
      console.error(err);
    }
  };

  return (
    <div className="solution-wrapper">
      <style>{`
        .solution-wrapper {
          min-height: 100vh;
          width: 100%;
          background: url('/qualibotbg.jpg') no-repeat center center/cover;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 50px 20px;
          font-family: 'Segoe UI', sans-serif;
        }
        .solution-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          padding: 40px;
          max-width: 600px;
          width: 100%;
          color: white;
        }
        .solution-container h2 {
          text-align: center;
          margin-bottom: 20px;
          font-size: 28px;
        }
        .problem-section {
          background: rgba(0,0,0,0.2);
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 20px;
        }
        .problem-section h4 {
          margin-bottom: 10px;
          font-size: 18px;
          color: #ffc;
        }
        input, textarea {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border: none;
          border-radius: 8px;
          background: rgba(255,255,255,0.2);
          color: #fff;
          font-size: 16px;
          outline: none;
        }
        input::placeholder, textarea::placeholder {
          color: #ddd;
        }
        button {
          background-color: #ff4444;
          color: white;
          border: none;
          padding: 12px 20px;
          font-size: 16px;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          display: block;
          margin: 0 auto;
        }
        button:hover {
          background-color: #cc0000;
        }
      `}</style>

      <div className="solution-container">
        <h2>Write Solution</h2>

        <div className="problem-section">
          <h4>Problem:</h4>
          <p>{problem}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your solution here..."
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            rows={6}
            required
          />
          <button type="submit">Submit Solution</button>
        </form>
      </div>
    </div>
  );
};

export default Solution;
