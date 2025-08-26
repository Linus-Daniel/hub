"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { talents } from "@/constants";
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  MapPinIcon,
  AcademicCapIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState("overview");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const talent = talents.find((t) => t.id === id);

  if (!talent) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-600">Talent not found</h1>
          <button
            onClick={() => router.back()}
            className="mt-4 bg-teal text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the contact form data to your backend
    console.log("Contact form submitted:", contactForm);
    alert("Message sent successfully!");
    setIsContactModalOpen(false);
    setContactForm({ name: "", email: "", message: "" });
  };

  const handleContactChange = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-navy hover:text-teal"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Directory
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl overflow-hidden shadow-lg">
        {/* Hero Section */}
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-navy to-teal"></div>
          <div className="absolute top-32 left-10">
            <img
              src={talent.image}
              alt={talent.name}
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>

        <div className="pt-20 px-10 pb-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold font-heading mb-2">
                {talent.name}
              </h1>
              <p className="text-gray-600 text-lg">{talent.title}</p>
            </div>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-teal text-white px-6 py-3 rounded-lg hover:bg-opacity-90 flex items-center"
            >
              <EnvelopeIcon className="h-5 w-5 mr-2" />
              Contact
            </button>
          </div>

          {/* Info Bar */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPinIcon className="h-4 w-4 mr-2" />
              <span>{talent.location}</span>
            </div>
            <div className="flex items-center">
              <AcademicCapIcon className="h-4 w-4 mr-2" />
              <span>{talent.university}</span>
            </div>
            <div className="flex items-center text-gold">
              <StarIconSolid className="h-4 w-4 mr-1" />
              <span className="font-medium">{talent.rating}</span>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                talent.isTopTalent
                  ? "bg-gold bg-opacity-10 text-gold"
                  : "bg-teal bg-opacity-10 text-teal"
              }`}
            >
              {talent.isTopTalent ? "Top Talent" : talent.status}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {talent.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-softgray px-4 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b mb-8">
            <div className="flex space-x-8">
              {[
                { id: "overview", label: "Overview" },
                { id: "portfolio", label: "Portfolio" },
                { id: "skills", label: "Skills" },
                { id: "testimonials", label: "Testimonials" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-teal text-navy"
                      : "text-gray-500 hover:text-navy"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold font-heading mb-4">
                  About Me
                </h3>
                <p className="text-gray-700 leading-relaxed">{talent.about}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold font-heading mb-4">
                  Education
                </h3>
                <div className="bg-softgray p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-navy text-white p-3 rounded-lg mr-4">
                      <BuildingOfficeIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">
                        {talent.education.school}
                      </h4>
                      <p className="text-gray-600">{talent.education.degree}</p>
                      <p className="text-gray-500 text-sm">
                        {talent.education.years}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold font-heading mb-4">
                  Interests
                </h3>
                <div className="flex flex-wrap gap-3">
                  {talent.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "portfolio" && (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Portfolio Coming Soon
              </h3>
              <p className="text-gray-500">
                {talent.name} is working on showcasing their best work here.
              </p>
            </div>
          )}

          {activeTab === "skills" && (
            <div>
              <div className="space-y-6">
                {talent.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill}</span>
                      <span className="text-sm text-gray-500">
                        {Math.floor(Math.random() * 20) + 80}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-teal h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.floor(Math.random() * 20) + 80}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "testimonials" && (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Testimonials Yet
              </h3>
              <p className="text-gray-500">
                {talent.name} is building their reputation. Be the first to work
                with them!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-bold font-heading">
                Contact {talent.name}
              </h3>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="text-gray-500 hover:text-navy"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => handleContactChange("name", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => handleContactChange("email", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) =>
                    handleContactChange("message", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  placeholder="Describe your project or opportunity"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal text-white rounded-lg hover:bg-opacity-90 font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = talents.map((talent) => ({
    params: { id: talent.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}
