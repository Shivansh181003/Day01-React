const mongoose = require("mongoose")
const UserModel = require("./models/UserModel")

mongoose.connect("mongodb+srv://shivanshgtav:IT1OU8BPLOD6l7HP@cluster0.mrlbo.mongodb.net/testdb")

UserModel.deleteMany({name: "Rajani", email: "rajanis@example.com"})
.then((data)=>{
    console.log(data.deletedCount,"Data Deleted !!!\nData: ", data);
    mongoose.disconnect()
})
.catch((err)=>{
    console.log(err);
    mongoose.disconnect();
})