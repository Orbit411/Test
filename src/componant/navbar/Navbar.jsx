import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import gsap from "gsap";
import { useWindowScroll } from "react-use";

const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [color, setColor] = useState(true);
  const [hovered, setHovered] = useState(null); // لحفظ الرابط الذي تم التمرير عليه

  const navContainerRef = useRef(null);
  const navLinksRef = useRef(null);

  const [lastScrollY, setLastScrollY] = useState(0);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
      setColor(false);
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
      setColor(true);
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
      setColor(true);
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

  const handleMouseEnter = (index) => {
    setHovered(index); // تحديد الرابط الذي يتم التمرير عليه
  };

  const handleMouseLeave = () => {
    setHovered(null); // إعادة الحالة عند الخروج
  };

  return (
    <nav ref={navContainerRef} className="navbar">
      <ul className="nav-links" ref={navLinksRef}>
        <li>
          <a
            href="#inf"
            style={{
              color: hovered === 0 ? "#00aaff" : color ? "white" : "black",
            }}
            onMouseEnter={() => handleMouseEnter(0)}
            onMouseLeave={handleMouseLeave}
          >
            Cards
          </a>
        </li>
        <li>
          <a
            href="#about"
            style={{
              color: hovered === 1 ? "#00aaff" : color ? "white" : "black",
            }}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#check"
            style={{
              color: hovered === 2 ? "#00aaff" : color ? "white" : "black",
            }}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
          >
            Check
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
