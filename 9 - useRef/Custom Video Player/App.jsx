import { useRef } from "react";

export default function CustomVideoPlayer() {
  const videoRef = useRef(null);

  return (
    <div className="p-4 shadow bg-white rounded max-w-lg mx-auto text-center">
      <video ref={videoRef} width="100%" controls className="rounded">
        <source src="/sample.mp4" type="video/mp4" />
      </video>
      <div className="space-x-2 mt-2">
        <button onClick={() => videoRef.current.play()} className="bg-blue-500 text-white px-4 py-1 rounded">Play</button>
        <button onClick={() => videoRef.current.pause()} className="bg-red-500 text-white px-4 py-1 rounded">Pause</button>
        <button onClick={() => (videoRef.current.volume = 0.5)} className="bg-yellow-500 text-white px-4 py-1 rounded">Volume 50%</button>
      </div>
    </div>
  );
}
