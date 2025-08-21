"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Code,
  Cpu,
  Paintbrush,
  TrendingUp,
  Rocket,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const WhoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const cards = [
    {
      icon: Code,
      title: "Software Developers",
      description:
        "Backend, frontend, mobile, and full-stack developers building innovative applications and solutions.",
    },
    {
      icon: Cpu,
      title: "Hardware Engineers",
      description:
        "Electrical, electronic, and robotics engineers creating tangible solutions to real-world problems.",
    },
    {
      icon: Paintbrush,
      title: "Designers",
      description:
        "UI/UX, graphic, and product designers crafting beautiful, functional, and user-centered experiences.",
    },
    {
      icon: TrendingUp,
      title: "Data Scientists",
      description:
        "Analysts, ML engineers, and AI specialists turning data into insights and intelligent systems.",
    },
    {
      icon: Rocket,
      title: "Entrepreneurs",
      description:
        "Tech founders and innovators building startups and solutions to address local and global challenges.",
    },
    {
      icon: Settings,
      title: "Mechatronics Engineers",
      description:
        "Multidisciplinary engineers combining mechanical, electrical, and computing skills to build automated systems.",
    },
  ];

  // Responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3); // lg: 3 cards
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2); // md: 2 cards
      } else {
        setCardsPerView(1); // sm: 1 card
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          const maxSlide = Math.max(0, cards.length - cardsPerView);
          return prev >= maxSlide ? 0 : prev + 1;
        });
      }, 3000); // Changed to 3 seconds for more dynamic feel
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, cards.length, cardsPerView]);

  // Resume auto-play after user interaction
  useEffect(() => {
    if (!isAutoPlaying) {
      const resumeTimer = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 5000); // Resume after 5 seconds of inactivity

      return () => clearTimeout(resumeTimer);
    }
  }, [isAutoPlaying, currentSlide]);

  const maxSlide = Math.max(0, cards.length - cardsPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
    setIsAutoPlaying(false);
  };

  const goToSlide = (index:number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section
      id="who"
      className="py-20 bg-gray-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4">
        <h2 className="font-bold text-3xl md:text-4xl text-center mb-16 text-gray-900">
          Who Should Be in This?
        </h2>

        <div className="relative max-w-7xl mx-auto">
          {/* Carousel Container */}
          <div ref={carouselRef} className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentSlide * (100 / cardsPerView)
                }%)`,
              }}
            >
              {cards.map((card, index) => {
                const IconComponent = card.icon;

                return (
                  <div
                    key={index}
                    className={`flex-shrink-0 px-4 ${
                      cardsPerView === 1
                        ? "w-full"
                        : cardsPerView === 2
                        ? "w-1/2"
                        : "w-1/3"
                    }`}
                  >
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full">
                      <div className="text-yellow-600 text-3xl mb-4">
                        <IconComponent size={32} />
                      </div>

                      <h3 className="font-semibold text-xl mb-3 text-gray-900">
                        {card.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50 z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-yellow-600 scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Card Counter */}
        <div className="text-center mt-4 text-sm text-gray-500">
          {currentSlide + 1} of {maxSlide + 1}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default WhoCarousel;
