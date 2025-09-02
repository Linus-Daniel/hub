// /app/talents/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  MapPin,
  GraduationCap,
  Calendar,
  Globe,
  Github,
  Linkedin,
  Star,
  Briefcase,
  Code,
  Award,
  ExternalLink,
  X,
  Send,
} from "lucide-react";
import { toast } from "sonner";

interface TalentProfile {
  _id: string;
  fullname: string;
  email: string;
  phone?: string;
  university?: string;
  major?: string;
  graduationYear?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  privacy: {
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
  };
  createdAt: string;
}

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: string;
  proficiency: number;
  experience: number;
  endorsements: number;
  description?: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  githubLink?: string;
  link?: string;
  technologies: string[];
  createdAt: string;
}

export default function TalentProfilePage() {
  const router = useRouter();
  const params = useParams();
  const talentId = params.id as string;

  const [talent, setTalent] = useState<TalentProfile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchTalentData();
  }, [talentId]);

  const fetchTalentData = async () => {
    try {
      // Fetch talent profile
      const profileRes = await fetch(`/api/talents/${talentId}`);
      if (!profileRes.ok) throw new Error("Failed to fetch talent profile");
      const profileData = await profileRes.json();
      setTalent(profileData);

      // Fetch talent's skills
      const skillsRes = await fetch(`/api/talents/${talentId}/skills`);
      if (skillsRes.ok) {
        const skillsData = await skillsRes.json();
        setSkills(skillsData);
      }

      // Fetch talent's projects
      const projectsRes = await fetch(`/api/talents/${talentId}/projects`);
      if (projectsRes.ok) {
        const projectsData = await projectsRes.json();
        setProjects(projectsData);
      }
    } catch (error) {
      console.error("Error fetching talent data:", error);
      toast.error("Failed to load talent profile");
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: talent?.email,
          ...contactForm,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully!");
      setIsContactModalOpen(false);
      setContactForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!talent) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Talent not found
          </h2>
          <p className="text-gray-600 mb-4">
            This profile may have been removed or made private
          </p>
          <button
            onClick={() => router.push("/talents")}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700"
          >
            Back to Talents
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", count: null },
    { id: "skills", label: "Skills", count: skills.length },
    { id: "portfolio", label: "Portfolio", count: projects.length },
  ];

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-teal-500 to-teal-600"></div>

          {/* Profile Info */}
          <div className="relative px-8 pb-8">
            {/* Avatar */}
            <div className="absolute -top-16 left-8">
              {talent.avatar ? (
                <img
                  src={talent.avatar}
                  alt={talent.fullname}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-3xl font-bold">
                  {talent.fullname
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
              )}
            </div>

            {/* Header Actions */}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Mail className="h-5 w-5" />
                Contact
              </button>
            </div>

            {/* Name and Title */}
            <div className="mt-20">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {talent.fullname}
              </h1>
              {talent.major && (
                <p className="text-lg text-gray-600 mb-4">{talent.major}</p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {talent.university && (
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    <span>{talent.university}</span>
                  </div>
                )}
                {talent.graduationYear && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Class of {talent.graduationYear}</span>
                  </div>
                )}
                {talent.location && talent.privacy.showLocation && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{talent.location}</span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-4">
                {talent.website && (
                  <a
                    href={talent.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Globe className="h-5 w-5 text-gray-600" />
                  </a>
                )}
                {talent.linkedin && (
                  <a
                    href={talent.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Linkedin className="h-5 w-5 text-gray-600" />
                  </a>
                )}
                {talent.github && (
                  <a
                    href={talent.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Github className="h-5 w-5 text-gray-600" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t">
            <div className="px-8">
              <nav className="flex gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-teal-600 text-teal-600"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.count !== null && (
                      <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {talent.bio && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      About
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {talent.bio}
                    </p>
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Contact Information
                  </h2>
                  <div className="space-y-2">
                    {talent.privacy.showEmail && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{talent.email}</span>
                      </div>
                    )}
                    {talent.phone && talent.privacy.showPhone && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="h-4 w-4">📱</span>
                        <span>{talent.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-6">
                {Object.keys(groupedSkills).length === 0 ? (
                  <div className="text-center py-12">
                    <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No skills added yet</p>
                  </div>
                ) : (
                  Object.entries(groupedSkills).map(
                    ([category, categorySkills]) => (
                      <div key={category}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {categorySkills.map((skill) => (
                            <div
                              key={skill._id}
                              className="border border-gray-200 rounded-lg p-4"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-medium text-gray-900">
                                    {skill.name}
                                  </h4>
                                  <span
                                    className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                      skill.level === "Expert"
                                        ? "bg-green-100 text-green-800"
                                        : skill.level === "Advanced"
                                        ? "bg-blue-100 text-blue-800"
                                        : skill.level === "Intermediate"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {skill.level}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Star className="h-4 w-4" />
                                  <span>{skill.endorsements}</span>
                                </div>
                              </div>

                              <div className="mb-2">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">
                                    Proficiency
                                  </span>
                                  <span className="font-medium">
                                    {skill.proficiency}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full transition-all ${
                                      skill.proficiency >= 80
                                        ? "bg-green-500"
                                        : skill.proficiency >= 60
                                        ? "bg-blue-500"
                                        : skill.proficiency >= 40
                                        ? "bg-yellow-500"
                                        : "bg-gray-500"
                                    }`}
                                    style={{ width: `${skill.proficiency}%` }}
                                  />
                                </div>
                              </div>

                              <p className="text-sm text-gray-600">
                                {skill.experience} years experience
                              </p>

                              {skill.description && (
                                <p className="text-sm text-gray-600 mt-2">
                                  {skill.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            )}

            {activeTab === "portfolio" && (
              <div>
                {projects.length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No projects added yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <div
                        key={project._id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        {project.thumbnail ? (
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                            <Code className="h-12 w-12 text-gray-400" />
                          </div>
                        )}

                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.technologies
                              .slice(0, 3)
                              .map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-gray-100 text-xs rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                            {project.technologies.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>

                          <div className="flex gap-3">
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700"
                              >
                                <ExternalLink className="h-4 w-4" />
                                Live Demo
                              </a>
                            )}
                            {project.githubLink && (
                              <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                              >
                                <Github className="h-4 w-4" />
                                Code
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">
                Contact {talent.fullname}
              </h3>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, subject: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., Project Opportunity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Tell them about your opportunity..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}