export default function Categories() {
  const roles = [
    {
      title: "Frontend Developer",
      desc: "React, UI, JavaScript interviews",
    },
    {
      title: "Backend Developer",
      desc: "APIs, databases, system design",
    },
    {
      title: "Full Stack Developer",
      desc: "End-to-end development skills",
    },
    {
      title: "Data Analyst",
      desc: "Data, SQL, analytics questions",
    },
    {
      title: "HR Interview",
      desc: "Behavioral & personality rounds",
    },
    {
      title: "Product Manager",
      desc: "Strategy, product thinking",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
        Pick Your Interview Path
      </h2>

      {/* Vertical Stack Showcase */}
      <div className="space-y-6">

        {roles.map((role, index) => (
          <div
            key={role.title}
            className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6
                       flex items-center justify-between hover:border-blue-500
                       transition duration-300"
          >

            {/* Left */}
            <div>
              <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition">
                {role.title}
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                {role.desc}
              </p>
            </div>

            {/* Right arrow style */}
            <div className="text-blue-500 text-2xl group-hover:translate-x-2 transition">
              →
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}