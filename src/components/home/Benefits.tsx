"use client"
import React, { useState, useEffect, useRef } from "react";
import { Briefcase, Network, Award, HandHeart, Handshake } from "lucide-react";

const BenefitsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const benefits = [
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description:
        "Get discovered by top employers looking specifically for talent from Christian institutions.",
    },
    {
      icon: Network,
      title: "Networking",
      description:
        "Connect with peers, mentors, and industry professionals who share your values and vision.",
    },
    {
      icon: Award,
      title: "Recognition",
      description:
        "Gain visibility for your skills, projects, and achievements on a respected national platform.",
    },
    {
      icon: HandHeart,
      title: "Mentorship",
      description:
        "Access guidance and support from experienced professionals who want to help you grow.",
    },
    {
      icon: Handshake,
      title: "Partnerships",
      description:
        "Find collaborators for projects, startups, and initiatives aligned with your interests.",
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
          const maxSlide = Math.max(0, benefits.length - cardsPerView);
          return prev >= maxSlide ? 0 : prev + 1;
        });
      }, 4000); // Change slide every 4 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, benefits.length, cardsPerView]);

  // Resume auto-play after user interaction
  useEffect(() => {
    if (!isAutoPlaying) {
      const resumeTimer = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 6000); // Resume after 6 seconds of inactivity

      return () => clearTimeout(resumeTimer);
    }
  }, [isAutoPlaying, currentSlide]);

  const maxSlide = Math.max(0, benefits.length - cardsPerView);

  const goToSlide = (index:number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (!isAutoPlaying) return;
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const maxSlide = Math.max(0, benefits.length - cardsPerView);
        return prev >= maxSlide ? 0 : prev + 1;
      });
    }, 4000);
  };

  return (
    <section
      id="benefits"
      className="py-20 bg-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4">
        <h2 className="font-bold text-3xl md:text-4xl text-center mb-16 text-gray-900">
          Benefits of Being Listed
        </h2>

        <div className="relative max-w-7xl mx-auto">
          {/* Carousel Container */}
          <div ref={carouselRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentSlide * (100 / cardsPerView)
                }%)`,
              }}
            >
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;

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
                    <div className="bg-gray-50 rounded-lg p-8 h-full hover:bg-gray-100 transition-colors duration-300">
                      <div className="text-yellow-600 text-3xl mb-4">
                        <IconComponent size={32} />
                      </div>

                      <h3 className="font-semibold text-xl mb-3 text-gray-900">
                        {benefit.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-blue-900 scale-110"
                    : "bg-blue-900/40 hover:bg-blue-900/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-4 text-sm text-gray-500">
          {currentSlide + 1} of {maxSlide + 1}
        </div>
      </div>

      {/* Auto-play indicator */}
      <div className="fixed bottom-4 right-4 z-10">
        <div
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            isAutoPlaying ? "bg-green-500" : "bg-gray-400"
          }`}
          title={isAutoPlaying ? "Auto-play active" : "Auto-play paused"}
        />
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

export default BenefitsCarousel;
