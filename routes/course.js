const {Router} =require('express')
const courseRouter = Router();
const {purchasesModel, courseModel}  = require('../db')
const {userAuth} = require('../middlewares/userAuth')


courseRouter.post("/purchase",userAuth,async (req,res)=>{
    try{
    const  courseId = req.body.courseID;
    const userID   = req.userID
   await purchasesModel.create({
    userID: userID,
    courseID : courseId 
    })
    res.sendStatus(200).json({
        message : "Successfully Purchased the Courses"
    })
}catch(e){
     res.sendStatus(500).json({
        message : "Some error is happening while Purchasing the Course"
    })
}
})

courseRouter.get("/preview",(req,res)=>{
    try {
         const courses = courseModel.find({})
         res.status(200).json({
            courses : courses
         })
    } catch (error) {
        res.sendStatus(500).json({
            message : 'Unable to get the courses'
        })
    }
   
})

module.exports= {
    courseRouter : courseRouter
}