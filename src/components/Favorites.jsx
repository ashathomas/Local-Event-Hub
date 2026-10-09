import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";

function Favorites() {

  const [favorites, setFavorites] =
    useState([]);

  useEffect(() => {

    const savedFavorites =
      localStorage.getItem("favorites");

    if (savedFavorites) {

      setFavorites(
        JSON.parse(savedFavorites)
      );

    }

  }, []);

  const removeFavorite = (event) => {

    const updatedFavorites =
      favorites.filter(
        (item) => item.id !== event.id
      );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

  };

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      {/* Header */}

      <section className="bg-indigo-600 py-16 text-white">

        <div className="mx-auto w-[90%] max-w-[1200px]">

          <p className="text-xs font-bold tracking-[2px] text-indigo-200">
            YOUR COLLECTION
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            Favorite Events
          </h1>

          <p className="mt-3 text-sm text-indigo-100">
            Events you saved for later.
          </p>

        </div>

      </section>

      {/* Content */}

      <main className="py-14">

        <div className="mx-auto w-[90%] max-w-[1200px]">

          {favorites.length > 0 ? (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {favorites.map((event) => (

                <EventCard
                  key={event.id}
                  event={event}
                  onFavorite={removeFavorite}
                  isFavorite={true}
                  onView={() => {}}
                />

              ))}

            </div>

          ) : (

            <div className="rounded-2xl bg-white px-6 py-20 text-center shadow-sm">

              <div className="text-5xl">
                ❤️
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-800">
                No Favorite Events
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
                Save your favorite events and
                they will appear here.
              </p>

            </div>

          )}

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Favorites;