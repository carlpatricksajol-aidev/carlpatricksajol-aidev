import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let trailCounter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      // Add trail point
      setTrail((prev) => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailCounter++ }];
        return newTrail.slice(-15); // Keep last 15 trail points
      });

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      {/* Trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9999] mix-blend-difference"
          style={{
            left: point.x,
            top: point.y,
            width: "8px",
            height: "8px",
            transform: "translate(-50%, -50%)",
            opacity: (index / trail.length) * 0.5,
          }}
        >
          <div className="w-full h-full bg-foreground" style={{ imageRendering: "pixelated" }} />
        </div>
      ))}

      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[10000] mix-blend-difference transition-transform duration-100"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isMoving ? 1.2 : 1})`,
        }}
      >
        <div
          className="relative"
          style={{
            width: "20px",
            height: "20px",
            imageRendering: "pixelated",
          }}
        >
          {/* Pixelated circle using grid */}
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-0">
            {[
              0, 1, 1, 1, 0,
              1, 1, 1, 1, 1,
              1, 1, 1, 1, 1,
              1, 1, 1, 1, 1,
              0, 1, 1, 1, 0,
            ].map((filled, i) => (
              <div
                key={i}
                className={`${filled ? "bg-foreground" : "bg-transparent"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
