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
    <div className="rounded-md w-full p-2">
      <input
        type="text"
        placeholder="Insert text here"
        className="w-full bg-transparent text-green-500/50 placeholder-green-500/50 outline-none border border-green-500/50 rounded-md p-2 text-lg font-bold font-mono focus:ring-4 focus:ring-green-500/50"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isDisabled} // Disable input while loading
      />
    </div>
  );
}

export default BottomTextInput;
