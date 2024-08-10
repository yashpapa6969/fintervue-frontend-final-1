import React from "react";
import InfoSection from "./infoSection";
import svg1 from "../../assests/profile.png";
import profile from "../../assests/svg-1.svg";

const homeObjOne = {
  primary: true,
  lightBg: false,
  lightTopLine: true,
  lightText: true,
  lightTextDesc: true,
  topLine: "AI Interview platform",
  headline: "Take our mock AI interview to know your preparation level",
  buttonLabel: "Start for free",
  description: "",
  imgStart: "",
  img: svg1,
  alt: "Credit Card",
  start: "",
};

const homeObjThree = {
  primary: false,
  lightBg: true,
  lightTopLine: false,
  lightText: false,
  lightTextDesc: false,
  topLine: "About us",
  headline: "What is Fintervue?",
  description:
    "Fintervue streamlines your hiring process with AI-driven tools, providing efficient candidate assessments and data-driven decision-making. It also offers a fair and flexible interview experience, ensuring objective evaluation and valuable feedback for your career growth.",
  buttonLabel: "Know More",
  imgStart: "start",
  img: profile,
  alt: "Vault",
  start: "true",
};

const Features = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="info-section ">
        <InfoSection {...homeObjThree} />
      </div>
      <div className="info-section">
        <InfoSection {...homeObjOne} />
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: "Source Sans Pro", sans-serif;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
        }
        *::-webkit-scrollbar {
          width: 0.5px;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          background: rgba(155, 155, 155, 0.5);
          border-radius: 20px;
          border: transparent;
        }
        .container {
          z-index: 1;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 50px;
          padding-left: 50px;
        }
        @media screen and (max-width: 991px) {
          .container {
            padding-right: 30px;
            padding-left: 30px;
          }
        }
        .info-section p {
          font-size: 1.125rem;
          color: #333;
          line-height: 1.6;
        }
        .button {
          text-align: center;
          font-weight: bold;
          background-color: black;
          color: white;
          padding: 0.5rem 0.75rem; /* Corresponds to py-2 px-3 */
          border-radius: 0.5rem; /* Corresponds to rounded-lg */
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Add shadow */
        }
        .button:hover {
          background-color: #4a5568; /* Corresponds to hover:bg-gray-800 */
          transform: scale(1.05);
        }
        @media screen and (max-width: 960px) {
          .button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Features;
