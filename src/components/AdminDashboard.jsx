
import { useState } from "react";

const initialEvents = [
  {
    id: 1,
    title: "React Workshop",
    organizer: "Tech Events",
    status: "Pending",
  },
  {
    id: 2,
    title: "Music Festival",
    organizer: "City Events",
    status: "Pending",
  },
];

function AdminDashboard() {
  const [events, setEvents] = useState(initialEvents);

  function updateStatus(id, status) {
    setEvents((previous) =>
      previous.map((event) =>
        event.id === id ? { ...event, status } : event
      )
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold dark:text-white">
          Admin Dashboard
        </h1>

        <p className="my-3 text-slate-600 dark:text-slate-300">
          Review events submitted for approval.
        </p>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow dark:bg-slate-800">
            <p className="text-slate-500">Total Events</p>
            <p className="text-2xl font-bold dark:text-white">
              {events.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow dark:bg-slate-800">
            <p className="text-slate-500">Pending</p>
            <p className="text-2xl font-bold text-amber-600">
              {events.filter((e) => e.status === "Pending").length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow dark:bg-slate-800">
            <p className="text-slate-500">Approved</p>
            <p className="text-2xl font-bold text-green-600">
              {events.filter((e) => e.status === "Approved").length}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-xl bg-white p-5 shadow dark:bg-slate-800"
            >
              <h2 className="text-lg font-bold dark:text-white">
                {event.title}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Organizer: {event.organizer}
              </p>

              <p className="my-3">
                Status: <strong>{event.status}</strong>
              </p>

              {event.status === "Pending" && (
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => updateStatus(event.id, "Approved")}
                    className="rounded-lg bg-green-600 px-4 py-2 text-white"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(event.id, "Rejected")}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;