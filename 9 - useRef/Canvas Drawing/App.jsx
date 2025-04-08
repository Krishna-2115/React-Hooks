import { useRef, useEffect } from "react";

export default function CanvasBoard() {
  const canvasRef = useRef(null);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const startDraw = e => {
      drawing.current = true;
      draw(e);
    };

    const endDraw = () => {
      drawing.current = false;
      ctx.beginPath();
    };

    const draw = e => {
      if (!drawing.current) return;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000";
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mouseup", endDraw);
    canvas.addEventListener("mousemove", draw);

    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mouseup", endDraw);
      canvas.removeEventListener("mousemove", draw);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      className="border rounded shadow bg-white"
    />
  );
}
