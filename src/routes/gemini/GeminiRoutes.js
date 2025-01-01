const express = require('express');
const gemini_routes = express.Router();
const geminiController = require("../../controllers/gemini/geminiController")
const gemini = new geminiController();

gemini_routes.post("/gemini", async (req, res) => { 
    const body = req.body; 
    const response = await gemini.gen(body.prompt, body.chat_id, body.user_id);

    res.status(response.code)
    res.json({ code: response.code, message: response.message })
})

module.exports = gemini_routes;