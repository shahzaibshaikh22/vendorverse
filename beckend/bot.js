const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: 'your-openai-api-key', // Replace with your actual OpenAI API key
});
const openai = new OpenAIApi(configuration);

async function getResponse(message) {
  const response = await openai.createCompletion({
    model: "text-davinci-003", // or another suitable model
    prompt: message,
    max_tokens: 150,
  });
  return response.data.choices[0].text.trim();
}

async function main() {
  const userMessage = "Hello, can you help me find a product?"; // Example user input
  const botResponse = await getResponse(userMessage);
  console.log("Bot:", botResponse);
}

main();
