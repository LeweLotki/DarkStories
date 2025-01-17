import React from "react";
import logo from "../assets/logo.png"; // Import the logo image

function Logo() {
  return (
    <div className="flex justify-center py-4">
      <img
        src={logo} // Use the imported logo
        alt="Logo"
        className="w-80 h-80 rounded-full border-2 border-gray-300"
      />
    </div>
  );
}

export default Logo;
