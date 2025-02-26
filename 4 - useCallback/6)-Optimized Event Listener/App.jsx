import { useEffect, useRef, useCallback } from "react";

const MouseTrailCanvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const particles = useRef([]);

  const handleMouseMove = useCallback((event) => {
    const { clientX: x, clientY: y } = event;
    particles.current.push({ x, y, alpha: 1 });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctxRef.current = canvas.getContext("2d");

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      const ctx = ctxRef.current;
      if (!ctx) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Subtle fade effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p, i) => {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10);
        gradient.addColorStop(0, `rgba(0, 150, 255, ${p.alpha})`);
        gradient.addColorStop(1, `rgba(0, 150, 255, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
        ctx.fill();
        p.alpha -= 0.02; // Controls fading speed

        if (p.alpha <= 0) particles.current.splice(i, 1);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900 to-black"
    />
  );
};

export default MouseTrailCanvas;
