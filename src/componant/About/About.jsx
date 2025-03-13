import React, { useEffect, useRef } from "react";
import "./About.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image from "../../assets/Screenshot 2025-03-12 220352.jpg";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const aboutContainerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);

  const videoSrc =
    "https://res.cloudinary.com/dab3zstzc/video/upload/q_auto,w_1280,h_720,c_fill,f_auto/v1741808859/aazd62q4csyszp19zgzu.mp4";
  const posterImage = image;

  useEffect(() => {
    gsap.fromTo(
      aboutContainerRef.current,
      { scale: 1.3, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutContainerRef.current,
          start: "top 50%",
          toggleActions: "play none reverse none",
        },
      }
    );

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 2.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  return (
    <div id="about" className="about-container" ref={aboutContainerRef}>
      <video
        autoPlay
        loop
        muted
        className="background-video"
        loading="lazy"
        preload="metadata"
        poster={posterImage}
        onLoadedData={() => state(false)} // عند تحميل الفيديو، قم بتحديث `loading` إلى false
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <div className="about-content">
        <h2 className="about-title" ref={titleRef}>
          About Us
        </h2>
        <h3 className="about-subtitle" ref={subtitleRef}>
          Welcome To Our Website
        </h3>
        <p className="about-text" ref={textRef}>
          In this Website, sonar data is used to distinguish between regular
          rocks and underwater mines or metal objects. The goal is to train an
          AI model to recognize sonar reflection patterns and accurately
          classify objects. This technology is widely used in marine security,
          underwater exploration, and scientific research.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
