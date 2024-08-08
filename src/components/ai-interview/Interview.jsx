import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const synth = window.speechSynthesis;

const Interview = ({ audioOn }) => {
    const [textValue, setTextValue] = useState("Hey, this is a sample interview text.");
    const [question, setQuestion] = useState("This is a sample question. Answer by using your mic.");

    const getTextFromAPI = async () => {
        // TODO: get text from the api
    }

    const speak = (text) => {
        console.log("first")
        console.log(text)
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
        // TODO: audio recording submission to the api
    }

    if (!synth)
        return (
            <div className="">Your browser does not support Speech Synthesis</div>
        );

    return (
        <div className="w-full h-[calc(100vh-60px)] flex flex-col items-center justify-center transition-all">
            <h3 className="text-xl font-semibold mb-10">{textValue}</h3>
            <div className="p-4 rounded-xl bg-white shadow-md">
                <p className="text-xl">{question}</p>
                <br />
                <Button onClick={handleSubmit}>Record Audio</Button>
            </div>
        </div>
    )
}

export default Interview