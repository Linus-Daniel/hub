// components/TalentCard.js
import { useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const gradients = [
  "from-navy to-teal",
  "from-gold to-teal",
  "from-navy to-gold",
  "from-teal to-navy",
  "from-gold to-navy",
  "from-teal to-gold",
];

interface Talent {
    id: string;
    name: string;
    title: string;
    university: string;
    location: string;
    image: string;
    skills: string[];
    status: string;
    rating: number;
    isTopTalent: boolean;
    categories: string[];
    about: string;
    interests: string[];
    education: {
      school: string;
      degree: string;
      years: string;
    };
    email: string;
}

export default function TalentCard({ talent, index }:{ talent: Talent; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const gradient = gradients[index % gradients.length];

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className={`h-32 bg-gradient-to-r ${gradient} opacity-90`}></div>
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
          <img
            src={talent.image}
            alt={talent.name}
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      <div className="pt-16 pb-6 px-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold font-heading">{talent.name}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              talent.isTopTalent
                ? "bg-gold bg-opacity-10 text-gold"
                : "bg-teal bg-opacity-10 text-teal"
            }`}
          >
            {talent.isTopTalent ? "Top Talent" : talent.status}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4">{talent.title}</p>

        <div className="mb-4 overflow-x-auto flex pb-1">
          <div className="flex space-x-2">
            {talent.skills.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="whitespace-nowrap bg-softgray px-3 py-1 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-6">
          <MapPinIcon className="h-4 w-4 mr-2" />
          <span>{talent.university}</span>
        </div>

        <Link href={`/profile/${talent.id}`}>
          <button
            className={`w-full py-2 bg-navy text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 ${
              isHovered
                ? "transform translate-y-0 opacity-100"
                : "transform translate-y-4 opacity-0"
            }`}
          >
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
}
