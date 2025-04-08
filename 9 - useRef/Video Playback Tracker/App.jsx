import { useRef, useState, useEffect } from "react";

export default function VideoTracker() {
  const videoRef = useRef(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setTime(videoRef.current.currentTime.toFixed(1));
    };
    const video = videoRef.current;
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded max-w-lg mx-auto">
      <video ref={videoRef} width="100%" controls className="rounded">
        <source src="/sample.mp4" type="video/mp4" />
      </video>
      <p className="mt-2 text-sm">Current Time: {time}s</p>
    </div>
  );
}
