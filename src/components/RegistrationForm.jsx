
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

function RegistrationForm({ event }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    participants: "1",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-green-100 bg-green-50 p-6">
          <FaCheckCircle className="text-3xl text-green-600" />

          <h3 className="mt-4 text-lg font-bold text-green-800">
            Registration Successful!
          </h3>

          <p className="mt-2 text-sm leading-6 text-green-700">
            Thank you for registering, {formData.name}!
            Your demo registration for {event.title} is complete.
          </p>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 text-sm font-semibold text-green-800 underline"
          >
            Register another participant
          </button>
        </div>

        <div className="rounded-xl bg-slate-50 p-5">
          <h3 className="font-bold text-slate-800">
            Registration Summary
          </h3>

          <p className="mt-4 text-sm text-slate-600">
            <strong>Name:</strong> {formData.name}
          </p>
          <p className="mt-2 break-words text-sm text-slate-600">
            <strong>Email:</strong> {formData.email}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Participants:</strong> {formData.participants}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <strong>Event:</strong> {event.title}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 md:grid-cols-2"
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Full Name *
          </span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Email *
          </span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Phone *
          </span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Number of Participants *
          </span>
          <select
            name="participants"
            value={formData.participants}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit Registration
        </button>
      </div>

      <div className="flex min-h-48 flex-col items-center justify-center rounded-xl bg-indigo-50 p-6 text-center">
        <FaCalendarAltPlaceholder />

        <h3 className="mt-3 text-lg font-bold text-slate-800">
          Register for this Event
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter your details to complete your registration for{" "}
          <strong>{event.title}</strong>.
        </p>
      </div>
    </form>
  );
}

function FaCalendarAltPlaceholder() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
      <span className="text-2xl">▦</span>
    </div>
  );
}

export default RegistrationForm;
