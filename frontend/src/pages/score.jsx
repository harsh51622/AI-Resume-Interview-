import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Result() {
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const sessionId = localStorage.getItem("session_id");

        console.log("SESSION ID:", sessionId);

        if (!sessionId) {
            setError("Session ID not found.");
            return;
        }

        axios
            .post("/reports/evaluate/", {
                session_id: sessionId,
            })
            .then((res) => {
                console.log("REPORT:", res.data);
                setResult(res.data);
            })
            .catch((err) => {
                console.log(err);
                setError("Failed to generate report.");
            });
    }, []);

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-950">
                <h1 className="text-red-500 text-2xl font-bold">
                    {error}
                </h1>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-950">
                <h1 className="text-3xl font-bold animate-pulse text-gray-900 dark:text-gray-100">
                    Generating AI Report...
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold">
                        Interview Analysis Report
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        AI Powered Interview Evaluation
                    </p>
                </div>

                {/* Overall Score */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8 mb-10">
                    <h2 className="text-center text-2xl font-bold mb-6">
                        Overall Performance
                    </h2>

                    <div className="flex justify-center">
                        <div className="w-48 h-48 rounded-full border-[12px] border-green-500 flex items-center justify-center text-5xl font-bold">
                            {result.overall_score}%
                        </div>
                    </div>
                </div>

                {/* Score Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">

                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">
                        <h3 className="text-xl font-semibold">
                            Technical Score
                        </h3>
                        <p className="text-5xl font-bold mt-4 text-blue-600">
                            {result.technical_score}%
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">
                        <h3 className="text-xl font-semibold">
                            Communication
                        </h3>
                        <p className="text-5xl font-bold mt-4 text-purple-600">
                            {result.communication_score}%
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">
                        <h3 className="text-xl font-semibold">
                            Confidence
                        </h3>
                        <p className="text-5xl font-bold mt-4 text-orange-500">
                            {result.confidence_score}%
                        </p>
                    </div>

                </div>

                {/* Strengths / Weaknesses */}
                <div className="grid md:grid-cols-2 gap-6 mb-10">

                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">
                        <h3 className="text-green-600 text-2xl font-bold mb-4">
                            Strengths
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            {result.strengths}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">
                        <h3 className="text-red-500 text-2xl font-bold mb-4">
                            Areas To Improve
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            {result.weaknesses}
                        </p>
                    </div>

                </div>

                {/* AI Feedback */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-8 mb-10">
                    <h3 className="text-2xl font-bold mb-4">
                        AI Feedback
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        {result.feedback}
                    </p>
                </div>

                {/* Question Review */}
                {result.question_reviews?.length > 0 && (
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">

                        <h2 className="text-3xl font-bold mb-6">
                            Question Analysis
                        </h2>

                        <div className="space-y-6">

                            {result.question_reviews.map((item, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-5"
                                >
                                    <h3 className="font-bold text-lg mb-3">
                                        Q. {item.question}
                                    </h3>

                                    <p className="mb-2 text-gray-700 dark:text-gray-300">
                                        <strong>Your Answer:</strong>{" "}
                                        {item.user_answer}
                                    </p>

                                    <p className="mb-2 text-gray-700 dark:text-gray-300">
                                        <strong>Score:</strong>{" "}
                                        {item.score}%
                                    </p>

                                    <p className="mb-2 text-gray-700 dark:text-gray-300">
                                        <strong>Ideal Answer:</strong>{" "}
                                        {item.ideal_answer}
                                    </p>

                                    <p className="text-gray-700 dark:text-gray-300">
                                        <strong>Feedback:</strong>{" "}
                                        {item.feedback}
                                    </p>
                                </div>
                            ))}

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}