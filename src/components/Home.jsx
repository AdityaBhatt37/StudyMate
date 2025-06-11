import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle, FaUsers, FaLightbulb, FaGraduationCap } from "react-icons/fa";
import image from '../assets/home.png'
import Browse from "./Browse"; // ✅ Imported Browse component

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3a43e2] to-[#c85a1b] text-white font-sans">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen px-10">
        <motion.div
          className="max-w-7xl text-white flex flex-col md:flex-row items-center gap-10 p-6   **:*:"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight mt-15"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Welcome to <span className="text-yellow-300">StudyMate</span>
            </motion.h1>
            <motion.p
              className="text-l mb-8 max-w-xl mx-auto"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Unlock your potential with StudyMate! Track your learning journey, access personalized content, and achieve your academic goals with ease.
            </motion.p>
            <motion.a
              href="#get-started"
              className="inline-flex items-center gap-2 px-7 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started <FaArrowRight />
            </motion.a>
          </div>

          {/* Right 3D Model */}
          <motion.div
            className="flex-1"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
           <img src={image} alt="" />
          </motion.div>
        </motion.div>
      </div>

      {/* ✅ Browse Component (Replaces Search Bar) */}
      <div className="bg-white text-black py-10">
        <Browse />
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white text-gray-800">
        <div className="text-center ">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Why Choose StudyMate?
          </motion.h2>
          <motion.p
            className="text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            StudyMate is designed to maximize your learning experience with personalized features and resources to help you excel in your studies.
          </motion.p>
        </div>
        <div className="flex flex-wrap justify-center  p-4">
          {[
            {
              icon: <FaCheckCircle size={40} className="text-black" />,
              title: "Personalized Roadmap",
              desc: "Receive a custom-tailored learning plan that adapts to your progress and goals.",
            },
            {
              icon: <FaUsers size={40} className="text-black" />,
              title: "Community Support",
              desc: "Join a vibrant community of learners where you can share knowledge, ask questions, and grow together.",
            },
            {
              icon: <FaLightbulb size={40} className="text-black" />,
              title: "Curated Resources",
              desc: "Access a library of high-quality resources to master topics quickly.",
            },
            
          ].map((item, index) => (
            <motion.div
              key={index}
              className="max-w-xs text-center p-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
            >
              <div className="bg-yellow-400 p-6 rounded-full mb-6 inline-block">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-lg">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gradient-to-br from-[#415aff] to-[#FF4B2B] text-white">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            className="text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Hear from learners who’ve achieved success with StudyMate.
          </motion.p>
        </div>
        <div className="flex flex-wrap justify-center gap-12">
          {[
            {
              quote: `"StudyMate helped me stay on track with my studies and provided valuable resources I couldn't find elsewhere."`,
              name: "John Doe",
              role: "Software Developer",
            },
            {
              quote: `"The personalized roadmap is a game changer! I now know exactly what to study and when to study it."`,
              name: "Jane Smith",
              role: "Data Scientist",
            },
          ].map((user, index) => (
            <motion.div
              key={index}
              className="max-w-sm text-center bg-white text-gray-800 p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
            >
              <p className="text-lg mb-4">{user.quote}</p>
              <h4 className="text-xl font-semibold">{user.name}</h4>
              <p className="text-gray-600">{user.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

     
    </div>
  );
};

export default Home;
