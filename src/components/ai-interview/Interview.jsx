import { Button, Card, CardBody, useDisclosure } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import VideoRecorder from "../common/VideoRecorder";
import axios from "axios";
import Loading from "../Loading";
import SearchBox from "../common/SearchBox";
// import axiosInstance from "../../config/axios";

const synth = window.speechSynthesis;

const Interview = ({ audioOn }) => {
    const [allDomains, setAllDomains] = useState([
        {
            name: "App Developer",
            description: "App Development Engineer",
        },
        {
            name: "Rust Developer",
            description: "Rust Programmer",
        },
        {
            name: "Rust Developer",
            description: "Rust Programmer",
        },
        {
            name: "Marketting",
            description: "Marketting Programme",
        },
        {
            name: "Business",
            description: "Business Programme",
        },
        {
            name: "Product Manager",
            description: "Product Management Programme",
        },
    ]);
    const [searchDomainValue, setSearchDomainValue] = useState("");
    const [selectedDomain, setSelectedDomain] = useState("");
    const [questionNo, setQuestionNo] = useState(0);
    const [textValue, setTextValue] = useState("");
    const [question, setQuestion] = useState({});
    const [audio, setAudio] = useState(null);
    const [recordedVideo, setRecordedVideo] = useState(null);

    const {
        isOpen: isVideoRecordOpen,
        onOpen: onVideoRecordOpen,
        onClose: onVideoRecordClose,
    } = useDisclosure();

    const getTextFromAPI = async () => {
        // TODO: implement get question by domain when the domain endpoint is created
        const response = await axios.get("https://x3oh1podsi.execute-api.ap-south-1.amazonaws.com/api/Interviewee/getAllAIQuestion");
        setQuestion(response.data);
        console.log(response.data)
    }

    const getAllDomain = async () => {
        // TODO: implement get all domain after endpoint created
        // const response = await axios.get("https://x3oh1podsi.execute-api.ap-south-1.amazonaws.com/api/Interviewee/getAllAIQuestion")
    }

    const speak = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    };

    useEffect(() => {
        if (selectedDomain && selectedDomain != "") {
            getTextFromAPI();
            console.log(question);
        }
    }, [selectedDomain])

    useEffect(() => {
        speak(question[questionNo]?.questionText);
    }, [question, questionNo])

    useEffect(() => {
        if (!audioOn) synth.pause();
        else synth.resume();
    }, [audioOn])

    const handleSubmit = async () => {

        // const formData = new FormData();
        // console.log(audio)
        // if (audio) {
        //     console.log("audio present")
        //     formData.append("audio", audio, audio.name);
        // }
        // if (recordedVideo) {
        //     formData.append("video", recordedVideo, recordedVideo.name);
        // }
        // formData.append("question", question);
        // formData.append("transcription", "This is a sample transcription");
        // formData.append("analysis", "This is a sample analysis");
        // const response = await axios.post("https://x3oh1podsi.execute-api.ap-south-1.amazonaws.com/api/addAiAnalysis", formData);
        // console.log(response.data);

        setQuestionNo(questionNo + 1);
    }

    if (!synth)
        return (
            <div className="">Your browser does not support Speech Synthesis</div>
        );

    if (question.length === 0) return (
        <Loading />
    );

    return (
        <div className="w-full min-h-[calc(100vh-60px)] flex flex-col items-center justify-center transition-all">

            {!selectedDomain || selectedDomain === "" ? (
                <>
                    <h3 className="text-xl font-semibold mb-8">Select a Domain</h3>
                    <SearchBox value={searchDomainValue} setValue={setSearchDomainValue} className="max-w-[600px] mb-4" />
                    <div className="grid grid-cols-3 max-w-[600px] gap-5">
                        {searchDomainValue ?
                            allDomains
                                .filter(domain => domain.name.toLowerCase().includes(searchDomainValue))
                                .map((domain, index) => (
                                    <Card key={`domain-${index}`} className="h-auto cursor-pointer hover:border-2 hover:border-blue-400" onClick={() => setSelectedDomain(domain.name)}>
                                        <CardBody>
                                            <h3 className="text-lg font-semibold">{domain.name}</h3>
                                            <p className="font-md">{domain.description}</p>
                                        </CardBody>
                                    </Card>
                                ))
                            : allDomains.map((domain, index) => (
                                <Card key={`domain-${index}`} className="h-auto cursor-pointer hover:border-2 hover:border-blue-400" onClick={() => setSelectedDomain(domain.name)}>
                                    <CardBody>
                                        <h3 className="text-lg font-semibold">{domain.name}</h3>
                                        <p className="font-md">{domain.description}</p>
                                    </CardBody>
                                </Card>
                            ))}
                    </div>
                </>
            ) : (
                <div className="p-4 rounded-xl bg-white shadow-md">
                    <p className="text-xl">{question[questionNo]?.questionText || <Loading />}</p>
                    <br />
                    <div className="flex justify-between">
                        <div className="flex gap-4">
                            <Button onClick={onVideoRecordOpen}>Record</Button>
                        </div>
                        <Button onClick={handleSubmit}>Submit <ChevronRight size={20} /></Button>
                    </div>
                </div>
            )}

            <VideoRecorder recordedVideo={recordedVideo} setRecordedVideo={setRecordedVideo} onClose={onVideoRecordClose} isOpen={isVideoRecordOpen} />
        </div>
    )
}

export default Interview