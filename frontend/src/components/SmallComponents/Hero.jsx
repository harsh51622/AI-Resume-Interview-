import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const saveData = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resumes_file", file);

      const res = await axios.post(
        "http://localhost:8000/api/resumes/upload/",
        formData
      );

      const resumeId = res.data.resume.id;

      const session = await axios.post(
        "http://localhost:8000/api/interview/start/",
        {
          resume_id: resumeId,
        }
      );

      localStorage.setItem("session_id", session.data.session_id);

      navigate("/interview");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-[90vh] flex items-center justify-center px-4 relative bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/bg.jpg')",
      }}
    >

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* glowing blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/20 blur-[120px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-3xl text-center text-white">

        {/* badge */}
        <span className="bg-white/10 border border-white/20 text-blue-300 px-4 py-1 rounded-full text-sm backdrop-blur-md">
          AI Powered Interview Platform
        </span>

        {/* heading */}
        <h1 className="text-5xl md:text-6xl font-bold mt-6 leading-tight">
          Ace Interviews
        </h1>

        {/* sub text */}
        <p className="text-gray-300 mt-5 text-lg max-w-xl mx-auto">
          Upload your resume, get AI-generated questions, and practice real interview experience instantly.
        </p>

        {/* upload card */}
        <div className="mt-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">

          <div className="border-2 border-dashed border-white/20 rounded-2xl p-6 hover:border-blue-500 transition">

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm text-gray-300"
            />

            {file && (
              <p className="text-green-400 mt-3 text-sm">
                ✓ {file.name}
              </p>
            )}

          </div>

          <button
            onClick={saveData}
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-3 rounded-2xl font-semibold shadow-lg transition"
          >
            {loading ? "Analyzing Resume..." : "Upload & Start Interview"}
          </button>

          {/* small hint */}
          <p className="text-gray-400 text-xs mt-4">
            Your resume is securely processed and not shared.
          </p>

        </div>

      </div>
    </section>
  );
}