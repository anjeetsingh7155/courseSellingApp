const {Router} = require('express')
const userRouter = Router();
const z = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {userModel,adminModel}= require("../db")
const {jwt_password,auth} = require("../auth")

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
  try{
  const {userName,password,email} = req.body

const user= await userModel.findOne({
  userName : userName,
  email : email
})
const passwordMatch = bcrypt.compare(password,user.password)
if(user && passwordMatch){
  const token = jwt.sign({
    userName : user.userName,
    id : user._id
  },jwt_password)

  res.json({
    token : token
  })
}
  }catch(e){
    res.sendStatus(404).json({message:`user not found :${e.message}`})
  }
});

userRouter.get("/purchases",auth, (req, res) => {
  res.send("hello world");
});

module.exports = {
    userRouter : userRouter
}