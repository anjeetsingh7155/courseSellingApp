const { Router } = require("express");
const adminRouter = Router();

adminRouter.post("/signup", (req, res) => {
res.json({
    message : 'this is a admin signUp End point'
})
});

adminRouter.post("/login", (req, res) => {
    res.json({
    message : 'this is a admin login End point'
})
});

adminRouter.post("/addCourses", (req, res) => {
    res.json({
    message : 'this is a admin addCourses End point'
})
});

adminRouter.put('/editCourse',(req,res)=>{
res.json({
    message : 'this is edit course end point '
})
})

adminRouter.get('/getCourse',(req,res)=>{
res.json({
    message : 'this is get course end point '
})
})

module.exports = {
  adminRouter: adminRouter,
};
