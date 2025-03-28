const UserController = require("../controller/userController");
const {connectRedis} = require("../database/database")
const TaskController = require("../controller/taskController")
const express = require("express");
const router = express.Router();

const addTasks = async(userID, id) => {
    const client = await connectRedis();
    const tasks = await client.hGetAll(userID);
    const tasksArray = Object.entries(tasks).map(([id, taskString]) => {
        const task = JSON.parse(taskString);
        return {
            _id: id,
            name: task.name,
            categories: task.categories,
            process: task.process,
            userID: id
        }
    });
    TaskController.AddMany(id, tasksArray);
}


router.post("/signin", async (req, res) => {
    try {
        const {userID, username, password} = req.body 
        const user = await UserController.Get(username);
        if (user && password === user.password) {
            if (userID) addTasks(userID, user._id)
            res.status(201).json({message: "Login successfully", user});
        }
        else
            res.status(400).json({message: "Login failed"});
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post("/signup", async (req, res) => {
    try {
        const {userID, username, password} = req.body 
        const user = await UserController.Add({username, password});
        if (userID) addTasks(userID, user._id)
        res.status(201).json({message: "Register successfully", user});
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router