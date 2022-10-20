require('dotenv').config();
const mongoose = require('mongoose');
const {faker} = require('@faker-js/faker');
const User = require("./User")

mongoose.connect(process.env.MONGO_URI, () => {
    console.log("Connected To DB")
}, (e) => {
    console.log("Could Not Connect To DB")
    console.log(e)
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function createUser(name, age, email) {
    try {
        const user = new User({
            name: name,
            age: age,
            email: email
        })
        await user.save()
        console.log(user)
    } catch (e) {
        console.log(e.message)
    }
}

async function findUser(uid) {
    try {
        const user = await User.findById(uid)
        console.log(user)
    } catch (e) {
        console.log("User does not exist")
        console.log(e)
    }
}

//run()
//findUser("634ba10619155c4d154fe599")

async function createFakeUsers(count) {
    for (let i = 0; i < count; i++) {
        const randomName = faker.name.fullName();
        const randomEmail = faker.internet.email();
        const randomAge = getRandomInt(70);
        console.log(randomName, randomAge, randomEmail)
        createUser(randomName, randomAge, randomEmail)
    }

}

//createFakeUsers(100)

async function queryUsers(uid) {
    try {
        const users = await User
            .where("age")
            .gt(10).lt(15)
            .select(["age", "name"])
        console.log(users)
    } catch (e) {
        console.log("No user(s) found matching the query")
        console.log(e)
    }
}

// findUser()
// queryUsers()


async function findUserTest() {
    try {
        // const user = await User.findOne({name:'Vijay'})
        // console.log(user)
        // user.sayHi()
        const userfindByName = await User.findByName('Vijay')
        console.log(userfindByName)
        const userquery = await User.find().byName("Vijay")
        console.log(userquery)
    } catch (e) {
        console.log("User does not exist")
        console.log(e)
    }
}

findUserTest()
