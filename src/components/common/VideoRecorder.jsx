import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Video } from "lucide-react";
import { useRef, useState } from "react";
import { BsSquareFill } from "react-icons/bs";

const mimeType = "video/webm";

const VideoRecorder = ({ recordedVideo, setRecordedVideo, onClose, isOpen }) => {
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const liveVideoFeed = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [videoChunks, setVideoChunks] = useState([]);

    const getCameraPermission = async () => {
        setRecordedVideo(null);
        if ("MediaRecorder" in window) {
            try {
                const videoConstraints = {
                    audio: false,
                    video: true,
                };
                const audioConstraints = { audio: true };
                // create audio and video streams separately
                const audioStream = await navigator.mediaDevices.getUserMedia(
                    audioConstraints
                );
                const videoStream = await navigator.mediaDevices.getUserMedia(
                    videoConstraints
                );
                setPermission(true);
                // combine both audio and video streams
                const combinedStream = new MediaStream([
                    ...videoStream.getVideoTracks(),
                    ...audioStream.getAudioTracks(),
                ]);
                setStream(combinedStream);
                // set video stream to live feed player
                liveVideoFeed.current.srcObject = videoStream;
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        const media = new MediaRecorder(stream, { mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        let localVideoChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localVideoChunks.push(event.data);
        };
        setVideoChunks(localVideoChunks);
    };

    const stopRecording = () => {
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const videoBlob = new Blob(videoChunks, { type: mimeType });
            const videoUrl = URL.createObjectURL(videoBlob);
            setRecordedVideo(videoUrl);
            setVideoChunks([]);
        };
    };

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
        <Modal onClose={onCloseModal} size={"xxl"} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Record Video</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className="relative flex flex-col items-center justify-center">
                        {!permission && (
                            <Button colorScheme="blue" onClick={getCameraPermission}>Get Camera Permission</Button>
                        )}
                        {permission && recordingStatus === "inactive" && (
                            <button
                                className="absolute z-50 bottom-4 text-white bg-blue-500 hover:bg-blue-400 flex flex-col h-14 w-14 items-center justify-center rounded-full transition-all"
                                onClick={startRecording}
                            >
                                <Video />
                            </button>
                        )}
                        {recordingStatus === "recording" && (
                            <button
                                className="absolute z-50 bottom-4 text-white bg-blue-500 hover:bg-blue-400 flex flex-col h-14 w-14 items-center justify-center rounded-full transition-all"
                                onClick={stopRecording}
                            >
                                <BsSquareFill />
                            </button>
                        )}
                        <video
                            ref={liveVideoFeed}
                            autoPlay
                            style={{ height: "100%" }}
                        ></video>
                    </div>
                    <p className="font-semibold text-lg mt-4">
                        Recorded Video
                    </p>
                    {recordedVideo && (
                        <video
                            src={recordedVideo}
                            controls
                            style={{ width: "100%" }}
                        ></video>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onCloseModal}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default VideoRecorder;
