import React, { useState, useRef, useEffect, useContext } from "react";
import BottomTextInput from "./BottomTextInput";
import ConversationArea from "./ConversationArea";
import { fetchServerResponse, fetchSolution, fetchShouldShowSolution } from "../utils/fetch";
import { PuzzleContext } from "../PuzzleContext";

function RectangleBox() {
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [solution, setSolution] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const lastMessageRef = useRef(null);
  const { puzzleId } = useContext(PuzzleContext);

  const handleNewMessage = async (text) => {
    if (isLoading || !puzzleId) return;

    if (messageCount >= 5) {
      setConversation((prev) => [...prev, { type: "user", text }]);
      const shouldShowSolution = await fetchShouldShowSolution(text, puzzleId);
      if (shouldShowSolution) {
        const solutionData = await fetchSolution(puzzleId);
        setSolution(solutionData);
        setConversation((prev) => [...prev, { type: "solution" }]);
        setShowSolution(true);
      } else {
        setConversation((prev) => [...prev, { type: "failed" }]);
      }
      return;
    }

    setConversation((prev) => [...prev, { type: "user", text }]);
    setIsLoading(true);

    const response = await fetchServerResponse(text, puzzleId);
    setConversation((prev) => [...prev, { type: "response", text: response }]);
    setIsLoading(false);

    setMessageCount((prev) => prev + 1);

    if (messageCount + 1 === 5) {
      setConversation((prev) => [...prev, { type: "warning" }]);
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
      style={{ transform: "translateY(-2.5rem)" }}
    >
      <ConversationArea
        conversation={conversation}
        showSolution={showSolution}
        solution={solution}
        isLoading={isLoading}
        lastMessageRef={lastMessageRef}
      />
      <BottomTextInput onNewMessage={handleNewMessage} isDisabled={isLoading || messageCount >= 6} />
    </div>
  );
}

export default RectangleBox;
