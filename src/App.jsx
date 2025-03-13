import React, { useState, useEffect } from "react";
import "./App.css";
import About from "./componant/About/About";
import HeroSection from "./componant/HeroSection/HeroSection";
import Navbar from "./componant/navbar/Navbar";
import Card from "./componant/testimonials/Card";
import Check from "./componant/check/check";
import Testimonials from "./componant/testimonials/Card";
import 'ldrs/ring';
import { trefoil } from 'ldrs';

trefoil.register();

function App() {
  // حالة لإظهار الـ loader
  const [isLoading, setIsLoading] = useState(true);

  // استخدام useEffect لبدء العد التنازلي لمدة 3 ثواني
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // إخفاء الـ loader بعد 3 ثواني
    }, 2000); // 3000ms = 3 ثواني

    // تنظيف الـ timer عندما يتم إزالة المكون
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        // عرض الـ loader إذا كانت الحالة isLoading = true
        <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex", // لضبط المحاذاة بشكل صحيح
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to bottom, #00aaff, #003366)", // تدرج لوني من الأزرق الفاتح إلى الأزرق الداكن
        }}
      >
        <l-trefoil
          size="100"
          stroke="4"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.4"
          color="white"
        ></l-trefoil>
      </div>
      ) : (
        // باقي محتوى التطبيق عندما لا تكون الحالة isLoading = false
        <div className="cont">
          <Navbar />
          <HeroSection />
          <Card />
          <About />
          <Check />
        </div>
      )}
    </>
  );
}

export default App;
