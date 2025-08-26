// src/components/CustomCursor.jsx
import { useEffect } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    // Base cursor style
    gsap.set(cursor, {
      position: "fixed",
      top: 0,
      left: 0,
      width: 25,
      height: 25,
      borderRadius: "50%",
      backgroundColor: "#00ff88", // Neon Green
      // border: "1px solid black",
      // boxShadow: "0 0 15px rgba(0, 255, 136, 0.6)", // Glow
      pointerEvents: "none",
      zIndex: 9999,
      mixBlendMode: "difference", // cool effect on light bg
    });

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX - 12.5,
        y: e.clientY - 12.5,
        duration: 0.2,
        ease: "power3.out",
      });
    };

    // Hover effect on clickable elements
    const addHoverEffect = () => {
      gsap.to(cursor, {
        scale: 1.5,
        boxShadow: "0 0 25px rgba(0, 255, 136, 0.9)",
        duration: 0.3,
      });
    };

    const removeHoverEffect = () => {
      gsap.to(cursor, {
        scale: 1,
        boxShadow: "0 0 15px rgba(0, 255, 136, 0.6)",
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", addHoverEffect);
      el.addEventListener("mouseleave", removeHoverEffect);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", addHoverEffect);
        el.removeEventListener("mouseleave", removeHoverEffect);
      });
      cursor.remove();
    };
  }, []);

  return null;
}
