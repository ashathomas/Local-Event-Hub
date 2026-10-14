


// import { useEffect, useState } from "react";
// import {
//   FaCalendarAlt,
//   FaHeart,
//   FaBars,
//   FaMoon,
//   FaSun,
//   FaTimes,
// } from "react-icons/fa";

// import { Link } from "react-router-dom";

// function Navbar() {
//   const [isDark, setIsDark] = useState(() => {
//     return localStorage.getItem("theme") === "dark";
//   });

//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", isDark);
//     localStorage.setItem("theme", isDark ? "dark" : "light");
//   }, [isDark]);

//   const navLinkClass =
//     "text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400";

//   return (
//     <nav className="sticky top-0 z-50 min-h-[72px] border-b border-gray-100 bg-white transition-colors dark:border-gray-700 dark:bg-gray-900">
//       <div className="mx-auto flex min-h-[72px] w-[90%] max-w-[1200px] items-center justify-between gap-3">

//         {/* Logo */}
//         <Link
//           to="/"
//           onClick={() => setMenuOpen(false)}
//           className="flex shrink-0 items-center gap-2.5"
//         >
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
//             <FaCalendarAlt />
//           </div>

//           <span className="text-[15px] font-extrabold text-slate-800 sm:text-[17px] dark:text-white">
//             Local Event Hub
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden items-center gap-8 md:flex">
//           <Link to="/" className={navLinkClass}>
//             Home
//           </Link>

//           <Link to="/events" className={navLinkClass}>
//             Events
//           </Link>

//           <a href="/#categories" className={navLinkClass}>
//             Categories
//           </a>

//           <a href="/#about" className={navLinkClass}>
//             About
//           </a>
//         </div>

//         {/* Right Side */}
//         <div className="flex shrink-0 items-center gap-3 sm:gap-4">

//           {/* Favorites */}
//           <Link
//             to="/favorites"
//             aria-label="Favorites"
//             className="text-lg text-slate-500 transition hover:text-indigo-600 dark:text-slate-300"
//           >
//             <FaHeart />
//           </Link>

//           {/* Dark Mode */}
//           <button
//             type="button"
//             onClick={() => setIsDark((previous) => !previous)}
//             aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
//             title={isDark ? "Light Mode" : "Dark Mode"}
//             className="rounded-full p-2 text-lg text-slate-600 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-yellow-300 dark:hover:bg-gray-800"
//           >
//             {isDark ? <FaSun /> : <FaMoon />}
//           </button>

//           {/* Sign In */}
//           <Link
//   to="/signin"
//   className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
// >
//   Sign In
// </Link>

//           {/* Mobile Menu Toggle */}
//           <button
//             type="button"
//             onClick={() => setMenuOpen((previous) => !previous)}
//             aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
//             aria-expanded={menuOpen}
//             className="text-xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:hidden dark:text-white"
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {menuOpen && (
//         <div className="border-t border-gray-100 bg-white px-[5%] py-4 md:hidden dark:border-gray-700 dark:bg-gray-900">
//           <div className="flex flex-col gap-4">
//             <Link
//               to="/"
//               onClick={() => setMenuOpen(false)}
//               className={navLinkClass}
//             >
//               Home
//             </Link>

//             <Link
//               to="/events"
//               onClick={() => setMenuOpen(false)}
//               className={navLinkClass}
//             >
//               Events
//             </Link>

//             <a
//               href="/#categories"
//               onClick={() => setMenuOpen(false)}
//               className={navLinkClass}
//             >
//               Categories
//             </a>

//             <a
//               href="/#about"
//               onClick={() => setMenuOpen(false)}
//               className={navLinkClass}
//             >
//               About
//             </a>

//             <Link
//               to="/favorites"
//               onClick={() => setMenuOpen(false)}
//               className={navLinkClass}
//             >
//               Favorites
//             </Link>

//             <button
//               type="button"
//               className="w-fit rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
//             >
//               Sign In
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;






import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaHeart,
  FaBars,
  FaMoon,
  FaSun,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

const commonLinks = [
  { label: "Home", path: "/" },
  { label: "Events", path: "/events" },
  // { label: "Categories", path: "/#categories" },
  { label: "About", path: "/about" },
];

const roleLinks = {
  user: [],
  organizer: [
    { label: "Dashboard", path: "/organizer" },
    { label: "My Events", path: "/organizer/my-events" },
    // { label: "Add Event", path: "/organizer" },
  ],
  admin: [
    { label: "Dashboard", path: "/admin" },
    { label: "Manage Events", path: "/admin/events" },
    { label: "Categories", path: "/#categories" },
  ],
};

function Navbar({ favorites = [] }) {
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState(
    () => localStorage.getItem("localEventHubRole") || "guest"
  );

  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const [menuOpen, setMenuOpen] = useState(false);

  // Listen for sign-in and sign-out changes.
  useEffect(() => {
    function updateRole() {
      setUserRole(
        localStorage.getItem("localEventHubRole") || "guest"
      );
    }

    window.addEventListener("localEventHubAuthChange", updateRole);

    return () => {
      window.removeEventListener(
        "localEventHubAuthChange",
        updateRole
      );
    };
  }, []);

  // Apply and save the selected theme.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  function handleSignOut() {
    localStorage.removeItem("localEventHubRole");
    window.dispatchEvent(new Event("localEventHubAuthChange"));

    setMenuOpen(false);
    navigate("/");
  }

  const links =
    userRole === "guest"
      ? commonLinks
      : userRole === "user"
        ? commonLinks
        : roleLinks[userRole] || commonLinks;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex h-[72px] w-[90%] max-w-[1400px] items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex shrink-0 items-center gap-3"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
            <FaCalendarAlt size={21} />
          </span>

          <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-xl">
            Local Event Hub
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="text-sm font-medium text-slate-700 transition hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right-side actions */}
        <div className="hidden items-center gap-5 md:flex">
          {(userRole === "guest" || userRole === "user") && (

            <Link
              to="/favorites"
              aria-label={`Favorites: ${favorites.length}`}
              title="Favorites"
              className="relative text-slate-500 transition hover:text-indigo-600 dark:text-slate-300"
            >
              <FaHeart size={21} />

              {favorites.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {favorites.length}
                </span>
              )}
            </Link>

          )}

          {/* <button
            type="button"
            onClick={() => setIsDark((previous) => !previous)}
            aria-label={
              isDark ? "Switch to light mode" : "Switch to dark mode"
            }
            title={isDark ? "Light mode" : "Dark mode"}
            className="text-slate-600 transition hover:text-indigo-600 dark:text-slate-300"
          >
            {isDark ? <FaSun size={21} /> : <FaMoon size={21} />}
          </button> */}

          {userRole === "guest" ? (
            <Link
              to="/signin"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Sign In
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <FaSignOutAlt />
              Sign Out
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          className="text-xl text-slate-700 dark:text-white md:hidden"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-[5%] pb-5 pt-3 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}

            {(userRole === "guest" || userRole === "user") && (
              <Link
                to="/favorites"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <FaHeart className="mr-2 inline" />
                Favorites
              </Link>
            )}

            <button
              type="button"
              onClick={() => setIsDark((previous) => !previous)}
              className="rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {isDark ? <FaSun className="mr-2 inline" /> : <FaMoon className="mr-2 inline" />}
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>

            {userRole === "guest" ? (
              <Link
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-xl bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Sign In
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleSignOut}
                className="mt-2 rounded-xl bg-indigo-600 px-5 py-3 text-left text-sm font-semibold text-white"
              >
                <FaSignOutAlt className="mr-2 inline" />
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
