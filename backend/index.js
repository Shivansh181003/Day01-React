const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const Task = require("./models/ToDoTaskModel");
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI);

const app = express();
const port = 3001;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(bodyParser.json());

const upload = multer();


app.get("/tasklist", (req, res) => {
  res.send({
    tasks: [
      {
        taskName: "Learn FrontEnd",
        completed: true,
      },
      
      {
        taskName: "Learn Database",
        completed: false,
      },
      {
        taskName: "Learn Authentication",
        completed: false,
      },
      {
        taskName: "Final Integration",
        completed: false,
      },
    ],
  });
});

app.post("/addtask", upload.none(), (req, res) => {
  const task = req.body.task;

  const todoTask = new Task({
    task: task,
    isCompleted: false,
    createdAt: new Date(),
  })

  todoTask.save().then(()=>{
    console.log(task, "Task Saved");
  })

  res.send({ message: "Task received" });
})

app.listen(port, () => {
  console.log(`Server Running on Port: ${port}`);
});
