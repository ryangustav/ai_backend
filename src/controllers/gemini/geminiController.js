const UserSchema = require("../../database/schemas/UserSchema")
const ChatSchema = require("../../database/schemas/ChatSchema")
const generate = require("../../util/gemini/generate")

class geminiController {

    async gen(prompt, chat_id, user_id) {
    let chat = await ChatSchema.findOne({ id: chat_id })
    let user = await UserSchema.findOne({ id: user_id })
    const message_id = Math.floor(Math.random() * (999999999 - 111111111 + 1) + 111111111)

    if (!chat) chat = await ChatSchema.create({ id: chat_id, history: [{ Id: message_id, Role: "user", Message: prompt}]});
    if (!user) return { code: 401, message: "Unauthorized: Please register or login in your account"}

    const response = await generate(prompt, chat_id, user_id);

    return { code: 200, message: response};
    }
}

module.exports = geminiController;