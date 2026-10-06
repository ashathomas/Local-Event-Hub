import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaCalendarAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer
      id="about"
      className="bg-[#111a38] text-white"
    >

      <div className="mx-auto grid w-[90%] max-w-[1200px] gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>

          <div className="mb-4 flex items-center gap-2 font-extrabold">
            <FaCalendarAlt />
            <span>Local Event Hub</span>
          </div>

          <p className="max-w-[230px] text-sm leading-6 text-slate-400">
            Discover exciting events happening
            around you.
          </p>

          <div className="mt-5 flex gap-2">

            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#202a4a] text-xs text-slate-300 transition hover:bg-indigo-600"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#202a4a] text-xs text-slate-300 transition hover:bg-indigo-600"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#202a4a] text-xs text-slate-300 transition hover:bg-indigo-600"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#202a4a] text-xs text-slate-300 transition hover:bg-indigo-600"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#202a4a] text-xs text-slate-300 transition hover:bg-indigo-600"
            >
              <FaYoutube />
            </a>

          </div>

        </div>

        {/* Quick Links */}
        <div>

          <h4 className="mb-5 text-sm font-bold">
            Quick Links
          </h4>

          <div className="space-y-3 text-sm text-slate-400">

            <a
              href="#home"
              className="block transition hover:text-white"
            >
              Home
            </a>

            <a
              href="#events"
              className="block transition hover:text-white"
            >
              Events
            </a>

            <a
              href="#categories"
              className="block transition hover:text-white"
            >
              Categories
            </a>

            <a
              href="#about"
              className="block transition hover:text-white"
            >
              About
            </a>

          </div>

        </div>

        {/* Categories */}
        <div>

          <h4 className="mb-5 text-sm font-bold">
            Categories
          </h4>

          <div className="space-y-3 text-sm text-slate-400">

            <p>Music</p>
            <p>Technology</p>
            <p>Sports</p>
            <p>Food</p>
            <p>Culture</p>

          </div>

        </div>

        {/* Contact */}
        <div>

          <h4 className="mb-5 text-sm font-bold">
            Contact
          </h4>

          <div className="space-y-3 text-sm text-slate-400">

            <p>✉ info@localeventhub.com</p>
            <p>📍 Kerala, India</p>
            <p>📞 +91 98765 43210</p>

          </div>

        </div>

      </div>

      <div className="border-t border-slate-700 py-5 text-center text-xs text-slate-500">
        © 2026 Local Event Hub. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;