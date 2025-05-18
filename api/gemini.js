import Constants from 'expo-constants';

const apiKey = Constants.expoConfig.extra.geminiApiKey;

export async function generateText(prompt) {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: prompt }] }
          ]
        }),
      }
    );

    const data = await response.json();
    console.log("Raw API response:", data);

    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response";
  } catch (err) {
    console.error("Error calling Gemini:", err);
  }
};