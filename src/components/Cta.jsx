import { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import searchBg from "../assets/searchbaground.jpg";
import ctaBg from "../assets/cta-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Morph background: search → CTA
      gsap.to(".cta-bg-new", {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      });

      // Fade out old background slightly
      gsap.to(".cta-bg-old", {
        opacity: 0.2,
        scale: 1.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      });

      // Content entrance
      gsap.from(".cta-content", {
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black py-40 px-20 max-md:px-6"
    >
      {/* 🌌 BACKGROUND STACK */}
      <div className="absolute inset-0">

        {/* OLD BG (LandingSearch look) */}
        <div
          className="cta-bg-old absolute inset-0"
          style={{
            backgroundImage: `url(${searchBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* NEW BG (CTA look) */}
        <div
          className="cta-bg-new absolute inset-0 opacity-0 scale-110 blur-[20px]"
          style={{
            backgroundImage: `url(${ctaBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        {/* Accent Glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-[200px]" />
      </div>

      {/* 🧠 CONTENT */}
      <div className="cta-content relative z-10 mx-auto max-w-4xl text-center">
        <p className="text-sm uppercase tracking-widest text-white/50">
          ⟡ Ready
        </p>

        <h2 className="mt-6 text-5xl font-bold text-white max-md:text-3xl">
          Discover Cars That <br /> Match Your Drive
        </h2>

        <p className="mt-6 text-lg text-white/60">
          Browse detailed specs, performance insights, and find the car
          that fits your lifestyle.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex justify-center gap-6 max-md:flex-col">
          <button
            onClick={() => navigate("/cars")}
            className="
              rounded-full bg-red-600 px-10 py-5
              text-lg font-medium text-white
              transition hover:bg-red-500 hover:scale-105
            "
          >
            Explore All Cars →
          </button>

          <button
            onClick={() => navigate("/search")}
            className="
              rounded-full border border-white/30 px-10 py-5
              text-lg font-medium text-white
              transition hover:bg-white/10
            "
          >
            Advanced Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
