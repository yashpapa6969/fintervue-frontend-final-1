import React from "react";
import  InfoSection from "./infoSection";


// import svg1 from "../../assets/avatar-1.png";
// import svg2 from "../../assets/avatar-2.png";
import svg1 from "../../assests/profile.png";
import svg2 from "../../assests/Visual.png";
// import profile from "../../assests/illus11.jpg";
import profile from "../../assests/svg-1.svg";
// import profile from "../../assets/avatar-3.png";
// import svg3 from "../../assets/avatar-4.png";
import svg3 from "../../assests/Visual.png";

const homeObjOne = {
  primary: true,
  lightBg: false,
  lightTopLine: true,
  lightText: true,
  lightTextDesc: true,
  topLine: "AI Interview platform",
  headline: "Revolutionize Your Hiring Process",
  description:
    "With Fintervue, leverage advanced AI to streamline and enhance your recruitment process, ensuring you find the best candidates for your finance-related job roles.",
  buttonLabel: "Get Started",
  imgStart: "",
  img: svg1,
  alt: "Credit Card",
  start: "",
};

const homeObjTwo = {
  primary: true,
  lightBg: false,
  lightTopLine: true,
  lightText: true,
  lightTextDesc: true,
  topLine: "Everything you need",
  headline: "Extremely quick onboarding process",
  description:
    "Where advanced technology meets human touch to create a superior interviewing experience for both interviewers and interviewees",
  buttonLabel: "Learn More",
  imgStart: "",
  img: svg2,
  alt: "Vault",
  start: "",
};

const homeObjThree = {
  primary: false,
  lightBg: true,
  lightTopLine: false,
  lightText: false,
  lightTextDesc: false,
  topLine: "Leverage technology",
  headline: "What is Fintervue?",
  description:
    "Fintervue is an innovative platform designed to transform the way you conduct interviews for finance sector positions. Our AI-driven solution provides a seamless and efficient interview process, saving you time and resources while ensuring you get the best talent.",
  buttonLabel: "Learn More",
  imgStart: "start",
  img: profile,
  alt: "Vault",
  start: "true",
};

const homeObjFour = {
  primary: true,
  lightBg: false,
  lightTopLine: true,
  lightText: true,
  lightTextDesc: true,
  topLine: "",
  headline: "See Fintervue in Action",
  description:
    "Request a demo or sign up for a free trial to experience the benefits of AI-driven interviews.",
  buttonLabel: "Sign Up Now",
  imgStart: "start",
  img: svg3,
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
      {/* <div className="info-section">
        <InfoSection {...homeObjThree} />
      </div> */}
      {/* <div className="info-section">
        <InfoSection {...homeObjTwo} />
      </div> */}
      {/* <Pricing /> */}
      {/* <div className="info-section">
        <InfoSection {...homeObjFour} />
      </div> */}
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
          // max-width: 1300px;
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
        .button {
          border-radius: 4px;
          background: var(--primary-bg, #4b59f7);
          white-space: nowrap;
          padding: var(--button-padding, 10px 20px);
          color: #fff;
          font-size: var(--button-font-size, 16px);
          outline: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease-out;
        }
        .button:hover {
          background: #fff;
          background-color: var(--primary-hover-bg, #0467fb);
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
