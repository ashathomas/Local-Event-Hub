
// import { useState } from "react";

// const initialEvents = [
//   {
//     id: 1,
//     title: "React Workshop",
//     organizer: "Tech Events",
//     status: "Pending",
//   },
//   {
//     id: 2,
//     title: "Music Festival",
//     organizer: "City Events",
//     status: "Pending",
//   },
// ];

// function AdminDashboard() {
//   const [events, setEvents] = useState(initialEvents);

//   function updateStatus(id, status) {
//     setEvents((previous) =>
//       previous.map((event) =>
//         event.id === id ? { ...event, status } : event
//       )
//     );
//   }

//   return (
//     <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
//       <div className="mx-auto max-w-4xl">
//         <h1 className="text-3xl font-bold dark:text-white">
//           Admin Dashboard
//         </h1>

//         <p className="my-3 text-slate-600 dark:text-slate-300">
//           Review events submitted for approval.
//         </p>

//         <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
//           <div className="rounded-xl bg-white p-5 shadow dark:bg-slate-800">
//             <p className="text-slate-500">Total Events</p>
//             <p className="text-2xl font-bold dark:text-white">
//               {events.length}
//             </p>
//           </div>

//           <div className="rounded-xl bg-white p-5 shadow dark:bg-slate-800">
//             <p className="text-slate-500">Pending</p>
//             <p className="text-2xl font-bold text-amber-600">
//               {events.filter((e) => e.status === "Pending").length}
//             </p>
//           </div>

//           <div className="rounded-xl bg-white p-5 shadow dark:bg-slate-800">
//             <p className="text-slate-500">Approved</p>
//             <p className="text-2xl font-bold text-green-600">
//               {events.filter((e) => e.status === "Approved").length}
//             </p>
//           </div>
//         </div>

//         <div className="space-y-4">
//           {events.map((event) => (
//             <div
//               key={event.id}
//               className="rounded-xl bg-white p-5 shadow dark:bg-slate-800"
//             >
//               <h2 className="text-lg font-bold dark:text-white">
//                 {event.title}
//               </h2>

//               <p className="mt-1 text-sm text-slate-500">
//                 Organizer: {event.organizer}
//               </p>

//               <p className="my-3">
//                 Status: <strong>{event.status}</strong>
//               </p>

//               {event.status === "Pending" && (
//                 <div className="flex flex-wrap gap-3">
//                   <button
//                     onClick={() => updateStatus(event.id, "Approved")}
//                     className="rounded-lg bg-green-600 px-4 py-2 text-white"
//                   >
//                     Approve
//                   </button>

//                   <button
//                     onClick={() => updateStatus(event.id, "Rejected")}
//                     className="rounded-lg bg-red-600 px-4 py-2 text-white"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

// export default AdminDashboard;



import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSearch,
  FaTachometerAlt,
  FaClipboardList,
  // FaSignOutAlt,
  FaMapMarkerAlt,
  FaCalendarDay,
  FaFilter,
  FaArrowRight,
  FaSignOutAlt
} from "react-icons/fa";

const STORAGE_KEY = "organizerEvents";

