import { FaSearch } from "react-icons/fa";

function Hero({ search, setSearch }) {
  return (
    <section
      id="home"
      className="relative flex min-h-[500px] items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80')",
      }}
    >

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-indigo-950/80 to-slate-950/40"></div>

      <div className="relative z-10 mx-auto w-[90%] max-w-[1200px] text-white">

        <p className="mb-4 text-xs font-bold tracking-[3px] text-indigo-300">
          DISCOVER • CONNECT • EXPERIENCE
        </p>

        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          Discover Amazing
          <br />
          <span className="text-indigo-300">
            Events Near You
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
          Find exciting events, workshops, concerts,
          sports, and community activities happening
          around you.
        </p>

        <div className="mt-8 flex h-14 w-full max-w-[620px] items-center overflow-hidden rounded-full bg-white pl-5 shadow-xl">

          <FaSearch className="shrink-0 text-slate-400" />

          <input
            type="text"
            placeholder="Search events, locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-full min-w-0 flex-1 border-0 px-4 text-sm text-slate-700 outline-none"
          />

          <button className="mr-1.5 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white">
            Search
          </button>

        </div>

      </div>
    </section>
  );
}

export default Hero;