"use client"
import { useState, useEffect, useRef } from "react";

export default function WhySection() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToSlide = (index: number) => {
    if (sliderRef.current) {
      const slideWidth = 350 + 24; // width + gap
      sliderRef.current.scrollTo({
        left: index * slideWidth,
        behavior: "smooth",
      });
      setActiveSlide(index);
    }
  };

  const cards = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          aria-hidden="true"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
          ></path>
        </svg>
      ),
      title: "Visibility",
      description:
        "Many talented Nigerian students remain invisible to employers and opportunities simply because they lack platforms to showcase their work and skills.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          aria-hidden="true"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
        >
          <path
            fill="currentColor"
            d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416V394.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3V261.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V405.2c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z"
          ></path>
        </svg>
      ),
      title: "Community",
      description:
        "Connecting with like-minded peers across institutions creates a powerful network of support, collaboration, and shared growth opportunities.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          aria-hidden="true"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5V448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H96 288h32V480 32zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32s10.7-32 24-32s24 14.3 24 32zm96-128h96V480c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512V128c0-35.3-28.7-64-64-64H352v64z"
          ></path>
        </svg>
      ),
      title: "Opportunity",
      description:
        "By showcasing talent in a centralized directory, we create pathways to internships, jobs, mentorship, and funding for deserving students.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          aria-hidden="true"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path
            fill="currentColor"
            d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-61.9 50.1-112 112-112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-44.2 0-80 35.8-80 80z"
          ></path>
        </svg>
      ),
      title: "Innovation",
      description:
        "By highlighting diverse talents and projects, we inspire a new generation of problem-solvers addressing Nigeria's unique challenges.",
    },
  ];

  return (
    <section id="why" className="py-20 bg-navy text-white section-clickable">
      <div className="container mx-auto px-4">
        <h2
          className={`font-montserrat font-bold text-3xl md:text-4xl mb-6 ${
            isMounted ? "animate-slide-left" : "opacity-0 -translate-x-4"
          }`}
        >
          Too many brilliant students stay unseen. We're changing that.
        </h2>

        <div className="mt-16 relative">
          <div
            ref={sliderRef}
            className="slider-container overflow-x-auto pb-8 hide-scrollbar"
          >
            <div className="flex space-x-6 w-max">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-8 w-[350px] flex-shrink-0"
                >
                  <div className="text-gold text-3xl mb-4">{card.icon}</div>
                  <h3 className="font-montserrat font-semibold text-xl mb-4">
                    {card.title}
                  </h3>
                  <p className="text-white/80">{card.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-2 mt-6">
            {cards.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full slider-dot ${
                  index === activeSlide ? "bg-white/80" : "bg-white/40"
                }`}
                onClick={() => scrollToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
