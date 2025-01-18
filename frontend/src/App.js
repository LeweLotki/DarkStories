import React, { useState, useEffect } from "react";
import RectangleBox from "./components/RectangleBox";
import Background from "./components/Background";
import { PuzzleProvider } from "./PuzzleContext";

function App() {
  const [stage, setStage] = useState(1); // Stage 1: initial, Stage 2: zoom-in, Stage 3: background switch
  const [showRectangle, setShowRectangle] = useState(false); // Control RectangleBox rendering

  const handleBackgroundClick = () => {
    if (stage === 1) {
      setStage(2); // Trigger zoom-in animation
      setTimeout(() => {
        setStage(3); // Change to second background after zoom finishes
      }, 1500); // Match the duration of the zoom animation (1.5s)
    }
  };

  useEffect(() => {
    if (stage === 3) {
      // Wait for background2 to fully fade in (1s fade-in duration)
      const timeout = setTimeout(() => {
        setShowRectangle(true);
      }, 1000); // 1 second for the opacity transition
      return () => clearTimeout(timeout); // Clean up timeout
    }
  }, [stage]);

  return (
    <PuzzleProvider>
      <div className="relative h-screen w-full overflow-hidden" onClick={handleBackgroundClick}>
        {/* Background */}
        <Background stage={stage} />

        {/* RectangleBox: Only render when background2 is fully visible */}
        {showRectangle && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <RectangleBox />
          </div>
        )}
      </div>
    </PuzzleProvider>
  );
}

export default App;
