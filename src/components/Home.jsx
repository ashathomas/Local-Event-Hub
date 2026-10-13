import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Hero from "./Hero";
import CategoryFilter from "./CategoryFilter";
import EventCard from "./EventCard";
import EventModal from "./EventModal";
import Footer from "./Footer";

import events from "../data/events";

function Home() {

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [sortOption, setSortOption] =
    useState("default");

  const [favorites, setFavorites] =
    useState(() => {
      const savedFavorites =
        localStorage.getItem("favorites");

      return savedFavorites
        ? JSON.parse(savedFavorites)
        : [];
    });
    

  const [selectedEvent, setSelectedEvent] =
    useState(null);

  // Save favorites to localStorage

  useEffect(() => {

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

  }, [favorites]);

  // Favorite function

  const toggleFavorite = (event) => {

    setFavorites((previous) => {

      const exists = previous.some(
        (item) => item.id === event.id
      );

      if (exists) {

        return previous.filter(
          (item) => item.id !== event.id
        );

      }

      return [...previous, event];

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

      <Navbar />

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





// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import EventCard from "../components/EventCard";
// import Footer from "../components/Footer";
// import events from "../data/events";

// function Home() {
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [sortOption, setSortOption] = useState("default");

//   const [favorites, setFavorites] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem("favorites")) || [];
//     } catch {
//       return [];
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem("favorites", JSON.stringify(favorites));
//   }, [favorites]);

//   const categories = [
//     "All",
//     ...new Set(events.map((event) => event.category).filter(Boolean)),
//   ];

//   function toggleFavorite(event) {
//     setFavorites((previous) => {
//       const alreadySaved = previous.some(
//         (item) => item.id === event.id
//       );

//       if (alreadySaved) {
//         return previous.filter((item) => item.id !== event.id);
//       }

//       return [...previous, event];
//     });
//   }

//   const filteredEvents = events
//     .filter((event) => {
//       const searchText = search.toLowerCase();

//       const matchesSearch =
//         (event.title || "").toLowerCase().includes(searchText) ||
//         (event.location || "").toLowerCase().includes(searchText);

//       const matchesCategory =
//         selectedCategory === "All" ||
//         event.category === selectedCategory;

//       return matchesSearch && matchesCategory;
//     })
//     .sort((a, b) => {
//       if (sortOption === "az") {
//         return a.title.localeCompare(b.title);
//       }

//       if (sortOption === "za") {
//         return b.title.localeCompare(a.title);
//       }

//       return 0;
//     });

//   function clearFilters() {
//     setSearch("");
//     setSelectedCategory("All");
//     setSortOption("default");
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 transition-colors
//                     dark:bg-gray-950">
//       <Navbar />

//       <main className="mx-auto min-h-[70vh] w-[90%]
//                        max-w-[1200px] py-8 sm:py-12">
//         <section className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-gray-900
//                          sm:text-4xl dark:text-white">
//             Discover Local Events
//           </h1>

//           <p className="mx-auto mt-3 max-w-2xl text-gray-600
//                         dark:text-gray-300">
//             Find exciting events and make memorable experiences.
//           </p>
//         </section>

//         <section
//           aria-label="Search and filter events"
//           className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2
//                      lg:grid-cols-3"
//         >
//           <label className="block">
//             <span className="mb-1 block text-sm font-medium
//                              text-gray-700 dark:text-gray-200">
//               Search events
//             </span>

//             <input
//               type="search"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search by title or location..."
//               className="w-full rounded-lg border border-gray-300
//                          bg-white p-3 text-gray-900 outline-none
//                          focus:ring-2 focus:ring-indigo-500
//                          dark:border-gray-700 dark:bg-gray-800
//                          dark:text-white"
//             />
//           </label>

//           <label className="block">
//             <span className="mb-1 block text-sm font-medium
//                              text-gray-700 dark:text-gray-200">
//               Category
//             </span>

//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="w-full rounded-lg border border-gray-300
//                          bg-white p-3 text-gray-900 outline-none
//                          focus:ring-2 focus:ring-indigo-500
//                          dark:border-gray-700 dark:bg-gray-800
//                          dark:text-white"
//             >
//               {categories.map((category) => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//           </label>

//           <label className="block">
//             <span className="mb-1 block text-sm font-medium
//                              text-gray-700 dark:text-gray-200">
//               Sort events
//             </span>

//             <select
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="w-full rounded-lg border border-gray-300
//                          bg-white p-3 text-gray-900 outline-none
//                          focus:ring-2 focus:ring-indigo-500
//                          dark:border-gray-700 dark:bg-gray-800
//                          dark:text-white"
//             >
//               <option value="default">Default order</option>
//               <option value="az">Name: A to Z</option>
//               <option value="za">Name: Z to A</option>
//             </select>
//           </label>
//         </section>

//         <section aria-live="polite">
//           <div className="mb-5 flex flex-wrap items-center
//                           justify-between gap-3">
//             <p className="font-medium text-gray-700
//                           dark:text-gray-200">
//               {filteredEvents.length} event
//               {filteredEvents.length !== 1 ? "s" : ""} found
//             </p>

//             <button
//               type="button"
//               onClick={clearFilters}
//               className="rounded-lg bg-indigo-600 px-4 py-2
//                          text-sm font-semibold text-white
//                          transition hover:bg-indigo-700
//                          focus:outline-none focus:ring-2
//                          focus:ring-indigo-400"
//             >
//               Clear Filters
//             </button>
//           </div>

//           {filteredEvents.length > 0 ? (
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2
//                             lg:grid-cols-3">
//               {filteredEvents.map((event) => (
//                 <EventCard
//                   key={event.id}
//                   event={event}
//                   isFavorite={favorites.some(
//                     (item) => item.id === event.id
//                   )}
//                   onToggleFavorite={toggleFavorite}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="rounded-xl border border-dashed
//                             border-gray-300 px-5 py-12 text-center
//                             dark:border-gray-700">
//               <h2 className="text-xl font-bold text-gray-800
//                              dark:text-white">
//                 No Events Found
//               </h2>

//               <p className="mt-2 text-gray-600 dark:text-gray-300">
//                 Try another search term or category.
//               </p>

//               <button
//                 type="button"
//                 onClick={clearFilters}
//                 className="mt-5 rounded-lg bg-indigo-600 px-5
//                            py-2 text-white hover:bg-indigo-700"
//               >
//                 Show All Events
//               </button>
//             </div>
//           )}
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default Home;