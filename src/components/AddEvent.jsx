
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaArrowLeft,
  FaImage,
  FaMapMarkerAlt,
  FaClock,
  FaAlignLeft,
  FaTag,
  FaCheckCircle,
} from "react-icons/fa";

import Navbar from "../components/Navbar";

const initialForm = {
  title: "",
  category: "",
  location: "",
  date: "",
  time: "",
  description: "",
  image: "",
};

function AddEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSuccess(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    }

    if (!formData.date) {
      newErrors.date = "Please select an event date.";
    }

    if (!formData.time) {
      newErrors.time = "Please select an event time.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Please enter a description.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newEvent = {
      id: Date.now(),
      ...formData,
      title: formData.title.trim(),
      location: formData.location.trim(),
      description: formData.description.trim(),
      image:
        formData.image.trim() ||
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
      status: "Pending",
    };

    // Save locally for this frontend demo.
    const existingEvents = JSON.parse(
      localStorage.getItem("organizerEvents") || "[]"
    );

    localStorage.setItem(
      "organizerEvents",
      JSON.stringify([...existingEvents, newEvent])
    );

    setSuccess(true);
    setFormData(initialForm);
    setErrors({});
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto w-[92%] max-w-4xl py-8 sm:py-10">
        {/* Back navigation */}
        <Link
          to="/organizer"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
        >
          <FaArrowLeft />
          Back to Dashboard
        </Link>

        {/* Form card */}
        <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-6 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FaCalendarAlt size={21} />
              </div>

              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">
                  Create New Event
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Fill in the details to add your event.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6 p-5 sm:p-8"
          >
            {/* Event title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Event Title <span className="text-red-500">*</span>
              </label>

              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? "title-error" : undefined}
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              {errors.title && (
                <p id="title-error" className="mt-1 text-xs text-red-600">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Category and location */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  <FaTag className="mr-2 inline text-indigo-600" />
                  Category <span className="text-red-500">*</span>
                </label>

                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.category)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="">Select category</option>
                  <option value="Music">Music</option>
                  <option value="Technology">Technology</option>
                  <option value="Sports">Sports</option>
                  <option value="Food">Food</option>
                  <option value="Culture">Culture</option>
                  <option value="Education">Education</option>
                </select>

                {errors.category && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  <FaMapMarkerAlt className="mr-2 inline text-indigo-600" />
                  Location <span className="text-red-500">*</span>
                </label>

                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Kochi, Kerala"
                  aria-invalid={Boolean(errors.location)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                {errors.location && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.location}
                  </p>
                )}
              </div>
            </div>

            {/* Date and time */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="date"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  <FaCalendarAlt className="mr-2 inline text-indigo-600" />
                  Date <span className="text-red-500">*</span>
                </label>

                <input
                  id="date"
                  type="date"
                  name="date"
                  min={new Date().toLocaleDateString("en-CA")}
                  value={formData.date}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.date)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                {errors.date && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.date}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  <FaClock className="mr-2 inline text-indigo-600" />
                  Time <span className="text-red-500">*</span>
                </label>

                <input
                  id="time"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.time)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                {errors.time && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.time}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                <FaAlignLeft className="mr-2 inline text-indigo-600" />
                Description <span className="text-red-500">*</span>
              </label>

              <textarea
                id="description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell people what makes this event special..."
                aria-invalid={Boolean(errors.description)}
                className="w-full resize-y rounded-lg border border-slate-200 px-4 py-3 text-sm leading-6 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              {errors.description && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                <FaImage className="mr-2 inline text-indigo-600" />
                Event Image URL
                <span className="ml-2 text-xs font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              <input
                id="image"
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/event-image.jpg"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              {formData.image && (
                <img
                  src={formData.image}
                  alt="Event preview"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.display = "block";
                  }}
                  className="mt-4 h-40 w-full rounded-xl object-cover"
                />
              )}
            </div>

            {/* Success message */}
            {success && (
              <div
                role="status"
                className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
              >
                <FaCheckCircle className="mt-0.5 shrink-0 text-green-600" />
                <div>
                  <p className="font-bold">Event saved successfully!</p>
                  <p className="mt-1">
                    Your event has been saved in this browser as Pending
                    approval.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/organizer")}
                    className="mt-2 font-bold underline"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <Link
                to="/organizer"
                className="rounded-xl border border-slate-200 px-6 py-3 text-center text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Event
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AddEvent;
