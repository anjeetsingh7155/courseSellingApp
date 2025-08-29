# 📚 Course Selling App  

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)  
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)  
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)  
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)  

A **full-stack course selling platform** that allows **instructors to create and sell courses** while **students can browse and purchase them**. Built with **Node.js, Express, MongoDB**, and tested using **Postman**.  

---

## ✅ Features  

- 🔐 **JWT Authentication & Authorization**  
- 🔑 **Secure Password Hashing** with **bcrypt**  
- 👨‍🏫 **Instructor Role**: Add & manage courses  
- 🎓 **Student Role**: Browse & purchase courses  
- ✅ **Data Validation** using **Zod**  
- 🌍 **CORS-enabled** for API access  
- 📂 **MongoDB Database Integration**  
- 🔄 **Auto-reload** with **Nodemon** during development  

---

## 🛠 Tech Stack  

| Category     | Technology |
|-------------|------------|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Frontend (Planned)** | React.js |
| **Authentication** | JWT |
| **Validation** | Zod |
| **Testing** | Postman |

---

## ⚙️ Installation & Setup  

1. **Clone the repository**
   ```bash
   git clone https://github.com/anjeetsingh7155/courseSellingApp.git
   cd courseSellingApp


## Setup environment variables
2. **Create a .env file in the root directory:**

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
