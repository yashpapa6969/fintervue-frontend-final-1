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

function VideoConference({ authToken, userName }) {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const peers = useHMSStore(selectPeers);
  const isAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);

  useEffect(() => {
    // Join the room if not connected and authToken is available
    if (!isConnected && authToken) {
      hmsActions.join({
        userName: userName,
        authToken: authToken,
      });
    }

    // Leave the room when the component is unmounted
    return () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [isConnected, hmsActions, authToken, userName]);

  // Toggle Audio (Mute/Unmute)
  const handleToggleAudio = async () => {
    await hmsActions.setLocalAudioEnabled(!isAudioEnabled);
  };

  // Toggle Video (Show/Hide)
  const handleToggleVideo = async () => {
    await hmsActions.setLocalVideoEnabled(!isVideoEnabled);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      {isConnected ? (
        <div className="w-full max-w-4xl p-4 bg-gray-800 rounded-md">
          <h2 className="text-2xl font-semibold text-center text-white mb-4">Interview Room</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {peers.map((peer) => (
              <VideoTile key={peer.id} peer={peer} />
            ))}
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={handleToggleAudio}
              className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              {isAudioEnabled ? 'Mute Audio' : 'Unmute Audio'}
            </button>
            <button
              onClick={handleToggleVideo}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {isVideoEnabled ? 'Hide Video' : 'Show Video'}
            </button>
            <button
              onClick={() => hmsActions.leave()}
              className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Leave Room
            </button>
          </div>
        </div>
      ) : (
        <div className="text-white">Connecting to the interview room...</div>
      )}
    </div>
  );
}

export default function VideoConferenceWrapper({ authToken, userName }) {
  return (
    <HMSRoomProvider>
      <VideoConference authToken={authToken} userName={userName} />
    </HMSRoomProvider>
  );
}
