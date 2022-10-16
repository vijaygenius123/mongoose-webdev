const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    createdAt: {
        type:Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type:Date,
        default: () => Date.now()
    },
    bestFriend: mongoose.SchemaTypes.ObjectId,
    hobbies: [String],
    address: {
        street: String,
        city: String
    }
})


module.exports = mongoose.model("User", userSchema)
