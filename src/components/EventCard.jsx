import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function EventCard({ event, onFavorite, isFavorite }) {

  const navigate = useNavigate();

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}

      <div className="relative h-[210px]">

        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover"
        />

        {/* Category */}

        <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1.5 text-[10px] font-bold text-white">
          {event.category}
        </span>

        {/* Favorite */}

        <button
          onClick={() => onFavorite(event)}
          className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition ${
            isFavorite
              ? "text-red-500"
              : "text-slate-500 hover:text-red-500"
          }`}
          aria-label="Add to favorites"
        >
          <FaHeart size={13} />
        </button>

      </div>

      {/* Content */}

      <div className="p-5">

        <h3 className="mb-4 text-lg font-bold text-slate-800">
          {event.title}
        </h3>

        <div className="space-y-2">

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <FaMapMarkerAlt className="text-indigo-600" />
            {event.location}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <FaCalendarAlt className="text-indigo-600" />
            {event.date}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <FaClock className="text-indigo-600" />
            {event.time}
          </div>

        </div>

        <p className="my-4 text-xs leading-6 text-slate-400">
          {event.description}
        </p>

        <button
          onClick={() =>
            navigate(`/events/${event.id}`)
          }
          className="flex items-center gap-2 text-xs font-bold text-indigo-600 transition hover:gap-3"
        >
          View Details
          <FaArrowRight size={11} />
        </button>

      </div>

    </article>
  );
}

export default EventCard;