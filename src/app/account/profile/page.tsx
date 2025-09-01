"use client"
// pages/student/profile.js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatInterface from "../../../components/accont/ChatInterface";
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  UserPlusIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";

// Sample student data - in real app this would come from API/database
const studentData = {
  id: 1,
  name: "Sarah Johnson",
  title: "UX/UI Designer & Front-end Developer",
  email: "sarah.johnson@university.edu",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  university: "Stanford University",
  image:
    "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
  isOnline: true,
  isAvailable: true,
  about:
    "I'm a passionate UX/UI designer and front-end developer with 3 years of experience creating intuitive digital experiences. I specialize in user-centered design and building accessible interfaces that delight users while meeting business objectives.",
  quote:
    "I can do all things through Christ who strengthens me. — Philippians 4:13",
  skills: [
    "UI Design",
    "UX Research",
    "HTML/CSS",
    "JavaScript",
    "React",
    "Figma",
    "Adobe XD",
    "Sketch",
    "Prototyping",
    "Responsive Design",
  ],
  portfolio: [
    {
      id: 1,
      title: "Modern E-commerce UI",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/f3022e92cc-2a04e8e8412e3edd6095.png",
      description: "Complete e-commerce platform design with modern aesthetics",
    },
    {
      id: 2,
      title: "Mobile Banking App",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/ba6173455f-86ad43407f42fd1e7255.png",
      description: "Secure and intuitive mobile banking interface",
    },
    {
      id: 3,
      title: "SaaS Dashboard",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/425703d595-0fa704803957c22f7214.png",
      description: "Analytics dashboard for business intelligence",
    },
    {
      id: 4,
      title: "User Research Project",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/fb56764867-1aa38f0f4c3fa3beea05.png",
      description: "Comprehensive UX research and wireframing process",
    },
    {
      id: 5,
      title: "Brand Identity System",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/c5627bfe1a-722827aa3ced78577629.png",
      description: "Complete brand identity and style guide",
    },
    {
      id: 6,
      title: "Responsive Web Design",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/2d27290da6-f8137be8e9ed7a433017.png",
      description: "Multi-device responsive website design",
    },
  ],
  testimonials: [
    {
      id: 1,
      name: "Michael Roberts",
      title: "Project Manager, TechFlow",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      content:
        "Sarah's work exceeded our expectations. Her attention to detail and user-focused approach transformed our product. Highly recommended!",
    },
    {
      id: 2,
      name: "Emma Williams",
      title: "Founder, CreativeHub",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      content:
        "Working with Sarah was a pleasure. She brings both technical expertise and creative vision to every project. Our users love the new interface she designed.",
    },
    {
      id: 3,
      name: "David Chen",
      title: "CTO, InnovateTech",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      content:
        "Sarah has a rare combination of design talent and technical knowledge. She delivered a beautiful, functional interface and was able to implement it flawlessly.",
    },
  ],
};

export default function StudentProfile() {
  const router = useRouter();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  return (
    <div className="bg-softgray min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 md:px-8 lg:px-12">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-navy hover:text-teal transition"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              <span className="font-medium">Back to Directory</span>
            </button>

            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <span className="text-navy hover:text-gold transition cursor-pointer">
                  Home
                </span>
                <span className="text-navy hover:text-gold transition cursor-pointer">
                  Directory
                </span>
                <span className="text-navy hover:text-gold transition cursor-pointer">
                  Events
                </span>
                <span className="text-navy hover:text-gold transition cursor-pointer">
                  Resources
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex flex-col lg:flex-row container mx-auto px-4 md:px-8 py-6 lg:py-12 gap-8">
        {/* Left Column - Profile */}
        <div className="lg:w-1/2 flex-shrink-0">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <img
                  src={studentData.image}
                  alt={studentData.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div
                  className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white ${
                    studentData.isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-navy">
                    {studentData.name}
                  </h1>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      studentData.isAvailable
                        ? "bg-teal bg-opacity-10 text-teal"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        studentData.isAvailable ? "bg-teal" : "bg-gray-400"
                      }`}
                    ></span>
                    {studentData.isAvailable
                      ? "Available for Projects"
                      : "Busy"}
                  </span>
                </div>
                <p className="text-gray-600 mt-1 mb-4">{studentData.title}</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg hover:bg-opacity-90 transition">
                    <BriefcaseIcon className="h-4 w-4" />
                    <span>View Portfolio</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gold text-navy rounded-lg hover:bg-opacity-90 transition">
                    <UserPlusIcon className="h-4 w-4" />
                    <span>Hire Me</span>
                  </button>
                  <button
                    onClick={() => setIsMobileChatOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-navy text-navy rounded-lg hover:bg-navy hover:text-white transition lg:hidden"
                  >
                    <ChatBubbleLeftIcon className="h-4 w-4" />
                    <span>Message</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* About Me */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-navy mb-4">About Me</h2>
            <p className="text-gray-700 mb-4">{studentData.about}</p>
            <blockquote className="border-l-4 border-gold pl-4 italic text-gray-600">
              {studentData.quote}
            </blockquote>
          </div>

          {/* Skills & Tools */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-navy mb-4">
              Skills & Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              {studentData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-navy bg-opacity-10 text-navy rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Portfolio Gallery */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-navy mb-4">
              Portfolio Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {studentData.portfolio.map((item) => (
                <div
                  key={item.id}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition group"
                >
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-navy mb-4">
              Testimonials
            </h2>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {studentData.testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-softgray rounded-lg p-4"
                >
                  <div className="flex items-center mb-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-medium text-navy">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Chat Interface */}
        <div className="lg:w-1/2 lg:block hidden">
          <ChatInterface onClose={() => {}} student={studentData} />
        </div>
      </div>

      {/* Mobile Contact Button */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <button
          onClick={() => setIsMobileChatOpen(true)}
          className="w-14 h-14 rounded-full bg-teal shadow-lg flex items-center justify-center text-white hover:bg-opacity-90 transition"
        >
          <ChatBubbleLeftIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Chat Modal */}
      {isMobileChatOpen && (
        <div className="fixed inset-0 bg-white z-50 lg:hidden">
          <ChatInterface
            student={studentData}
            isMobile={true}
            onClose={() => setIsMobileChatOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
