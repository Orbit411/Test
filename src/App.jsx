import "./App.css";
import About from "./componant/About/About";
import HeroSection from "./componant/HeroSection/HeroSection";
import Navbar from "./componant/navbar/Navbar";
import Card from "./componant/testimonials/Card";
import Check from "./componant/check/check";
import Testimonials from "./componant/testimonials/Card";

function App() {
  
  return (
    <>
  <div className="cont">
        <Navbar />
        <HeroSection />
    
        <Card />
        <About />
        <Check/>
  </div>
    </>
  );
}

export default App;
