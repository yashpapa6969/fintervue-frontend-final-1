import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import VideoCall from "../components/common/VideoCall";
import { useEffect, useState } from "react";

const MeetingPage = () => {
    const [joinMeet, setJoinMeet] = useState(false);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [networkStatus, setNetworkStatus] = useState(() => {
        if (navigator.onLine) {
            console.log("Connected to network.");
            return true;
        } else {
            return false;
        }
    });

    const handleSubmit = () => {
        setJoinMeet(true);
    }

    useEffect(() => {
        window.ononline = () => {
            setNetworkStatus(true);
        };

        window.onoffline = () => {
            setNetworkStatus(false);
        };
    }, [networkStatus]);

    return (
        <div className="h-screen w-full">
            {!joinMeet ?
                <div className="flex w-full h-full px-10 items-center justify-center">
                    <div className="w-full max-w-[400px]">
                        <div className="flex flex-col mb-4">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter name"
                                className="border rounded-md p-2"
                            />
                        </div>
                        <div className="flex justify-center gap-4 mb-4">
                            <div onClick={() => setIsMicOn(!isMicOn)} className="flex items-center justify-center p-4 rounded-full bg-blue-400 cursor-pointer">
                                {isMicOn ? <Mic /> : <MicOff /> }
                            </div>
                            <div onClick={() => setIsVideoOn(!isVideoOn)} className="flex items-center justify-center p-4 rounded-full bg-blue-400 cursor-pointer">
                                {isVideoOn ? <Video /> : <VideoOff />}
                            </div>
                        </div>
                        {!networkStatus && (
                            <div className="w-full rounded-md bg-yellow-200 p-2">
                                You have bad internet connection
                            </div>
                        )}
                        <button
                            onClick={handleSubmit}
                            className="py-3 text-white bg-blue-500 font-bold w-full text-lg rounded-lg disabled:opacity-[25%] disabled:bg-[rgba(17,17,17,1)]"
                        >
                            Join
                        </button>
                    </div>
                </div>
                :
                <VideoCall isMicOn={isMicOn} isVideoOn={isVideoOn} />
            }
        </div>
    )
}

export default MeetingPage