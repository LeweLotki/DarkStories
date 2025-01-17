import React from "react";

function ResponseBox({ response }) {
  return (
    <div className="bg-gray-800 text-red-500 rounded p-2 min-w-[100px] text-2xl">
      {response}
    </div>
  );
}

export default ResponseBox;
