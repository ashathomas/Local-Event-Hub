import {
  FaCalendarAlt,
  FaHeart,
  FaBars,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-[72px] border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-full w-[90%] max-w-[1200px] items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <FaCalendarAlt />
          </div>

          <span className="text-[17px] font-extrabold text-slate-800">
            Local Event Hub
          </span>
        </Link>

        {/* Navigation */}

        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600"
          >
            Home
          </Link>

          <Link
            to="/events"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600"
          >
            Events
          </Link>

          <a
            href="/#categories"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600"
          >
            Categories
          </a>

          <a
            href="/#about"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600"
          >
            About
          </a>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <Link
            to="/favorites"
            className="text-lg text-slate-500 hover:text-indigo-600"
            aria-label="Favorites"
          >
            <FaHeart />
          </Link>

          <button className="hidden rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 sm:block">
            Sign In
          </button>

          <button className="text-xl text-slate-600 md:hidden">
            <FaBars />
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;