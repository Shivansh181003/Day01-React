const express = require("express");

const app = express();
const port = 3001;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (request, responce) => {
  responce.json({
    name: "Shivansh",
  });
});

app.post("/", (req, res) => {
  res.json({
    message: "post received !!!",
  });
});

app.get("/tasklist", (req, res) => {
  res.send({
    tasks: [
      {
        taskName: "Learn FrontEnd",
        completed: true,
      },
      {
        taskName: "Learn Backend",
        completed: false,
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

app.listen(port, () => {
  console.log(`Server Running on Port: ${port}`);
});
