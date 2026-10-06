import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Favorites() {

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <section className="bg-indigo-600 py-16 text-white">

        <div className="mx-auto w-[90%] max-w-[1200px]">

          <p className="text-xs font-bold tracking-[2px] text-indigo-200">
            YOUR COLLECTION
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            Favorite Events
          </h1>

          <p className="mt-3 text-sm text-indigo-100">
            Events you have saved for later.
          </p>

        </div>

      </section>

      <main className="mx-auto w-[90%] max-w-[1200px] py-20">

        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

          <div className="text-5xl">
            ❤️
          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-800">
            Your Favorite Events
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
            Your favorite events will appear here.
          </p>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Favorites;