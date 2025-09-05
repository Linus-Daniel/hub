"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
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
  MessageCircle,
  ThumbsUp,
  Bookmark,
  Share,
  Download,
  ChevronDown,
  ChevronUp,
  FileText,
  Users,
  Building,
  Phone,
  Heart,
  Paperclip,
  Smile,
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
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      name: "Michael Roberts",
      role: "Project Manager, TechFlow",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      text: '"Sarah\'s work exceeded our expectations. Her attention to detail and user-focused approach transformed our product. Highly recommended!"',
    },
    {
      id: 2,
      name: "Emma Williams",
      role: "Founder, CreativeHub",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      text: '"Working with Sarah was a pleasure. She brings both technical expertise and creative vision to every project. Our users love the new interface she designed."',
    },
    {
      id: 3,
      name: "David Chen",
      role: "CTO, InnovateTech",
      avatar:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      text: '"Sarah has a rare combination of design talent and technical knowledge. She delivered a beautiful, functional interface and was able to implement it flawlessly."',
    },
  ];

  useEffect(() => {
    fetchTalentData();
  }, [talentId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  const startChat = () => {
    setChatStarted(true);
    setIsMobileChatOpen(true);

    setTimeout(() => {
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: 1,
            sender: "talent",
            text: "Hi there! Thanks for reaching out. How can I help with your project today?",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }, 2000);
    }, 500);
  };

  const sendMessage = () => {
    const messageText = messageInputRef.current?.value.trim();
    if (messageText && messageInputRef.current) {
      const newMessage = {
        id: messages.length + 2,
        sender: "user",
        text: messageText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages([...messages, newMessage]);
      messageInputRef.current.value = "";

      setTimeout(() => {
        setIsTyping(true);

        setTimeout(() => {
          setIsTyping(false);
          setMessages([
            ...messages,
            newMessage,
            {
              id: messages.length + 3,
              sender: "talent",
              text: "Thanks for your message! I'll get back to you soon.",
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]);
        }, 2000);
      }, 1000);
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
    { id: "testimonials", label: "Testimonials", count: testimonials.length },
  ];

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{talent.fullname} | CONCESTalent</title>
        <meta
          name="description"
          content={`Profile of ${talent.fullname} on CONCESTalent`}
        />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="font-medium">Back to Directory</span>
            </button>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-gray-700 hover:text-teal-600 transition cursor-pointer">
                Home
              </span>
              <span className="text-gray-700 hover:text-teal-600 transition cursor-pointer">
                Directory
              </span>
              <span className="text-gray-700 hover:text-teal-600 transition cursor-pointer">
                Events
              </span>
              <span className="text-gray-700 hover:text-teal-600 transition cursor-pointer">
                Resources
              </span>
            </div>
            <div className="md:hidden">
              <button className="text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Profile Overview */}
          <div className="lg:w-2/3">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  {talent.avatar ? (
                    <Image
                      src={talent.avatar}
                      alt={talent.fullname}
                      width={112}
                      height={112}
                      className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full border-4 border-white bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-3xl font-bold">
                      {talent.fullname
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {talent.fullname}
                    </h1>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Available for Projects
                    </span>
                  </div>
                  {talent.major && (
                    <p className="text-gray-600 mt-1 mb-4">{talent.major}</p>
                  )}

                  <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
                      <Briefcase className="h-4 w-4" />
                      <span>View Portfolio</span>
                    </button>
                    <button
                      onClick={() => setIsContactModalOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Hire Me</span>
                    </button>
                    <button
                      onClick={startChat}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition lg:hidden"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="border-b">
                <nav className="flex overflow-x-auto px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-4 border-b-2 transition-colors whitespace-nowrap ${
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

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    {talent.bio && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                          About Me
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                          {talent.bio}
                        </p>
                      </div>
                    )}

                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-3">
                        Education
                      </h2>
                      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="bg-gray-900 text-white p-3 rounded-lg">
                          <GraduationCap className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {talent.university}
                          </h3>
                          <p className="text-gray-600">{talent.major}</p>
                          {talent.graduationYear && (
                            <p className="text-gray-500 text-sm">
                              Expected Graduation: {talent.graduationYear}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-3">
                        Contact Information
                      </h2>
                      <div className="space-y-2">
                        {talent.privacy.showEmail && (
                          <div className="flex items-center gap-2 text-gray-600 p-3 bg-gray-50 rounded-lg">
                            <Mail className="h-5 w-5" />
                            <span>{talent.email}</span>
                          </div>
                        )}
                        {talent.phone && talent.privacy.showPhone && (
                          <div className="flex items-center gap-2 text-gray-600 p-3 bg-gray-50 rounded-lg">
                            <Phone className="h-5 w-5" />
                            <span>{talent.phone}</span>
                          </div>
                        )}
                        {talent.location && talent.privacy.showLocation && (
                          <div className="flex items-center gap-2 text-gray-600 p-3 bg-gray-50 rounded-lg">
                            <MapPin className="h-5 w-5" />
                            <span>{talent.location}</span>
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
                                      <ThumbsUp className="h-4 w-4" />
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
                                        style={{
                                          width: `${skill.proficiency}%`,
                                        }}
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                {activeTab === "testimonials" && (
                  <div className="space-y-4">
                    {testimonials.map((testimonial) => (
                      <div
                        key={testimonial.id}
                        className="bg-gray-50 rounded-lg p-6"
                      >
                        <div className="flex items-center mb-4">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full mr-3"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 italic">
                          "{testimonial.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Chat Interface (Desktop) */}
          <div className="lg:w-1/3 hidden lg:block">
            <div className="bg-white rounded-xl shadow-sm h-fit sticky top-6">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  {talent.avatar ? (
                    <img
                      src={talent.avatar}
                      alt={talent.fullname}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold mr-3">
                      {talent.fullname
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {talent.fullname}
                    </h3>
                    <div className="flex items-center text-sm text-green-600">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Online
                    </div>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

              {/* Chat Messages Area */}
              <div className="p-4 h-96 overflow-y-auto">
                {!chatStarted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-6">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                      <MessageCircle className="text-2xl text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Start a conversation
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Send {talent.fullname.split(" ")[0]} a message to discuss
                      your project needs
                    </p>
                    <button
                      onClick={startChat}
                      className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                    >
                      Start Chatting
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center text-xs text-gray-500 my-2">
                      Today,{" "}
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>

                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-end mb-4 ${
                          message.sender === "user" ? "justify-end" : ""
                        }`}
                      >
                        {message.sender !== "user" && (
                          <img
                            src={
                              talent.avatar ||
                              "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                            }
                            alt={talent.fullname}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                        )}
                        {message.sender === "user" && (
                          <span className="text-xs text-gray-500 mr-2">
                            {message.time}
                          </span>
                        )}
                        <div
                          className={`max-w-[75%] ${
                            message.sender === "user"
                              ? "bg-gray-900 text-white rounded-t-xl rounded-bl-xl"
                              : "bg-gray-100 text-gray-800 rounded-t-xl rounded-br-xl"
                          } p-3`}
                        >
                          <p>{message.text}</p>
                        </div>
                        {message.sender !== "user" && (
                          <span className="text-xs text-gray-500 ml-2">
                            {message.time}
                          </span>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex items-end mb-4">
                        <img
                          src={
                            talent.avatar ||
                            "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                          }
                          alt={talent.fullname}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div className="bg-gray-100 rounded-xl p-3 px-4">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Message Composer */}
              {chatStarted && (
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700">
                      <Smile className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700">
                      <Paperclip className="h-5 w-5" />
                    </button>
                    <div className="flex-grow relative">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                        ref={messageInputRef}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      />
                    </div>
                    <button
                      onClick={sendMessage}
                      className="p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Connect with {talent.fullname.split(" ")[0]}
              </h3>
              <div className="space-y-3">
                {talent.website && (
                  <a
                    href={talent.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <Globe className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">Website</span>
                  </a>
                )}
                {talent.linkedin && (
                  <a
                    href={talent.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <Linkedin className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">LinkedIn</span>
                  </a>
                )}
                {talent.github && (
                  <a
                    href={talent.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <Github className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Contact Button (Sticky) */}
      <div className="fixed bottom-6 right-6 lg:hidden z-40">
        <button
          onClick={startChat}
          className="w-14 h-14 rounded-full bg-teal-600 shadow-lg flex items-center justify-center text-white"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Chat Modal */}
      <div
        className={`fixed inset-0 bg-white z-50 transform ${
          isMobileChatOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center">
            <button
              onClick={() => setIsMobileChatOpen(false)}
              className="mr-3 text-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            {talent.avatar ? (
              <img
                src={talent.avatar}
                alt={talent.fullname}
                className="w-10 h-10 rounded-full mr-3"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold mr-3">
                {talent.fullname
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900">{talent.fullname}</h3>
              <div className="flex items-center text-sm text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Online
              </div>
            </div>
          </div>

          {/* Mobile Chat Messages */}
          <div className="flex-grow p-4 overflow-y-auto">
            {!chatStarted ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="text-2xl text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Start a conversation
                </h3>
                <p className="text-gray-600 mb-6">
                  Send {talent.fullname.split(" ")[0]} a message to discuss your
                  project needs
                </p>
                <button
                  onClick={startChat}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                >
                  Start Chatting
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center text-xs text-gray-500 my-2">
                  Today,{" "}
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-end mb-4 ${
                      message.sender === "user" ? "justify-end" : ""
                    }`}
                  >
                    {message.sender !== "user" && (
                      <img
                        src={
                          talent.avatar ||
                          "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                        }
                        alt={talent.fullname}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    {message.sender === "user" && (
                      <span className="text-xs text-gray-500 mr-2">
                        {message.time}
                      </span>
                    )}
                    <div
                      className={`max-w-[75%] ${
                        message.sender === "user"
                          ? "bg-gray-900 text-white rounded-t-xl rounded-bl-xl"
                          : "bg-gray-100 text-gray-800 rounded-t-xl rounded-br-xl"
                      } p-3`}
                    >
                      <p>{message.text}</p>
                    </div>
                    {message.sender !== "user" && (
                      <span className="text-xs text-gray-500 ml-2">
                        {message.time}
                      </span>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-end mb-4">
                    <img
                      src={
                        talent.avatar ||
                        "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                      }
                      alt={talent.fullname}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div className="bg-gray-100 rounded-xl p-3 px-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Mobile Message Composer */}
          {chatStarted && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Smile className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Paperclip className="h-5 w-5" />
                </button>
                <div className="flex-grow relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                    ref={messageInputRef}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                </div>
                <button
                  onClick={sendMessage}
                  className="p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
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
