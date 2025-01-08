const mongoose = require("mongoose");
const UserModel = require("./models/UserModel");

mongoose.connect(
  "mongodb+srv://shivanshgtav:IT1OU8BPLOD6l7HP@cluster0.mrlbo.mongodb.net/testdb"
);

// UserModel.findOneAndUpdate({ name: "Shivansh", phone: 8318638789}, { email: "shivansh181003@gmail.com" })
// .then((data)=>{
//     console.log("Data Updated !!!\nData: ", data);
//     mongoose.disconnect()
// })
// .catch((err)=>{
//     console.log(err);
//     mongoose.disconnect();
// })

UserModel.updateOne({ name: "Shivansh", phone: 8318638789}, { email: "shivanshgtav@gmail.com" }).then((data) => {
    console.log("Data Updated !!!\nData: ", data);
    mongoose.disconnect();
}).catch((err) => {
    console.log(err);
    mongoose.disconnect();
})
