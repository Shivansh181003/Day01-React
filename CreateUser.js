const mongoose = require("mongoose");
const UserModel = require("./models/UserModel");

mongoose.connect(
  "mongodb+srv://shivanshgtav:IT1OU8BPLOD6l7HP@cluster0.mrlbo.mongodb.net/testdb"
);

const user = new UserModel({
  name: "Rajani",
  email: "rajanis@example.com",
  phone: 68463434
});

user
  .save()
  .then(() => {
    console.log("User Created Successfully");
    mongoose.disconnect();
  })
  .catch((error) => {
    console.log("Error: ", error);
  });


