import React from "react";
import { Typewriter } from "react-simple-typewriter";
import myImage from "../../assets/photo_2025-03-10_16-04-43.jpg";
import "./HeroSection.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";




const HeroSection = () => {


  useGSAP(() => {
    gsap.from('#pp',{
      opacity:0,
      y:30,
      duration:1.5,



    })
    gsap.set(".hero-container", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from(".hero-container", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".hero-container",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  })

  return (
    <div className="hero-container">
      <img src={myImage} alt="Sonar" className="hero-image" />
      <div className="hero-content">
        <h1 className="typing-text">
          <Typewriter
            words={['Testing Sonar', 'To Safe Us']}  // الكلمات التي سيتم كتابتها
            loop={0}  // عدد التكرارات
            cursor
            cursorStyle="|" // شكل المؤشر
            typeSpeed={100}  // سرعة الكتابة
            deleteSpeed={50}  // سرعة الحذف
            delaySpeed={1000}  // التأخير بين الكلمات
          />
        </h1>
        <p id="pp">Testing Sonar Rock Versus Mine Prediction</p>
      </div>
    </div>
  );
};

export default HeroSection;
