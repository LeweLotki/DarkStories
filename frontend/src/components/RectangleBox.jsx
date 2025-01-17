import React, { useState, useRef, useEffect } from "react";
import BottomTextInput from "./BottomTextInput";
import MessageBox from "./MessageBox";
import ResponseBox from "./ResponseBox";
import LoadingDots from "./LoadingDots";
import Description from "./Description"; // Import Description component

function RectangleBox() {
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const lastMessageRef = useRef(null);

  const generateRandomResponse = () => {
    const responses = ["YES", "NO", "PASS"];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleNewMessage = (text) => {
    if (isLoading) return; // Lock input while loading

    setConversation((prev) => [...prev, { type: "user", text }]); // Add user message
    setIsLoading(true); // Start loading animation

    // Simulate server delay (0.5 to 1 second)
    const delay = Math.random() * 500 + 500;
    setTimeout(() => {
      const randomResponse = generateRandomResponse();
      setConversation((prev) => [...prev, { type: "response", text: randomResponse }]); // Add response
      setIsLoading(false); // Stop loading animation
    }, delay);
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  return (
    <div className="bg-gray-600 w-[1600px] h-[800px] rounded-xl flex flex-col">
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

      {/* Bottom input box */}
      <BottomTextInput onNewMessage={handleNewMessage} isDisabled={isLoading} />
    </div>
  );
}

export default RectangleBox;
