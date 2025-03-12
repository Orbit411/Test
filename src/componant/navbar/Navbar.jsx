import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useGSAP } from "@gsap/react";
const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const navContainerRef=useRef(null)
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const { y: currentScrollY } = useWindowScroll();

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

  // تأثير الحركة باستخدام GSAP
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });

    
  }, [isNavVisible]);




  return (
    <nav ref={navContainerRef} className="navbar">
      <ul className="nav-links">
        <li>
          <a href="#home">About</a>
        </li>
        <li>
          <a href="#about">Cards</a>
        </li>
        <li>
          <a href="#contact">Check</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
