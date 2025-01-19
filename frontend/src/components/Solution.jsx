import React from "react";

function Solution({ content }) {
  return (
    <div className="bg-transparent text-green-500/50 text-3xl font-bold font-mono rounded-lg border border-green-500/50 p-4">
      <div className="text-center">SOLUTION</div>
      <div>{content}</div>
    </div>
  );
}

export default Solution;
