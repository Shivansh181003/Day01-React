const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const Task = require("./models/ToDoTaskModel");
const {
  createUser,
  loginUser,
  verifyToken,
  getTaskList,
} = require("./handlers/HandleAuth");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

try {
  mongoose.connect(process.env.MONGO_URI);
} catch (error) {
  console.log(error);
}

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

app.use(bodyParser.json());

const upload = multer();

app.get("/", (req, res) => res.send("Express server on Vercel "));

app.get("/tasklist", async (req, res) => {
  const verifiedToken = await verifyToken(req.cookies.session);

  if (!verifiedToken) {
    res.send({ message: "Unauthorized" });
    return;
  }

  const tasks = await getTaskList(req.cookies.session);

  res.send({
    tasks: tasks,
  });
});

app.post("/addtask", upload.none(), async (req, res) => {
  const task = req.body.task;

  const verifiedToken = await verifyToken(req.cookies.session);

  if (!verifiedToken) {
    res.send({ message: "Unauthorized" });
    return;
  }

  // console.log("Cookie: ",req.cookies.session);

  const email = jwt.verify(req.cookies.session, process.env.JWT_KEY).data.email;

  const todoTask = new Task({
    task: task,
    isCompleted: false,
    createdAt: new Date(),
    userEmail: email,
  });

  todoTask.save().then(() => {
    console.log(task, "Task Saved");
  });

  res.send({ message: "Task received" });
});

app.post("/updateTask", upload.none(), async (req, res) => {
  const verifiedToken = await verifyToken(req.cookies.session);

  if (!verifiedToken) {
    res.send({ message: "Unauthorized" });
    return;
  }
  const email = jwt.verify(req.cookies.session, process.env.JWT_KEY).data.email;
  const task = await Task.findOne({
    createdAt: req.body.uid,
    userEmail: email,
  });
  await Task.updateOne(
    { createdAt: req.body.uid, userEmail: email },
    { isCompleted: !task.isCompleted }
  )
    .then(() => {
      res.send({ message: "Task Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Task Not Updated | Something went Wrong !!" });
    });
  return;
});

app.post("/deleteTask", upload.none(), async (req, res) => {
  const verifiedToken = await verifyToken(req.cookies.session);

  if (!verifiedToken) {
    res.send({ message: "Unauthorized" });
    return;
  }

  const email = jwt.verify(req.cookies.session, process.env.JWT_KEY).data.email;
  await Task.deleteOne({ createdAt: req.body.uid, userEmail: email })
    .then(() => {
      res.send();
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Task Not Deleted | Something went Wrong !!" });
    });
  return;
});

// Public Routes --->

app.post("/createUser", upload.none(), async (req, res) => {
  const { name, email, password } = req.body;

  await createUser({ name, email, password }).then((resp) => {
    res.send({
      message: resp.message,
      type: resp.type,
    }).catch((err) => {
      console.log(err);
      res.send({ message: "User Not Created | Something went Wrong !!" });
    })
  });
});

app.post("/loginUser", upload.none(), async (req, res) => {
  const { email, password } = req.body;

  await loginUser({ email, password }).then((resp) => {
    res.cookie("session", resp.token, {
      httpOnly: true,
    });
    res.json({
      message: resp.message,
      type: resp.type,
      name: resp.name || null,
      email: resp.email || null,
    });
  }).catch((err) => {
    console.log(err);
    res.send({ message: "User Not Logged In | Something went Wrong !!" , type: "error"});
  });
  
});

app.get("/signOut", async (req, res) => {
  const verifiedToken = await verifyToken(req.cookies.session);
  if (!verifiedToken) {
    res.send({ message: "Unauthorized" });
    return;
  }

  res.clearCookie("session");
  res.send();
});

app.listen(port, () => {
  console.log(`Server Running on Port: ${port}`);
});

module.exports = app;
