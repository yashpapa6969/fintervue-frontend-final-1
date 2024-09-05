import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const SignupForm = () => {
  const toast = useToast();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [salary, setSalary] = useState(10); // Default to 10 lakhs
  const [noticePeriod, setNoticePeriod] = useState("no");


  const canRegister =
    !!email && !!password && !!fullname && !!mobile && !!workStatus;

  useEffect(() => {
    if (!canRegister) {
      toast({
        title: "Error",
        description: "Please fill in all the required fields.",
        variant: "top-accent",
        status: "error",
        isClosable: true,
      });
    }
  }, [canRegister, toast]);

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
    console.log("file added");
  };

  return (
    <div className="flex flex-col gap-4 px-4 md:px-6 lg:px-8 w-full m-auto ">
      <div className="flex flex-col text-center pb-5">
        <h3 className="font-bold text-2xl md:text-3xl text-[rgba(51,51,51,1)] ">
          Complete your Fintervue Profile
        </h3>
        <p className="font-extralight text-md md:text-md pt-3">
          Search & apply to finance jobs from here
        </p>
      </div>
      <div className="flex flex-row gap-5">
        <div>
          <label
            htmlFor="fname_input"
            className="text-black font-medium text-lg leading-[24px] pb-2"
          >
            Full name*
          </label>
          <input
            className="w-full outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3 mb-4"
            type="text"
            id="fname_input"
            name="fullname"
            placeholder="What is your name?"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="email_input"
            className="text-black font-medium text-lg leading-[24px] pb-2"
          >
            Email ID*
          </label>
          <input
            className="w-full outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3 mb-4"
            type="email"
            id="email_input"
            name="email"
            placeholder="Tell us your Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-row gap-5">
        <div>
          <label
            htmlFor="password_input"
            className="text-black font-medium text-lg leading-[24px] pb-2"
          >
            Password*
          </label>
          <input
            className="w-full outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3 mb-4"
            type="password"
            id="password_input"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="mob_input"
            className="text-black font-medium text-lg leading-[24px] pb-2"
          >
            Mobile *
          </label>
          <input
            className="w-full outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3 mb-4"
            type="tel"
            id="mob_input"
            name="mobile"
            placeholder="+91 Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
      </div>
      <label
        htmlFor="linkedin_input"
        className="text-black font-medium text-lg leading-[24px] pb-2"
      >
        LinkedIn Url*
      </label>
      <input
        className="w-full outline-none border border-[rgba(102,102,102,0.35)] rounded-md text-base py-2 px-3 mb-4"
        type="url"
        id="linkedin_input"
        name="linkedin_input"
        placeholder="https://linkedin.com/"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
      />

      <div className="flex gap-4 mb-4">
        <label
          htmlFor="resume-upload"
          className="bg-black text-white py-2 px-4 rounded-md cursor-pointer"
        >
          Add your resume
        </label>
        <input
          type="file"
          id="resume-upload"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleResumeUpload}
        />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input type="checkbox" id="whatsapp_opt_in" />
        <label
          htmlFor="whatsapp_opt_in"
          className="text-md font-semibold text-gray-600"
        >
          Send me important updates & promotions via SMS, email, and{" "}
          <span className="text-green-500">WhatsApp</span>
        </label>
      </div>

      {/* Expected Salary Range Section */}
      <div className="w-full mb-4">
        <label
          htmlFor="salary_range"
          className="text-black font-medium text-lg leading-[24px] pb-2"
        >
          Expected Salary Range (in Lakhs)*
        </label>
        <div className="text-center mt-2 text-lg font-semibold">
          ₹{salary} Lakhs
        </div>
        <input
          className="w-full mt-2"
          type="range"
          id="salary_range"
          name="salary_range"
          min="0"
          max="20"
          step="0.5"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>

      {/* Notice Period Section */}
      <div className="w-full mb-4">
        <label className="text-black font-medium text-lg leading-[24px] pb-2">
          Are you currently in your notice period?*
        </label>
        <div className="flex gap-4 mt-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="notice_period"
              value="yes"
              checked={noticePeriod === "yes"}
              onChange={(e) => setNoticePeriod(e.target.value)}
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="notice_period"
              value="no"
              checked={noticePeriod === "no"}
              onChange={(e) => setNoticePeriod(e.target.value)}
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
