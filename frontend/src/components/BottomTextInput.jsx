import React, { useState } from "react";

function BottomTextInput({ onNewMessage, isDisabled }) {
  const [value, setValue] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && value.trim() !== "" && !isDisabled) {
      onNewMessage(value);
      setValue(""); // Clear the input
    }
  };

  return (
    <div className="bg-gray-800 rounded-md w-full p-2">
      <input
        type="text"
        placeholder="Insert text here"
        className="w-full bg-transparent text-red-500 placeholder-gray-400 outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isDisabled} // Disable input while loading
      />
    </div>
  );
}

export default BottomTextInput;
