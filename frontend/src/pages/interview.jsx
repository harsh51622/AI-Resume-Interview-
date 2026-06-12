import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function Interview({ questions, sessionId }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  const submitAnswer = async () => {
    try {
      const currentQuestion = questions[currentIndex];

      await axios.post("/interview/submit-answer/", {
        session_id: sessionId,
        question_id: currentQuestion.id,
        answer_text: answer,
      });

      setAnswer("");

      if (currentIndex === questions.length - 1) {
        await axios.post("/interview/complete/", {
          session_id: sessionId,
        });

        alert("Interview Completed! Click OK to view your score and feedback.");
        navigate("/score");

        return;
      }

      setCurrentIndex((prev) => prev + 1);
    } catch (error) {
      console.error("Submit Answer Error:", error);
      alert("Failed to submit answer.");
    }
  };
return (
  <div className="min-h-[calc(100vh-120px)] bg-gray-950 flex items-center justify-center px-4 py-0 text-gray-100">

    <div className="w-full max-w-5xl bg-gray-900 border border-gray-800 rounded-xl shadow-xl p-8 h-[calc(100vh-160px)] flex flex-col justify-between">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-xl font-bold text-white">
          AI Interview Simulator
        </h1>

        <span className="text-xs font-medium bg-gray-800 text-blue-400 px-3 py-1 rounded-full">
          Question {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 mb-4 flex-1 overflow-auto">
        <h2 className="text-lg font-medium text-gray-100">
          {questions[currentIndex]?.question_text}
        </h2>
      </div>

      {/* Answer */}
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer..."
        className="w-full h-36 bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Button */}
      <button
        onClick={submitAnswer}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
      >
        {currentIndex === questions.length - 1
          ? "Finish Test"
          : "Next Question"}
      </button>

    </div>
  </div>
);}
export default Interview;