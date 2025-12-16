import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import logo from "../assets/logo.jpg";
import Button from "./Button";

const navItems = ["Home", "Featured", "Categories", "Search", "Explore", "Contact"];

const NavBar = () => {
  // State for toggling audio
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
  };

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};


  // Manage audio playback (FIXED)
  useEffect(() => {
    const audio = audioElementRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.play().catch((err) => {
        console.log("Audio play blocked:", err);
      });
    } else {
      audio.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and Product button */}
          <div className="flex items-center gap-7">
            <img src={logo} alt="logo" className="w-10 rounded-full" />

            <Button
              id="product-button"
              title="Let Your Choice Roar"
              // rightIcon={<TiLocationArrow />}
              containerClass="!bg-[ffffff] md:flex hidden items-center justify-center gap-1 "
            />
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <button
  key={index}
  onClick={() => scrollToSection(item.toLowerCase())}
  className="nav-hover-btn"
>
  {item}
</button>

              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-8 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
                preload="auto"
              />

              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isAudioPlaying,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
