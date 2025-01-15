const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("../models/ToDoTaskModel");
require("dotenv")

const createUser = async ({ name, email, password }) => {
  const hashedPassword = await bcryptjs.hash(password, 10);

  const existingUser = await UserModel.find({ email: email });

  if (existingUser.length) {
    return { message: "Email Already Registered !!", type: "error" };
  }

  const user = new UserModel({
    name: name,
    email: email,
    password: hashedPassword,
  });

  return user
    .save()
    .then(() => {
      return { message: "User Created Successfully !!", type: "success" };
    })
    .catch((err) => {
      throw err;
    });
};

const loginUser = async ({ email, password }) => {
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return { message: "Either Email or Password is Invalid !!", type: "error" };
  }

  const comparePassword = await bcryptjs.compare(password, user.password);

  console.log(comparePassword);

  if (!comparePassword) {
    return { message: "Either Email or Password is Invalid !!", type: "error" };
  }

  const userData = {
    name: user.name,
    email: user.email,
  };

  const token = generateToken(userData);

  await UserModel.updateOne({ email: email }, { $set: { sessionToken: token } });

  return { message: "User Successfully Logged In !!", type: "success", token: token, email: user.email, name: user.name };
};

function generateToken(user) {
  const Token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      data: user,
    },
    process.env.JWT_KEY
  );
  return Token;
}

async function verifyToken(token) {
  const user = await UserModel.findOne({sessionToken: token})
  if(user){
    return true
  }
  return false
}

async function getTaskList(token) {
  const userData = jwt.verify(token, process.env.JWT_KEY)
  const data = await Task.find({userEmail: userData.data.email})

  let taskList = data.map((task) => ({
    taskName: task.task,
    completed: task.isCompleted,
    uid: task.createdAt,
  }));

  return taskList;

  // console.log(taskList);
  
  
  
  
}

































module.exports = { createUser, loginUser, verifyToken, getTaskList };
