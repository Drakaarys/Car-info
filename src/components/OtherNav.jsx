import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";

import logo from "../assets/logo.jpg";
import Button from "./Button";

const navItems = ["Home", "Featured", "Categories", "Search", "Explore", "Contact"];

const OtherNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  /* 🔥 CORE FIX */
  const goToSection = (id) => {
    const scroll = () => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 100); // wait for Landing to mount
    } else {
      scroll();
    }
  };

  /* AUDIO */
  useEffect(() => {
    const audio = audioElementRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isAudioPlaying]);

  /* NAV VISIBILITY */
  const lastScrollYRef = useRef(0);

useEffect(() => {
  if (!navContainerRef.current) return;

  const lastY = lastScrollYRef.current;

  if (currentScrollY === 0) {
    setIsNavVisible(true);
    navContainerRef.current.classList.remove("floating-nav");
  } else if (currentScrollY > lastY) {
    setIsNavVisible(false);
    navContainerRef.current.classList.add("floating-nav");
  } else {
    setIsNavVisible(true);
    navContainerRef.current.classList.add("floating-nav");
  }

  lastScrollYRef.current = currentScrollY;
}, [currentScrollY]);


  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* LEFT */}
          <div className="flex items-center gap-7">
            <img src={logo} alt="logo" className="w-10 rounded-full" />

            <Button
              title="Let Your Choice Roar"
              containerClass="md:flex hidden"
            />
          </div>

          {/* RIGHT */}
          <div className="flex items-center">
            <div className="hidden md:flex">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => goToSection(item.toLowerCase())}
                  className="nav-hover-btn"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* AUDIO */}
            <button
              onClick={toggleAudioIndicator}
              className="ml-8 flex items-center gap-1"
            >
              <audio
                ref={audioElementRef}
                src="/audio/loop.mp3"
                loop
                preload="auto"
                className="hidden"
              />

              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isAudioPlaying,
                  })}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default OtherNav;
