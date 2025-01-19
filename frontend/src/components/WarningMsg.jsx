import React from "react";

function WarningMsg() {
  return (
    <div className="bg-transparent text-green-500/50 text-3xl font-bold font-mono rounded-lg border border-green-500/50 p-4">
      You have reached messages limit! 
      <br></br>
      Write your solution now.
    </div>
  );
}

export default WarningMsg;
