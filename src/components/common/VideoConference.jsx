import React, { useEffect } from 'react';
import {
  useHMSActions,
  useHMSStore,
  HMSRoomProvider,
  selectIsConnectedToRoom,
  selectPeers,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled
} from '@100mslive/hms-video-react';
import VideoTile from './VideoTile';
import Peer from '../../pages/Peer';
import Conference from '../../pages/Conference';

function VideoConference({ authToken, userName, roomId }) {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const peers = useHMSStore(selectPeers);

  console.log(authToken)
  useEffect(() => {
    // Join the room if not connected and authToken is available
    if (!isConnected && authToken) {
      hmsActions.join({
        userName: userName,
        authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoiYXBwIiwiYXBwX2RhdGEiOm51bGwsImFjY2Vzc19rZXkiOiI2NmZhM2EyZTQ5NDRmMDY3MzEzYTdhZTgiLCJyb2xlIjoiaG9zdCIsInJvb21faWQiOiI2NmZhNjgwMjBhZmNkN2M0OTczYzExYTciLCJ1c2VyX2lkIjoiMTZkNTBhN2YtZDUyNi00MzRiLTkwOTAtZTBkMjJjNTViNWU0IiwiZXhwIjoxNzI3Nzc1OTA3LCJqdGkiOiI3N2EwNzZjMS1hMDUxLTQwMGUtODZhYi00MDJlM2FhNDY1MTIiLCJpYXQiOjE3Mjc2ODk1MDcsImlzcyI6IjY2ZmEzYTJlNDk0NGYwNjczMTNhN2FlNiIsIm5iZiI6MTcyNzY4OTUwNywic3ViIjoiYXBpIn0.fm-2KtqLQAUrkIBEPNk__z9wrawjcAQ2DOvpJQbDhRQ",
      });
    }

    return () => {
      // if (isConnected) {
      //   hmsActions.leave();
      //   console.log("left")
      // }
    };
  }, [isConnected, hmsActions, authToken, userName]);



  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      {isConnected ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Conference/>
        </div>
      ) : (
        <div className="text-white">Connecting to the interview room...</div>
      )}
    </div>
  );
}

export default function VideoConferenceWrapper({ authToken, userName, roomId }) {
  return (
    <HMSRoomProvider>
      <VideoConference authToken={authToken} userName={userName} roomId={roomId} />
    </HMSRoomProvider>
  );
}
