const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.generateAiQuote = functions.https.onRequest(async (req, res) => {
  const apiKey = process.env.API_KEY;

  const category = req.body.category;
  const {
    GoogleGenerativeAI,
  } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are a person that is looking for quotes that will enrich your life, bring inspiration, give you the honest truth through a quote, or something related to a topic you enter.",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  // Initiate the chat session
  const chatSession = model.startChat({
    generationConfig,
  });

  // Use 'category' from the request to guide the quote generation
  const prompt = `Create a unique and insightful quote related to ${category}. 
                  Do not imitate any existing authors or quotes. 
                  Label the response with "Quote by Gemini about ${category}:"`;

  // Get the AI-generated quote
  const response = await chatSession.sendMessage(prompt);

  // Extract the quote and metadata
  const responseText = response.response.text();
  console.log("Raw AI Response:", responseText); // Log the raw response
  if (responseText.includes(": ")) {
    const quoteParts = responseText.split(": ");
    const quoteText = quoteParts[1].trim();
    const categoryFromLabel = quoteParts[0].split("about ")[1].replace("\"", "");

    res.json({
      quote: quoteText,
      author: "Gemini",
      category: categoryFromLabel,
      occupation: "AI",
    });
  } else {
    console.error("Unexpected AI response format:", responseText);
    res.status(500).json({error: "Failed to process AI response"});
  }
});
