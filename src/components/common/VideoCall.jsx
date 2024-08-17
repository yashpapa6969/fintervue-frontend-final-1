import { useState } from "react";

import {
    LocalUser,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
} from "agora-rtc-react";
import { Camera, CameraOff, Mic, MicOff, PhoneMissed } from "lucide-react";


const VideoCall = ({ micOn, setMic, cameraOn, setCamera }) => {

    const appId = import.meta.env.VITE_AGORA_APPID;

    // set the connection state
    const [activeConnection, setActiveConnection] = useState(true);

    // get local video and mic tracks
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(true);
    const { localCameraTrack } = useLocalCameraTrack(true);

    // Join the channel
    useJoin(
        {
            appid: appId,
            channel: "test",
            token: null,
        },
        activeConnection,
    );

    usePublish([localMicrophoneTrack, localCameraTrack]);

    //remote users
    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    // play the remote user audio tracks
    audioTracks.forEach((track) => track.play());


    return (
        <div className="h-screen w-full relative">
            {activeConnection ? (
                <>
                <div id='flex flex-wrap items-center gap-10'>
                {
                    // Initialize each remote stream using RemoteUser component
                    remoteUsers.map((user) => (
                        <div key={user.uid} className="relative w-1/4 aspect-video overflow-hidden max-w-[720px] min-w-[360px]">
                            <RemoteUser user={user} />
                        </div>
                    ))
                }
            </div>
            <div className="fixed right-10 bottom-10 m-0 w-1/2 aspect-video max-w-[480px] min-w-[360px]">
                <LocalUser
                    audioTrack={localMicrophoneTrack}
                    videoTrack={localCameraTrack}
                    cameraOn={cameraOn}
                    micOn={micOn}
                    playAudio={micOn}
                    playVideo={cameraOn}
                />
            </div>
            <div className="fixed bottom-0 w-full bg-blue-400 flex items-center justify-center">
                <div id="flex items-center justify-center">
                    <button className="btn" onClick={() => setMic(!micOn)}>
                        {micOn ? <Mic /> : <MicOff />}
                    </button>
                    <button className="btn" onClick={() => setCamera(!cameraOn)}>
                        {cameraOn ? <Camera /> : <CameraOff />}
                    </button>
                    <button
                        onClick={() => {
                            setActiveConnection(false);
                        }}
                    >
                        <PhoneMissed />
                    </button>
                </div>
            </div>
            </>) : 
                <button onClick={() => setActiveConnection(true)}>Rejoin</button>
            }
        </div>
    )
}

export default VideoCall;