import { useState, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const appId = import.meta.env.VITE_AGORA_APPID; // Your Agora App ID
const token = null; // Token is optional
const channelName = "test";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const VideoCall = () => {
    const [inCall, setInCall] = useState(false);
    const [name, setName] = useState("");
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const localTracks = useRef({ audioTrack: null, videoTrack: null });

    const handleJoin = async () => {
        if (name.trim()) {
            await client.join(appId, channelName, token, null);

            // Create microphone and camera tracks
            const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();

            // Save the tracks to ref
            localTracks.current.audioTrack = microphoneTrack;
            localTracks.current.videoTrack = cameraTrack;

            // Play the video track in the "local-player" div
            cameraTrack.play("local-player");

            // Publish the tracks
            await client.publish([microphoneTrack, cameraTrack]);

            setInCall(true);  // Update state to indicate that the user is now in the call
        } else {
            alert("Please enter your name before joining.");
        }
    };

    const handleLeave = async () => {
        for (let track in localTracks.current) {
            if (localTracks.current[track]) {
                localTracks.current[track].stop();
                localTracks.current[track].close();
            }
        }

        await client.leave();
        setInCall(false);  // Update state to indicate that the user has left the call
    };

    const toggleMic = async () => {
        if (localTracks.current.audioTrack) {
            localTracks.current.audioTrack.setEnabled(!micOn);
            setMicOn(!micOn);
        }
    };

    const toggleCamera = async () => {
        if (localTracks.current.videoTrack) {
            localTracks.current.videoTrack.setEnabled(!cameraOn);
            setCameraOn(!cameraOn);
        }
    };

    return (
        <div className="App">
            {!inCall ? (
                <PreJoinScreen
                    name={name}
                    setName={setName}
                    micOn={micOn}
                    setMicOn={setMicOn}
                    cameraOn={cameraOn}
                    setCameraOn={setCameraOn}
                    handleJoin={handleJoin}
                />
            ) : (
                <Video
                    micOn={micOn}
                    toggleMic={toggleMic}
                    cameraOn={cameraOn}
                    toggleCamera={toggleCamera}
                    handleLeave={handleLeave}
                />
            )}
        </div>
    );
};

const PreJoinScreen = ({
    name,
    setName,
    micOn,
    setMicOn,
    cameraOn,
    setCameraOn,
    handleJoin,
}) => {
    return (
        <div>
            <h2>Join Video Call</h2>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <div>
                <button onClick={() => setMicOn(!micOn)}>
                    {micOn ? "Turn Off Mic" : "Turn On Mic"}
                </button>
                <button onClick={() => setCameraOn(!cameraOn)}>
                    {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
                </button>
            </div>
            <button onClick={handleJoin}>Join Meeting</button>
        </div>
    );
};

const Video = ({ micOn, toggleMic, cameraOn, toggleCamera, handleLeave }) => {
    return (
        <div>
            <div id="local-player" style={{ width: "640px", height: "480px", background: "black" }} />
            <div>
                <button onClick={toggleMic}>{micOn ? "Mute Mic" : "Unmute Mic"}</button>
                <button onClick={toggleCamera}>
                    {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
                </button>
                <button onClick={handleLeave}>Leave Call</button>
            </div>
        </div>
    );
};

export default VideoCall;
