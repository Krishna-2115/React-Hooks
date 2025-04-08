import { useRef } from "react";

export default function AudioPlayer() {
  const audioRef = useRef(null);

  return (
    <div className="p-4 rounded shadow max-w-md mx-auto bg-white text-center">
      <h3 className="text-lg font-semibold mb-2">Audio Player</h3>
      <audio ref={audioRef} src="/sample.mp3" className="w-full" />
      <div className="mt-2 space-x-2">
        <button onClick={() => audioRef.current.play()} className="bg-green-500 text-white px-4 py-1 rounded">Play</button>
        <button onClick={() => audioRef.current.pause()} className="bg-red-500 text-white px-4 py-1 rounded">Pause</button>
        <button onClick={() => (audioRef.current.currentTime = 0)} className="bg-gray-500 text-white px-4 py-1 rounded">Reset</button>
      </div>
    </div>
  );
}
