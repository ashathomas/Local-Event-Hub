import {
  FaTimes,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

import RegistrationForm from "./RegistrationForm";

function EventModal({ event, onClose }) {

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >

      <div
        className="max-h-[90vh] w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Image */}

        <div className="relative h-[220px]">

          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover"
          />

          <button
            onClick={onClose}
            aria-label="Close event details"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-md hover:text-red-500"
          >
            <FaTimes />
          </button>

          <span className="absolute bottom-4 left-4 rounded-full bg-indigo-600 px-4 py-2 text-xs font-bold text-white">
            {event.category}
          </span>

        </div>

        {/* Content */}

        <div className="p-6">

          <h2 className="text-2xl font-extrabold text-slate-800">
            {event.title}
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">

            <div className="rounded-xl bg-indigo-50 p-3">

              <FaMapMarkerAlt className="text-indigo-600" />

              <p className="mt-2 text-[10px] text-slate-400">
                Location
              </p>

              <p className="mt-1 text-xs font-bold text-slate-700">
                {event.location}
              </p>

            </div>

            <div className="rounded-xl bg-indigo-50 p-3">

              <FaCalendarAlt className="text-indigo-600" />

              <p className="mt-2 text-[10px] text-slate-400">
                Date
              </p>

              <p className="mt-1 text-xs font-bold text-slate-700">
                {event.date}
              </p>

            </div>

            <div className="rounded-xl bg-indigo-50 p-3">

              <FaClock className="text-indigo-600" />

              <p className="mt-2 text-[10px] text-slate-400">
                Time
              </p>

              <p className="mt-1 text-xs font-bold text-slate-700">
                {event.time}
              </p>

            </div>

          </div>

          <div className="mt-6">

            <h3 className="text-lg font-bold text-slate-800">
              About this event
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              {event.description}
            </p>

          </div>

          {/* Registration */}

          <div className="mt-8 border-t border-slate-100 pt-6">

            <RegistrationForm
              event={event}
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default EventModal;