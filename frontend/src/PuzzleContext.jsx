import React, { createContext, useState } from "react";

// Create the context
export const PuzzleContext = createContext();

// Context provider component
export function PuzzleProvider({ children }) {
  const [puzzleId, setPuzzleId] = useState(null); // Holds the current puzzle ID

  return (
    <PuzzleContext.Provider value={{ puzzleId, setPuzzleId }}>
      {children}
    </PuzzleContext.Provider>
  );
}
