import { useSearchParams } from "react-router-dom";
import { cars } from "../data/cars";

const Cars = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const filteredCars = category
    ? cars.filter((car) => car.category === category)
    : cars;

  return (
    <section className="min-h-screen bg-[#0b0b0b] px-20 py-32 max-md:px-6">
      <h1 className="mb-12 text-4xl font-bold text-white capitalize">
        {category ? `${category} cars` : "All Cars"}
      </h1>

      {filteredCars.length === 0 ? (
        <p className="text-gray-400">
          No cars found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="group overflow-hidden rounded-2xl bg-white/5"
            >
              <img
                src={car.image}
                alt={car.name}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-4">
                <h3 className="text-xl text-white">
                  {car.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {car.brand}
                </p>
                <p className="mt-2 text-sm text-white/80">
                  {car.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Cars;
