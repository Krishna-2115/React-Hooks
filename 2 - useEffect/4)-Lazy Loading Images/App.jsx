import { useState, useEffect } from 'react';

const LazyLoadImages = () => {
  const images = [
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80', // Nature
    'https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=800&q=80', // Travel
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80', // Technology
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80', // Mountains
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', // Ocean
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80', // City
    'https://images.unsplash.com/photo-1495562569060-2eec283d3391?w=800&q=80', // Forest
    'https://images.unsplash.com/photo-1495563381401-ecfbcaaa60f2?w=800&q=80', // Sunset
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80', // Repeat Nature
  ];

  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    const imgElements = document.querySelectorAll('.lazy-image');

    const observerOptions = {
      root: null, // Observe viewport
      rootMargin: '50px', // Load images a bit earlier before entering the viewport
      threshold: 0.2, // Trigger when 20% of image is visible
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const imgElement = entry.target;
          imgElement.src = imgElement.dataset.src;
          setLoadedImages((prev) => [...prev, imgElement.dataset.src]);
          observer.unobserve(imgElement);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    imgElements.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, []);

  return (
    <div style={styles.gallery}>
      {images.map((src, index) => (
        <img
          key={index}
          data-src={src}
          className="lazy-image"
          src="https://via.placeholder.com/800x600?text=Loading..."
          alt={`Lazy loaded ${index + 1}`}
          style={{
            width: '100%',
            height: '200px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            opacity: loadedImages.includes(src) ? 1 : 0.3,
            transition: 'opacity 0.7s ease-in-out, transform 0.3s ease-in-out',
            transform: loadedImages.includes(src) ? 'scale(1)' : 'scale(0.95)',
            cursor: 'pointer',
            objectFit: 'cover',
          }}
        />
      ))}
    </div>
  );
};

const styles = {
  gallery: {
    maxWidth: '900px',
    margin: '50px auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // Three columns grid
    gap: '20px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
};

export default LazyLoadImages;
