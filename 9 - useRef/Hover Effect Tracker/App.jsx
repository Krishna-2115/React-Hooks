import { useRef, useState } from "react";

export default function HoverTrackerGallery() {
    const captionRef = useRef(null);
    const [caption, setCaption] = useState("");

    const handleHover = (e, text) => {
        const rect = e.target.getBoundingClientRect();
        captionRef.current.style.top = `${rect.top - 30}px`;
        captionRef.current.style.left = `${rect.left}px`;
        setCaption(text);
    };

    return (
        <div className="relative grid grid-cols-3 gap-4 p-4">
            {["Sunset", "Forest", "Ocean"].map((img, i) => (
                <div
                    key={i}
                    onMouseEnter={e => handleHover(e, img)}
                    onMouseLeave={() => setCaption("")}
                    className="h-24 bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer"
                >
                    {img}
                </div>
            ))}
            <div
                ref={captionRef}
                className="absolute px-2 py-1 bg-black text-white text-sm rounded transition-all duration-200"
                style={{ display: caption ? "block" : "none" }}
            >
                {caption}
            </div>
        </div>
    );
}
