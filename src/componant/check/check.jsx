import React, { useEffect, useRef, useState } from "react";
import "./check.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swal from "sweetalert2";

gsap.registerPlugin(ScrollTrigger);

function Check() {
  const [inputValues, setInputValues] = useState("");
  const checkRef = useRef(null);

  const handleInputChange = (e) => setInputValues(e.target.value);

  const handlePredict = async () => {
    if (!inputValues || inputValues.trim() === "") {
      Swal.fire({ title: "يرجى إدخال 60 قيمة مفصولة بفواصل", icon: "error" });
      return;
    }

    const userValues = inputValues
      .split(",")
      .map((value) => parseFloat(value.trim()))
      .filter((value) => !isNaN(value));

    if (userValues.length !== 60) {
      Swal.fire({ title: "Please enter 60 values separated by (,)", icon: "error" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_data: userValues }),
      });

      const result = await response.json();

      if (response.ok) {
        const prediction = result.prediction;
        const accuracy = result.accuracy;

        // طباعة الدقة في وحدة التحكم في المتصفح
        console.log(`Model Accuracy: ${(accuracy * 100).toFixed(2)}%`);

        // عرض النتيجة مع الدقة في SweetAlert2
        Swal.fire({
          title: `${
            prediction === "R" ? "This is Rock" : "This is Mine, Be careful!"
          }`,
          text: `Model Accuracy: ${(accuracy * 100).toFixed(2)}%`,
          icon: prediction === "R" ? "success" : "warning",
        });
      } else {
        throw new Error(result.error || "خطأ في الاتصال بالخادم");
      }
    } catch (error) {
      Swal.fire({ title: "The model is still loading!", icon: "error" });
      console.error(error);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      checkRef.current,
      { scale: 0.7, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: checkRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <>
      <div id="check" className="check" ref={checkRef}>
        <h1> Enter Coordinates</h1>
        <p>To check the safety of the coordinates</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter 60 values separated by (,), then press Predict"
            value={inputValues}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handlePredict} className="btn-17">
          <span className="text-container">
            <span className="text">Predict</span>
          </span>
        </button>
      </div>
      <svg
        width="100%"
        height="100%"
        id="svg"
        viewBox="0 0 1440 590"
        xmlns="http://www.w3.org/2000/svg"
        className="transition duration-300 ease-in-out delay-150 waves"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="5%" stopColor="#0693e3" />
            <stop offset="95%" stopColor="#8ED1FC" />
          </linearGradient>
        </defs>
        <path
          d="M 0,600 L 0,150 C 55.49103465285485,151.72544086817118 110.9820693057097,153.45088173634232 165,142 C 219.0179306942903,130.54911826365768 271.56275743001606,105.92191392280182 322,121 C 372.43724256998394,136.07808607719818 420.76690097422613,190.86146257245036 477,201 C 533.2330990257739,211.13853742754964 597.3696386730793,176.63223578739672 655,159 C 712.6303613269207,141.36776421260328 763.7545443334566,140.60959427796274 813,142 C 862.2454556665434,143.39040572203726 909.6121839930943,146.92938710075228 964,164 C 1018.3878160069057,181.07061289924772 1079.7967196941668,211.67285731902825 1140,215 C 1200.2032803058332,218.32714268097175 1259.200937230238,194.37918362313476 1309,179 C 1358.799062769762,163.62081637686524 1399.399531384881,156.81040818843263 1440,150 L 1440,600 L 0,600 Z"
          stroke="none"
          strokeWidth="0"
          fill="url(#gradient)"
          fillOpacity="0.53"
          className="transition-all duration-300 ease-in-out delay-150 path-0"
        />
        <path
          d="M 0,600 L 0,350 C 49.86498951781971,340.18039215686275 99.72997903563942,330.3607843137255 147,321 C 194.27002096436058,311.6392156862745 238.94507337526204,302.73725490196074 291,317 C 343.05492662473796,331.26274509803926 402.4897274633124,368.69019607843137 458,379 C 513.5102725366876,389.30980392156863 565.0960167714885,372.5019607843137 627,369 C 688.9039832285115,365.4980392156863 761.1262054507339,375.30196078431374 811,379 C 860.8737945492661,382.69803921568626 888.3991614255764,380.2901960784314 946,375 C 1003.6008385744236,369.7098039215686 1091.2771488469602,361.5372549019608 1146,341 C 1200.7228511530398,320.4627450980392 1222.4922431865828,287.5607843137255 1266,287 C 1309.5077568134172,286.4392156862745 1374.7538784067087,318.2196078431373 1440,350 L 1440,600 L 0,600 Z"
          stroke="none"
          strokeWidth="0"
          fill="url(#gradient)"
          fillOpacity="1"
          className="transition-all duration-300 ease-in-out delay-150 path-1"
        />
      </svg>
    </>
  );
}

export default Check;