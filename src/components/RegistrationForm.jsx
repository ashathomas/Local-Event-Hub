import { useState } from "react";

function RegistrationForm({ event }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    people: "1",
  });

  const [errors, setErrors] = useState({});

  const [submitted, setSubmitted] =
    useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };

  const validate = () => {

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitted(true);

  };

  if (submitted) {

    return (
      <div className="rounded-2xl bg-green-50 p-6 text-center">

        <div className="text-4xl">
          🎉
        </div>

        <h3 className="mt-3 text-lg font-bold text-green-700">
          Registration Successful!
        </h3>

        <p className="mt-2 text-sm text-green-600">
          You have registered for{" "}
          <strong>{event.title}</strong>.
        </p>

      </div>
    );

  }

  return (
    <form onSubmit={handleSubmit}>

      <h3 className="mb-5 text-lg font-bold text-slate-800">
        Register for this event
      </h3>

      <div className="space-y-4">

        {/* Name */}

        <div>

          <label
            htmlFor="name"
            className="mb-2 block text-xs font-semibold text-slate-600"
          >
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
          />

          {errors.name && (
            <p className="mt-1 text-xs text-red-500">
              {errors.name}
            </p>
          )}

        </div>

        {/* Email */}

        <div>

          <label
            htmlFor="email"
            className="mb-2 block text-xs font-semibold text-slate-600"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
          />

          {errors.email && (
            <p className="mt-1 text-xs text-red-500">
              {errors.email}
            </p>
          )}

        </div>

        {/* Phone */}

        <div>

          <label
            htmlFor="phone"
            className="mb-2 block text-xs font-semibold text-slate-600"
          >
            Phone Number
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
          />

          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">
              {errors.phone}
            </p>
          )}

        </div>

        {/* People */}

        <div>

          <label
            htmlFor="people"
            className="mb-2 block text-xs font-semibold text-slate-600"
          >
            Number of People
          </label>

          <select
            id="people"
            name="people"
            value={formData.people}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
          >

            <option value="1">1 Person</option>
            <option value="2">2 People</option>
            <option value="3">3 People</option>
            <option value="4">4 People</option>
            <option value="5">5 People</option>

          </select>

        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
        >
          Register Now
        </button>

      </div>

    </form>
  );
}

export default RegistrationForm;