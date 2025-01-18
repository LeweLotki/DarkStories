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
    <div className="flex items-center justify-center bg-gray-800 text-red-500 text-3xl font-bold rounded-lg h-[200px]">
      <p>{description}</p>
    </div>
  );
}

export default Description;
