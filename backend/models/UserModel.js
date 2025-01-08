const { default: mongoose } = require("mongoose");
const userSchema = require("../schemas/UserScheme");


const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
