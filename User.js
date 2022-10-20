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

userSchema.methods.sayHi = function(){
    console.log(`Hi, My name is ${this.name}`)
}

userSchema.statics.findByName = function(name){
   return this.find({name: new RegExp(name, 'i')})
}

userSchema.query.byName = function(name){
    return this.where("name").equals(name)
}

module.exports = mongoose.model("User", userSchema)
