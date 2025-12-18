import FeaturedCard from "./FeaturedCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";

import v1 from "../assets/911.mp4";
import v2 from "../assets/bmw-m3.mp4";
import v3 from "../assets/mclaren-p1.mp4";
import bgpic from "../assets/background-img.png";

gsap.registerPlugin(ScrollTrigger);

const featuredCars = [
  {
    id: 3,
    name: "Mclaren P1",
    tagline: "Dominating Beauty",
    video:v3,
  },
//     {
//     id: 1,
//     name: "Porsche 911",
//     tagline: "Precision Perfected",
//     video:v1,
//   },
  {
    id: 2,
    name: "BMW M3",
    tagline: "Unleashed Performance",
    video:v2,
  },
];


const Featured = () => {

    useGSAP(() => {
  gsap.to(".featured-section", {
    // backgroundColor: "#262626ff",
    backgroundImage: `url(${bgpic})`,
    duration: 2,
    color:"#3e0101ff",
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#abab",
      start: "top center",
      end: "bottom center",
      scrub: true,
    },
  });
  gsap.to(".featured-section h2", {
  color: "#EDEDED",
  textShadow: "0 0 20px rgba(135,5,5,0.6)",
  duration: 2,
  scrollTrigger: {
    trigger: "#abab",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
  
});
});

  return (
    <div className="featured-section bg-cover bg-center bg-no-repeat min-h-screen">

  <section className="relative w-full py-32">

    {/* Section Header */}
    <div className="mb-16 px-20 max-md:px-6">
      {/* <p className="text-sm uppercase tracking-widest text-black/60 text-center">
        ⟡ Featured */}
        <AnimatedTitle
  title="⟡ Featured"
  containerClass="text-sm uppercase tracking-widest text-black/60 text-center"
/>

      {/* </p> */}
      {/* <h2 className="mt-4 text-5xl font-bold text-black max-md:text-3xl text-center">
        Handpicked <br /> Performance Icons
      </h2> */}
      <AnimatedTitle
  title=" Handpicked <br /> Performance Icons"
  containerClass="mt-4 text-5xl font-bold text-pink max-md:text-3xl text-center"
/>
    </div>
    <br></br>
    <br></br>
    {/* <br></br> */}

    <div id="abab"></div>

    {/* Cards */}
    <div className="relative flex flex-col gap-8 px-20 max-md:px-6">
      {featuredCars.map((car, index) => (
        <div
          key={car.id}
          className={`flex ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          <FeaturedCard car={car} />
        </div>
      ))}
    </div>

  </section>
</div>

  );
};

export default Featured;