function getStoredEvents() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function AdminDashboard() {
  const [events, setEvents] = useState(getStoredEvents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

const handleSignOut = () => {
  localStorage.removeItem("localEventHubRole");
  localStorage.removeItem("localEventHubEmail");

  window.dispatchEvent(new Event("localEventHubAuthChange"));

  navigate("/signin");
};

  // Load saved organizer events
  useEffect(() => {
    const syncEvents = () => setEvents(getStoredEvents());

    window.addEventListener("storage", syncEvents);
    window.addEventListener("localEventHubEventsChange", syncEvents);

    return () => {
      window.removeEventListener("storage", syncEvents);
      window.removeEventListener(
        "localEventHubEventsChange",
        syncEvents
      );
    };
  }, []);

  



  // Approve or reject an event
  const updateStatus = (id, status) => {
    const updatedEvents = events.map((event) =>
      String(event.id) === String(id)
        ? { ...event, status }
        : event
    );

    setEvents(updatedEvents);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedEvents)
    );

    window.dispatchEvent(
      new Event("localEventHubEventsChange")
    );
  };

  // Dashboard statistics
  const totalEvents = events.length;

  const pendingEvents = events.filter(
    (event) => (event.status || "Pending") === "Pending"
  ).length;

  const approvedEvents = events.filter(
    (event) => event.status === "Approved"
  ).length;

  const rejectedEvents = events.filter(
    (event) => event.status === "Rejected"
  ).length;

  // Search and filter
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = [
        event.title,
        event.organizer,
        event.category,
        event.location,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        );

      const status = event.status || "Pending";

      const matchesStatus =
        statusFilter === "All" || status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [events, search, statusFilter]);

  const stats = [
    {
      title: "Total Events",
      value: totalEvents,
      icon: FaCalendarAlt,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Pending Review",
      value: pendingEvents,
      icon: FaClock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Approved",
      value: approvedEvents,
      icon: FaCheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Rejected",
      value: rejectedEvents,
      icon: FaTimesCircle,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  const statusStyle = {
    Pending: "bg-amber-50 text-amber-700 ring-amber-200",
    Approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Rejected: "bg-rose-50 text-rose-700 ring-rose-200",
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 md:flex">
      {/* Sidebar */}
   

      {/* Main dashboard */}
      <main className="min-w-0 flex-1">
        {/* Top bar */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-5 sm:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Administration
            </p>
            <h1 className="mt-1 text-xl font-extrabold sm:text-2xl">
              Admin Dashboard
            </h1>
       
          </div>

            <button
  type="button"
  onClick={handleSignOut}
  className="mx-4 mb-5 flex items-center justify-center gap-2
             rounded-xl bg-[#4F35F5] px-5 py-3
             text-sm font-semibold text-white
             transition hover:bg-indigo-700
             focus:outline-none focus:ring-2 focus:ring-indigo-300"
>
  <FaSignOutAlt size={16} />
  Sign Out
</button>
        </header>

        <div className="mx-auto max-w-[1400px] p-5 sm:p-8">
          {/* Welcome section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold">
              Welcome back, Admin 👋
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Review event submissions and manage approval status.
            </p>
          </section>

          {/* Statistics cards */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                    >
                      <Icon size={19} />
                    </div>
                  </div>

                  <p className="mt-4 text-3xl font-extrabold text-slate-900">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Events in your dashboard
                  </p>
                </div>
              );
            })}
          </section>

          {/* Event management */}
          <section className="mt-9 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">
                    Event Submissions
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Review and manage submitted events.
                  </p>
                </div>

                <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
                  {filteredEvents.length} events
                </span>
              </div>

              {/* Search and filter */}
              <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_190px]">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search title, organizer, location..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div className="relative">
                  <FaFilter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-indigo-400"
                  >
                    <option value="All">All statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Events list */}
            <div className="divide-y divide-slate-100">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => {
                  const status = event.status || "Pending";
                  const Icon =
                    status === "Approved"
                      ? FaCheckCircle
                      : status === "Rejected"
                      ? FaTimesCircle
                      : FaClock;

                  return (
                    <article
                      key={event.id}
                      className="p-5 transition hover:bg-slate-50/80 sm:p-6"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex min-w-0 gap-4">
                          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:flex">
                            <FaCalendarAlt size={22} />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="break-words text-base font-bold text-slate-900 sm:text-lg">
                                {event.title || "Untitled Event"}
                              </h3>

                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                                  statusStyle[status] ||
                                  statusStyle.Pending
                                }`}
                              >
                                <Icon size={11} />
                                {status}
                              </span>
                            </div>

                            <p className="mt-1 text-sm text-slate-500">
                              Organizer: {event.organizer || "Not specified"}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                              {event.category && (
                                <span>{event.category}</span>
                              )}

                              {event.location && (
                                <span className="flex items-center gap-1">
                                  <FaMapMarkerAlt />
                                  {event.location}
                                </span>
                              )}

                              {event.date && (
                                <span className="flex items-center gap-1">
                                  <FaCalendarDay />
                                  {event.date}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Approval actions */}
                        {status === "Pending" ? (
                          <div className="flex shrink-0 gap-2 lg:justify-end">
                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(event.id, "Approved")
                              }
                              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                            >
                              Approve
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(event.id, "Rejected")
                              }
                              className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              updateStatus(event.id, "Pending")
                            }
                            className="self-start rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 lg:self-center"
                          >
                            Reset to Pending
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="px-5 py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <FaCalendarAlt size={23} />
                  </div>

                  <h3 className="mt-4 font-bold text-slate-800">
                    No events found
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {events.length === 0
                      ? "Organizer submissions will appear here."
                      : "Try changing your search or status filter."}
                  </p>

                  {(search || statusFilter !== "All") && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setStatusFilter("All");
                      }}
                      className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </section>

          <p className="mt-6 text-center text-xs text-slate-400">
            Local Event Hub · Admin Management Panel
          </p>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
