import { Button, useToast } from "@chakra-ui/react";
import { Mouse } from "lucide-react";
import HowToVideo from "../assests/videos/1_Practice_answering.mp4";
import InterviewMockup from "../assests/ai_interview.jpg";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Interview from "../components/ai-interview/Interview";
import Footer from "../components/landing_page/footer";
import Navbar from "../components/common/Navbar";
import DomainSelector from "../components/ai-interview/DomainSelector";
import axios from "axios";

const AiIntervuePage = () => {
  const [startInterview, setStartInterview] = useState(false);
  const [audioOn, setAudioOn] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleDomainSelect = async (domain) => {
    try {
      setLoading(true);
      // First create AI analysis
      const userId = localStorage.getItem('userId');
      const analysisResponse = await axios.post('https://0nsq6xi7ub.execute-api.ap-south-1.amazonaws.com/api/interviewee/create-ai-analysis', {
        domain: domain.name,
        userId: userId
      });

      const aiAnalysisId = analysisResponse.data.ai_analysis_id;
      localStorage.setItem('ai_analysis_id', aiAnalysisId);

      // Then fetch questions using the analysis ID
      const encodedDomain = encodeURIComponent(domain.name);
      const questionsResponse = await axios.post(
        `https://0nsq6xi7ub.execute-api.ap-south-1.amazonaws.com/api/interviewee/getAIQuestionByDomain`,
        {
          ai_analysis_id: aiAnalysisId,
          domain: domain.name
        }
      );

      if (questionsResponse.data && Array.isArray(questionsResponse.data) && questionsResponse.data.length > 0) {
        setQuestions(questionsResponse.data);
        setSelectedDomain(domain.name);
        localStorage.setItem('selectedDomain', domain.name);
        setStartInterview(true);
      } else {
        setQuestions([]);
        toast({
          title: "No Questions",
          description: "No questions found for the selected domain.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error in interview setup:", error);
      toast({
        title: "Error",
        description: "Failed to initialize interview. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Navbar audioOn={audioOn} setAudioOn={setAudioOn} />
      <div className="w-full px-6">
        <AnimatePresence>
          {startInterview && questions.length > 0 ? (
            <Interview
              audioOn={audioOn}
              questions={questions}
              selectedDomain={selectedDomain}
            />
          ) : (
            <>
              {!startInterview ? (
                <>
                  <div className="w-full flex flex-col md:flex-row gap-10 items-center justify-between px-4 md:px-10">
                    <motion.div
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 2 }}
                      className="w-full"
                    >
                      <div className="flex flex-col justify-center min-h-[60vh] md:min-h-screen">
                        <motion.h1
                          animate={{ y: [50, 0], opacity: [0, 1] }}
                          transition={{ duration: 1 }}
                          className="text-3xl md:text-5xl font-semibold max-w-[600px] md:leading-[55px]"
                        >
                          The{" "}
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-300">
                            AI-Powered
                          </span>{" "}
                          Platform for{" "}
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
                            Online Interviews
                          </span>
                        </motion.h1>
                        <p className="max-w-[600px] text-lg mt-6 leading-6">
                          Transform the way you take interviews with Fintervue.
                          Leverage the power of artificial intelligence ensuring
                          unprecedented accuracy and control.
                        </p>
                        <Button
                          onClick={() => setStartInterview(true)}
                          mt={10}
                          w={150}
                          rounded={"full"}
                          px={8}
                          color={"#fff"}
                          bg={"#000"}
                          _hover={{ bg: "#3c3c3c" }}
                          className="mt-6"
                        >
                          Start Interview
                        </Button>
                      </div>
                    </motion.div>
                    <img
                      src={InterviewMockup}
                      className="max-w-[500px] w-full my-10 md:my-20"
                      alt="Interview Mockup"
                    />
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Mouse color="#a6a6a6" />
                    <h3 className="text-2xl font-semibold mt-8">How it works</h3>
                    <div className="max-w-[800px] w-full mt-8 mb-10">
                      <video src={HowToVideo} controls className="w-full" />
                    </div>
                  </div>
                </>
              ) : (
                <DomainSelector
                  onDomainSelect={handleDomainSelect}
                  loading={loading}
                />
              )}
            </>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default AiIntervuePage;
