import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_AI);

export const generateRecipe = async (ingredients, preferences, cuisine) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `Generate a recipe using: ${ingredients}. Preferences: ${preferences}. Cuisine: ${cuisine}. 
  Format response as a **valid JSON object** with keys: "title", "ingredients", "instructions".`;

  try {
    //  Corrected API Call
    // Sending the Request to Gemini API
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // console.log("Full API Response:", JSON.stringify(result, null, 2));

    //  Ensure Response Has Candidates
    if (
      !result?.response?.candidates ||
      result.response.candidates.length === 0
    ) {
      throw new Error("Invalid response from Gemini API");
    }

    //  Extract & Clean Response Text
    const responseText =
      result.response.candidates[0]?.content?.parts?.[0]?.text?.trim();
    if (!responseText) throw new Error("Empty response from Gemini API");

    //  Remove JSON Artifact
    const cleanedResponse = responseText.replace(/```json|```/g, "").trim();

    //  Validate & Parse JSON Response
    try {
      return JSON.parse(cleanedResponse);
    } catch (error) {
      console.error(
        " JSON Parsing Error:",
        error,
        "Response Text:",
        cleanedResponse
      );
      throw new Error("Invalid JSON response from Gemini API");
    }
  } catch (error) {
    console.error(" Gemini API Request Failed:", error);
    throw new Error("Gemini API request failed");
  }
};
