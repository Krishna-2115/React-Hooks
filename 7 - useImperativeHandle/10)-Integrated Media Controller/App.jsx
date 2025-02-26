import React, { useRef, useImperativeHandle, forwardRef, useState } from "react";

// Custom Media Player Component (Audio/Video Player)
const MediaPlayer = forwardRef((props, ref) => {
  const mediaRef = useRef(null);
  const [volume, setVolume] = useState(1); // Default volume 100%
  const [speed, setSpeed] = useState(1); // Default speed 1x
  const [isPlaying, setIsPlaying] = useState(false);

  // Exposing control methods to the parent component
  useImperativeHandle(ref, () => ({
    play: () => {
      mediaRef.current.play();
      setIsPlaying(true);
    },
    pause: () => {
      mediaRef.current.pause();
      setIsPlaying(false);
    },
    setVolume: (level) => {
      mediaRef.current.volume = level;
      setVolume(level);
    },
    setPlaybackSpeed: (speed) => {
      mediaRef.current.playbackRate = speed;
      setSpeed(speed);
    },
  }));

  const handlePlayPause = () => {
    if (isPlaying) {
      mediaRef.current.pause();
      setIsPlaying(false);
    } else {
      mediaRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div style={styles.mediaContainer}>
      <div style={styles.playerHeader}>
        <h2 style={styles.headerTitle}>Custom Media Player</h2>
      </div>
      <video
        ref={mediaRef}
        style={styles.media}
        width="100%"
        controls
        autoPlay={false}
        src="https://www.w3schools.com/html/mov_bbb.mp4"
      />
      <div style={styles.controls}>
        <button onClick={handlePlayPause} style={styles.controlButton}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div style={styles.volumeControls}>
          <label style={styles.label}>Volume:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              const newVolume = e.target.value;
              mediaRef.current.volume = newVolume;
              setVolume(newVolume);
            }}
            style={styles.slider}
          />
        </div>
        <div style={styles.speedControls}>
          <label style={styles.label}>Speed:</label>
          <select
            value={speed}
            onChange={(e) => {
              const newSpeed = parseFloat(e.target.value);
              mediaRef.current.playbackRate = newSpeed;
              setSpeed(newSpeed);
            }}
            style={styles.select}
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      </div>
    </div>
  );
});

// Parent Component to Control Media Player
const ParentComponent = () => {
  const mediaPlayerRef = useRef();

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <button onClick={() => mediaPlayerRef.current.play()} style={styles.controlButton}>
          Play
        </button>
        <button onClick={() => mediaPlayerRef.current.pause()} style={styles.controlButton}>
          Pause
        </button>
        <button onClick={() => mediaPlayerRef.current.setVolume(0.2)} style={styles.controlButton}>
          Set Volume 20%
        </button>
        <button onClick={() => mediaPlayerRef.current.setVolume(1)} style={styles.controlButton}>
          Set Volume 100%
        </button>
        <button onClick={() => mediaPlayerRef.current.setPlaybackSpeed(1)} style={styles.controlButton}>
          Set Speed 1x
        </button>
        <button onClick={() => mediaPlayerRef.current.setPlaybackSpeed(1.5)} style={styles.controlButton}>
          Set Speed 1.5x
        </button>
      </div>
      <MediaPlayer ref={mediaPlayerRef} />
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    maxWidth: "800px",
    margin: "0 auto",
  },
  mediaContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  playerHeader: {
    marginBottom: "15px",
  },
  headerTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#34495e",
  },
  media: {
    borderRadius: "8px",
    marginBottom: "15px",
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  },
  controlButton: {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  volumeControls: {
    display: "flex",
    alignItems: "center",
  },
  slider: {
    width: "200px",
    marginLeft: "10px",
  },
  speedControls: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    marginRight: "10px",
    fontSize: "16px",
  },
  select: {
    padding: "5px",
    fontSize: "16px",
  },
  buttonContainer: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    marginBottom: "20px",
  },
};

export default ParentComponent;
