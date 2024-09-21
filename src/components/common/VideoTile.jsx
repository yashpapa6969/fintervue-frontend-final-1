import React from 'react';
import { useVideo } from '@100mslive/react-sdk';

function VideoTile({ peer }) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack
  });

  return (
    <div className="peer-tile bg-gray-700 rounded-md overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-64 object-cover"
        autoPlay
        muted={peer.isLocal} // Mute local video to avoid feedback
        playsInline
      />
      <div className="peer-name absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-2 py-1">
        {peer.name}
      </div>
    </div>
  );
}

export default VideoTile;
