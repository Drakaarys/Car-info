import React from "react";
import Featured from "../components/Features";
import Hero from "../components/Hero";
import Categories from "../components/categories";
import LandingSearch from "../components/LandingSearch";
import CTA from "../components/Cta";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const landing = () => {
  return (
    <div className="relative min-h-screen w-screen overflox-x-hidden">
      <NavBar />

      <section id="home">
        <Hero />
      </section>

      <section id="featured">
        <Featured />
      </section>

      <section id="categories">
        <Categories />
      </section>

      <section id="search">
        <LandingSearch />
      </section>

      <section id="explore">
        <CTA />
      </section>

      <section id="contact">
        <Footer />
      </section>


    </div>
  );
};

export default landing;
