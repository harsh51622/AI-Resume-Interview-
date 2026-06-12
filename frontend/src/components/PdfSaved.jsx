import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function PdfSaved() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const saveData = async () => {
        if (!file) {
            alert("Please select a PDF file.");
            return;
        }

        const formData = new FormData();
        formData.append("resumes_file", file);

        try {
            setLoading(true);

            // Upload Resume
            const response = await API.post(
                "/resumes/upload/",
                formData
            );
            const resumeId = response.data.resume.id;

            // Start Interview
            const sessionResponse = await API.post(
                "/interview/start/",
                {
                    resume_id: resumeId,
                }
            );

            const sessionId = sessionResponse.data.session_id;

            localStorage.setItem("session_id", sessionId);

            alert("Resume Analysis Completed. Interview Starting...");

            navigate("/interview");

        } catch (error) {
            console.error(error);
            alert(
                error?.response?.data?.detail ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">

        {/* HERO SECTION WRAPPER */}
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 items-center">

            {/* LEFT HERO CONTENT */}
            <div className="text-center md:text-left">

                <h1 className="text-5xl font-extrabold text-white leading-tight">
                    AI Interview <span className="text-blue-500">Simulator</span>
                </h1>

                <p className="text-gray-400 mt-4 text-lg">
                    Upload your resume and instantly generate AI-powered interview questions,
                    personalized feedback, and performance insights.
                </p>

                <div className="mt-6 space-y-2 text-gray-500 text-sm">
                    <p>✔ Smart resume analysis</p>
                    <p>✔ AI-generated interview questions</p>
                    <p>✔ Performance scoring system</p>
                </div>

            </div>

            {/* RIGHT CARD */}
            <div className="w-full bg-gray-900 shadow-2xl rounded-2xl p-8 border border-gray-800">

                <h1 className="text-3xl font-bold text-center text-white">
                    AI Interview Simulator
                </h1>

                <p className="text-center text-gray-400 mt-2 mb-6">
                    Upload your resume and generate interview questions
                </p>

                <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center">

                    <input
                        type="file"
                        accept=".pdf"
                        onClick={(e) => {
                            const token = localStorage.getItem("access");

                            if (!token) {
                                e.preventDefault();
                                navigate("/login");
                            }
                        }}
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full text-sm text-gray-300"
                    />

                    {file && (
                        <p className="mt-3 text-green-400 text-sm font-medium">
                            {file.name}
                        </p>
                    )}
                </div>

                <button
                    onClick={() => {
                        const token = localStorage.getItem("access");

                        if (!token) {
                            alert("Please login first");
                            navigate("/login");
                            return;
                        }

                        saveData();
                    }}
                    disabled={loading}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:bg-gray-700 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                    {loading ? "Uploading..." : "Upload Resume"}
                </button>

            </div>
        </div>
    </div>
);}