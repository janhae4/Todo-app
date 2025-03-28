const Task = require("../models/Task")

exports.Add = async (data) => {
    const task = new Task(data);
    await task.save();
    return task
};

exports.Update = async (id, data) => {
    return await Task.findByIdAndUpdate(id, data, { new: true });
}

exports.Delete = async (id) => {
    return await Task.findByIdAndDelete(id);
}

exports.GetAll = async () => {
    return await Task.find();
}

exports.AddMany = async (id, tasks) => {
    return await Task.insertMany(tasks.map(task => ({...task, userID: id})));
}

exports.FindByID = async(id) => {
    return await Task.find({userID: id});
}

exports.FindUserAndDeleteTask = async (taskID) => {
    return await Task.findByIdAndDelete(taskID);
}

exports.FindUserAndUpdateTask = async (taskID, data) => {
    return await Task.findByIdAndUpdate(taskID, data, { new: true });
}