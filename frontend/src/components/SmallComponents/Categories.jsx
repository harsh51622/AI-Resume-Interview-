export default function Categories() {
  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "HR Interview",
    "Product Manager",
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
        Interview Categories
      </h2>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {roles.map((role) => (
          <div
            key={role}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center
                       hover:border-blue-500 hover:scale-[1.04] transition duration-300 shadow-lg"
          >

            {/* Icon circle */}
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
              AI
            </div>

            {/* Role */}
            <h3 className="text-lg font-semibold text-white">
              {role}
            </h3>

            {/* small text */}
            <p className="text-gray-400 text-sm mt-2">
              Practice real interview questions for {role}.
            </p>

          </div>
        ))}

      </div>
    </section>
  );
}