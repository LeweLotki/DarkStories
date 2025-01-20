import config from "../config";

// Fetch response from the server
export const fetchServerResponse = async (message, puzzleId) => {
  try {
    const response = await fetch(
      `${config.SERVER_IP}/messages/?message=${encodeURIComponent(message)}&id=${puzzleId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch response from the server.");
    }
    const data = await response.text();
    return data.replace(/^"|"$/g, ""); // Remove quotes from the string
  } catch (error) {
    console.error(error);
    return "Failed to fetch response."; // Fallback message
  }
};

// Fetch solution by ID
export const fetchSolution = async (puzzleId) => {
  try {
    const response = await fetch(`${config.SERVER_IP}/descriptions/${puzzleId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch solution from the server.");
    }
    const data = await response.json();
    return data.solution; // Return the solution content
  } catch (error) {
    console.error(error);
    return "Failed to load the solution.";
  }
};

// Fetch whether the solution should be shown
export const fetchShouldShowSolution = async (message, puzzleId) => {
  try {
    const response = await fetch(
      `${config.SERVER_IP}/messages/solution?message=${encodeURIComponent(message)}&id=${puzzleId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch solution status from the server.");
    }
    const data = await response.text(); // The server returns a plain string
    const parsedData = data.replace(/^"|"$/g, ""); // Remove quotes from the string
    return parsedData === "TRUE"; // Check if the response is "TRUE"
  } catch (error) {
    console.error(error);
    return false; // Default to not showing the solution
  }
};
