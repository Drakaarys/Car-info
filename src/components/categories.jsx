import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CategoryCard from "./CategoryCard";
import { categories } from "../data/categories";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Categories = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".category-card", {
        x: 120,          // from right
        y: 120,          // from bottom
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".categories-section",
          start: "top 30%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="categories-section relative w-full bg-[#010007] py-32">

      {/* Header */}
      <div className="mb-16 px-20 max-md:px-6 text-center">
        <AnimatedTitle
          title="⟡ Categories"
          containerClass="text-sm uppercase tracking-widest text-white/50"
        />
        <AnimatedTitle
          title=" Find Your <br /> Perfect Drive"
          containerClass="mt-4 text-5xl font-bold text-white max-md:text-3xl"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5 gap-8 px-40 max-md:grid-cols-1 max-md:px-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
