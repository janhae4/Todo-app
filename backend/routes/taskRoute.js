const TaskController = require("../controller/taskController")
const TaskGuestRoute = require("./taskGuestRoute")
const express = require("express")
const router = express.Router()

router.post("/", async (req, res) => {
    try {
        const task = await TaskController.Add(req.body);
        res.status(201).json({message: "Post task successfully", task});
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get("/:id", async (req, res) => {
    const userId = req.params.id
    try {
        const task = await TaskController.FindByID(userId);
        res.status(201).json({message: "Get tasks successfully", task});
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const task = await TaskController.Delete(req.params.id);
        res.status(201).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const task = await TaskController.Update(req.params.id, req.body);
        res.status(201).json({ message: "Task updated successfully", task});
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.use("/guest", TaskGuestRoute)

module.exports = router