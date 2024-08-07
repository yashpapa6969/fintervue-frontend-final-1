import AgoraUIKit from 'agora-react-uikit';
import { useState } from 'react';

const VideoCall = ({ channelId }) => {
    const [videoCall, setVideoCall] = useState(true);
    console.log(channelId);

    const rtcProps = {
        appId: import.meta.env.VITE_AGORA_APPID,
        channel: channelId,
    };

    const callbacks = {
        EndCall: () => setVideoCall(false),
    };
    return videoCall ? (
        <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
            <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
        </div>
    ) : (
        <div className="flex h-full w-full items-center justify-center">
            <button
                className='py-3 text-white bg-blue-500 font-bold w-full md:w-40 text-lg rounded-lg'
                onClick={() => setVideoCall(true)}
            >
                Join back
            </button>
        </div>
    );
}

export default VideoCall