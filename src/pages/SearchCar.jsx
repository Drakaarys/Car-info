import { useSearchParams, Link } from "react-router-dom";
import { cars } from "../data/cars";
import {
  safeLower,
  getCarName,
  getCategory,
  getCarSlug,
} from "../utils/carHelpers";
import NavBar from "../components/Navbar";
import OtherNav from "../components/OtherNav";

/* Stable image resolver */
const getCarImage = (car) => {
  if (car.images?.thumbnail) return car.images.thumbnail;

  return "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80";
};

const SearchCar = () => {
  const [searchParams] = useSearchParams();
  const query = safeLower(searchParams.get("q"));

  const carsWithMeta = cars.map((car) => ({
    ...car,
    name: getCarName(car),
    category: getCategory(car),
  }));

  const filteredCars = carsWithMeta.filter((car) => {
    const text = [
      car.name,
      car.brand,
      car.model,
      car.variant,
      car.fuelType,
      car.bodyType,
      car.category,
    ]
      .map(safeLower)
      .join(" ");

    return text.includes(query);
  });

  return (
    <>
      {/* <NavBar /> */}
      <OtherNav />

      <section className="min-h-screen bg-[#0b0b0b] px-20 py-32 max-md:px-6">
        {/* HEADER */}
        <div className="mb-16 text-center">
          <p className="text-sm uppercase tracking-widest text-white/50">
            ⟡ Results
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white">
            Results for “{query || "all"}”
          </h1>
        </div>

        {/* NO RESULTS */}
        {filteredCars.length === 0 ? (
          <p className="text-center text-gray-400">
            No cars found matching your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {filteredCars.map((car) => (
              <Link
                key={car.id}
                to={`/cars/${getCarSlug(car)}`}
                className="group relative flex min-h-[260px] overflow-hidden rounded-3xl bg-white/5 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:bg-white/10"
              >
                {/* LEFT CONTENT */}
                <div className="relative z-10 flex w-2/5 flex-col justify-center px-10 py-10 max-md:w-full max-md:px-6">
                  <p className="mb-2 text-xs uppercase tracking-widest text-white/40">
                    {car.category}
                  </p>

                  <h3 className="text-3xl font-semibold text-white">
                    {car.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-400">
                    {car.variant || "Standard Variant"}
                  </p>

                  <div className="mt-6 flex gap-4 text-sm text-white/60">
                    <span>{car.fuelType}</span>
                    <span>•</span>
                    <span>{car.bodyType}</span>
                  </div>

                  <div className="mt-8 inline-flex items-center gap-2 text-sm text-white/70">
                    <span className="opacity-60">Explore details</span>
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative w-3/5 overflow-hidden max-md:hidden">
                  <img
                    src={getCarImage(car)}
                    alt={car.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/40 via-black/10 to-transparent" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default SearchCar;
