
import {
  FaThLarge,
  FaMusic,
  FaLaptopCode,
  FaFutbol,
  FaUtensils,
  FaPalette,
  FaGraduationCap,
} from "react-icons/fa";

function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}) {
  const categories = [
    {
      name: "All",
      icon: <FaThLarge />,
    },
    {
      name: "Music",
      icon: <FaMusic />,
    },
    {
      name: "Technology",
      icon: <FaLaptopCode />,
    },
    {
      name: "Sports",
      icon: <FaFutbol />,
    },
    {
      name: "Food",
      icon: <FaUtensils />,
    },
    {
      name: "Culture",
      icon: <FaPalette />,
    },
    {
      name: "Education",
      icon: <FaGraduationCap />,
    },
  ];

  return (
    <section
      id="categories"
      className="bg-white py-10"
    >
      <div className="mx-auto w-[90%] max-w-300">

        {/* Heading */}

        <div className="mb-6">
          <p className="text-[11px] font-extrabold tracking-[2px] text-indigo-600">
            EXPLORE
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-slate-800">
            Browse by Category
          </h2>
        </div>

        {/* Categories */}

        <div className="flex gap-3 overflow-x-auto pb-2">

          {categories.map((category) => {

            const isActive =
              selectedCategory === category.name;

            return (
              <button
                key={category.name}
                onClick={() =>
                  setSelectedCategory(category.name)
                }
                className={`flex min-w-fit items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition duration-200 ${
                  isActive
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-md"
                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                <span className="text-sm">
                  {category.icon}
                </span>

                {category.name}
              </button>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default CategoryFilter;