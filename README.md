📖 Church Website Backend

A secure and scalable backend API built with Node.js, Express, and MongoDB for managing sermons, events, users, and contacts of a church website. Includes authentication for admins, file uploads, and modular structure for easy maintenance.

✨ Features

🔑 JWT Authentication (Admin login & register)

🛡️ Middleware for token verification

📂 File Uploads using Multer (flyers & audio)

📖 Models for Sermon, User, Event, Contact, Admin

⚡ REST API with modular routes

💾 MongoDB Integration with Mongoose

🚀 Built with modern ES Modules

🛠️ Tech Stack

Node.js

Express.js

MongoDB

JWT Authentication

File Uploads

Password Hashing

📂 Project Structure
church-backend/
│── middlewares/
│   ├── authMiddleware.js
│   ├── upload.js
│
│── controllers/
│   ├── authController.js
│   ├── sermonController.js
│   ├── eventController.js
│   ├── userController.js
│   ├── contactController.js
│
│── models/
│   ├── Admin.js
│   ├── Sermon.js
│   ├── Event.js
│   ├── User.js
│   ├── Contact.js
│
│── routes/
│   ├── authRoutes.js
│   ├── sermonRoutes.js
│   ├── eventRoutes.js
│   ├── userRoutes.js
│   ├── contactRoutes.js
│
│── uploads/
│   ├── flyers/
│   ├── audio/
│
│── server.js
│── .env