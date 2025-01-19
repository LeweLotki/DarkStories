import React, { useState, useRef, useEffect, useContext } from "react";
import BottomTextInput from "./BottomTextInput";
import MessageBox from "./MessageBox";
import ResponseBox from "./ResponseBox";
import LoadingDots from "./LoadingDots";
import Description from "./Description";
import config from "../config"; // Import server configuration
import { PuzzleContext } from "../PuzzleContext"; // Import PuzzleContext

function RectangleBox() {
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [messageCount, setMessageCount] = useState(0); // Count of messages sent
  const lastMessageRef = useRef(null);
  const { puzzleId } = useContext(PuzzleContext); // Access the puzzle ID from context

  // Fetch response from the server
  const fetchServerResponse = async (message) => {
    try {
      const response = await fetch(
        `${config.SERVER_IP}/messages/?message=${encodeURIComponent(message)}&id=${puzzleId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch response from the server.");
      }
      const data = await response.text(); // The server returns a plain string
      return data.replace(/^"|"$/g, ""); // Remove quotes from the string
    } catch (error) {
      console.error(error);
      return "Failed to fetch response."; // Fallback message
    }
  };

  const handleNewMessage = async (text) => {
    if (isLoading || !puzzleId || messageCount >= 10) return; // Lock input while loading or limit reached

    // Add user message
    setConversation((prev) => [...prev, { type: "user", text }]);
    setIsLoading(true); // Start loading animation

    // Fetch response from the server
    const response = await fetchServerResponse(text);

    // Add server response
    setConversation((prev) => [...prev, { type: "response", text: response }]);
    setIsLoading(false); // Stop loading animation

    // Increment message count
    setMessageCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  return (
    <div
      className="bg-transparent w-[1000px] h-[700px] rounded-xl flex flex-col"
      style={{ transform: "translateY(-2.5rem)" }} // Translate RectangleBox upward
    >
      {/* Scrollable conversation area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Description box */}
        <Description />

        {/* Messages */}
        {conversation.map((item, idx) =>
          item.type === "user" ? (
            <div key={idx} className="flex justify-end mb-2">
              <MessageBox message={item.text} />
            </div>
          ) : (
            <div
              key={idx}
              ref={idx === conversation.length - 1 ? lastMessageRef : null}
              className="flex justify-start mb-2"
            >
              <ResponseBox response={item.text} />
            </div>
          )
        )}

        {/* Loading animation */}
        {isLoading && (
          <div className="flex justify-start mt-2">
            <LoadingDots />
          </div>
        )}
      </div>

      {/* Message limit notice */}
      {messageCount >= 10 && (
        <div className="text-center text-red-500 font-bold mb-2">
          You have reached the message limit!
        </div>
      )}

      {/* Bottom input box */}
      <BottomTextInput
        onNewMessage={handleNewMessage}
        isDisabled={isLoading || messageCount >= 10}
      />
    </div>
  );
}

export default RectangleBox;
