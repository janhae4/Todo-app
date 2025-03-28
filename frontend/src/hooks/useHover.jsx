// hooks/useHover.js
import { useState, useRef, useEffect } from "react";

export const useHover = () => {
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isMouseInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        setIsHovering(isMouseInside);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return [isHovering, setIsHovering, ref];
};