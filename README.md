# 📚 Study Mate – A Learning Platform

**Study Mate** is a modern, AI-integrated web application that helps students find the most relevant and highly-rated learning resources from platforms like **YouTube**, **Coursera**, and **Udemy**. With features like smart search (powered by Gemini AI), personalized progress tracking, and real-time feedback, Study Mate redefines how students discover and manage online education content.

---

## 🚀 Features

- 🔍 **AI-Powered Smart Search** using Gemini API  
- 🎥 **YouTube Video Integration** using YouTube Data API  
- 🎓 **Courses from Coursera & Udemy** with offline fallback  
- 🔐 **User Authentication** via Firebase Auth  
- ❤️ **Like/Dislike Feedback System** with real-time updates (Redux + Firestore)  
- 📈 **Progress Tracking** with dynamic progress bars  
- 🧠 **Personalized Search History & Recommendations**  
- 🌐 **Single Page Application (SPA)** with blazing speed (Vite)  
- 🎨 **Tailwind CSS** for beautiful and responsive UI  
- 🌍 **Deployed on Firebase Hosting**  

---

## 🛠️ Tech Stack

| Category        | Technology                      |
| --------------- | -------------------------------|
| Frontend        | React, Vite, Tailwind CSS      |
| State Management| Redux Toolkit                  |
| AI Integration  | Google Gemini API              |
| Video Fetching  | YouTube Data API              |
| Backend        | Firebase (Auth + Firestore + Hosting) |
| Version Control | Git & GitHub                  |
| Deployment     | Firebase Hosting              |

---

## 📂 Folder Structure

StudyMate/
├── public/
├── src/
│ ├── assets/ # Images, Icons, etc.
│ ├── components/ # UI Components (Navbar, Quiz, ProgressBar)
│ ├── pages/ # Home, Login, Dashboard, etc.
│ ├── Utils/ # API Helpers, Redux Slices
│ └── App.jsx # Root component
├── .gitignore
├── firebase.json
├── package.json
└── vite.config.js


---

## 🔒 Firebase Integration

- **Authentication:** Email/Password sign-up & login  
- **Firestore Database:**  
  - YouTube Courses Table  
  - Coursera & Udemy Courses Table  
  - Likes/Dislikes  
  - Progress per user  
  - Fallback cache if APIs fail  

---

## 🎮 How to Run Locally

```bash
git clone https://github.com/AdityaBhatt37/StudyMate
cd study-mate
npm install
npm run dev
