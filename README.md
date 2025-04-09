# 📚 StudyNotion - An Ed-Tech Platform

StudyNotion is a fully functional and production-ready Ed-Tech platform built with the MERN stack. It empowers students to learn through curated courses and enables instructors to share their expertise with a global audience. The platform also includes an admin panel for managing courses, users, and analytics.

!StudyNotion HomePage [image](https://github.com/user-attachments/assets/d59d53ad-aa0b-4ed9-994b-0892978201e3)


---

## 🚀 Features

### 👨‍🎓 For Students
- Browse and enroll in high-quality courses
- Add courses to wishlist and cart
- Secure payments via Razorpay
- Watch course videos and read materials in Markdown
- Rate and review courses
- View and update profile details

### 🧑‍🏫 For Instructors
- Instructor dashboard with insights and feedback
- Create, edit, and delete courses with media support
- Manage course pricing, content, and curriculum
- Access profile and performance analytics

### 🛠️ For Admins (Future Scope)
- View platform-wide metrics
- Manage instructors and users
- Oversee course content and platform performance

---

## 🧱 Tech Stack

### 💻 Front-End
- ReactJS
- Redux (for state management)
- TailwindCSS
- Figma (for UI/UX design)
- Axios, Formik, React Router

### 🌐 Back-End
- Node.js + Express.js
- MongoDB + Mongoose
- JWT & Bcrypt for Authentication
- Cloudinary for media storage
- Razorpay integration for payments

### ☁️ Deployment [Not donr Yet]
- Front-End: [Vercel](https://vercel.com/)
- Back-End: [Render](https://render.com/) or [Railway](https://railway.app/)
- Database: [MongoDB Atlas](https://www.mongodb.com/atlas)
- Media Hosting: [Cloudinary](https://cloudinary.com/)

---

## 📦 API Overview

The API follows REST principles with full CRUD functionality. Some key endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/auth/signup | Register new users |
| POST   | /api/auth/login | Login users and return JWT |
| POST   | /api/auth/verify-otp | Verify OTP |
| GET    | /api/courses | Fetch all courses |
| POST   | /api/courses | Create new course (Instructor only) |
| PUT    | /api/courses/:id | Update course |
| DELETE | /api/courses/:id | Delete course |
| POST   | /api/courses/:id/rate | Rate a course |

---

## 🧪 Testing

- Manual testing of all critical flows (signup/login, checkout, course view)
- Functional and UI testing on multiple devices
- Tools: Postman, Chrome DevTools

---

## 🔮 Future Enhancements

- 🔔 Gamification (badges, points, leaderboards)
- 🎯 Personalized learning paths
- 🤝 Social learning (group chats, peer reviews)
- 📱 Native mobile app (React Native or Flutter)
- 🤖 ML-powered course recommendations
- 🕶️ VR/AR integration for immersive learning

---

## ⚙️ Setup & Installation

```bash
# Clone the repository
git clone https://github.com/your-username/StudyNotion.git

# Navigate into the project directory
cd StudyNotion

# Install dependencies for both client and server
npm install           # For backend
cd client && npm install   # For frontend

# Create environment variables (.env)
# Refer to .env.example for guidance

# Run the application
npm run dev           # Concurrently runs client and server
=======
# React & Tailwind CSS Starter Pack

This is a starter pack for creating React projects with Tailwind CSS configured. It uses React version **18.2** and Tailwind CSS version **3.2**.

## Usage

This starter pack includes a basic setup for using **Tailwind CSS with React**. To start building your own components and styles, follow these steps:

1. Clone the repository to your local machine.
    ```sh
    git clone 
    ```

1. Install the required packages.
    ```sh
    cd react-tailwind-css-starter-pack
    npm install
    ```

1. Start the development server.
    ```sh
    npm start
    ```
1. Open the project in your browser at [`http://localhost:3000`](http://localhost:3000) to view your project.
1. Create your React components and add your styles using Tailwind classes. You can also create new CSS files and import them into your components.

The project is set up to use `postcss-cli` to process your CSS files. You can add your own `tailwind.config.js` file to customize your Tailwind setup.

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, please feel free to open an issue or a pull request.
>>>>>>> 4028ad9 (Initial Commit)
