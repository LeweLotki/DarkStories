import React, { useState, useRef, useEffect, useContext } from "react";
import BottomTextInput from "./BottomTextInput";
import MessageBox from "./MessageBox";
import ResponseBox from "./ResponseBox";
import LoadingDots from "./LoadingDots";
import Description from "./Description";
import WarningMsg from "./WarningMsg";
import Solution from "./Solution"; // Import Solution component
import config from "../config"; // Import server configuration
import { PuzzleContext } from "../PuzzleContext"; // Import PuzzleContext

function RectangleBox() {
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [messageCount, setMessageCount] = useState(0); // Count of messages sent
  const [solution, setSolution] = useState(null); // Store the solution content
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

  // Fetch solution by ID
  const fetchSolution = async () => {
    try {
      const response = await fetch(`${config.SERVER_IP}/descriptions/${puzzleId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch solution from the server.");
      }
      const data = await response.json();
      setSolution(data.solution); // Update the solution content
    } catch (error) {
      console.error(error);
      setSolution("Failed to load the solution.");
    }
  };

  const handleNewMessage = async (text) => {
    if (isLoading || !puzzleId) return; // Lock input while loading or if puzzleId is not ready

    // If the message count has reached the limit, treat the text as the solution
    if (messageCount >= 5) {
      setConversation((prev) => [...prev, { type: "user", text }]); // Add user's solution to the chat
      await fetchSolution(); // Fetch the solution from the server
      setConversation((prev) => [...prev, { type: "solution" }]); // Add the solution to the chat
      return;
    }

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

    // Add warning message after reaching limit
    if (messageCount + 1 === 5) {
      setConversation((prev) => [
        ...prev,
        { type: "warning" }, // Add the warning message
      ]);
    }
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
          ) : item.type === "response" ? (
            <div
              key={idx}
              ref={idx === conversation.length - 1 ? lastMessageRef : null}
              className="flex justify-start mb-2"
            >
              <ResponseBox response={item.text} />
            </div>
          ) : item.type === "warning" ? (
            <div
              key={idx}
              ref={idx === conversation.length - 1 ? lastMessageRef : null}
              className="flex justify-center mb-2"
            >
              <WarningMsg />
            </div>
          ) : (
            <div
              key={idx}
              ref={idx === conversation.length - 1 ? lastMessageRef : null}
              className="flex justify-center mb-2"
            >
              <Solution content={solution} />
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

      {/* Bottom input box */}
      <BottomTextInput onNewMessage={handleNewMessage} isDisabled={isLoading || messageCount >= 6} />
    </div>
  );
}

export default RectangleBox;
