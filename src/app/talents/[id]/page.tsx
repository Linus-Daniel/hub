"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Mail,
  MapPin,
  GraduationCap,
  Globe,
  Github,
  Linkedin,
  Briefcase,
  Code,
  Award,
  ExternalLink,
  X,
  Phone,
  Star,
  Calendar,
  Users,
  TrendingUp,
  Download,
  Share2,
  Heart,
  MessageCircle,
  ChevronRight,
  Play,
  Eye,
  BookOpen,
  UserCheck,
  Zap,
  Rocket,
  Sparkles,
} from "lucide-react";
import { useParams } from "next/navigation";

interface TalentProfile {
  _id: string;
  fullname: string;
  email: string;
  phone?: string;
  institution?: string;
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

// API Functions
const fetchTalentProfile = async (talentId: string): Promise<TalentProfile> => {
  const response = await fetch(`/api/talents/${talentId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch talent profile");
  }
  return response.json();
};

const fetchTalentSkills = async (talentId: string): Promise<Skill[]> => {
  const response = await fetch(`/api/talents/${talentId}/skills`);
  if (!response.ok) {
    throw new Error("Failed to fetch skills");
  }
  return response.json();
};

const fetchTalentProjects = async (talentId: string): Promise<Project[]> => {
  const response = await fetch(`/api/talents/${talentId}/projects`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
};

const sendContactMessage = async (contactData: {
  to: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
};

// Glassmorphism card component
const GlassCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl shadow-teal-100/30 ${className}`}
  >
    {children}
  </div>
);

// Gradient button component
const GradientButton = ({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-medium hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${className}`}
  >
    {children}
  </button>
);

export default function TalentProfilePage() {
  const params = useParams();
  const talentId = params.id as string;
  const queryClient = useQueryClient();

  // React Query hooks
  const {
    data: talent ,
    isLoading: talentLoading,
    error: talentError,
  } = useQuery({
    queryKey: ["talent", talentId],
    queryFn: () => fetchTalentProfile(talentId),
    enabled: !!talentId,
  });

  const { data: skills = [], isLoading: skillsLoading } = useQuery({
    queryKey: ["skills", talentId],
    queryFn: () => fetchTalentSkills(talentId),
    enabled: !!talentId,
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["projects", talentId],
    queryFn: () => fetchTalentProjects(talentId),
    enabled: !!talentId,
  });

  const contactMutation = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      alert("Message sent successfully!");
      setIsContactModalOpen(false);
      setContactForm({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      alert("Failed to send message. Please try again.");
    },
  });

  // Local state
  const [activeTab, setActiveTab] = useState("overview");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [liked, setLiked] = useState(false);
  const [viewCount] = useState(1247);

  // Derived loading state
  const loading = talentLoading || skillsLoading || projectsLoading;

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      name: "Michael Roberts",
      role: "Project Manager, TechFlow",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      text: "Sarah's work exceeded our expectations. Her attention to detail and user-focused approach transformed our product. Highly recommended!",
      rating: 5,
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Emma Williams",
      role: "Founder, CreativeHub",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      text: "Working with Sarah was a pleasure. She brings both technical expertise and creative vision to every project. Our users love the new interface she designed.",
      rating: 5,
      date: "1 month ago",
    },
    {
      id: 3,
      name: "David Chen",
      role: "CTO, InnovateTech",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      text: "Sarah has a rare combination of design talent and technical knowledge. She delivered a beautiful, functional interface and was able to implement it flawlessly.",
      rating: 5,
      date: "2 months ago",
    },
  ];

  const handleContactSubmit = () => {
    if (
      !talent?.email ||
      !contactForm.name ||
      !contactForm.email ||
      !contactForm.subject ||
      !contactForm.message
    ) {
      alert("Please fill in all required fields");
      return;
    }

    contactMutation.mutate({
      to: talent.email,
      ...contactForm,
    });
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${talent?.fullname} | Talent Profile`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Sharing cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (talentError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <GlassCard className="p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Error Loading Profile
          </h2>
          <p className="text-slate-600 mb-6">
            {talentError.message || "Failed to load talent profile"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-medium hover:from-teal-600 hover:to-cyan-700 transition-all duration-300"
          >
            Try Again
          </button>
        </GlassCard>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-4">
        <div className="max-w-6xl mx-auto">
          <GlassCard className="animate-pulse">
            <div className="h-48 bg-gradient-to-r from-teal-400 to-cyan-500 relative overflow-hidden rounded-t-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
            <div className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 bg-slate-200 rounded-2xl"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-slate-200 rounded-lg w-1/3"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="flex gap-3 mt-6">
                    <div className="h-10 bg-slate-200 rounded-lg w-32"></div>
                    <div className="h-10 bg-slate-200 rounded-lg w-28"></div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    );
  }

  if (!talent && !talentLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <GlassCard className="p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Talent not found
          </h2>
          <p className="text-slate-600 mb-6">
            This profile may have been removed or made private
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-medium hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Talents
          </button>
        </GlassCard>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", count: null, icon: UserCheck },
    { id: "skills", label: "Skills", count: skills.length, icon: Award },
    {
      id: "portfolio",
      label: "Portfolio",
      count: projects.length,
      icon: Briefcase,
    },
    {
      id: "testimonials",
      label: "Testimonials",
      count: testimonials.length,
      icon: Star,
    },
  ];

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header Actions */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Talents</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm text-slate-500">
                <Eye className="h-4 w-4" />
                <span>{viewCount.toLocaleString()} views</span>
              </div>

              <button
                onClick={handleLike}
                className={`group flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                  liked
                    ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Heart
                  className={`h-4 w-4 transition-all duration-300 ${
                    liked ? "fill-current scale-110" : "group-hover:scale-110"
                  }`}
                />
                <span className="text-sm font-medium">Like</span>
              </button>

              <button
                onClick={handleShare}
                className="group flex items-center gap-2 px-3 py-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-all duration-300"
              >
                <Share2 className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="text-sm font-medium">Share</span>
              </button>

              <GradientButton className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Resume
              </GradientButton>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:w-2/3 space-y-8">
            {/* Profile Header */}
            <GlassCard className="relative overflow-hidden">
              {/* Hero Background */}
              <div className="h-48 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="px-8 pb-8 -mt-16 relative">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                  <div className="relative group">
                    {talent?.avatar ? (
                      <img
                        src={talent.avatar}
                        alt={talent.fullname}
                        width={128}
                        height={128}
                        className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-2xl transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-2xl border-4 border-white bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold shadow-2xl transition-transform duration-300 group-hover:scale-105">
                        {talent?.fullname
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-6 h-6 rounded-full border-3 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-2">
                      <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                        {talent?.fullname}
                      </h1>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 animate-pulse">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                          Available for Projects
                        </span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-amber-400 text-amber-400"
                            />
                          ))}
                          <span className="text-sm text-slate-600 ml-1">
                            4.9
                          </span>
                        </div>
                      </div>
                    </div>

                    {talent?.major && (
                      <p className="text-lg text-slate-600 mb-4 font-medium flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-teal-500" />
                        {talent?.major}
                      </p>
                    )}

                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                      <button
                        onClick={() => setActiveTab("portfolio")}
                        className="group flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      >
                        <Briefcase className="h-4 w-4 transition-transform group-hover:scale-110" />
                        <span className="font-medium">View Portfolio</span>
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                      <GradientButton
                        onClick={() => setIsContactModalOpen(true)}
                        className="flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        Hire Me
                      </GradientButton>
                      <button className="group flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 transform hover:scale-105">
                        <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
                        <span className="font-medium">Quick Chat</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: "Projects",
                  value: projects.length,
                  icon: Rocket,
                  color: "teal",
                },
                {
                  label: "Skills",
                  value: skills.length,
                  icon: Zap,
                  color: "blue",
                },
                {
                  label: "Reviews",
                  value: testimonials.length,
                  icon: Sparkles,
                  color: "amber",
                },
                {
                  label: "Experience",
                  value: "4+ Years",
                  icon: TrendingUp,
                  color: "emerald",
                },
              ].map((stat, index) => (
                <GlassCard
                  key={stat.label}
                  className="p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-${stat.color}-100 flex items-center justify-center mx-auto mb-3`}
                  >
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                  <div className="text-2xl font-bold text-slate-800">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </GlassCard>
              ))}
            </div>

            {/* Tabs Navigation */}
            <GlassCard className="overflow-hidden">
              <div className="border-b border-slate-100">
                <nav className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center gap-2 py-4 px-6 border-b-2 transition-all duration-300 whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-teal-500 text-teal-600 bg-teal-50/50"
                          : "border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span className="font-medium">{tab.label}</span>
                      {tab.count !== null && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                            activeTab === tab.id
                              ? "bg-teal-100 text-teal-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    {talent?.bio && (
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-teal-500" />
                          About Me
                        </h2>
                        <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100">
                          <p className="text-slate-700 leading-relaxed">
                            {talent?.bio}
                          </p>
                        </div>
                      </div>
                    )}

                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-teal-500" />
                        Education
                      </h2>
                      <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100">
                        <div className="flex items-start gap-4">
                          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-3 rounded-xl shadow-lg">
                            <GraduationCap className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-800 text-lg">
                              {talent?.institution}
                            </h3>
                            <p className="text-slate-600 font-medium">
                              {talent?.major}
                            </p>
                            {talent?.graduationYear && (
                              <div className="flex items-center gap-2 mt-2">
                                <Calendar className="h-4 w-4 text-slate-400" />
                                <p className="text-slate-500 text-sm">
                                  Expected Graduation: {talent?.graduationYear}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <Mail className="h-5 w-5 text-teal-500" />
                        Contact Information
                      </h2>
                      <div className="space-y-3">
                        {talent?.privacy.showEmail && (
                          <div className="flex items-center gap-3 text-slate-700 p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:shadow-md transition-all duration-300">
                            <div className="bg-teal-100 p-2 rounded-lg">
                              <Mail className="h-5 w-5 text-teal-600" />
                            </div>
                            <span className="font-medium">{talent?.email}</span>
                          </div>
                        )}
                        {talent?.phone && talent?.privacy.showPhone && (
                          <div className="flex items-center gap-3 text-slate-700 p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:shadow-md transition-all duration-300">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <Phone className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="font-medium">{talent?.phone}</span>
                          </div>
                        )}
                        {talent?.location && talent?.privacy.showLocation && (
                          <div className="flex items-center gap-3 text-slate-700 p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:shadow-md transition-all duration-300">
                            <div className="bg-emerald-100 p-2 rounded-lg">
                              <MapPin className="h-5 w-5 text-emerald-600" />
                            </div>
                            <span className="font-medium">
                              {talent?.location}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "skills" && (
                  <div className="space-y-8">
                    {Object.keys(groupedSkills).length === 0 ? (
                      <div className="text-center py-16">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Award className="h-8 w-8 text-slate-400" />
                        </div>
                        <p className="text-slate-600">No skills added yet</p>
                      </div>
                    ) : (
                      Object.entries(groupedSkills).map(
                        ([category, categorySkills]) => (
                          <div key={category}>
                            <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                              <div className="w-1 h-6 bg-gradient-to-b from-teal-400 to-cyan-500 rounded-full"></div>
                              {category}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {categorySkills.map((skill) => (
                                <GlassCard
                                  key={skill._id}
                                  className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                >
                                  <div className="flex justify-between items-start mb-4">
                                    <div>
                                      <h4 className="font-semibold text-slate-800 text-lg mb-2">
                                        {skill.name}
                                      </h4>
                                      <span
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                          skill.level === "Expert"
                                            ? "bg-emerald-100 text-emerald-800"
                                            : skill.level === "Advanced"
                                            ? "bg-blue-100 text-blue-800"
                                            : skill.level === "Intermediate"
                                            ? "bg-amber-100 text-amber-800"
                                            : "bg-slate-100 text-slate-800"
                                        }`}
                                      >
                                        {skill.level}
                                      </span>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-sm text-slate-600 mb-1">
                                        Endorsements
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Users className="h-3 w-3 text-slate-400" />
                                        <span className="text-sm font-medium text-slate-700">
                                          {skill.endorsements}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-2">
                                      <span className="text-slate-600 font-medium">
                                        Proficiency
                                      </span>
                                      <span className="font-semibold text-slate-800">
                                        {skill.proficiency}%
                                      </span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                      <div
                                        className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                                          skill.proficiency >= 80
                                            ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                                            : skill.proficiency >= 60
                                            ? "bg-gradient-to-r from-blue-400 to-blue-600"
                                            : skill.proficiency >= 40
                                            ? "bg-gradient-to-r from-amber-400 to-amber-600"
                                            : "bg-gradient-to-r from-slate-400 to-slate-600"
                                        }`}
                                        style={{
                                          width: `${skill.proficiency}%`,
                                        }}
                                      />
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-4 mb-3">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-4 w-4 text-slate-400" />
                                      <span className="text-sm text-slate-600">
                                        {skill.experience} years experience
                                      </span>
                                    </div>
                                  </div>

                                  {skill.description && (
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                      {skill.description}
                                    </p>
                                  )}
                                </GlassCard>
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
                      <div className="text-center py-16">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Briefcase className="h-8 w-8 text-slate-400" />
                        </div>
                        <p className="text-slate-600">No projects added yet</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project) => (
                          <GlassCard
                            key={project._id}
                            className="overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:scale-105"
                          >
                            <div className="relative overflow-hidden">
                              {project.thumbnail ? (
                                <img
                                  src={project.thumbnail}
                                  alt={project.title}
                                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                              ) : (
                                <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                  <Code className="h-12 w-12 text-slate-400" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                                  {project.link && (
                                    <a
                                      href={project.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm text-slate-900 rounded-lg hover:bg-white transition-all duration-300 text-sm font-medium"
                                    >
                                      <Play className="h-4 w-4" />
                                      Live Demo
                                    </a>
                                  )}
                                  {project.githubLink && (
                                    <a
                                      href={project.githubLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 px-3 py-2 bg-slate-900/90 backdrop-blur-sm text-white rounded-lg hover:bg-slate-900 transition-all duration-300 text-sm font-medium"
                                    >
                                      <Github className="h-4 w-4" />
                                      Code
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="p-6">
                              <h3 className="font-semibold text-slate-800 text-lg mb-3">
                                {project.title}
                              </h3>
                              <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                                {project.description}
                              </p>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies
                                  .slice(0, 4)
                                  .map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-3 py-1 bg-teal-100 text-teal-700 text-xs rounded-full font-medium"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                {project.technologies.length > 4 && (
                                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
                                    +{project.technologies.length - 4} more
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                  <Calendar className="h-4 w-4" />
                                  <span>
                                    {new Date(
                                      project.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>

                                <div className="flex gap-2">
                                  {project.link && (
                                    <a
                                      href={project.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                      title="Live Demo"
                                    >
                                      <ExternalLink className="h-4 w-4" />
                                    </a>
                                  )}
                                  {project.githubLink && (
                                    <a
                                      href={project.githubLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                                      title="View Code"
                                    >
                                      <Github className="h-4 w-4" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </GlassCard>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "testimonials" && (
                  <div className="space-y-6">
                    {testimonials.map((testimonial) => (
                      <GlassCard
                        key={testimonial.id}
                        className="p-6 hover:shadow-xl transition-all duration-500 transform hover:scale-105"
                      >
                        <div className="flex items-start gap-6">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-semibold text-slate-800 text-lg">
                                  {testimonial.name}
                                </h4>
                                <p className="text-slate-600 font-medium">
                                  {testimonial.role}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  {[...Array(testimonial.rating)].map(
                                    (_, i) => (
                                      <Star
                                        key={i}
                                        className="h-4 w-4 fill-amber-400 text-amber-400"
                                      />
                                    )
                                  )}
                                </div>
                                <span className="text-sm text-slate-500">
                                  {testimonial.date}
                                </span>
                              </div>
                            </div>
                            <blockquote className="text-slate-700 italic leading-relaxed">
                              "{testimonial.text}"
                            </blockquote>
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            <div className="sticky top-24 space-y-6">
              <GlassCard className="p-6">
                <h3 className="font-semibold text-slate-800 mb-6 text-lg flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-teal-500" />
                  Connect with {talent?.fullname.split(" ")[0]}
                </h3>
                <div className="space-y-3">
                  {talent?.website && (
                    <a
                      href={talent?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors">
                        <Globe className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-slate-800 font-medium">
                          Website
                        </span>
                        <p className="text-sm text-slate-600">
                          View my portfolio
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 ml-auto group-hover:text-blue-600 transition-colors" />
                    </a>
                  )}
                  {talent?.linkedin && (
                    <a
                      href={talent?.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors">
                        <Linkedin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-slate-800 font-medium">
                          LinkedIn
                        </span>
                        <p className="text-sm text-slate-600">
                          Professional network
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 ml-auto group-hover:text-blue-600 transition-colors" />
                    </a>
                  )}
                  {talent?.github && (
                    <a
                      href={talent?.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="bg-slate-100 p-3 rounded-xl group-hover:bg-slate-200 transition-colors">
                        <Github className="h-5 w-5 text-slate-700" />
                      </div>
                      <div>
                        <span className="text-slate-800 font-medium">
                          GitHub
                        </span>
                        <p className="text-sm text-slate-600">View my code</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 ml-auto group-hover:text-slate-700 transition-colors" />
                    </a>
                  )}
                </div>
              </GlassCard>

              {/* Quick Stats */}
              <GlassCard className="p-6">
                <h3 className="font-semibold text-slate-800 mb-6 text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-teal-500" />
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Response Time</span>
                    <span className="font-semibold text-emerald-600">
                      2 hours
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Success Rate</span>
                    <span className="font-semibold text-teal-600">98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Repeat Clients</span>
                    <span className="font-semibold text-blue-600">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Projects Completed</span>
                    <span className="font-semibold text-slate-800">47</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <GlassCard className="max-w-md w-full animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-xl font-semibold text-slate-800">
                Contact {talent?.fullname}
              </h3>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  placeholder="e.g., Project Opportunity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
                  placeholder="Tell them about your opportunity..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleContactSubmit}
                  disabled={contactMutation.isPending}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl hover:from-teal-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
                >
                  {contactMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
