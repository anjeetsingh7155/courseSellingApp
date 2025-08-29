const {Router} = require('express')
const userRouter = Router();
const z = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {userModel}= require("../db")
const {jwt_userPass,userAuth} = require("../middlewares/userAuth")

userRouter.post("/signup", async (req, res) => {
  try{
   const safetyCheck = z.object({
        email: z.string().email(),
        password: z.string().min(3).max(10).startsWith('azn'),
        userName: z.string(),
        mobileNo: z.number()
    });

    const safeObject = await safetyCheck.safeParse(req.body);
    if (!safeObject.success) {
        return res.json({
            message: "Wrong Credential",
            error: safeObject.error
        });
    }

    const { userName, email, password, mobileNo } = safeObject.data;
    const bcryptPassword = await bcrypt.hash(password, 10);

    
    await userModel.create({
        userName : userName,
        email:email,
        password: bcryptPassword,
        mobileNo:mobileNo
    });
  
    res.json({ message: "Signup successful" });
  }
  catch(e){
    res.json({Error: `An error occured:${e.message}`})
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { userName, password, email } = req.body;

    const user = await userModel.findOne({
      userName: userName,
      email: email,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      {
        userName: user.userName,
        id: user._id, // Ensure `id` is included
      },
      jwt_userPass
    );

    res.json({
      token: token,
    });
  } catch (e) {
    res.status(500).json({ message: `An error occurred: ${e.message}` });
  }
});

userRouter.get("/purchases",userAuth, (req, res) => {
  const id = req.adminID
  const userName =  req.userName
  res.json({
    id: id,
    userName:userName
  })
});

module.exports = {
    userRouter : userRouter
}