import { useSearchParams } from "react-router-dom";
import { cars } from "../data/cars";
import { getCarName, getCategory } from "../utils/carHelpers";

const getCarImage = (car) => {
  if (car.images?.thumbnail) {
    return car.images.thumbnail;
  }
  const query = `${car.brand} ${car.model} car`;
  return `https://source.unsplash.com/600x400/?${encodeURIComponent(query)}`;
};

const Cars = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const carsWithMeta = cars.map((car) => ({
    ...car,
    name: getCarName(car),
    category: getCategory(car),
  }));

  const filteredCars = category
    ? carsWithMeta.filter((car) => car.category === category)
    : carsWithMeta;

  return (
    <section className="min-h-screen bg-[#0b0b0b] px-20 py-32 max-md:px-6">
      <h1 className="mb-12 text-4xl font-bold text-white capitalize">
        {category ? `${category} cars` : "All Cars"}
      </h1>

      {filteredCars.length === 0 ? (
        <p className="text-gray-400">No cars found.</p>
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
                  {car.brand}
                </p>

                <p className="mt-2 text-sm text-white/80">
                  ₹ {car.price.min.toLocaleString()}
                </p>

                <span className="mt-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-white capitalize">
                  {car.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Cars;
