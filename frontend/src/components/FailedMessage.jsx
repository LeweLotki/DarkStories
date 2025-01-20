import React from "react";

function FailedMessage() {
  return (
    <div className="bg-transparent text-green-500/50 text-3xl font-bold font-mono rounded-lg border border-green-500/50 p-4">
      You failed to solve the puzzle!
    </div>
  );
}

export default FailedMessage;
