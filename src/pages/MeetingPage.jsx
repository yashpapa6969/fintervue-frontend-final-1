import { useEffect, useState } from 'react'
import Logo from "../assests/logo.png"
import VideoCall from "../components/common/VideoCall"
import AgoraRTC, { useRTCClient, AgoraRTCProvider } from "agora-rtc-react";
import { Camera, CameraOff, Mic, MicOff } from 'lucide-react';
import { HMSPrebuilt } from '@100mslive/roomkit-react';

const MeetingPage = () => {

    const getChannelName = () => {
        // TODO: get channel name from API
        // setChannelName()
    }

    return (
        <div style={{ height: "100vh" }}>
            <HMSPrebuilt roomCode="jph-dhjt-weu" logo={"../assests/logo.png"} />
        </div>
    )
}

export default MeetingPage