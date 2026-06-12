export default function HowItWorks() {
  const steps = [
    "Upload your Resume in PDF format",
    "AI analyzes your skills & experience",
    "Practice personalized interview questions",
    "Get instant feedback & improve performance",
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
        How It Works
      </h2>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-blue-500 transition duration-300 hover:scale-[1.03] shadow-lg"
          >

            {/* Number */}
            <div className="text-blue-500 text-4xl font-bold">
              0{index + 1}
            </div>

            {/* Title */}
            <h3 className="mt-5 text-lg font-semibold text-white leading-snug">
              {step}
            </h3>

            {/* Small line */}
            <p className="text-gray-400 mt-3 text-sm leading-relaxed">
              Step {index + 1} of AI interview preparation process.
            </p>

          </div>
        ))}

      </div>
    </section>
  );
}