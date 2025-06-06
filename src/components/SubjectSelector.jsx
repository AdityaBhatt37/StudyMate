import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Quiz from "./Quiz";

const subjects = [
  "HTML", "CSS", "JavaScript", "Python", "Java", "CLanguage", "C++"
];

const SubjectSelector = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-sky-100 to-indigo-200 flex flex-col items-center justify-start p-8">
      
      <motion.h1
        className="text-4xl font-bold mb-8 text-gray-800 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🚀 Select a Subject to Start Quiz
      </motion.h1>

      {/* Subject Buttons Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {subjects.map((subject) => (
          <motion.button
            key={subject}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-xl shadow-lg text-white font-semibold transition-all ${
              selectedSubject === subject
                ? "bg-indigo-600"
                : "bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
            }`}
            onClick={() => setSelectedSubject(subject)}
          >
            {subject}
          </motion.button>
        ))}
      </motion.div>

      {/* Quiz Display Area */}
      <div className="w-full max-w-3xl min-h-[350px]">
        <AnimatePresence mode="wait">
          {selectedSubject && (
            <motion.div
              key={selectedSubject}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <Quiz selectedSubject={selectedSubject} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SubjectSelector;
