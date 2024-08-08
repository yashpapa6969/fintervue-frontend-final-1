import { Button } from "@chakra-ui/react"
import { Mouse } from "lucide-react"
import HowToVideo from "../assests/videos/1_Practice_answering.mp4"
import InterviewMockup from "../assests/ai_interview_mockup.png"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import Interview from "../components/ai-interview/Interview"
import Footer from "../components/landing_page/footer"
import Navbar from "../components/common/Navbar"

const AiIntervuePage = () => {
  const [startInterview, setStartInterview] = useState(false);
  const [audioOn, setAudioOn] = useState(true);

  return (
    <div className="w-full">
      <Navbar audioOn={audioOn} setAudioOn={setAudioOn} />
      <div className="w-full px-6">
        <AnimatePresence>
          {startInterview &&
            <Interview audioOn={audioOn} />
          }
          {!startInterview && (
            <motion.div exit={{ opacity: 0, x: 100 }} transition={{ duration: 2 }} className="w-full">
              <div className="flex flex-col items-center justify-center min-h-screen pt-16 md:pt-24">
                <div className="rounded-full border-2 border-purple-500 px-4 py-1 bg-white bg-opacity-30 mb-4">
                  ✨ Unleash the power of AI
                </div>
                <motion.h1
                  animate={{ y: [50, 0], opacity: [0, 1] }}
                  transition={{ duration: 1 }}
                  className="text-3xl md:text-5xl font-semibold max-w-[600px] md:leading-[55px] text-center"
                >
                  The <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-300">AI-Powered</span> Platform for <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">Online Interviews</span>
                </motion.h1>
                <p className="max-w-[700px] text-center text-lg mt-6 leading-6">
                  Transform the way you take interviews with Fintervue. Leverage the power of artificial intelligence ensuring unprecedented accuracy and control.
                </p>
                <Button onClick={() => setStartInterview(true)} mt={10} rounded={"full"} px={8} color={"#fff"} bg={"#000"} _hover={{ bg: "#3c3c3c" }}>Start Interview</Button>
                <img
                  src={InterviewMockup}
                  className="max-w-[800px] w-full my-20"
                />
              </div>
              <div className="flex flex-col items-center">
                <Mouse color="#a6a6a6" />
                <h3 className="text-2xl font-semibold mt-8">How it works</h3>
                <div className="max-w-[800px] mt-8 mb-10">
                  <video src={HowToVideo} controls />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  )
}

export default AiIntervuePage
