import { FaSearch } from "react-icons/fa";
import VoiceSearch from "./VoiceSearch";

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

      

<div className="mx-auto mt-8 flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg">
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search events, locations..."
    className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-gray-700 outline-none"
  />

  <VoiceSearch onSearch={setSearch} />
</div>

      </div>
    </section>
  );
}

export default Hero;