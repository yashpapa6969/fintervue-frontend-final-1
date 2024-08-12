import { useEffect, useState } from 'react'
import Logo from "../assests/logo.png"
import VideoCall from "../components/common/VideoCall"
import AgoraRTC, { useRTCClient, AgoraRTCProvider } from "agora-rtc-react";
import { Camera, CameraOff, Mic, MicOff } from 'lucide-react';

const MeetingPage = () => {
    const [micOn, setMic] = useState(true);
    const [cameraOn, setCamera] = useState(true);

    const agoraClient = useRTCClient(
        AgoraRTC.createClient({
            codec: "vp8",
            mode: "rtc"
        })
    );

    const [channelName, setChannelName] = useState('');
    const [networkStatus, setNetworkStatus] = useState(() => {
        if (navigator.onLine) {
            console.log("Connected to network.");
            return true;
        } else {
            return false;
        }
    });
    const [joinedCall, setJoinedCall] = useState(false);

    const getChannelName = () => {
        // TODO: get channel name from API
        // setChannelName()
    }

    useEffect(() => {
        window.ononline = () => {
            setNetworkStatus(true);
        };

        window.onoffline = () => {
            setNetworkStatus(false);
        };
    }, [networkStatus]);

    const handleConnect = (e) => {
        e.preventDefault();
        setJoinedCall(true);
    }

    return (
        <div className='bg-gray-50'>
            {!joinedCall ? (
                <div className='flex flex-col h-screen items-center justify-center'>
                    <img src={Logo} className=" mb-10" alt="logo" />
                    <div className="p-6 rounded-xl w-full md:w-1/3 bg-white shadow-lg">
                        <div className="flex items-center justify-center gap-6">
                            <button className="text-2xl p-4 rounded-full bg-blue-200" onClick={() => setMic(!micOn)}>
                                {micOn ? <Mic /> : <MicOff />}
                            </button>
                            <button className="text-2xl p-4 rounded-full bg-blue-200" onClick={() => setCamera(!cameraOn)}>
                                {cameraOn ? <Camera /> : <CameraOff />}
                            </button>
                        </div>
                        <button className='w-full mt-6 flex items-center justify-center py-2 rounded-md bg-blue-500 font-semibold text-white' onClick={handleConnect}>Connect</button>
                        {!networkStatus && (
                            <div className="w-full mt-2 rounded-md bg-yellow-200 p-2">
                                You have bad internet connection
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <AgoraRTCProvider client={agoraClient}>
                    <VideoCall micOn={micOn} cameraOn={cameraOn} setMic={setMic} setCamera={setCamera} />
                </AgoraRTCProvider>
            )}
        </div>
    )
}

export default MeetingPage