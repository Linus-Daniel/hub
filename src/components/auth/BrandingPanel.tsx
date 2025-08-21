"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const taglines = [
  "Connect with top companies seeking fresh talent",
  "Showcase your skills to industry leaders",
  "Build your professional portfolio and network",
  "Access exclusive career opportunities",
];

const companies = ["MTN", "Interswitch", "Flutterwave", "Andela"];

export default function BrandingPanel() {
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full lg:w-1/2 bg-navy relative hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 to-navy/90 z-10" />
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/api/placeholder/800/800"
          alt="Nigerian students working on laptops"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-20 flex flex-col h-full justify-center px-12 text-white">
        <h1 className="text-3xl lg:text-4xl font-bold font-montserrat mb-6">
          Join Nigeria&apos;s Brightest Engineering & Tech Talent Network
        </h1>

        <div className="h-16 relative">
          {taglines.map((tagline, index) => (
            <p
              key={index}
              className={`text-xl absolute transition-opacity duration-300 ${
                index === currentTagline ? "opacity-100" : "opacity-0"
              }`}
            >
              {tagline}
            </p>
          ))}
        </div>

        <div className="mt-12">
          <p className="text-white/70 mb-6">
            Trusted by leading organizations:
          </p>
          <div className="grid grid-cols-4 gap-8">
            {companies.map((company) => (
              <div
                key={company}
                className="bg-white/10 h-12 rounded-md flex items-center justify-center"
              >
                <div className="text-white font-bold">{company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
