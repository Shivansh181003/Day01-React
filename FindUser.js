const mongoose = require("mongoose");
const UserModel = require("./models/UserModel");

mongoose.connect(
  "mongodb+srv://shivanshgtav:IT1OU8BPLOD6l7HP@cluster0.mrlbo.mongodb.net/testdb"
);

UserModel.find({name: "Shivansh", email: "pLHJr@example.com"})
  .then(data => {
    if (data.length == 0) {
      console.log("No record found");
      mongoose.disconnect();
      return;
    }
    console.log(data);
    mongoose.disconnect();
  })
  .catch(err => {
    console.log(err);
    mongoose.disconnect();
  });


