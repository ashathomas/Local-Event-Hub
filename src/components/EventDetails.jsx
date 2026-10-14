
import { useNavigate, useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
  // FaHeart,
  FaUsers,
  FaMusic,
  FaUtensils,
  FaParking,
  FaStar,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegistrationForm from "../components/RegistrationForm";
import events from "../data/events";



function EventDetails({ favorites = [], setFavorites }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the event first
  const event = events.find(
    (item) => String(item.id) === String(id)
  );

  // Check if this event is a favourite
  const isFavorite = event
    ? favorites.some(
        (item) => String(item.id) === String(event.id)
      )
    : false;

  // Add or remove favourite
  const toggleFavorite = () => {
    if (!event || !setFavorites) return;

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

  // Handle invalid event ID
  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar favorites={favorites} />

        <div className="mx-auto max-w-3xl px-5 py-32 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Event Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            The event you are looking for does not exist.
          </p>

          <button
            onClick={() => navigate("/events")}
            className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white"
          >
            Back to Events
          </button>
        </div>

        <Footer />
      </div>
    );
  }

  // Event highlights
  const highlights = [
    { icon: FaMusic, text: "Live Performances" },
    { icon: FaUtensils, text: "Food Stalls" },
    { icon: FaStar, text: "Amazing Experiences" },
    { icon: FaParking, text: "On-site Parking" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar favorites={favorites} />

      <main className="mx-auto w-[92%] max-w-[1150px] py-6 sm:py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-indigo-600"
        >
          <FaArrowLeft />
          Back to Events
        </button>

        {/* Event image */}
        <div className="relative h-[220px] overflow-hidden rounded-2xl sm:h-[350px]">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white">
            {event.category}
          </span>
        </div>

        {/* Event details */}
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                  {event.title}
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Get ready for an unforgettable experience.
                  Join us and enjoy this amazing local event!
                </p>
              </div>

              {/* Favourite button */}
              <button
                type="button"
                onClick={toggleFavorite}
                aria-label={
                  isFavorite
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
                aria-pressed={isFavorite}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isFavorite
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-slate-200 bg-white text-slate-600 hover:text-red-500"
                }`}
              >
                {isFavorite ? "❤️ Remove" : "♡ Favorite"}
              </button>
            </div>

            {/* Location, date and time */}
            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <FaMapMarkerAlt className="text-indigo-600" />
                {event.location}
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-600">
                <FaCalendarAlt className="text-indigo-600" />
                {event.date}
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-600">
                <FaClock className="text-indigo-600" />
                {event.time}
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-600">
                <FaUsers className="text-indigo-600" />
                Open to event participants
              </div>
            </div>

            {/* About */}
            <section className="mt-7">
              <h2 className="text-lg font-bold text-slate-900">
                About this event
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                {event.description}
              </p>
            </section>

            {/* Highlights */}
            <section className="mt-7 border-t border-slate-200 pt-6">
              <h2 className="text-lg font-bold text-slate-900">
                Event Highlights
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {highlights.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 text-sm text-slate-600"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Icon size={14} />
                    </span>
                    {text}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Registration sidebar */}
          <aside className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-slate-900">
              Join This Event
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Complete the registration form below to reserve your place.
            </p>

            <div className="mt-5 rounded-xl bg-indigo-50 p-4">
              <p className="text-xs text-slate-500">Event</p>
              <p className="mt-1 font-bold text-slate-800">
                {event.title}
              </p>

              <p className="mt-3 text-xs text-slate-500">
                Date and time
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-700">
                {event.date}
              </p>
              <p className="text-sm text-slate-600">{event.time}</p>
            </div>

            <a
              href="#registration-form"
              className="mt-5 block rounded-xl bg-indigo-600 px-5 py-3 text-center text-sm font-bold text-white hover:bg-indigo-700"
            >
              Register Now
            </a>
          </aside>
        </div>

        {/* Registration form */}
        <section
          id="registration-form"
          className="mt-10 scroll-mt-24 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8"
        >
          <div className="mb-6">
            <h2 className="text-xl font-extrabold text-slate-900">
              Registration Form
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Register for {event.title}.
            </p>
          </div>

          <RegistrationForm event={event} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default EventDetails;

