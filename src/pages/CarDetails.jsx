import { useParams } from "react-router-dom";
import { cars } from "../data/cars";

import {
  getCarName,
  getCategory,
  getCarSlug,
} from "../utils/carHelpers";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavBar from "../components/Navbar";
import OtherNav from "../components/OtherNav";

gsap.registerPlugin(ScrollTrigger);


/* Stable image resolver */
const getCarImage = (car) =>
  car.images?.thumbnail ||
  `https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80`;

const formatLabel = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase());

const CarDetails = () => {

  const { slug } = useParams();

  const car = cars.find((c) => getCarSlug(c) === slug);

  if (!car) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Car not found
      </div>
    );
  }

  const name = getCarName(car);
  const category = getCategory(car);

  const galleryRef = useRef(null);

  useLayoutEffect(() => {
  if (!galleryRef.current) return;

  gsap.from(galleryRef.current.children, {
    opacity: 0,
    y: 60,
    stagger: 0.15,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: galleryRef.current,
      start: "top 80%",
    },
  });
}, []);



  return (
    <>

        {/* <NavBar /> */}
        <OtherNav />

      {/* HERO SECTION */}
      <section className="relative h-screen bg-black">
        <img
          src={getCarImage(car)}
          alt={name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="relative z-10 flex h-full items-end px-20 pb-24 max-md:px-6">
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-white/50">
              {category}
            </p>

            <h1 className="text-6xl font-bold text-white max-md:text-4xl">
              {name}
            </h1>

            <p className="mt-4 text-white/70">
              {car.variant || "Standard"} • {car.fuelType}
            </p>
          </div>
        </div>
      </section>

      


      {/* DETAILS SECTION */}
      <section className="bg-black px-20 py-4 max-md:px-6">
        <div className="grid grid-cols-2 gap-16 max-md:grid-cols-1">

          {/* SPECS */}
          <div>
            <h2 className="mb-6 text-3xl font-semibold text-white">
              Performance & Specs
            </h2>

            <ul className="space-y-4 text-white/70">
              <li>Engine: {car.engine?.displacementCC ?? "—"} cc</li>
              <li>Horsepower: {car.engine?.horsepower ?? "—"} hp</li>
              <li>Torque: {car.engine?.torqueNm ?? "—"} Nm</li>
              <li>Top Speed: {car.performance?.topSpeedKmph ?? "—"} km/h</li>
              <li>0–100: {car.performance?.zeroToHundred ?? "—"} s</li>
              <li>Mileage: {car.performance?.mileage ?? "—"} km/l</li>
            </ul>
          </div>

          {/* FEATURES */}
          <div>
            <h2 className="mb-6 text-3xl font-semibold text-white">
              Features
            </h2>

            {car.features && Object.values(car.features).some(Boolean) ? (
              <ul className="grid grid-cols-2 gap-4 text-white/70">
                {Object.entries(car.features).map(
                  ([key, value]) =>
                    value && (
                      <li key={key}>
                        {formatLabel(key)}
                      </li>
                    )
                )}
              </ul>
            ) : (
              <p className="text-white/40">
                No feature data available.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* GALLERY */}
<section ref={galleryRef} className="bg-black px-20 py-12 max-md:px-6">
  <h2 className="mb-10 text-3xl font-semibold text-white">
    Design Gallery
  </h2>

  <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide">
    {[car.images?.thumbnail, ...(car.images?.gallery || [])]
      .filter(Boolean)
      .map((img, index) => (
        <div
          key={index}
          className="group relative min-w-[420px] max-md:min-w-[300px] overflow-hidden rounded-3xl bg-white/5"
        >
          <img
            src={img}
            alt={`${car.brand} ${car.model} ${index + 1}`}
            loading="lazy"
            className="
              h-[280px] w-full object-cover
              transition-transform duration-700
              group-hover:scale-105
            "
          />

          {/* soft overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      ))}
  </div>
</section>
    </>
  );
};

export default CarDetails;
