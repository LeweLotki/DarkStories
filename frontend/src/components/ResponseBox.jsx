import React from "react";

function ResponseBox({ response }) {
  return (
    <div className="bg-transparent text-green-500/50 rounded-md border border-green-500/50 p-2 min-w-[100px] text-2xl font-bold font-mono focus-within:ring-4 focus-within:ring-green-500/50">
      {response}
    </div>
  );
}

export default ResponseBox;
