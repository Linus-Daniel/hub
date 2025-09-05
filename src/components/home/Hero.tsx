"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-[800px] flex items-center overflow-hidden section-clickable"
    >
      <div className="absolute inset-0 bg-navy/60 z-10"></div>
      <div className="absolute inset-0 z-0">
        <Image
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/3e32ce415f-85618b43b9560cc722e5.png"
          alt="Nigerian students working on tech and design projects in a modern university setting, diverse group, collaborative environment"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className={`font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 ${
              isMounted ? "animate-fade-in" : "opacity-0"
            }`}
          >
            The CONCES National Talent Directory
          </h1>
          <p
            className={`text-xl text-white/90 mb-8 ${
              isMounted ? "animate-slide-up" : "opacity-0 translate-y-4"
            }`}
          >
            A national showcase of Nigeria's brightest engineering, tech, and
            design talents
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
            <Link
            href={"/auth"}
              id="join-btn"
              className="bg-gold text-navy px-8 py-4 rounded-lg font-montserrat font-semibold text-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 group relative overflow-hidden section-clickable"
            >
              <span className="relative z-10">Join the Directory</span>
              <span className="absolute inset-0 bg-white/20 transform scale-0 rounded-full group-hover:scale-150 transition-transform duration-500"></span>
            </Link>
            <Link
              id="explore-btn"
              href={"/talents"}
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-lg font-montserrat font-semibold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 section-clickable"
            >
              Explore Talents
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white ${
          isMounted ? "animate-bounce" : "opacity-0"
        }`}
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
