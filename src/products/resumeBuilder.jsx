import React, { useState } from 'react'
import { StepperContext } from '../context/StepperContext';
import Navbar from '../components/navbar'
import Stepper from '../components/forms/Stepper';
import StepperControl from '../components/forms/StepperControl';
import Personalinfo from '../components/forms/builder_form/Personalinfo';
import Academindetails from '../components/forms/builder_form/Academindetails';
import Completion from "../components/forms/builder_form/Completion";

const ResumeBuilder = () => {

  const[currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    jobRole: "",
    summary: "",
    experience: [
      {
        companyName: "",
        jobRole: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        schoolName: "",
        degree: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
  });
  const[finalData, setFinalData] = useState([]);


  const steps = [
    "Personal information",
    "Academic Details",
    "Complete"
  ];

  const displayStep = (step)=>{
    switch(step){
      case 1: 
        return <Personalinfo/>
      case 2:
        return <Academindetails/>
      case 3:
        return <Completion/>
      default:


    }
  }

  const handleClick = (direction)=>{
    //
    let newStep = currentStep;
    direction ==="next"? newStep++ : newStep--;
    // check if steps are within bounds
    newStep >0 && newStep <= steps.length && setCurrentStep(newStep);
  }


  return (
    <div>
      <Navbar />
      {/* stepper */}
      <div className="nd:wd-1/2  shadow-xl rounded-2xl p-2 m-10 px-10  bg-white">
        <div className="container horizontal mt-5">
          <div className='w-full flex justify-center '>
            <Stepper steps={steps} currentStep={currentStep} />
          </div>
          {/* display components */}

          <div className="my-10 p-10">
            <StepperContext.Provider
              value={{
                userData,
                setUserData,
                finalData,
                setFinalData,
              }}
            >
              {displayStep(currentStep)}
            </StepperContext.Provider>
          </div>
        </div>

        {/* navigationcontrols */}
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      </div>
    </div>
  );
}

export default ResumeBuilder
