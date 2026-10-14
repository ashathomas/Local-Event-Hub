import {  useState } from "react";

import Navbar from "./Navbar";
import Hero from "./Hero";
import CategoryFilter from "./CategoryFilter";
import EventCard from "./EventCard";
import Footer from "./Footer";


import events from "../data/events";

function Home({ favorites = [], setFavorites }) {

  const [search, setSearch] = useState("");
  

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [sortOption, setSortOption] =
    useState("default");

  // const [favorites, setFavorites] =
  //   useState(() => {
  //     const savedFavorites =
  //       localStorage.getItem("favorites");

  //     return savedFavorites
  //       ? JSON.parse(savedFavorites)
  //       : [];
  //   });


  const [selectedEvent, setSelectedEvent] =
    useState(null);

  // Save favorites to localStorage

  // useEffect(() => {

  //   localStorage.setItem(
  //     "favorites",
  //     JSON.stringify(favorites)
  //   );

  // }, [favorites]);

  // Favorite function

const toggleFavorite = (event) => {
  setFavorites((previous) => {
    const exists = previous.some(
      (item) => String(item.id) === String(event.id)
    );

    return exists
      ? previous.filter(
          (item) => String(item.id) !== String(event.id)
        )
      : [...previous, event];
  });
};
  // Filter

  const filteredEvents = events
    .filter((event) => {

      const searchText =
        search.toLowerCase();

      const matchesSearch =
        event.title
          .toLowerCase()
          .includes(searchText) ||

        event.location
          .toLowerCase()
          .includes(searchText) ||

        event.category
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        selectedCategory === "All" ||
        event.category === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );

    })

    // Sort

    .sort((a, b) => {

      if (sortOption === "az") {
        return a.title.localeCompare(b.title);
      }

      if (sortOption === "za") {
        return b.title.localeCompare(a.title);
      }

      return 0;

    });

  // Clear filters

  const clearFilters = () => {

    setSearch("");
    setSelectedCategory("All");
    setSortOption("default");

  };
  const handleView = (event) => {
    setSelectedEvent(event);
  };



  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar favorites={favorites} />

      {/* Hero */}

      <Hero
        search={search}
        setSearch={setSearch}
      />

      {/* Category */}

      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Events */}

      <main
        id="events"
        className="py-14 sm:py-16"
      >

        <div className="mx-auto w-[90%] max-w-[1200px]">

          {/* Heading */}

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-[11px] font-extrabold tracking-[2px] text-indigo-600">
                UPCOMING EVENTS
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-slate-800 sm:text-3xl">
                Events You May Like
              </h2>

            </div>

            {/* Sort */}

            <select
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500"
            >

              <option value="default">
                Sort Events
              </option>

              <option value="az">
                Name A-Z
              </option>

              <option value="za">
                Name Z-A
              </option>

            </select>

          </div>

          {/* Result count */}

          <div className="mb-6 flex items-center justify-between">

            <p className="text-sm text-slate-500">

              Showing{" "}

              <span className="font-bold text-indigo-600">
                {filteredEvents.length}
              </span>

              {" "}events

            </p>

            {(search ||
              selectedCategory !== "All" ||
              sortOption !== "default") && (

                <button
                  onClick={clearFilters}
                  className="text-sm font-semibold text-red-500 hover:text-red-600"
                >
                  Clear Filters
                </button>

              )}

          </div>

          {/* Event cards */}

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
                  onView={handleView}
                />

              ))}

            </div>

          ) : (

            /* Empty State */

            <div className="rounded-2xl bg-white px-6 py-20 text-center shadow-sm">

              <div className="text-5xl">
                🔍
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-800">
                No Events Found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                We couldn't find any events matching
                your search or category.
              </p>

              <button
                onClick={clearFilters}
                className="mt-6 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Clear Filters
              </button>

            </div>

          )}

        </div>

      </main>

      {/* Modal */}

      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="float-right text-2xl dark:text-white"
            >
              &times;
            </button>

            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="mb-4 h-48 w-full rounded-lg object-cover"
            />

            <h2 className="text-2xl font-bold dark:text-white">
              {selectedEvent.title}
            </h2>

            <p className="mt-3 dark:text-gray-200">
              {selectedEvent.location}
            </p>

            <p className="mt-2 dark:text-gray-200">
              {selectedEvent.date} — {selectedEvent.time}
            </p>

            <p className="mt-3 dark:text-gray-200">
              {selectedEvent.description}
            </p>
          </div>
        </div>

      )}

      <Footer />

    </div>
  );
}

export default Home;




