import React from "react";

function MessageBox({ message }) {
  return (
    <div className="bg-gray-800 text-red-500 rounded p-2 min-w-[100px] text-2xl">
      {message}
    </div>
  );
}

export default MessageBox;
