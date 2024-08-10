import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Mic } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const mimeType = "audio/webm";

const AudioRecorder = ({ audio, setAudio, isOpen, onClose }) => {
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);

    const startRecording = async () => {
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        setRecordingStatus("inactive");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
        };
    };

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    useEffect(() => {
        getMicrophonePermission();
    }, [])

    const stopMediaTracks = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
            setPermission(false);
        }
    };

    const onCloseModal = () => {
        stopMediaTracks(); // Stop all media tracks before closing the modal
        onClose(); // Call the provided onClose function
    };

    return (
        <Modal onClose={onCloseModal} size={"xl"} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Record Audio</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className="flex flex-col items-center justify-center">
                        {permission && recordingStatus === "inactive" ? (
                            <>
                                <button className="p-4 rounded-full text-white bg-blue-500 transition-all hover:bg-blue-400" onClick={startRecording}>
                                    <Mic />
                                </button>
                                <p className="">Start Recording</p>
                            </>
                        ) : null}
                        {recordingStatus === "recording" ? (
                            <button onClick={stopRecording}>
                                Stop Recording
                            </button>
                        ) : null}
                        {audio ? (
                            <div className="audio-container">
                                <audio src={audio} controls></audio>
                            </div>
                        ) : null}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
export default AudioRecorder;