"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  UserCheck,
  FolderOpen,
  UserPlus,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const HowToGetFeatured = () => {
  const [hoveredCard, setHoveredCard] = useState<number |null>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef(null);

  const ctaCards = [
    {
      id: 1,
      icon: UserCheck,
      title: "Confirm Your Profile",
      description:
        "Already nominated? Verify your details and complete your profile to go live in the directory.",
      buttonText: "Confirm Now",
      action: "confirm",
      gradient: "from-emerald-400 to-cyan-400",
      bgGradient: "from-emerald-500/20 to-cyan-500/20",
    },
    {
      id: 2,
      icon: FolderOpen,
      title: "Submit Your Portfolio",
      description:
        "Showcase your work, projects, and skills to be considered for inclusion in the directory.",
      buttonText: "Submit Portfolio",
      action: "submit",
      gradient: "from-violet-400 to-purple-400",
      bgGradient: "from-violet-500/20 to-purple-500/20",
    },
    {
      id: 3,
      icon: UserPlus,
      title: "Nominate Someone",
      description:
        "Know a talented student who should be featured? Nominate them for consideration.",
      buttonText: "Nominate Now",
      action: "nominate",
      gradient: "from-orange-400 to-pink-400",
      bgGradient: "from-orange-500/20 to-pink-500/20",
    },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ctaCards.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, index])]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
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

  const handleCardClick = (action:string) => {
    switch (action) {
      case "confirm":
        console.log("Redirecting to profile confirmation...");
        break;
      case "submit":
        console.log("Redirecting to portfolio submission...");
        break;
      case "nominate":
        console.log("Redirecting to nomination form...");
        break;
      default:
        break;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="join"
      className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          >
            <Sparkles
              size={Math.random() * 10 + 5}
              className="text-yellow-400"
            />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-fade-in">
            How to Get Featured
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            Join Nigeria's premier talent showcase for Christian students and
            unlock amazing opportunities
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {ctaCards.map((card, index) => {
            const IconComponent = card.icon;
            const isVisible = visibleCards.includes(index);
            const isHovered = hoveredCard === card.id;

            return (
              <div
                key={card.id}
                className={`group relative transition-all duration-700 transform ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(card.action)}
              >
                {/* Card background with glassmorphism */}
                <div
                  className={`
                  relative h-full bg-gradient-to-br ${
                    card.bgGradient
                  } backdrop-blur-xl 
                  border border-white/20 rounded-2xl lg:rounded-3xl p-8 lg:p-10 cursor-pointer
                  transition-all duration-500 transform hover:scale-105 hover:-translate-y-2
                  hover:shadow-2xl hover:shadow-blue-500/25
                  ${isHovered ? "bg-white/30" : "hover:bg-white/25"}
                `}
                >
                  {/* Hover glow effect */}
                  <div
                    className={`
                    absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-r ${card.gradient} 
                    opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl
                  `}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with animated background */}
                    <div className="relative mb-8">
                      <div
                        className={`
                        absolute inset-0 bg-gradient-to-r ${card.gradient} rounded-2xl blur-lg 
                        opacity-30 group-hover:opacity-50 transition-all duration-500 scale-110
                      `}
                      />
                      <div
                        className={`
                        relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r ${card.gradient} 
                        rounded-2xl flex items-center justify-center transition-all duration-500
                        group-hover:scale-110 group-hover:rotate-3
                      `}
                      >
                        <IconComponent
                          size={40}
                          className="text-white drop-shadow-lg"
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-2xl lg:text-3xl mb-4 group-hover:text-white transition-colors duration-300">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="text-blue-100 mb-8 text-lg leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {card.description}
                    </p>

                    {/* Button */}
                    <button
                      className={`
                        relative w-full bg-gradient-to-r ${card.gradient} text-slate-900 
                        px-8 py-4 rounded-xl lg:rounded-2xl font-bold text-lg
                        transition-all duration-300 transform hover:scale-105 
                        hover:shadow-lg hover:shadow-current/25
                        focus:outline-none focus:ring-4 focus:ring-white/30
                        group overflow-hidden
                      `}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(card.action);
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {card.buttonText}
                        <ArrowRight
                          size={20}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>

                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </button>
                  </div>

                  {/* Card number indicator */}
                  <div className="absolute top-6 right-6 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold backdrop-blur-sm">
                    {card.id}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="mt-20 lg:mt-24 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Sparkles size={20} className="text-yellow-400" />
            <span className="text-blue-100 font-medium">
              Join thousands of talented Christian students
            </span>
            <Sparkles size={20} className="text-yellow-400" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-20px) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) rotate(-1deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }

        .delay-500 {
          animation-delay: 2s;
        }
        .delay-1000 {
          animation-delay: 4s;
        }

        .backdrop-blur-xl {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }
      `}</style>
    </section>
  );
};

export default HowToGetFeatured;
