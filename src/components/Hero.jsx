import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ignitionVideo from "../assets/flame-gtr-4k.mp4";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // TEXT ANIMATION
      gsap.from(".hero-title span", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.06,
      });

      // VIDEO CLIP ANIMATION
      gsap.set("#video-frame", {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 45% 15%",
      });

      gsap.from("#video-frame", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0% 0% 0% 0%",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#video-frame",
          start: "center center",
          end: "bottom center",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative h-screen w-full">
  <div
    id="video-frame"
    className="relative z-20 h-full w-full overflow-hidden"
  >
    <video
      className="absolute inset-0 h-full w-full object-cover"
      src={ignitionVideo}
      autoPlay
      loop
      muted
      playsInline
    />

    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

    {/* TOP TEXT (CUT BY VIDEO) */}
    <div className="relative z-30 flex h-full items-center px-20">
      <h1 className="hero-title hero-front text-white text-[96px] leading-[1.1] font-bold max-md:text-5xl">
        {"S E A R C H .".replace(/ /g, "\u00A0").split("").map((c, i) => (
          <span key={i} className="inline-block">{c}</span>
        ))}
        <br />
        {"C O M P A R E .".replace(/ /g, "\u00A0").split("").map((c, i) => (
          <span key={i} className="inline-block">{c}</span>
        ))}
        <br />
        {"O B S E S S .".replace(/ /g, "\u00A0").split("").map((c, i) => (
          <span key={i} className="inline-block">{c}</span>
        ))}
      </h1>
    </div>
  </div>

  {/* HIDDEN TEXT (REVEALS ON SCROLL) */}
  <div className="absolute inset-0 z-10 flex h-full items-center px-20 pointer-events-none">
    <h1 className="hero-title hero-back text-black text-[96px] leading-[1.1] font-bold max-md:text-5xl">
      {"S E A R C H .".replace(/ /g, "\u00A0").split("").map((c, i) => (
          <span key={i} className="inline-block">{c}</span>
        ))}
        <br />
        {"C O M P A R E .".replace(/ /g, "\u00A0").split("").map((c, i) => (
          <span key={i} className="inline-block">{c}</span>
        ))}
        <br />
        {"O B S E S S .".replace(/ /g, "\u00A0").split("").map((c, i) => (
          <span key={i} className="inline-block">{c}</span>
        ))}
    </h1>
  </div>
</section>

    </>
  );
};

export default Hero;
