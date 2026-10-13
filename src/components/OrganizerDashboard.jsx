
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaThLarge,
  FaClipboardList,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

import Navbar from "../components/Navbar";

const initialEvents = [
  {
    id: 1,
    title: "Tech Conference 2026",
    category: "Technology",
    location: "Kochi",
    date: "20 Nov 2026",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    title: "Music Festival",
    category: "Music",
    location: "Thrissur",
    date: "12 Dec 2026",
    status: "Approved",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    title: "Food Expo",
    category: "Food",
    location: "Kochi",
    date: "5 Jan 2027",
    status: "Approved",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=300&q=80",
  },
];

function OrganizerDashboard() {
  const [events, setEvents] = useState(initialEvents);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const pendingCount = events.filter(
    (event) => event.status === "Pending"
  ).length;

  const approvedCount = events.filter(
    (event) => event.status === "Approved"
  ).length;

  function deleteEvent(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirmed) {
      setEvents((previous) =>
        previous.filter((event) => event.id !== id)
      );
    }
  }

  function editEvent(event) {
    const newTitle = window.prompt(
      "Enter the updated event title:",
      event.title
    );

    if (newTitle && newTitle.trim()) {
      setEvents((previous) =>
        previous.map((item) =>
          item.id === event.id
            ? { ...item, title: newTitle.trim() }
            : item
        )
      );
    }
  }

  const sidebarLinks = [
    { label: "Dashboard", icon: FaThLarge },
    { label: "My Events", icon: FaClipboardList },
    { label: "Add Event", icon: FaPlus },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex min-h-[calc(100vh-72px)]">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 mt-[72px] w-64 border-r border-slate-200 bg-white p-5 transition-transform duration-300 lg:static lg:mt-0 lg:translate-x-0 ${
            mobileSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Organizer Panel
            </p>
            <h2 className="mt-2 text-lg font-extrabold text-slate-800">
              Manage Events
            </h2>
          </div>

          <nav className="space-y-2">
           
{sidebarLinks.map(({ label, icon: Icon }) =>
  label === "My Events" ? (
    <Link
      key={label}
      to="/organizer/my-events"
      onClick={() => setMobileSidebarOpen(false)}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
        activeTab === label
          ? "bg-indigo-50 text-indigo-600"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      <Icon />
      {label}
    </Link>
  ) : (
    <button
      key={label}
      type="button"
      onClick={() => {
        setActiveTab(label);
        setMobileSidebarOpen(false);
      }}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
        activeTab === label
          ? "bg-indigo-50 text-indigo-600"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      <Icon />
      {label}
    </button>
  )
)}

          </nav>

          <Link
            to="/"
            className="absolute bottom-6 left-5 flex items-center gap-3 text-sm font-semibold text-slate-500 hover:text-indigo-600"
          >
            <FaSignOutAlt />
            Back to Website
          </Link>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">
            {/* Page heading */}
            <div className="mb-8 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setMobileSidebarOpen((previous) => !previous)
                  }
                  aria-label="Toggle sidebar"
                  className="rounded-lg border border-slate-200 bg-white p-3 text-slate-600 lg:hidden"
                >
                  {mobileSidebarOpen ? <FaTimes /> : <FaBars />}
                </button>

                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    {activeTab === "Dashboard"
                      ? "Welcome, Organizer!"
                      : activeTab}
                  </h1>
                  <p className="mt-2 text-sm text-slate-500">
                    Create and manage your events.
                  </p>
                </div>
              </div>

              <Link
                to="/organizer/add-event"
                className="flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
              >
                <FaPlus />
                <span className="hidden sm:inline">Add New Event</span>
                <span className="sm:hidden">Add</span>
              </Link>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatCard
                title="Total Events"
                value={events.length}
                icon={<FaCalendarAlt />}
                color="indigo"
              />

              <StatCard
                title="Pending"
                value={pendingCount}
                icon={<FaClock />}
                color="amber"
              />

              <StatCard
                title="Approved"
                value={approvedCount}
                icon={<FaCheckCircle />}
                color="green"
              />
            </div>

            {/* Events section */}
            <section className="mt-8">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    My Events
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    View and manage your event listings.
                  </p>
                </div>

                <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                  {events.length} Events
                </span>
              </div>

              {events.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                  <FaCalendarAlt className="mx-auto text-3xl text-slate-300" />
                  <h3 className="mt-4 font-bold text-slate-800">
                    No events yet
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Add your first event to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <article
                      key={event.id}
                      className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        loading="lazy"
                        className="h-28 w-full rounded-xl object-cover sm:h-20 sm:w-24"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-slate-900">
                          {event.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {event.category} · {event.location}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {event.date}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${
                          event.status === "Approved"
                            ? "bg-green-50 text-green-700"
                            : event.status === "Rejected"
                              ? "bg-red-50 text-red-700"
                              : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {event.status}
                      </span>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => editEvent(event)}
                          aria-label={`Edit ${event.title}`}
                          className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <FaEdit />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteEvent(event.id)}
                          aria-label={`Delete ${event.title}`}
                          className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const styles = {
    indigo: "bg-indigo-50 text-indigo-600",
    amber: "bg-amber-50 text-amber-600",
    green: "bg-green-50 text-green-600",
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles[color]}`}
        >
          {icon}
        </span>
      </div>

      <p className="mt-4 text-3xl font-extrabold text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default OrganizerDashboard;
