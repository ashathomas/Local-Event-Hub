import { useState } from "react";

import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";

import events from "../data/events";

function Events() {

  const [favorites, setFavorites] = useState([]);

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

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      {/* Page Header */}

      <section className="bg-indigo-600 py-16 text-white">

        <div className="mx-auto w-[90%] max-w-[1200px]">

          <p className="text-xs font-bold tracking-[2px] text-indigo-200">
            EXPLORE
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            All Events
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-indigo-100">
            Discover exciting events, workshops,
            festivals and activities happening near you.
          </p>

        </div>

      </section>

      {/* Events */}

      <main className="py-14">

        <div className="mx-auto w-[90%] max-w-[1200px]">

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {events.map((event) => (

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

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Events;