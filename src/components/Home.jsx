import { useState } from "react";

import Navbar from "./Navbar";
import Hero from "./Hero";
import CategoryFilter from "./CategoryFilter";
import EventCard from "./EventCard";
import Footer from "./Footer";

import events from "../data/events";

function Home() {

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (event) => {

    setFavorites((previous) => {

      const alreadyFavorite = previous.some(
        (item) => item.id === event.id
      );

      if (alreadyFavorite) {
        return previous.filter(
          (item) => item.id !== event.id
        );
      }

      return [...previous, event];

    });
  };

  const filteredEvents = events.filter((event) => {

    const searchText = search.toLowerCase();

     const matchesSearch =
      event.title.toLowerCase().includes(searchText) ||
      event.location.toLowerCase().includes(searchText) ||
      event.category.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "All" ||
      event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <Hero
        search={search}
        setSearch={setSearch}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main
        id="events"
        className="py-14 sm:py-16"
      >

        <div className="mx-auto w-[90%] max-w-[1200px]">

          <div className="mb-8 flex items-end justify-between">

            <div>

              <span className="text-[11px] font-extrabold tracking-[2px] text-indigo-600">
                UPCOMING EVENTS
              </span>

              <h2 className="mt-2 text-2xl font-extrabold text-slate-800 sm:text-3xl">
                Events You May Like
              </h2>

            </div>

            <span className="text-sm text-slate-400">
              {filteredEvents.length} Events
            </span>

          </div>

          {filteredEvents.length > 0 ? (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {filteredEvents.map((event) => (

                <EventCard
                  key={event.id}
                  event={event}
                  onFavorite={toggleFavorite}
                  isFavorite={favorites.some(
                    (item) => item.id === event.id
                  )}
                />

              ))}

            </div>

          ) : (

            <div className="rounded-2xl bg-white py-20 text-center shadow-sm">

              <h3 className="text-xl font-bold text-slate-800">
                No events found
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Try another search or category.
              </p>

            </div>

          )}

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Home;