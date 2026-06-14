const parseAIResponse = (responseString) => {
  try {
    const cleanedString = responseString
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    
    return JSON.parse(cleanedString);
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Invalid JSON returned by AI");
  }
};

module.exports = parseAIResponse;
