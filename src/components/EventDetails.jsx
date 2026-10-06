import { useState } from "react";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
  FaHeart,
} from "react-icons/fa";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import events from "../data/events";

function EventDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [registered, setRegistered] =
    useState(false);

  const [favorite, setFavorite] =
    useState(false);

  const event = events.find(
    (item) => item.id === Number(id)
  );

  // Event not found

  if (!event) {

    return (
      <div className="min-h-screen bg-slate-50">

        <Navbar />

        <div className="mx-auto max-w-[700px] px-5 py-32 text-center">

          <h1 className="text-3xl font-bold text-slate-800">
            Event Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            The event you are looking for does not exist.
          </p>

          <button
            onClick={() => navigate("/events")}
            className="mt-6 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Events
          </button>

        </div>

      </div>
    );
  }

  const handleRegister = () => {
    setRegistered(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <main className="py-10">

        <div className="mx-auto w-[90%] max-w-[1100px]">

          {/* Back */}

          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-sm font-semibold text-indigo-600"
          >
            <FaArrowLeft />
            Back
          </button>

          {/* Main Card */}

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

            {/* Image */}

            <div className="relative h-[280px] sm:h-[400px]">

              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover"
              />

              <span className="absolute left-5 top-5 rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white">
                {event.category}
              </span>

            </div>

            {/* Content */}

            <div className="p-6 sm:p-10">

              <div className="flex flex-col justify-between gap-6 md:flex-row">

                <div>

                  <h1 className="text-3xl font-extrabold text-slate-800 sm:text-4xl">
                    {event.title}
                  </h1>

                  <p className="mt-3 text-sm text-slate-500">
                    Join us and enjoy this amazing local event.
                  </p>

                </div>

                {/* Favorite */}

                <button
                  onClick={() =>
                    setFavorite(!favorite)
                  }
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${
                    favorite
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  <FaHeart />
                </button>

              </div>

              {/* Event information */}

              <div className="mt-8 grid gap-4 sm:grid-cols-3">

                <div className="rounded-xl bg-indigo-50 p-4">

                  <FaMapMarkerAlt className="text-indigo-600" />

                  <p className="mt-2 text-xs text-slate-400">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-700">
                    {event.location}
                  </p>

                </div>

                <div className="rounded-xl bg-indigo-50 p-4">

                  <FaCalendarAlt className="text-indigo-600" />

                  <p className="mt-2 text-xs text-slate-400">
                    Date
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-700">
                    {event.date}
                  </p>

                </div>

                <div className="rounded-xl bg-indigo-50 p-4">

                  <FaClock className="text-indigo-600" />

                  <p className="mt-2 text-xs text-slate-400">
                    Time
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-700">
                    {event.time}
                  </p>

                </div>

              </div>

              {/* About */}

              <div className="mt-10">

                <h2 className="text-xl font-bold text-slate-800">
                  About this event
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500">
                  {event.description}
                </p>

              </div>

              {/* Register */}

              <div className="mt-10">

                {registered ? (

                  <div className="rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-700">
                    ✓ You have successfully registered for this event!
                  </div>

                ) : (

                  <button
                    onClick={handleRegister}
                    className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                  >
                    Register Now
                  </button>

                )}

              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default EventDetails;