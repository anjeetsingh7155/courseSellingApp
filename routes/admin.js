const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminAuth, jwt_adminPass } = require("../middlewares/adminAuth");

adminRouter.post("/signup", async (req, res) => {
  try {
    const safetyCheck = z.object({
      email: z.string().email(),
      password: z.string().min(3).max(10).startsWith("azn"),
      adminName: z.string(),
      mobileNo: z.number(),
    });

    const safeObject = await safetyCheck.safeParse(req.body);
    if (!safeObject.success) {
      return res.json({
        message: "Wrong Credential",
        error: safeObject.error,
      });
    }

    const { adminName, email, password, mobileNo } = safeObject.data;
    const bcryptPassword = await bcrypt.hash(password, 10);

    await adminModel.create({
      adminName: adminName,
      email: email,
      password: bcryptPassword,
      mobileNo: mobileNo,
    });

    res.json({ message: "Signup successful" });
  } catch (e) {
    res.json({ Error: `An error occured:${e.message}` });
  }
});

adminRouter.post("/login", async (req, res) => {
  try {
    const { adminName, password, email } = req.body;

    const admin = await adminModel.findOne({
      adminName: adminName,
      email: email,
    });

    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    console.log(admin._id);
    const token = jwt.sign(
      {
        adminName: admin.adminName,
        id: admin._id, // Ensure `id` is included
      },
      jwt_adminPass
    );

    res.json({
      token: token,
    });
  } catch (e) {
    res.status(500).json({ message: `An error occurred: ${e.message}` });
  }
});

adminRouter.post("/addCourses", adminAuth, async (req, res) => {
  const  adminName = req.adminName;
  const creatorID = req.adminID;
  const { title, description, price, url } = req.body;
const course =   await courseModel.create({
    creatorID: creatorID,
    title: title,
    description: description,
    price: price,
    url: url,
  });
res.json({
  message: "course Created",
  courseId : course._id
})
  
});

adminRouter.put("/editCourse", adminAuth, async (req, res) => {
  const adminName = req.adminName;
  const creatorID = req.adminID;
  const { title, description, price, url, courseId } = req.body;

  try {
    const updatedCourse = await courseModel.findOneAndUpdate(
      { creatorID: creatorID, _id: courseId }, // Correct filter
      {
        title: title,
        description: description,
        price: price,
        url: url,
      },
      { new: true } 
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found or not authorized" });
    }

    res.json({
      message: "Course updated successfully",
    });
  } catch (e) {
    res.status(500).json({ message: `An error occurred: ${e.message}` });
  }
});

adminRouter.get("/getCourse", adminAuth, async (req, res) => {
  const creatorID = req.adminID;

  try {
    const courses = await courseModel.find({ creatorID: creatorID });
    res.json({
      message: "Courses fetched successfully",
      courses: courses,
    });
  } catch (e) {
    res.status(500).json({ message: `An error occurred: ${e.message}` });
  }
});

module.exports = {
  adminRouter: adminRouter,
};
