import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaHeart,
  FaEye,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function EventCard({
  event,
  onFavorite,
  isFavorite,
  onView,
}) {

  const navigate = useNavigate();

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}

      <div className="relative h-[210px] overflow-hidden">

        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Category */}

        <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1.5 text-[10px] font-bold text-white">
          {event.category}
        </span>

        {/* Favorite */}

        <button
          onClick={() => onFavorite(event)}
          aria-label="Add event to favorites"
          className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 ${
            isFavorite
              ? "text-red-500"
              : "text-slate-500 hover:text-red-500"
          }`}
        >
          <FaHeart size={13} />
        </button>

      </div>

      {/* Content */}

      <div className="p-5">

        <h3 className="mb-4 line-clamp-1 text-lg font-bold text-slate-800">
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

        <p className="my-4 line-clamp-2 text-xs leading-6 text-slate-400">
          {event.description}
        </p>

        {/* Buttons */}

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">

          <button
            onClick={() => onView(event)}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600"
          >

            <FaEye />

            Quick View

          </button>

          <button
            onClick={() =>
              navigate(`/events/${event.id}`)
            }
            className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700"
          >

            View Details

            <FaArrowRight size={11} />

          </button>

        </div>

      </div>

    </article>
  );
}

export default EventCard;