import { useState, useTransition } from "react";

const images = [
  "https://via.placeholder.com/300x200?text=Image+1",
  "https://via.placeholder.com/300x200?text=Image+2",
  "https://via.placeholder.com/300x200?text=Image+3",
];

export default function ImageGallery() {
  const [index, setIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  const nextImage = () => {
    startTransition(() => {
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 500);
    });
  };

  return (
    <div className="p-4 text-center">
      {isPending ? (
        <div className="loader mb-4">Loading image...</div>
      ) : (
        <img src={images[index]} alt="Gallery" className="mx-auto mb-4 rounded" />
      )}
      <button className="btn" onClick={nextImage}>Next</button>
    </div>
  );
}
