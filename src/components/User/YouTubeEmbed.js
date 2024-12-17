import React from 'react';

const YouTubeEmbed = ({ videoId, width = "260", height = "215" }) => {
  return (
    <div className="video-responsive">
      <iframe
        width="400"
        height="400"
        src={videoId}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube"
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;