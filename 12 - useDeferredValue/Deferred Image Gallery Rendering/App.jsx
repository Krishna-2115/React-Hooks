import React, { useState, useDeferredValue } from 'react';

const ImageGallery = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const deferredImageIndex = useDeferredValue(imageIndex);
  const images = Array.from({ length: 100 }, (_, i) => `https://picsum.photos/id/${i + 1}/200/200`);

  return (
    <div className="p-4">
      <div className="flex space-x-4">
        {images.slice(deferredImageIndex, deferredImageIndex + 5).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            className="w-20 h-20 object-cover rounded"
          />
        ))}
      </div>
      <button
        onClick={() => setImageIndex(deferredImageIndex + 5)}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Load More
      </button>
    </div>
  );
};

export default ImageGallery;
