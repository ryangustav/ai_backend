const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const ChatSchema = new Schema({
    id: Number,
    history: [{
      Id: {
        type: Number,
        required: true
      },
      Role: {
        type: String,
        required: true
      },
      Message: {
        type: String,
        required: true
      } 
    }],
})

const Chat = mongoose.model("ChatSchema",ChatSchema);

module.exports = Chat;