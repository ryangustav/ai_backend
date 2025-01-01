const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new Schema({
    id: Number,
    username: String,
    email: String,
    password: String,
    chats: [{
        id: Number,
    }]
})

const User = mongoose.model("UserSchema", UserSchema);

module.exports = User;