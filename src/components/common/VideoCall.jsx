import AgoraUIKit from 'agora-react-uikit';
import { useState } from 'react';

const VideoCall = () => {
    const [videoCall, setVideoCall] = useState(true);

    const rtcProps = {
        appId: 'appid:1e6a996b863543f0985fc49f4d84b007',
        channel: 'test',
    };

    const callbacks = {
        EndCall: () => setVideoCall(false),
    };
    return videoCall ? (
        <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
            <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
        </div>
    ) : (
        <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
    );
}

export default VideoCall