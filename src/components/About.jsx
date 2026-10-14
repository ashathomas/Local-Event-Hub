import Navbar from "./Navbar";
import {
  FaCalendarAlt,
  FaHeart,
  FaUsers,
  FaCalendarPlus,
} from "react-icons/fa";

const features = [
  {
    icon: <FaCalendarAlt />,
    title: "Discover Events",
    description:
      "Explore music festivals, workshops, sports, and cultural events.",
  },
  {
    icon: <FaHeart />,
    title: "Save Favorites",
    description:
      "Save your favorite events and find them whenever you need.",
  },
  {
    icon: <FaCalendarPlus />,
    title: "Organize Events",
    description:
      "Give event organizers a convenient way to submit and manage events.",
  },
  {
    icon: <FaUsers />,
    title: "Connect Communities",
    description:
      "Bring people together through local activities and experiences.",
  },
];

function About() {
  return (
     <div className="min-h-screen bg-slate-50">
          <Navbar />
    
    <section
      id="about"
      className="bg-white px-5 py-16 sm:px-8 sm:py-20"
    >

       
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          {/* <span className="rounded-full bg-indigo-50 px-4 py-2
            text-sm font-semibold text-indigo-600">
            About Us
          </span> */}

          <h2 className="mt-5 text-3xl font-extrabold
            text-slate-900 sm:text-4xl">
            Discover Your Next
            <span className="text-indigo-600">
              {" "}Great Experience
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600">
            Local Event Hub makes it easier to discover local events,
            connect with your community, and create memorable
            experiences. Find everything from music festivals and
            technology workshops to sports and cultural celebrations
            in one place.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2
          lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-slate-100
                bg-slate-50 p-6 transition hover:-translate-y-1
                hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center
                justify-center rounded-xl bg-indigo-100
                text-xl text-indigo-600">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-indigo-600 px-6
          py-10 text-center text-white sm:px-12">
          <h3 className="text-2xl font-bold">
            Be Part of Your Local Community
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6
            text-indigo-100">
            Discover something new, meet people who share your
            interests, and make every event an experience to remember.
          </p>

          <a
            href="/events"
            className="mt-6 inline-flex rounded-xl bg-white
              px-6 py-3 font-semibold text-indigo-600
              transition hover:bg-indigo-50"
          >
            Explore Events
          </a>
        </div>
      </div>
    </section>
     </div>
  );
}

export default About;