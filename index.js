const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 9000;
const {userRouter} = require('./routes/user')
const {courseRouter} = require('./routes/course')
const {adminRouter} = require('./routes/admin')
const dotenv = require("dotenv")
dotenv.config();  // env variables ko process.env me load karega
const dbURL = process.env.databaseURL

function databaseConnection() {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      dbURL
      ).then(resolve).catch(reject);
  });
}
databaseConnection().then((e) => {
    console.log("Database Connected Successfully");
  }).catch((e) => {
    console.error(`not connected to Database${e.message}`);
  });

//this is to remove the cors error
app.use(cors());
app.use(express.json());

//these are the middlewares to get the user ,course , admin end point
app.use('/user',userRouter);
app.use('/course',courseRouter);
app.use('/admin', adminRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
