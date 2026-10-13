
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

 function handleSubmit(e) {
  e.preventDefault();

  if (!email.trim() || !password.trim()) {
    return;
  }

  localStorage.setItem("localEventHubRole", role);

  window.dispatchEvent(new Event("localEventHubAuthChange"));

  if (role === "user") {
    navigate("/");
  } else if (role === "organizer") {
    navigate("/organizer");
  } else if (role === "admin") {
    navigate("/admin");
  }
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 dark:bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800"
      >
        <h1 className="text-center text-3xl font-bold dark:text-white">
          Sign In
        </h1>

        <label className="block">
          <span className="text-sm dark:text-white">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-2 w-full rounded-lg border p-3 dark:bg-slate-700 dark:text-white"
          />
        </label>

        <label className="block">
          <span className="text-sm dark:text-white">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-2 w-full rounded-lg border p-3 dark:bg-slate-700 dark:text-white"
          />
        </label>

        <label className="block">
          <span className="text-sm dark:text-white">Sign in as</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-2 w-full rounded-lg border p-3 dark:bg-slate-700 dark:text-white"
          >
            <option value="user">User</option>
            <option value="organizer">Event Organizer</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 p-3 font-semibold text-white hover:bg-indigo-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;