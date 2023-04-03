import { useCallback } from "react";

// Set up the OpenAI API endpoint and API key
const apiUrl = "https://api.openai.com/v1/engines/text-davinci-003/completions";
const apiKey = "geheim 😉";

export const useAi = (answerCallback) => {
  const sendMessage = useCallback(
    async (message) => {
      try {
        // Call the OpenAI API with the message using fetch
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            prompt: message,
            max_tokens: 1000,
            n: 1,
            stop: null,
            temperature: 1,
          }),
        });

        // Check if the response is successful
        if (!response.ok) {
          throw new Error("API request failed");
        }

        // Extract the AI-generated response from the API result
        const data = await response.json();
        const aiResponse = data.choices[0].text.trim();

        // Call the answerCallback with the generated response
        answerCallback(aiResponse);
      } catch (error) {
        console.error("Error in useAi sendMessage:", error);
      }
    },
    [answerCallback]
  );

  return sendMessage;
};
