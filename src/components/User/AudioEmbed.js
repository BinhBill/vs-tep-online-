import React from 'react';

const AudioEmbed = ({ src }) => {
  return (
    <div>
      <audio controls>
        <source src={src} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default AudioEmbed;