import React, { useRef, useEffect } from 'react';
import './MouseAnimation.css';

const CircleAnimation = () => {
    const coords = useRef({ x: 0, y: 0 });
  const circlesRef = useRef([]);

  const colors = [
    "#e0e0e0", "#cfcfcf", "#bfbfbf", "#afafaf", "#9f9f9f", 
    "#8f8f8f", "#7f7f7f", "#6f6f6f", "#5f5f5f", "#4f4f4f", 
    "#3f3f3f", "#2f2f2f", "#1f1f1f", "#0f0f0f", "#000000",
    "#000000", "#000000", "#000000", "#000000", "#000000"
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      coords.current.x = e.clientX;
      coords.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animateCircles = () => {
      let x = coords.current.x;
      let y = coords.current.y;

      circlesRef.current.forEach((circle, index) => {
        if (circle) {
          // Smooth trailing effect
          circle.x += (x - circle.x) * 0.5;
          circle.y += (y - circle.y) * 0.5;

          // Apply styles to create the trailing and gradient effect
          circle.style.left = `${circle.x - 12}px`;
          circle.style.top = `${circle.y - 12}px`;
          circle.style.transform = `scale(${(circlesRef.current.length - index) / circlesRef.current.length})`;
          circle.style.backgroundColor = colors[index % colors.length];
        }

        // Delay next circle slightly to create trailing effect
        x = circle.x;
        y = circle.y;
      });

      requestAnimationFrame(animateCircles);
    };

    // Initialize circle positions to overlap
    circlesRef.current.forEach((circle) => {
      if (circle) {
        circle.x = coords.current.x;
        circle.y = coords.current.y;
      }
    });

    animateCircles();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [colors]);

  return (
    <div>
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="circle"
          ref={(el) => (circlesRef.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default CircleAnimation;
