const { json } = require("express");
const {connectRedis} = require("../database/database")
const router = require("express").Router();
let client;

(async () => {
    client = await connectRedis(); 
})();

router.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const tasks = await client.hGetAll(id);
        const tasksArray = Object.entries(tasks).map(([id, taskString]) => {
            const task = JSON.parse(taskString);
            return {
                _id: id,
                name: task.name,
                categories: task.categories,
                process: task.process,
                userID: task.userID
            }
        });
        res.status(201).json({message: "Get task successfully", task: tasksArray});
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post("/", async (req, res) => {
    const {userID, _id, ...tasks} = req.body
    try {
        console.log(req.body)
        const task = await client.hSet(userID, _id, JSON.stringify(tasks));
        res.status(201).json({message: "Post task successfully", task});
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.put("/:id", async (req, res) => {
    const taskId = req.params.id
    const {userId, ...taskData} = req.body
    console.log(taskId, userId, taskData)
    try {
        const task = await client.hGet(userId, taskId);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        const updatedTask = await client.hSet(userId, taskId, JSON.stringify(taskData));
        res.status(201).json({message: "Put task successfully", updatedTask});
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.delete("/:id", async (req, res) => {
    const taskId = req.params.id
    const id = req.query.userId
    try {
        console.log(taskId, id)
        await client.hDel(id, taskId);
        res.status(201).json({message: "Delete task successfully"});
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router