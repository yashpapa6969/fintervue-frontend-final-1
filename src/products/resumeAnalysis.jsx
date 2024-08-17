import { useState } from "react";
import Navbar from "../components/navbar";
import FlipText from "../components/ui/flip-text";
import { BorderBeam } from "../components/ui/border-beam";
import img1 from "../assests/resume_generator.png"; // Ensure the path is correct
import Upload from "../components/common/Upload";

import { useToast } from "@chakra-ui/react";
import { marked } from "marked";
import axios from "axios";

const ResumeAnalysis = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const toast = useToast();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      toast({
        title: "No file selected.",
        description: "Please select a PDF file to upload.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("filename", file);

    try {
      const response = await axios.post(
        "https://x3oh1podsi.execute-api.ap-south-1.amazonaws.com/api/interviewee/addResumeAnalysis",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { analysis } = response.data;
      setAnalysis(analysis);
      toast({
        title: "Upload successful.",
        description: "Your resume has been analyzed.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload failed.",
        description: "There was an error processing your request.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-10 p-20">
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="text-center">
            <FlipText
              className="text-4xl font-bold tracking-[-0.1em] bg-clip-text md:text-7xl md:leading-[5rem]"
              word="Resume analyser"
            />
            <h3 className="mt-[.5rem] text-[1.5rem] pt-5">
              Helps you optimize your resume for any job, highlighting the key
              experience and skills recruiters need to see.
            </h3>

            {/* Image and BorderBeam Container */}
            <div className="relative mt-10 w-[400px] h-[400px] mx-auto rounded-[20px]">
              <img
                src={img1}
                alt="Resume Generator"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0">
                <BorderBeam
                  size={200}
                  duration={15}
                  anchor={90}
                  borderWidth={2.5}
                  colorFrom="#ffaa40"
                  colorTo="#9c40ff"
                  delay={0}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Upload onFileChange={handleFileChange} onSubmit={handleSubmit} />
        </div>

        {analysis && (
          <div className="mt-10 p-5 bg-gray-50 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-teal-600 mb-4">
              Analysis Result
            </h3>
            <div
              className="analysis-content prose prose-lg"
              dangerouslySetInnerHTML={{ __html: marked(analysis) }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalysis;
