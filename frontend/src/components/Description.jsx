import React, { useState, useEffect, useContext } from "react";
import config from "../config"; // Import global configuration
import { PuzzleContext } from "../PuzzleContext"; // Import PuzzleContext

function Description() {
  const [description, setDescription] = useState("Loading..."); // Initial state
  const { setPuzzleId } = useContext(PuzzleContext); // Access context

  useEffect(() => {
    // Fetch random description from the server
    const fetchDescription = async () => {
      try {
        const response = await fetch(`${config.SERVER_IP}/descriptions/random`);
        if (!response.ok) {
          throw new Error("Failed to fetch description");
        }
        const data = await response.json();
        setDescription(data.description); // Update the description state
        setPuzzleId(data.id); // Set the puzzle ID in the context
      } catch (error) {
        console.error("Error fetching description:", error);
        setDescription("Failed to load description.");
      }
    };

    fetchDescription();
  }, [setPuzzleId]);

  return (
    <div className="flex items-center justify-center bg-transparent text-green-500/50 text-3xl font-bold font-mono rounded-lg border border-green-500/50 p-4 focus-within:ring-4 focus-within:ring-green-500/50">
      <p>{description}</p>
    </div>
  );
}

export default Description;
