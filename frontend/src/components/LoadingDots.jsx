import React from "react";

function LoadingDots() {
  return (
    <div className="flex space-x-2">
      <div className="w-3 h-3 border border-green-500/50 rounded-full animate-bounce1"></div>
      <div className="w-3 h-3 border border-green-500/50 rounded-full animate-bounce2"></div>
      <div className="w-3 h-3 border border-green-500/50 rounded-full animate-bounce3"></div>
    </div>
  );
}

export default LoadingDots;
