import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useGSAP } from "@gsap/react";
const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [color, setcolor] = useState(true);
  const navContainerRef=useRef(null)
  const navLinksRef = useRef(null);

  const [lastScrollY, setLastScrollY] = useState(0);
  
  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
      // إزالة الكلاس "changecolor" عندما يعود التمرير إلى أعلى
      
  setcolor(false)
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
      // إضافة الكلاس "changecolor" عندما نمر لأسفل
      setcolor(true)
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
      // إضافة الكلاس "changecolor" عندما نمر لأعلى
      setcolor(true)
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
      <ul className="nav-links" ref={navLinksRef}>
        <li>
          <a  style={{ color:!color? "black":"white" }}  href="#about">About</a>
        </li>
        <li>
          <a style={{ color:!color? "black":"white" }} href="#inf">Cards</a>
        </li>
        <li>
          <a  style={{ color:!color? "black":"white" }} href="#check">Check</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
