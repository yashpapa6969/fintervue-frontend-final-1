import { Button, useToast } from "@chakra-ui/react";
import { Mouse } from "lucide-react";
import HowToVideo from "../assests/videos/1_Practice_answering.mp4";
import InterviewMockup from "../assests/ai_interview.jpg";
import { useState } from "react";
import Interview from "../components/ai-interview/Interview";
import Footer from "../components/landing_page/footer";
import Navbar from "../components/common/Navbar";
import DomainSelector from "../components/ai-interview/DomainSelector";
import axios from "axios";
import config from '../config';

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
      const analysisResponse = await axios.post(`${config.apiBaseUrl}/api/interviewee/create-ai-analysis`, {
        domain: domain.name,
        userId: userId
      });

      const aiAnalysisId = analysisResponse.data.ai_analysis_id;
      localStorage.setItem('ai_analysis_id', aiAnalysisId);

      // Then fetch questions using the analysis ID
      const encodedDomain = encodeURIComponent(domain.name);
      const questionsResponse = await axios.post(
        `${config.apiBaseUrl}/api/interviewee/getAIQuestionByDomain`,
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
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar audioOn={audioOn} setAudioOn={setAudioOn} />
      <div className="w-full px-6 max-w-7xl mx-auto">
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
                <div className="w-full flex flex-col md:flex-row gap-16 items-center justify-between px-4 md:px-10 py-12">
                  <div className="w-full">
                    <div className="flex flex-col justify-center min-h-[60vh] md:min-h-[80vh]">
                      <h1 className="text-4xl md:text-6xl font-bold max-w-[700px] md:leading-[1.2]">
                        The{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 drop-shadow-sm">
                          AI-Powered
                        </span>{" "}
                        Platform for{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-sm">
                          Online Interviews
                        </span>
                      </h1>
                      <p className="max-w-[600px] text-xl mt-8 leading-relaxed text-gray-600">
                        Transform the way you take interviews with Fintervue.
                        Leverage the power of artificial intelligence ensuring
                        unprecedented accuracy and control.
                      </p>
                      <Button
                        onClick={() => setStartInterview(true)}
                        mt={12}
                        size="lg"
                        w="auto"
                        rounded={"full"}
                        px={10}
                        py={6}
                        color={"#fff"}
                        bg={"blue.600"}
                        _hover={{ bg: "blue.700", transform: "translateY(-2px)" }}
                        transition="all 0.2s"
                        className="shadow-lg"
                      >
                        Start Interview
                      </Button>
                    </div>
                  </div>
                  <img
                    src={InterviewMockup}
                    className="max-w-[600px] w-full my-10 md:my-20 rounded-2xl shadow-2xl"
                    alt="Interview Mockup"
                  />
                </div>
                <div className="flex flex-col items-center text-center py-20 bg-white rounded-3xl shadow-sm">
                  <Mouse className="text-blue-600" size={32} />
                  <h3 className="text-3xl font-bold mt-8 mb-4">How it works</h3>
                  <div className="max-w-[800px] w-full mt-8 mb-10">
                    <video 
                      src={HowToVideo} 
                      controls 
                      className="w-full rounded-xl shadow-lg"
                    />
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
      </div>
      <Footer />
    </div>
  );
};

export default AiIntervuePage;
