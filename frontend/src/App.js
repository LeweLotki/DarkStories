import React from "react";
import RectangleBox from "./components/RectangleBox";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import Title from "./components/Title";
import { PuzzleProvider } from "./PuzzleContext"; // Import the PuzzleProvider

function App() {
  return (
    <PuzzleProvider>
      <div className="flex flex-col h-screen bg-black">
        {/* Logo at the top */}
        <div className="mb-8">
          <Logo />
        </div>

        {/* Title */}
        <div className="mb-8">
          <Title />
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center -mt-32">
          <RectangleBox />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </PuzzleProvider>
  );
}

export default App;
