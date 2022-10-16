require('dotenv').config();
const mongoose = require('mongoose');
const User = require("./User")

mongoose.connect(process.env.MONGO_URI, () => {
    console.log("Connected To DB")
}, (e) => {
    console.log("Could Not Connect To DB")
    console.log(e)
})

async function createUser() {
    try {
        const user = new User({
            name: "Vijay",
            age: 30,
            email: "Vijaygenius123@gmail.com"
        })
        await user.save()
        console.log(user)
    } catch (e) {
        console.log(e.message)
    }
}

async function findUser(uid){
    try {
        const user = await User.findById(uid)
        console.log(user)
    } catch (e){
        console.log("User does not exist")
        console.log(e)
    }
}

//run()
findUser("634ba10619155c4d154fe599")
