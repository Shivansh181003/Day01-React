const { default: mongoose } = require("mongoose");
const ToDoTaskSchema = require("../schemas/ToDoTaskSchema");

const Task = mongoose.model("task", ToDoTaskSchema)

module.exports = Task;