const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;



const user = new Schema({
  userName: String,
  email: { type: String, unique: true },
  password: { type: String, unique: true },
  mobileNo: Number,
});

const admin = new Schema({
  adminName: String,
  email: { type: String, unique: true },
  password: { type: String, unique: true },
  mobileNo: Number,
});

const course = new Schema({
  creatorID : ObjectId,
  title : String,
  description : String,
  price : Number ,
  url : String
});

const purchases = new Schema({
userID: ObjectId,
courseID : ObjectId

})
const userModel = mongoose.model("users", user);
const adminModel = mongoose.model("admins", admin);
const courseModel = mongoose.model("course",course);
const purchasesModel =mongoose.model("purchases",purchases);

module.exports = {
  userModel: userModel,
  adminModel: adminModel,
  courseModel : courseModel,
  purchasesModel : purchasesModel,
};
