// import {
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaClock,
//   FaHeart,
//   FaEye,
//   FaArrowRight,
// } from "react-icons/fa";

// import { useNavigate } from "react-router-dom";

// function EventCard({
//   event,
//   onFavorite,
//   isFavorite,
//   onView,
// }) {

//   const navigate = useNavigate();

//   return (
//     <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

//       {/* Image */}

//       <div className="relative h-[210px] overflow-hidden">

//         <img
//           src={event.image}
//           alt={event.title}
//           className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//         />

//         {/* Category */}

//         <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1.5 text-[10px] font-bold text-white">
//           {event.category}
//         </span>

//         {/* Favorite */}

//         <button
//           onClick={() => onFavorite(event)}
//           aria-label="Add event to favorites"
//           className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 ${
//             isFavorite
//               ? "text-red-500"
//               : "text-slate-500 hover:text-red-500"
//           }`}
//         >
//           <FaHeart size={13} />
//         </button>

//       </div>

//       {/* Content */}

//       <div className="p-5">

//         <h3 className="mb-4 line-clamp-1 text-lg font-bold text-slate-800">
//           {event.title}
//         </h3>

//         <div className="space-y-2">

//           <div className="flex items-center gap-2 text-xs text-slate-500">

//             <FaMapMarkerAlt className="text-indigo-600" />

//             {event.location}

//           </div>

//           <div className="flex items-center gap-2 text-xs text-slate-500">

//             <FaCalendarAlt className="text-indigo-600" />

//             {event.date}

//           </div>

//           <div className="flex items-center gap-2 text-xs text-slate-500">

//             <FaClock className="text-indigo-600" />

//             {event.time}

//           </div>

//         </div>

//         <p className="my-4 line-clamp-2 text-xs leading-6 text-slate-400">
//           {event.description}
//         </p>

//         {/* Buttons */}

//         <div className="flex items-center justify-between border-t border-slate-100 pt-4">

//           <button
//             onClick={() => onView(event)}
//             className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600"
//           >

//             <FaEye />

//             Quick View

//           </button>

//           <button
//             onClick={() =>
//               navigate(`/events/${event.id}`)
//             }
//             className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700"
//           >

//             View Details

//             <FaArrowRight size={11} />

//           </button>

//         </div>

//       </div>

//     </article>
//   );
// }

// export default EventCard;



// import { FaHeart, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

// function EventCard({ event, isFavorite, onToggleFavorite }) {
//   return (
//     <article
//       className="overflow-hidden rounded-xl border border-gray-200
//                  bg-white shadow-sm transition duration-300
//                  hover:-translate-y-1 hover:shadow-lg
//                  dark:border-gray-700 dark:bg-gray-800"
//     >
//       <div className="relative">
//         <img
//           src={event.image || "https://placehold.co/600x400?text=Event"}
//           alt={event.title ? `${event.title} event` : "Event"}
//           className="h-48 w-full object-cover"
//         />

//         <button
//           type="button"
//           onClick={() => onToggleFavorite(event)}
//           aria-label={
//             isFavorite
//               ? `Remove ${event.title} from favorites`
//               : `Add ${event.title} to favorites`
//           }
//           aria-pressed={isFavorite}
//           className="absolute right-3 top-3 rounded-full
//                      bg-white p-3 shadow transition
//                      hover:scale-110 focus:outline-none
//                      focus:ring-2 focus:ring-indigo-500"
//         >
//           <FaHeart
//             className={isFavorite ? "text-red-500" : "text-gray-400"}
//           />
//         </button>
//       </div>

//       <div className="p-5">
//         <span className="rounded-full bg-indigo-100 px-3 py-1
//                          text-xs font-semibold text-indigo-700">
//           {event.category || "Event"}
//         </span>

//         <h2 className="mt-3 text-lg font-bold text-gray-900
//                        dark:text-white">
//           {event.title}
//         </h2>

//         <p className="mt-2 flex items-center gap-2 text-sm
//                       text-gray-600 dark:text-gray-300">
//           <FaMapMarkerAlt className="text-indigo-500" />
//           {event.location}
//         </p>

//         <p className="mt-2 flex items-center gap-2 text-sm
//                       text-gray-600 dark:text-gray-300">
//           <FaCalendarAlt className="text-indigo-500" />
//           {event.date}
//         </p>

//         <p className="mt-3 line-clamp-3 text-sm text-gray-600
//                       dark:text-gray-300">
//           {event.description}
//         </p>
//       </div>
//     </article>
//   );
// }

// export default EventCard;






















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
          <button
            type="button"
            onClick={() => onView(event)}
            className="flex items-center gap-2 text-xs font-bold
                       text-slate-600 transition hover:text-indigo-600
                       focus:outline-none focus:ring-2
                       focus:ring-indigo-500 dark:text-slate-200"
          >
            <FaEye />
            Quick View
          </button>

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