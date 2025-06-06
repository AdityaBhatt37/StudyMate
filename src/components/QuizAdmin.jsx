import React, { useState } from "react";
import { db } from "../Utils/firebase";
import { doc, collection, addDoc } from "firebase/firestore";

const QuizAdmin = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !subject) {
      setMessage("Please select a subject and a file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const rawData = JSON.parse(e.target.result);

        const subjectRef = doc(db, "quizzes", subject);
        const questionsRef = collection(subjectRef, "questions");

        for (const question of rawData) {
          await addDoc(questionsRef, question);
        }

        setMessage("Quiz uploaded successfully!");
      } catch (err) {
        console.error("Upload error:", err);
        setMessage("Failed to upload quiz.");
      }
    };

    reader.readAsText(selectedFile);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Admin: Upload Quiz</h2>

      <input
        type="text"
        placeholder="Enter Subject Name (e.g. HTML)"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <input type="file" accept=".json" onChange={handleFileChange} className="mb-4" />

      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Upload Quiz
      </button>

      {message && <p className="text-center text-sm mt-4 text-gray-700">{message}</p>}
    </div>
  );
};

export default QuizAdmin;
