import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl">

        <h2 className="text-4xl font-bold">
          Ready To Ace Your Interview?
        </h2>

        <p className="mt-4 text-white/80">
          Upload your resume and start practicing now.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-white text-black px-6 py-3 rounded-xl mt-6 font-semibold hover:bg-gray-200 transition"
        >
          Start Free
        </button>

      </div>

    </section>
  );
}