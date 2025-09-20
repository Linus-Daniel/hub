"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface Slide {
  src: string;
  alt: string;
}

const IntroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/bcfb72cf3a-fddb8803328c812a7c20.png",
      alt: "Nigerian female engineering student working on robotics project in university lab, focused and innovative",
    },
    {
      src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/9f7cfb852f-c197c168712a610cd2d8.png",
      alt: "Group of Nigerian students collaborating on software development, diverse team, modern tech environment",
    },
    {
      src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/1d9b5d6269-b13a82c21cd4d51f9f2f.png",
      alt: "Nigerian design student presenting creative work to peers, professional setting, enthusiasm and talent",
    },
    {
      src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/5b034a2d8c-04c33e70cfab5adfb8a9.png",
      alt: "Nigerian tech students at hackathon event, collaborative problem-solving, innovation showcase",
    },
  ];

  // Auto-advance slideshow every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleStoryClick = () => {
    // Add your story/video modal logic here
    console.log("Our Story clicked");
  };

  return (
    <section id="intro" className="py-20 bg-softgray section-clickable">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6 animate-slide-left">
              Meet Nigeria's Next 1,000 Builders
            </h2>
            <div className="space-y-4">
              <p className="text-lg">
                From the bustling labs of Lagos to the innovative hubs of Abuja,
                Christian students across Nigeria are creating the future.
              </p>
              <p className="text-lg">
                The CONCES National Talent Directory is the first comprehensive
                showcase of emerging tech, engineering and design talent from
                Christian higher institutions across Nigeria.
              </p>
              <p className="text-lg">
                Our mission: connect brilliant minds with opportunities that
                matter.
              </p>
            </div>
            <button
              id="story-btn"
              onClick={handleStoryClick}
              className="mt-8 flex items-center space-x-2 bg-navy text-white px-6 py-3 rounded-lg hover:bg-navy/80 transition-colors duration-300 section-clickable"
            >
              <Play size={16} />
              <span>Our Story</span>
            </button>
          </div>
          <div className="w-full md:w-1/2 relative h-[400px] rounded-lg overflow-hidden">
            <div id="slideshow" className="relative w-full h-full section-clickable">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={slide.src}
                    alt={slide.alt}
                  />
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full slideshow-dot ${
                    index === currentSlide ? "bg-white/80" : "bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;