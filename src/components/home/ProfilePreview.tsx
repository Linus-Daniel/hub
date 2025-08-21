"use client"
import React, { FormEvent, useState } from "react";
import {
  GraduationCap,
  MapPin,
  GitBranch,
  Github,
  Globe,
  Linkedin,
  ExternalLink,
} from "lucide-react";

const ProfileCardPreview = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLinkClick = (e:FormEvent, url:string) => {
    e.stopPropagation(); // Prevent card flip when clicking links
    window.open(url, "_blank");
  };

  return (
    <section id="profile-preview" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-bold text-3xl md:text-4xl text-center mb-16 text-gray-900">
          Profile Card Preview
        </h2>

        <div className="max-w-md mx-auto">
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden h-[450px] group cursor-pointer"
            style={{ perspective: "1000px" }}
            onClick={handleCardClick}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front Side */}
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                      <img
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                        alt="Amina Okafor Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-gray-900">
                        Amina Okafor
                      </h3>
                      <p className="text-gray-600">Software Engineer</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mb-6 space-y-3">
                    <div className="flex items-center">
                      <GraduationCap
                        className="text-yellow-600 mr-3 flex-shrink-0"
                        size={18}
                      />
                      <p className="text-gray-700">
                        Covenant University, 300 Level
                      </p>
                    </div>
                    <div className="flex items-center">
                      <MapPin
                        className="text-yellow-600 mr-3 flex-shrink-0"
                        size={18}
                      />
                      <p className="text-gray-700">Lagos, Nigeria</p>
                    </div>
                    <div className="flex items-center">
                      <GitBranch
                        className="text-yellow-600 mr-3 flex-shrink-0"
                        size={18}
                      />
                      <p className="text-gray-700">
                        Full Stack Development, AI/ML
                      </p>
                    </div>
                  </div>

                  {/* About */}
                  <div className="mb-6">
                    <h4 className="font-medium text-lg mb-2 text-gray-900">
                      About
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Passionate about creating technology solutions that
                      address real problems in Nigeria. Currently working on an
                      AI-powered agricultural monitoring system.
                    </p>
                  </div>

                  {/* Click instruction */}
                  <p className="text-sm text-gray-500 text-center italic">
                    Click to see portfolio links
                  </p>
                </div>
              </div>

              {/* Back Side */}
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="p-6">
                  <h4 className="font-medium text-lg mb-4 text-gray-900">
                    Portfolio & Links
                  </h4>

                  {/* Portfolio Links */}
                  <div className="space-y-3 mb-6">
                    <div
                      className="flex items-center text-blue-900 hover:text-yellow-600 transition-colors cursor-pointer group"
                      onClick={(e) =>
                        handleLinkClick(e, "https://github.com/aminadev")
                      }
                    >
                      <Github
                        className="text-yellow-600 mr-3 flex-shrink-0"
                        size={18}
                      />
                      <span className="group-hover:underline">
                        github.com/aminadev
                      </span>
                      <ExternalLink
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        size={14}
                      />
                    </div>

                    <div
                      className="flex items-center text-blue-900 hover:text-yellow-600 transition-colors cursor-pointer group"
                      onClick={(e) =>
                        handleLinkClick(e, "https://aminaokafor.dev")
                      }
                    >
                      <Globe
                        className="text-yellow-600 mr-3 flex-shrink-0"
                        size={18}
                      />
                      <span className="group-hover:underline">
                        aminaokafor.dev
                      </span>
                      <ExternalLink
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        size={14}
                      />
                    </div>

                    <div
                      className="flex items-center text-blue-900 hover:text-yellow-600 transition-colors cursor-pointer group"
                      onClick={(e) =>
                        handleLinkClick(
                          e,
                          "https://linkedin.com/in/aminaokafor"
                        )
                      }
                    >
                      <Linkedin
                        className="text-yellow-600 mr-3 flex-shrink-0"
                        size={18}
                      />
                      <span className="group-hover:underline">
                        linkedin.com/in/aminaokafor
                      </span>
                      <ExternalLink
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        size={14}
                      />
                    </div>

                    <div
                      className="flex items-center text-blue-900 hover:text-yellow-600 transition-colors cursor-pointer group"
                      onClick={(e) =>
                        handleLinkClick(e, "https://behance.net/aminadesigns")
                      }
                    >
                      <ExternalLink
                        className="text-yellow-600 mr-3 flex-shrink-0"
                        size={18}
                      />
                      <span className="group-hover:underline">
                        behance.net/aminadesigns
                      </span>
                      <ExternalLink
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        size={14}
                      />
                    </div>
                  </div>

                  {/* Scripture Inspiration */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-lg mb-2 text-gray-900">
                      Scripture Inspiration
                    </h4>
                    <p className="text-gray-600 italic mb-2 leading-relaxed">
                      "Whatever you do, work at it with all your heart, as
                      working for the Lord, not for human masters."
                    </p>
                    <p className="text-right text-sm text-gray-700">
                      - Colossians 3:23
                    </p>
                  </div>

                  {/* Click instruction */}
                  <p className="text-sm text-gray-500 text-center italic mt-4">
                    Click to see basic info
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default ProfileCardPreview;
