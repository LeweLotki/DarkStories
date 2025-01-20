import React from "react";
import MessageBox from "./MessageBox";
import ResponseBox from "./ResponseBox";
import WarningMsg from "./WarningMsg";
import Solution from "./Solution";
import FailedMessage from "./FailedMessage";

function MessageMapper({ item, idx, conversationLength, showSolution, solution, lastMessageRef }) {
  if (item.type === "user") {
    return (
      <div key={idx} className="flex justify-end mb-2">
        <MessageBox message={item.text} />
      </div>
    );
  }

  if (item.type === "response") {
    return (
      <div
        key={idx}
        ref={idx === conversationLength - 1 ? lastMessageRef : null}
        className="flex justify-start mb-2"
      >
        <ResponseBox response={item.text} />
      </div>
    );
  }

  if (item.type === "warning") {
    return (
      <div
        key={idx}
        ref={idx === conversationLength - 1 ? lastMessageRef : null}
        className="flex justify-center mb-2"
      >
        <WarningMsg />
      </div>
    );
  }

  if (item.type === "failed") {
    return (
      <div
        key={idx}
        ref={idx === conversationLength - 1 ? lastMessageRef : null}
        className="flex justify-center mb-2"
      >
        <FailedMessage />
      </div>
    );
  }

  if (showSolution && item.type === "solution") {
    return (
      <div
        key={idx}
        ref={idx === conversationLength - 1 ? lastMessageRef : null}
        className="flex justify-center mb-2"
      >
        <Solution content={solution} />
      </div>
    );
  }

  return null;
}

export default MessageMapper;
