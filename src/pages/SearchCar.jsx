import { useSearchParams } from "react-router-dom";
import { cars } from "../data/cars";
import { safeLower, getCarName, getCategory } from "../utils/carHelpers";

const getCarImage = (car) => {
  if (car.images?.thumbnail) {
    return car.images.thumbnail;
  }
  const query = `${car.brand} ${car.model} car`;
  return `https://source.unsplash.com/600x400/?${encodeURIComponent(query)}`;
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
    <section className="min-h-screen bg-[#0b0b0b] px-20 py-32 max-md:px-6">
      {/* Header */}
      <div className="mb-16">
        <p className="text-sm uppercase tracking-widest text-white/50 text-center">
          ⟡ Results
        </p>
        <h1 className="mt-4 text-4xl font-bold text-white text-center">
          Results for “{query || "all"}”
        </h1>
      </div>

      {filteredCars.length === 0 ? (
        <p className="text-gray-400 text-center">
          No cars found matching your search.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="group overflow-hidden rounded-2xl bg-white/5 backdrop-blur transition hover:-translate-y-2"
            >
              {/* IMAGE */}
              <img
                src={getCarImage(car)}
                alt={car.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1503376780353-7e6692767b70";
                }}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="text-xl text-white">
                  {car.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {car.variant || "Standard"}
                </p>
                <p className="mt-2 text-sm text-white/70 capitalize">
                  {car.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchCar;
