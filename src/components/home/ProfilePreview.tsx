"use client";

import React, { FormEvent, useState } from "react";
import {
  GraduationCap,
  MapPin,
  GitBranch,
  Github,
  Globe,
  Linkedin,
  ExternalLink,
  Mail,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  fullname: string;
  title: string;
  status: string;
  skills: string[];
  institution: string;
  avatar: string;
  gradient: string;
  location?: string;
  graduationYear?: string;
  email?: string;
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  bio?: string;
  major: string;
  emailVerified?: boolean;
  createdAt?: string;
}

const ProfileCardPreview = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/talents");
      return res.json();
    },
  });

  const handleCardClick = (userId: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handleLinkClick = (e: FormEvent, url: string) => {
    e.stopPropagation(); // Prevent card flip when clicking links
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <section
      id="profile-preview"
      className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50"
    >
      <div className="container mx-auto px-4">
        <h2 className="font-bold text-3xl md:text-4xl text-center mb-16 text-slate-800">
          Profile Card Preview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users?.map((user: User) => {
            const isFlipped = flippedCards[user.id] || false;

            return (
              <div key={user.id} className="w-full mx-auto">
                <div
                  className="rounded-xl overflow-hidden h-[500px] group cursor-pointer shadow-xl"
                  style={{ perspective: "1000px" }}
                  onClick={() => handleCardClick(user.id)}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-700 ${
                      isFlipped ? "rotate-y-180" : ""
                    }`}
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                    }}
                  >
                    {/* Front Side - Professional Light Theme */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 border border-slate-200/50"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      <div className="p-6 h-full flex flex-col">
                        {/* Header with subtle gradient */}
                        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-4 -mx-6 -mt-6 mb-6 rounded-t-xl text-white">
                          <div className="flex items-center">
                            <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0 border-2 border-white/80">
                              <img
                                src={
                                  user.avatar ||
                                  "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
                                }
                                alt={`${user.fullname} Profile`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-xl">
                                {user.fullname}
                              </h3>
                              <p className="text-cyan-100 opacity-90">
                                {user.major}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="mb-6 space-y-3 flex-1">
                          <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                            <GraduationCap
                              className="text-teal-600 mr-3 flex-shrink-0"
                              size={18}
                            />
                            <p className="text-slate-700">{user.institution}</p>
                          </div>
                          <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                            <MapPin
                              className="text-teal-600 mr-3 flex-shrink-0"
                              size={18}
                            />
                            <p className="text-slate-700">
                              {user.location || "Not specified"}
                            </p>
                          </div>
                          <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                            <Mail
                              className="text-teal-600 mr-3 flex-shrink-0"
                              size={18}
                            />
                            <p className="text-slate-700">
                              {user.skills?.slice(0, 3).join(", ")}
                              {user.email}
                            </p>
                          </div>
                        </div>

                        {/* About */}
                        <div className="mb-4">
                          <h4 className="font-medium text-lg mb-2 text-slate-800">
                            About
                          </h4>
                          <p className="text-slate-600 leading-relaxed line-clamp-4">
                            {user.bio || "No bio available."}
                          </p>
                        </div>

                        {/* Click instruction */}
                        <p className="text-sm text-slate-500 text-center italic mt-auto pt-4">
                          Click to see portfolio links
                        </p>
                      </div>
                    </div>

                    {/* Back Side - Dark Theme */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 text-white"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <div className="p-6 h-full flex flex-col">
                        <h4 className="font-medium text-lg mb-4 text-teal-400">
                          Portfolio & Links
                        </h4>

                        {/* Portfolio Links */}
                        <div className="space-y-3 mb-6">
                          {user.github && (
                            <div
                              className="flex items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer group"
                              onClick={(e) => handleLinkClick(e, user.github!)}
                            >
                              <Github
                                className="text-teal-400 mr-3 flex-shrink-0"
                                size={18}
                              />
                              <span className="group-hover:underline">
                                GitHub Profile
                              </span>
                              <ExternalLink
                                className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-teal-400"
                                size={14}
                              />
                            </div>
                          )}

                          {user.website && (
                            <div
                              className="flex items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer group"
                              onClick={(e) => handleLinkClick(e, user.website!)}
                            >
                              <Globe
                                className="text-teal-400 mr-3 flex-shrink-0"
                                size={18}
                              />
                              <span className="group-hover:underline">
                                Personal Website
                              </span>
                              <ExternalLink
                                className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-teal-400"
                                size={14}
                              />
                            </div>
                          )}

                          {user.linkedin && (
                            <div
                              className="flex items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer group"
                              onClick={(e) =>
                                handleLinkClick(e, user.linkedin!)
                              }
                            >
                              <Linkedin
                                className="text-teal-400 mr-3 flex-shrink-0"
                                size={18}
                              />
                              <span className="group-hover:underline">
                                LinkedIn Profile
                              </span>
                              <ExternalLink
                                className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-teal-400"
                                size={14}
                              />
                            </div>
                          )}
                        </div>

                        {/* Scripture Inspiration */}
                        <div className="bg-slate-700/30 p-4 rounded-lg mt-auto">
                          <h4 className="font-medium text-lg mb-2 text-teal-400">
                            Inspiration
                          </h4>
                          <p className="text-slate-300 italic mb-2 leading-relaxed">
                            "Whatever you do, work at it with all your heart, as
                            working for the Lord, not for human masters."
                          </p>
                          <p className="text-right text-sm text-slate-400">
                            - Colossians 3:23
                          </p>
                        </div>

                        {/* Click instruction */}
                        <p className="text-sm text-slate-400 text-center italic mt-4">
                          Click to see basic info
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ProfileCardPreview;
