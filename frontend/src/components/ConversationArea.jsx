import React from "react";
import Description from "./Description";
import MessageMapper from "./MessageMapper";
import LoadingDots from "./LoadingDots";

function ConversationArea({ conversation, showSolution, solution, isLoading, lastMessageRef }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      <Description />
      {conversation.map((item, idx) => (
        <MessageMapper
          key={idx}
          item={item}
          idx={idx}
          conversationLength={conversation.length} // Pass the length of conversation
          showSolution={showSolution}
          solution={solution}
          lastMessageRef={lastMessageRef}
        />
      ))}
      {isLoading && (
        <div ref={lastMessageRef} className="flex justify-start mt-2">
          <LoadingDots />
        </div>
      )}
    </div>
  );
}

export default ConversationArea;
