import React, { useState, useRef, useLayoutEffect } from "react";

const images = [
  { src: "https://via.placeholder.com/600x300/3498db/ffffff?text=Slide+1", caption: "This is the first slide" },
  { src: "https://via.placeholder.com/600x300/e74c3c/ffffff?text=Slide+2", caption: "This is the second slide with a longer caption" },
  { src: "https://via.placeholder.com/600x300/2ecc71/ffffff?text=Slide+3", caption: "This is the third slide" }
];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const imageRef = useRef(null);
  const [captionHeight, setCaptionHeight] = useState(0);

  useLayoutEffect(() => {
    if (imageRef.current) {
      setCaptionHeight(imageRef.current.clientHeight * 0.15); // Caption height 15% of image
    }
  }, [index]); // Adjust when index changes

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div style={carouselContainer}>
      <div style={carouselWrapper}>
        <img
          ref={imageRef}
          src={images[index].src}
          alt="carousel-slide"
          style={imageStyle}
        />
        <div style={{ ...captionStyle, height: `${captionHeight}px` }}>
          {images[index].caption}
        </div>
      </div>
      <button onClick={prevSlide} style={buttonStyle}>‹</button>
      <button onClick={nextSlide} style={buttonStyle}>›</button>
    </div>
  );
};

// Styles
const carouselContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  position: "relative",
  maxWidth: "600px",
  margin: "auto",
  textAlign: "center"
};

const carouselWrapper = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "10px",
};

const imageStyle = {
  width: "100%",
  display: "block",
  transition: "opacity 0.5s ease-in-out"
};

const captionStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  color: "white",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "height 0.3s ease-in-out",
  padding: "10px",
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
};

const buttonStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(0, 0, 0, 0.5)",
  color: "white",
  border: "none",
  padding: "10px 15px",
  fontSize: "24px",
  cursor: "pointer",
  zIndex: 10
};

export default Carousel;
