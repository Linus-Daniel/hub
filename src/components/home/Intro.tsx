"use client"
import React, { useState, useEffect, useRef } from "react";
import {
  Code,
  Cpu,
  Paintbrush,
  TrendingUp,
  Rocket,
  Settings,
} from "lucide-react";

const WhoSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef(null);

  const cards = [
    {
      icon: Code,
      title: "Software Developers",
      description:
        "Backend, frontend, mobile, and full-stack developers building innovative applications and solutions.",
      delay: 0,
    },
    {
      icon: Cpu,
      title: "Hardware Engineers",
      description:
        "Electrical, electronic, and robotics engineers creating tangible solutions to real-world problems.",
      delay: 100,
    },
    {
      icon: Paintbrush,
      title: "Designers",
      description:
        "UI/UX, graphic, and product designers crafting beautiful, functional, and user-centered experiences.",
      delay: 200,
    },
    {
      icon: TrendingUp,
      title: "Data Scientists",
      description:
        "Analysts, ML engineers, and AI specialists turning data into insights and intelligent systems.",
      delay: 300,
    },
    {
      icon: Rocket,
      title: "Entrepreneurs",
      description:
        "Tech founders and innovators building startups and solutions to address local and global challenges.",
      delay: 400,
    },
    {
      icon: Settings,
      title: "Mechatronics Engineers",
      description:
        "Multidisciplinary engineers combining mechanical, electrical, and computing skills to build automated systems.",
      delay: 500,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animations with staggered delays
            cards.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, index])]);
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="who" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-bold text-3xl md:text-4xl text-center mb-16 text-gray-900">
          Who Should Be in This?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            const isVisible = visibleCards.includes(index);

            return (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 cursor-pointer ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
                style={{
                  transitionDelay: isVisible ? `${card.delay}ms` : "0ms",
                }}
              >
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
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-400 {
          animation-delay: 400ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </section>
  );
};

export default WhoSection;
