import React from 'react';

const About = () => {
  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
            font-family: 'Poppins', sans-serif;
            background-image: url('/qualibotbg.jpg');
            background-size: cover;
            background-position: center;
            min-height: 100vh;
            color: white;
            box-sizing: border-box;
            padding-top: 100px; /* space for navbar */
          }

          .about-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 40px;
            padding: 60px 80px;
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
            margin: 40px auto;
            max-width: 1100px;
            position: relative;
            animation: fadeInUp 0.6s ease-out;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .about-left {
            flex: 1.2;
          }

          .about-left h1 {
            font-size: 2.8rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: #ffffff;
            background: linear-gradient(45deg, #ffffff, #cccccc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .about-left p {
            font-size: 1.1rem;
            line-height: 1.8;
            margin-bottom: 18px;
            color: #dddddd;
          }

          .about-right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .about-right img {
            width: 100%;
            max-width: 400px;
            border-radius: 20px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .about-right img:hover {
            transform: scale(1.03);
          }

          .about-footer {
            position: absolute;
            bottom: -40px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 0.9rem;
            color: #aaaaaa;
            padding-top: 20px;
          }

          @media screen and (max-width: 900px) {
            .about-container {
              flex-direction: column;
              padding: 40px 20px;
              align-items: center;
              text-align: center;
            }

            .about-right img {
              max-width: 80%;
              margin-top: 20px;
            }

            .about-footer {
              position: static;
              margin-top: 30px;
            }
          }
        `}
      </style>

      <div className="about-container">
        <div className="about-left">
          <h1>About QualiBot</h1>
          <p>
            QualiBot is an AI-powered platform designed to assist quality professionals in identifying anomalies 
            and providing instant Root Cause Analysis (RCA). The system displays anomalies detected from operational 
            datasets and allows users to generate contextual RCAs through an AI engine. Our goal is to reduce repetitive 
            quality failures and speed up the decision-making process in manufacturing and quality assurance environments.
          </p>
          <p>
            The application includes role-based login, anomaly dashboards, RCA generation, View and give Solution for the anomaly.
          </p>
        </div>
        <div className="about-right">
          <img src="ai engineer.jpg" alt="About QualiBot" />
        </div>
        <footer className="about-footer">
          &copy; 2025 QualiBot. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default About;
