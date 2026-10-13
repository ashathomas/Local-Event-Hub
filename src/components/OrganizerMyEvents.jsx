
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaFilter,
  FaClock,
} from "react-icons/fa";

import Navbar from "../components/Navbar";

const filters = ["All", "Pending", "Approved", "Rejected"];

function OrganizerMyEvents() {
  const [events, setEvents] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("organizerEvents") || "[]"
      );
    } catch {
      return [];
    }
  });

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Save changes whenever the events list changes.
  useEffect(() => {
    localStorage.setItem("organizerEvents", JSON.stringify(events));
  }, [events]);

  const filteredEvents = events.filter((event) => {
    const matchesStatus =
      activeFilter === "All" || event.status === activeFilter;

    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase()) ||
      event.category.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    setEvents((previous) =>
      previous.filter((event) => event.id !== id)
    );
  }

  function handleEdit(event) {
    const newTitle = window.prompt(
      "Enter the updated event title:",
      event.title
    );

    if (!newTitle || !newTitle.trim()) return;

    setEvents((previous) =>
      previous.map((item) =>
        item.id === event.id
          ? { ...item, title: newTitle.trim() }
          : item
      )
    );
  }

  function getStatusStyle(status) {
    switch (status) {
      case "Approved":
        return "bg-green-50 text-green-700";
      case "Rejected":
        return "bg-red-50 text-red-700";
      default:
        return "bg-amber-50 text-amber-700";
    }
  }

  const statusCounts = {
    All: events.length,
    Pending: events.filter((event) => event.status === "Pending").length,
    Approved: events.filter((event) => event.status === "Approved").length,
    Rejected: events.filter((event) => event.status === "Rejected").length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto w-[92%] max-w-[1150px] py-8 sm:py-10">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Organizer Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
              My Events
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              View and manage all the events you have created.
            </p>
          </div>

          <Link
            to="/organizer/add-event"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <FaPlus />
            Add New Event
          </Link>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                activeFilter === filter
                  ? "border-indigo-300 ring-2 ring-indigo-100"
                  : "border-slate-100"
              }`}
            >
              <p className="text-sm text-slate-500">{filter} Events</p>
              <p className="mt-2 text-2xl font-extrabold text-slate-900">
                {statusCounts[filter]}
              </p>
            </button>
          ))}
        </div>

        {/* Search and filters */}
        <section className="mt-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, category, or location..."
                aria-label="Search my events"
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                    activeFilter === filter
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Events list */}
          <div className="mt-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                {activeFilter === "All" ? "All My Events" : `${activeFilter} Events`}
              </h2>

              <span className="text-sm text-slate-500">
                {filteredEvents.length} found
              </span>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
                <FaCalendarAlt className="mx-auto text-4xl text-slate-300" />

                <h3 className="mt-4 text-lg font-bold text-slate-800">
                  No events found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {events.length === 0
                    ? "You haven't created any events yet."
                    : "Try another search or status filter."}
                </p>

                {events.length === 0 && (
                  <Link
                    to="/organizer/add-event"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700"
                  >
                    <FaPlus />
                    Create Your First Event
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <article
                    key={event.id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
                  >
                    {/* Event image */}
                    <img
                      src={
                        event.image ||
                        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80"
                      }
                      alt={event.title}
                      loading="lazy"
                      className="h-36 w-full rounded-xl object-cover sm:h-24 sm:w-28"
                    />

                    {/* Event details */}
                    <div className="min-w-0 flex-1">
                      <h3 className="break-words font-bold text-slate-900">
                        {event.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {event.category} · {event.location}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
                        <span className="flex items-center gap-2">
                          <FaCalendarAlt className="text-indigo-500" />
                          {event.date}
                        </span>

                        <span className="flex items-center gap-2">
                          <FaClock className="text-indigo-500" />
                          {event.time}
                        </span>
                      </div>
                    </div>

                    {/* Status */}
                    <span
                      className={`w-fit shrink-0 rounded-full px-3 py-2 text-xs font-bold ${getStatusStyle(
                        event.status
                      )}`}
                    >
                      {event.status || "Pending"}
                    </span>

                    {/* Actions */}
                    <div className="flex shrink-0 gap-2 sm:flex-col">
                      <button
                        type="button"
                        onClick={() => handleEdit(event)}
                        aria-label={`Edit ${event.title}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600 transition hover:bg-indigo-100 sm:flex-none"
                      >
                        <FaEdit />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(event.id)}
                        aria-label={`Delete ${event.title}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 sm:flex-none"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default OrganizerMyEvents;
