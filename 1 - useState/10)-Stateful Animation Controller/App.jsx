import React, { useState } from "react";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayInterval, setAutoplayInterval] = useState(null);

  const slides = [
    { text: "Welcome to the Professional Carousel", bgImage: "https://via.placeholder.com/800x400/1E90FF/FFFFFF?text=Slide+1" },
    { text: "Enjoy Seamless Transitions", bgImage: "https://via.placeholder.com/800x400/32CD32/FFFFFF?text=Slide+2" },
    { text: "Control Playback with Ease", bgImage: "https://via.placeholder.com/800x400/FFD700/FFFFFF?text=Slide+3" },
    { text: "Navigate to Any Slide Smoothly", bgImage: "https://via.placeholder.com/800x400/DC143C/FFFFFF?text=Slide+4" },
  ];

  const startAutoplay = () => {
    if (!autoplayInterval) {
      const intervalId = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 1500);
      setAutoplayInterval(intervalId);
    }
  };

  const stopAutoplay = () => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      setAutoplayInterval(null);
    }
  };

  const handlePrevSlide = () => {
    stopAutoplay();
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    stopAutoplay();
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
    setIsPlaying(!isPlaying);
  };

  const handleGoToSlide = (index) => {
    stopAutoplay();
    setCurrentSlide(index);
  };

  return (
    <div style={styles.carousel}>
      <div
        style={{
          ...styles.slide,
          backgroundImage: `url(${slides[currentSlide].bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={styles.overlay}>
          <h2 style={styles.slideText}>{slides[currentSlide].text}</h2>
        </div>
      </div>
      <div style={styles.controls}>
        <button onClick={handlePrevSlide} style={styles.button}>
          Previous
        </button>
        <button onClick={handlePlayPause} style={styles.button}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={handleNextSlide} style={styles.button}>
          Next
        </button>
      </div>
      <div style={styles.navDots}>
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => handleGoToSlide(index)}
            style={{
              ...styles.dot,
              backgroundColor: currentSlide === index ? "#FFD700" : "#ddd",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  carousel: {
    width: "70%",
    height: "38rem",
    margin: "50px auto",
    textAlign: "center",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    backgroundColor: "black",
    overflow: "hidden",
  },
  slide: {
    padding: "40px",
    height: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    position: "relative",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: "20px",
    borderRadius: "8px",
  },
  slideText: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#fff",
    lineHeight: "1.5",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#404040",
  },
  button: {
    padding: "12px 25px",
    backgroundColor: "#808080",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    margin: "0 10px",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  navDots: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    margin: "0 5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default Carousel;
