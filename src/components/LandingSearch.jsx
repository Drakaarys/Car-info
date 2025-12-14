import { useState, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgaa from "../assets/searchbaground.jpg";

gsap.registerPlugin(ScrollTrigger);

const LandingSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Background reveal animation
      gsap.from(".search-bg", {
        scale: 1.15,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Search card animation
      gsap.from(".search-card", {
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="landing-search"
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* 🌌 BACKGROUND */}
      <div
        className="search-bg absolute inset-0"
        style={{
          backgroundImage: `url(${bgaa})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black" />

        {/* Accent glow */}
        <div className="absolute top-1/3 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-red-600/20 blur-[180px]" />

        {/* Final dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 🧠 CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-20 max-md:px-6">
        <div
          className="
            search-card w-full max-w-4xl
            rounded-[32px]
            border border-white/15
            bg-black/40
            p-16
            shadow-[0_0_80px_rgba(255,0,0,0.15)]
            max-md:p-8
          "
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-widest text-white/50">
              ⟡ Global Search
            </p>
            <h2 className="mt-4 text-5xl font-bold text-white max-md:text-3xl">
              Find Any Car <br /> Instantly
            </h2>
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-4 max-md:flex-col"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, brand, or category…"
              className="
                w-full flex-1
                rounded-full
                bg-black/60
                px-8 py-5
                text-lg text-white
                placeholder-white/40
                outline-none
                border border-white/20
                focus:border-red-500
                focus:ring-2 focus:ring-red-500/30
                transition
              "
            />

            <button
              type="submit"
              className="
                rounded-full
                bg-red-600
                px-10 py-5
                text-lg font-medium text-white
                transition
                hover:bg-red-500 hover:scale-105
                max-md:w-full
              "
            >
              Search →
            </button>
          </form>

          {/* Hint */}
          <p className="mt-8 text-center text-sm text-white/40">
            Try:{" "}
            <span className="text-white/70">Tesla</span>,{" "}
            <span className="text-white/70">SUV</span>,{" "}
            <span className="text-white/70">Sports</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LandingSearch;
