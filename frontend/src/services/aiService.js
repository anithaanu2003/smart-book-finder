// frontend/src/services/aiService.js

const BACKEND_URL = "https://smart-book-finder-1.onrender.com"; // Your Render backend URL

export const getBookRecommendations = async (title) => {
  if (!title) return "⚠️ Book title is required.";

  try {
    const response = await fetch(`${BACKEND_URL}/api/ai-recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      let errorMessage = "Could not fetch AI recommendations.";
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (parseError) {
        console.error("Error parsing backend error response:", parseError);
      }
      console.error("AI Backend Error:", errorMessage);
      return `⚠️ ${errorMessage}`;
    }

    const data = await response.json();

    if (data.recommendations) {
      return data.recommendations;
    } else if (data.output) {
      return data.output;
    } else {
      return "⚠️ No AI recommendations found.";
    }
  } catch (error) {
    console.error("AI Fetch Error:", error);
    return "⚠️ Could not fetch AI recommendations. Try again later.";
  }
};
