import React, { useState, useEffect } from "react";
import { fetchQuestionsBySubject, submitQuizWithAnswers } from "../Utils/firebase";

const Quiz = ({ selectedSubject, user }) => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      setError("");
      setQuestions([]);
      setUserAnswers({});
      setScore(null);

      if (!selectedSubject || selectedSubject.trim() === "") {
        setError("No subject selected!");
        setLoading(false);
        return;
      }

      try {
        const questionsData = await fetchQuestionsBySubject(selectedSubject);
        if (!questionsData || questionsData.length === 0) {
          setError("No quizzes found for this subject.");
        } else {
          setQuestions(questionsData);
        }
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load quizzes.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [selectedSubject]);

  const handleOptionSelect = (questionIndex, selectedOption) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    let totalCorrect = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        totalCorrect++;
      }
    });

    setScore(totalCorrect);

    if (user && user.uid) {
      submitQuizWithAnswers(user.uid, selectedSubject, totalCorrect, questions.length);
    }
  };

  if (loading)
    return <p className="text-center text-blue-500 font-medium animate-pulse">Loading quizzes...</p>;

  if (error)
    return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border border-indigo-100 transition-all duration-500">
      <h2 className="text-3xl font-bold text-indigo-700 text-center mb-8">
        {selectedSubject} Quiz
      </h2>

      <div className="space-y-6">
        {questions.map((quiz, index) => (
          <div
            key={index}
            className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 hover:shadow-lg transition-all"
          >
            <p className="font-medium text-lg text-gray-800 mb-4">
              Q{index + 1}: {quiz.question}
            </p>
            <ul className="space-y-2">
              {quiz.options.map((option, idx) => (
                <li key={idx}>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={userAnswers[index] === option}
                      onChange={() => handleOptionSelect(index, option)}
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {score === null ? (
        <button
          onClick={handleSubmit}
          className="mt-10 block mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-transform hover:scale-105"
        >
          Submit Quiz
        </button>
      ) : (
        <p className="text-center text-2xl font-bold text-green-600 mt-10">
          🎉 You scored {score} out of {questions.length}
        </p>
      )}
    </div>
  );
};

export default Quiz;
