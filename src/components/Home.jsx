import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle, FaUsers, FaLightbulb, FaGraduationCap, FaBrain } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF6A13] to-[#FF8C00] text-white font-sans">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen px-6">
        <motion.div
          className="max-w-5xl text-white flex flex-col md:flex-row items-center gap-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Welcome to <span className="text-yellow-300">StudyMate</span>
            </motion.h1>
            <motion.p
              className="text-xl mb-8 max-w-xl mx-auto"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Unlock your potential with StudyMate! Track your learning journey, access personalized content, and achieve your academic goals with ease.
            </motion.p>
            <motion.a
              href="#get-started"
              className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started <FaArrowRight />
            </motion.a>
          </div>

          {/* Right Illustration */}
          <motion.div
            className="flex-1"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <img
              src="src/components/20250510_1345_AI and React Synergy_simple_compose_01jtwm3pkyfr7sm8xsd56q782f.png"
              alt="StudyMate Hero"
              className="w-full max-w-md"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-100 text-gray-800">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Why Choose StudyMate?
          </motion.h2>
          <motion.p
            className="text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            StudyMate is designed to maximize your learning experience with personalized features and resources to help you excel in your studies.
          </motion.p>
        </div>
        <div className="flex flex-wrap justify-center gap-12">
          <motion.div
            className="max-w-xs text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="bg-yellow-400 p-6 rounded-full mb-6 inline-block">
              <FaCheckCircle size={40} className="text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Personalized Roadmap</h3>
            <p className="text-lg">Receive a custom-tailored learning plan that adapts to your progress and goals.</p>
          </motion.div>

          <motion.div
            className="max-w-xs text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="bg-yellow-400 p-6 rounded-full mb-6 inline-block">
              <FaUsers size={40} className="text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Community Support</h3>
            <p className="text-lg">Join a vibrant community of learners where you can share knowledge, ask questions, and grow together.</p>
          </motion.div>

          <motion.div
            className="max-w-xs text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="bg-yellow-400 p-6 rounded-full mb-6 inline-block">
              <FaLightbulb size={40} className="text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Curated Learning Resources</h3>
            <p className="text-lg">Access a library of high-quality resources that will accelerate your learning and help you master topics quickly.</p>
          </motion.div>

          <motion.div
            className="max-w-xs text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="bg-yellow-400 p-6 rounded-full mb-6 inline-block">
              <FaGraduationCap size={40} className="text-black" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Skill Tracking</h3>
            <p className="text-lg">Track your progress across multiple topics, ensuring you stay on course towards your academic goals.</p>
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gradient-to-br from-[#FF416C] to-[#FF4B2B] text-white">
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
            Hear from our users who have achieved their learning goals with the help of StudyMate.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-12">
          <motion.div
            className="max-w-sm text-center bg-white text-gray-800 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-lg mb-4">"StudyMate helped me stay on track with my studies and provided valuable resources that I couldn't find elsewhere."</p>
            <h4 className="text-xl font-semibold">John Doe</h4>
            <p className="text-gray-600">Software Developer</p>
          </motion.div>

          <motion.div
            className="max-w-sm text-center bg-white text-gray-800 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="text-lg mb-4">"The personalized roadmap is a game changer! I now know exactly what to study and when to study it."</p>
            <h4 className="text-xl font-semibold">Jane Smith</h4>
            <p className="text-gray-600">Data Scientist</p>
          </motion.div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-yellow-300 text-black text-center h-70">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Ready to Master Your Learning Journey?
        </motion.h2>
        <motion.a
          href="#get-started"
          className="inline-flex items-center gap-2 px-8 py-3 bg-black text-yellow-300 font-semibold rounded-full hover:bg-gray-800 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started Now <FaArrowRight />
        </motion.a>
      </div>
    </div>
  );
};

export default Home;
