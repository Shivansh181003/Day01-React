const { default: mongoose } = require("mongoose");

const ToDoTaskSchema = mongoose.Schema({
    task: String,
    isCompleted: Boolean,
    createdAt: Date,
    userEmail: String,
})

module.exports = ToDoTaskSchema;