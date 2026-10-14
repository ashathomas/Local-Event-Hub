


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
    <article
      className="group overflow-hidden rounded-2xl border
                 border-slate-100 bg-white shadow-sm
                 transition duration-300 hover:-translate-y-1
                 hover:shadow-xl
                 dark:border-slate-700 dark:bg-slate-800"
    >
      {/* Image */}
      <div className="relative h-[210px] overflow-hidden">
        <img
          src={event.image}
          alt={`${event.title} event`}
          loading="lazy"
          className="h-full w-full object-cover transition
                     duration-500 group-hover:scale-105"
        />

        {/* Category */}
        <span className="absolute left-4 top-4 rounded-full
                         bg-indigo-600 px-3 py-1.5
                         text-[10px] font-bold text-white">
          {event.category}
        </span>

        {/* Favorite */}
        <button
          type="button"
          onClick={() => onFavorite(event)}
          aria-label={
            isFavorite
              ? `Remove ${event.title} from favorites`
              : `Add ${event.title} to favorites`
          }
          aria-pressed={Boolean(isFavorite)}
          className={`absolute right-4 top-4 flex h-10 w-10
                      items-center justify-center rounded-full
                      bg-white shadow-md transition duration-200
                      hover:scale-110 focus:outline-none
                      focus:ring-2 focus:ring-indigo-500 ${
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
        <h3 className="mb-4 line-clamp-1 text-lg font-bold
                       text-slate-800 dark:text-white">
          {event.title}
        </h3>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs
                          text-slate-500 dark:text-slate-300">
            <FaMapMarkerAlt className="shrink-0 text-indigo-500" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center gap-2 text-xs
                          text-slate-500 dark:text-slate-300">
            <FaCalendarAlt className="shrink-0 text-indigo-500" />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-2 text-xs
                          text-slate-500 dark:text-slate-300">
            <FaClock className="shrink-0 text-indigo-500" />
            <span>{event.time}</span>
          </div>
        </div>

        <p className="my-4 line-clamp-2 text-xs leading-6
                      text-slate-500 dark:text-slate-300">
          {event.description}
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-3
                        border-t border-slate-100 pt-4
                        dark:border-slate-700">
          {/* <button
            type="button"
            onClick={() => onView(event)}
            className="flex items-center gap-2 text-xs font-bold
                       text-slate-600 transition hover:text-indigo-600
                       focus:outline-none focus:ring-2
                       focus:ring-indigo-500 dark:text-slate-200"
          >
            <FaEye />
            Quick View
          </button> */}

          <button
            type="button"
            onClick={() => navigate(`/events/${event.id}`)}
            className="flex items-center gap-2 text-xs font-bold
                       text-indigo-600 transition hover:gap-3
                       hover:text-indigo-700 focus:outline-none
                       focus:ring-2 focus:ring-indigo-500
                       dark:text-indigo-400"
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