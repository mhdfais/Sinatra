
export default function OurApproach() {
  return (
    <section className="relative w-full h-screen bg-black text-white py-10 px-6 md:px-20 lg:px-32 z-10">
      {/* Section Title */}
      <h2 className="text-5xl font-semibold mb-20">Our Approach</h2>

      {/* 2 × 2 GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-5 max-w-5xl">
        {/* --- CARD 1 --- */}
        <div></div>
        <div>
          <h3 className="text-2xl font-medium leading-snug">
            Long-term <br /> orientation
          </h3>

          <p className="mt-4 text-gray-300 text-sm leading-relaxed w-72">
            We invest for sustainable <br /> growth, not short-term <br /> wins.
          </p>

          {/* underline */}
          <div className="w-64 border-b border-gray-700 mt-5"></div>
        </div>

        {/* --- CARD 2 --- */}
        <div>
          <h3 className="text-2xl font-medium leading-snug">
            Entrepreneurial <br /> mindset
          </h3>

          <p className="mt-4 text-gray-300 text-sm leading-relaxed w-80">
            We believe in empowering founders and management teams to drive
            decisions and innovation.
          </p>

          <div className="w-64 border-b border-gray-700 mt-5"></div>
        </div>
        <div></div>

        {/* --- CARD 3 --- */}
        <div>
          <h3 className="text-2xl font-medium leading-snug">
            Value <br /> creation
          </h3>

          <p className="mt-4 text-gray-300 text-sm leading-relaxed w-80">
            Beyond financial return, we aim to deliver societal value — through
            employment, community engagement and responsible business practices.
          </p>

          <div className="w-64 border-b border-gray-700 mt-5"></div>
        </div>

        {/* --- CARD 4 --- */}
        <div>
          <h3 className="text-2xl font-medium leading-snug">
            Operational <br /> excellence
          </h3>

          <p className="mt-4 text-gray-300 text-sm leading-relaxed w-80">
            Through shared best practices, rigorous governance and scalability
            focus, we help our companies punch above their size.
          </p>

          <div className="w-64 border-b border-gray-700 mt-5"></div>
        </div>
      </div>
    </section>
  );
}
