import React from "react";
import background1 from "../assets/background.png"; // First background image
import background2 from "../assets/background2.png"; // Second background image

function Background({ stage }) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background 1 */}
      <div
        className={`absolute top-0 left-0 h-full w-full ${
          stage === 2 || stage === 3 ? "animate-zoom" : ""
        }`}
        style={{
          backgroundImage: `url(${background1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: stage === 3 ? "scale(1.5)" : "scale(1)", // Maintain scale(1.5) during fade-in
          zIndex: 0,
        }}
      ></div>

      {/* Background 2 */}
      <div
        className={`absolute top-0 left-0 h-full w-full transition-opacity duration-1000 ${
          stage === 3 ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${background2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: "scale(1.5)", // Ensure background2 is zoomed in
          zIndex: 0,
        }}
      ></div>
    </div>
  );
}

export default Background;
