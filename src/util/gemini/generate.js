const { GoogleGenerativeAI } = require("@google/generative-ai");
const ChatSchema = require("../../database/schemas/ChatSchema");
const UserSchema = require("../../database/schemas/UserSchema");
require('dotenv').config({ path: './src/environments/ai.env' });

const defaultPersonality = [
    { Id: 1, Role: "user", Message: "Você é uma IA amigável e prestativa. Mantenha respostas concisas e úteis." },
    { Id: 2, Role: "system", Message: "Sempre cumprimente o usuário de forma educada. Mantenha um tom consistente e profissional nas respostas." }
];

async function generate(prompt, chat_id, user_id) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.gemini_api);
        const safetySettings = [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_LOW_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
        ];

        const generationConfig = { maxOutputTokens: 750, temperature: 0.5 };
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest", safetySettings, generationConfig });

        let chatHistory = await ChatSchema.findOne({ id: chat_id });
        let user = await UserSchema.findOne({ id: user_id });

        if (!chatHistory) {
            chatHistory = new ChatSchema({
                id: chat_id,
                history: [...defaultPersonality]
            });
        }
        if (user.chats.length < 1) {
            user.chats.push(
                { id: chat_id }
            )
            await user.save();
        }

        const chat = model.startChat({
            history: chatHistory.history.map(h => ({
                role: h.Role,
                parts: [{ text: h.Message }]
            })),
            generationConfig
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();

        const finalText = text;

        chatHistory.history.push(
            { Id: chatHistory.history.length + 1, Role: "user", Message: prompt },
            { Id: chatHistory.history.length + 2, Role: "model", Message: finalText }
        );




        await chatHistory.save();
        return finalText;

    } catch(err) {
        return err;
    }
}

module.exports = generate;