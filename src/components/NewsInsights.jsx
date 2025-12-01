export default function NewsInsights() {
  return (
    <section className="w-full h-screen bg-black text-white  pb-8 px-25 ">
      {/* Section Title */}
      <h2 className="text-4xl font-semibold mb-8">
        News & Insights
      </h2>

      {/* Grid Wrapper */}
      <div className="
        grid grid-cols-1 md:grid-cols-3 
        border border-white/10 
        divide-y md:divide-y-0 md:divide-x divide-white/10
      ">
        
        {/* --- CARD 1 --- */}
        <NewsCard
          tag="PRESS RELEASE"
          title="Alesayi Ventures Expands Green Technology Portfolio with $50M..."
          date="March 15,2025"
        />

        {/* --- CARD 2 --- */}
        <NewsCard
          tag="PARTNERSHIP"
          title="Strategic Alliance with Leading European Tech Innovators"
          date="March 15,2025"
        />

        {/* --- CARD 3 --- */}
        <NewsCard
          tag="SUSTAINABILITY"
          title="Annual Sustainability Report: Carbon Reduction Achievements"
          date="March 15,2025"
        />

        {/* --- CARD 4 --- */}
        <NewsCard
          tag="PRESS RELEASE"
          title="Opening New Regional Headquarters in Singapore"
          date="March 15,2025"
        />

        {/* --- CARD 5 --- */}
        <NewsCard
          tag="PRESS RELEASE"
          title="Alesayi Ventures Expands Green Technology Portfolio with $50M..."
          date="March 15,2025"
        />

        {/* --- VIEW ALL CARD (No border inside, plain centered) --- */}
        <div className="flex flex-col items-center justify-center p-10 text-center">
          <p className="text-lg mb-6 opacity-90">All the latest news</p>
          <button className="
            bg-white text-black 
            px-6 py-2 rounded 
            font-semibold text-sm
          ">
            View All
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Card Component ---------------------------- */
function NewsCard({ tag, title, date }) {
  return (
    <div className="p-8 flex flex-col justify-between border-b">
      <div>
        {/* Tag */}
        <span className="
          text-[0.6rem]  
          px-3 py-[3px] 
          rounded-sm 
          bg-[#272727]
        ">
          {tag}
        </span>

        {/* Title */}
        <h3 className="mt-3 font-semibold ">
          {title}
        </h3>

        {/* Date */}
        <p className="text-xs mt-4 opacity-70">{date}</p>
      </div>

      {/* Read More button */}
      <button className="
        mt-3 bg-white text-black 
        w-full py-2 rounded 
        font-semibold text-sm
      ">
        Read More
      </button>
    </div>
  );
}
