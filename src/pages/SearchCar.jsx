import { useSearchParams } from "react-router-dom";
import { cars } from "../data/cars";

const SearchCar = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const filteredCars = cars.filter((car) => {
    return (
      car.name.toLowerCase().includes(query) ||
      car.brand.toLowerCase().includes(query) ||
      car.category.toLowerCase().includes(query)
    );
  });

  return (
    <section className="min-h-screen bg-[#0b0b0b] px-20 py-32 max-md:px-6">

      {/* Header */}
      <div className="mb-16">
        <p className="text-sm uppercase tracking-widest text-white/50">
          ⟡ Results
        </p>
        <h1 className="mt-4 text-4xl font-bold text-white">
          Results for “{query}”
        </h1>
      </div>

      {/* No Results */}
      {filteredCars.length === 0 && (
        <p className="text-gray-400">
          No cars found matching your search.
        </p>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
        {filteredCars.map((car) => (
          <div
            key={car.id}
            className="group overflow-hidden rounded-2xl bg-white/5 backdrop-blur transition hover:-translate-y-2"
          >
            <img
              src={car.image}
              alt={car.name}
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="p-5">
              <h3 className="text-xl text-white">{car.name}</h3>
              <p className="text-sm text-gray-400">{car.brand}</p>
              <p className="mt-2 text-sm text-white/70 capitalize">
                {car.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchCar;
