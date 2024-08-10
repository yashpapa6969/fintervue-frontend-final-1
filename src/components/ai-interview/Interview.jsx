import { Button, useDisclosure } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import VideoRecorder from "../common/VideoRecorder";
import AudioRecorder from "../common/AudioRecorder";

const synth = window.speechSynthesis;

const Interview = ({ audioOn }) => {
    const [textValue, setTextValue] = useState("Hey, this is a sample interview text.");
    const [question, setQuestion] = useState("This is a sample question. Answer by using your mic.");
    const [audio, setAudio] = useState(null);
    const [recordedVideo, setRecordedVideo] = useState(null);

    const { 
        isOpen: isAudioRecordOpen, 
        onOpen: onAudioRecordOpen, 
        onClose: onAudioRecordClose, 
    } = useDisclosure();

    const { 
        isOpen: isVideoRecordOpen, 
        onOpen: onVideoRecordOpen, 
        onClose: onVideoRecordClose, 
    } = useDisclosure();

    const getTextFromAPI = async () => {
        // TODO: get text from the api
    }

    const speak = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    };

    useEffect(() => {
        speak(textValue);
    }, [textValue])

    useEffect(() => {
        speak(question);
    }, [question])

    useEffect(() => {
        if (!audioOn) synth.pause();
        else synth.resume();
    }, [audioOn])

    const handleSubmit = () => {
        // TODO: audio / video recording submission to the api
    }

    if (!synth)
        return (
            <div className="">Your browser does not support Speech Synthesis</div>
        );

    return (
        <div className="w-full min-h-[calc(100vh-60px)] flex flex-col items-center justify-center transition-all">
            <h3 className="text-xl font-semibold mb-10">{textValue}</h3>
            <div className="p-4 rounded-xl bg-white shadow-md">
                <p className="text-xl">{question}</p>
                <br />
                <div className="flex justify-between">
                    <div className="flex gap-4">
                        <Button onClick={onAudioRecordOpen}>Record Audio</Button>
                        <Button onClick={onVideoRecordOpen}>Record Video</Button>
                    </div>
                    <Button onClick={handleSubmit}>Submit <ChevronRight size={20} /></Button>
                </div>
            </div>

            <VideoRecorder recordedVideo={recordedVideo} setRecordedVideo={setRecordedVideo} onClose={onVideoRecordClose} isOpen={isVideoRecordOpen} />
            <AudioRecorder audio={audio} setAudio={setAudio} onClose={onAudioRecordClose} isOpen={isAudioRecordOpen} />
        </div>
    )
}

export default Interview