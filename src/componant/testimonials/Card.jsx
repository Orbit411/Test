import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import "./Card.css";
import image1 from "../../assets/image1-removebg-preview.png";
import radar from "../../assets/radar.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Card = () => {
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // أنيميشن الكارت الأول (من اليسار إلى اليمين)
    gsap.fromTo(
      card1Ref.current,
      { opacity: 0, x: -200 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card1Ref.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // أنيميشن الكارت الثاني (من اليمين إلى اليسار)
    gsap.fromTo(
      card2Ref.current,
      { opacity: 0, x: 200 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card2Ref.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // تحريك الصورة لأعلى وأسفل بشكل سلس
    gsap.to(imageRef.current, {
      y: 30, // يتحرك 20 بكسل لأعلى وأسفل
      duration: 2, // مدة الحركة
      repeat: -1, // تكرار لا نهائي
      yoyo: true, // التحرك للأمام والخلف بسلاسة
      ease: "power1.inOut", // جعل الحركة سلسة
    });

  }, []);


  return (
    <div id="inf" className="card-container">
      <div className="card" ref={card1Ref}>
        <img src={image1} alt="" className="card-image" ref={imageRef} />
        <div className="card-content">
          <h3 className="card-title">Mines</h3>
          <p className="card-text">
            Naval Mines Explosive devices placed in water to disrupt ships and
            submarines. Activated by contact or sensors.
          </p>
        </div>
      </div>
      <div className="card2" ref={card2Ref}>
        <Lottie animationData={radar} className="radar" loop={true} />
        <div className="card-content">
          <h3 className="card-title">Sonar</h3>
          <p className="card-text">
            Sonar technology uses sound waves to detect and identify objects in
            environments where visual detection is difficult, such as underwater.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
