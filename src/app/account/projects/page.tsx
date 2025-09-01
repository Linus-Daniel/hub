// pages/projects.js
import { useState } from "react";
import Layout from "@/components/accont/Layout";
import Link from "next/link";
import {
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function Projects() {
  const [activeTab, setActiveTab] = useState("all");
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Mobile App Design",
      client: "TechStart Inc",
      status: "in_progress",
      progress: 65,
      budget: 15000,
      deadline: "2024-01-15",
      description:
        "Complete UI/UX design for a mobile e-commerce application targeting Gen Z consumers",
      technologies: ["Figma", "React Native", "Adobe XD"],
      team: ["Sarah Williams", "Michael Chen"],
      startDate: "2023-11-01",
      lastActivity: "2 hours ago",
      priority: "high",
    },
    {
      id: 2,
      title: "Corporate Website Redesign",
      client: "Global Solutions Ltd",
      status: "completed",
      progress: 100,
      budget: 8500,
      deadline: "2023-12-20",
      description:
        "Modern, responsive website redesign with improved user experience and brand consistency",
      technologies: ["React", "Tailwind CSS", "Next.js"],
      team: ["David Johnson"],
      startDate: "2023-10-15",
      lastActivity: "1 week ago",
      priority: "medium",
    },
    {
      id: 3,
      title: "SaaS Dashboard Interface",
      client: "DataFlow Analytics",
      status: "pending",
      progress: 0,
      budget: 22000,
      deadline: "2024-02-28",
      description:
        "Complex data visualization dashboard for business intelligence platform",
      technologies: ["Vue.js", "D3.js", "TypeScript"],
      team: ["Emma Rodriguez", "James Wilson"],
      startDate: "2024-01-05",
      lastActivity: "3 days ago",
      priority: "high",
    },
    {
      id: 4,
      title: "Mobile Banking App",
      client: "SecureBank",
      status: "review",
      progress: 90,
      budget: 35000,
      deadline: "2024-01-30",
      description:
        "Secure banking application with advanced features and biometric authentication",
      technologies: ["React Native", "Node.js", "MongoDB"],
      team: ["Olivia Martinez", "Michael Chen", "Sarah Williams"],
      startDate: "2023-09-01",
      lastActivity: "1 day ago",
      priority: "critical",
    },
    {
      id: 5,
      title: "Portfolio Website",
      client: "Creative Agency",
      status: "in_progress",
      progress: 40,
      budget: 5000,
      deadline: "2024-01-10",
      description:
        "Modern portfolio website showcasing creative work with interactive elements",
      technologies: ["HTML", "CSS", "JavaScript"],
      team: ["James Wilson"],
      startDate: "2023-12-01",
      lastActivity: "5 hours ago",
      priority: "low",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 border-green-200";
      case "in_progress":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "review":
        return "text-purple-600 bg-purple-50 border-purple-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircleIcon;
      case "in_progress":
        return ClockIcon;
      case "pending":
        return ExclamationCircleIcon;
      case "review":
        return EyeIcon;
      default:
        return ClockIcon;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-700 bg-red-100";
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      case "pending":
        return "Pending";
      case "review":
        return "Under Review";
      default:
        return status;
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "all") return true;
    if (activeTab === "active")
      return ["in_progress", "review", "pending"].includes(project.status);
    if (activeTab === "completed") return project.status === "completed";
    return project.status === activeTab;
  });

  const stats = {
    total: projects.length,
    active: projects.filter((p) =>
      ["in_progress", "review", "pending"].includes(p.status)
    ).length,
    completed: projects.filter((p) => p.status === "completed").length,
    revenue: projects.reduce(
      (sum, p) => (p.status === "completed" ? sum + p.budget : sum),
      0
    ),
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">Projects</h1>
            <p className="text-gray-600">
              Manage your ongoing and completed projects
            </p>
          </div>
          <button className="flex items-center gap-2 bg-teal text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition mt-4 md:mt-0">
            <PlusIcon className="h-5 w-5" />
            New Project
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-navy bg-opacity-10 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-navy" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-navy">{stats.total}</p>
                <p className="text-gray-600">Total Projects</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500 bg-opacity-10 rounded-lg">
                <ClockIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-navy">{stats.active}</p>
                <p className="text-gray-600">Active Projects</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-500 bg-opacity-10 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-navy">
                  {stats.completed}
                </p>
                <p className="text-gray-600">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gold bg-opacity-10 rounded-lg">
                <CurrencyDollarIcon className="h-6 w-6 text-gold" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-navy">
                  ${stats.revenue.toLocaleString()}
                </p>
                <p className="text-gray-600">Total Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "all", label: "All Projects" },
                { id: "active", label: "Active" },
                { id: "completed", label: "Completed" },
                { id: "pending", label: "Pending" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-teal text-teal"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Projects List */}
          <div className="p-6">
            {filteredProjects.length > 0 ? (
              <div className="space-y-6">
                {filteredProjects.map((project) => {
                  const StatusIcon = getStatusIcon(project.status);

                  return (
                    <div
                      key={project.id}
                      className="border border-gray-200 rounded-lg p-6 hover:border-teal transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-navy">
                              {project.title}
                            </h3>
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                project.status
                              )}`}
                            >
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {getStatusLabel(project.status)}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                project.priority
                              )}`}
                            >
                              {project.priority}
                            </span>
                          </div>

                          <p className="text-gray-600 mb-3">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <UserGroupIcon className="h-4 w-4 mr-1" />
                              <span>{project.client}</span>
                            </div>
                            <div className="flex items-center">
                              <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                              <span>${project.budget.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center">
                              <CalendarDaysIcon className="h-4 w-4 mr-1" />
                              <span>
                                Due{" "}
                                {new Date(
                                  project.deadline
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              <span>{project.lastActivity}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <button className="p-2 text-gray-400 hover:text-teal transition">
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-navy transition">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-500 transition">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {project.status !== "pending" && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="text-navy font-medium">
                              {project.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-teal h-2 rounded-full transition-all duration-500"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Technologies and Team */}
                      <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies
                            .slice(0, 3)
                            .map((tech, index) => (
                              <span
                                key={index}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          {project.technologies.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center mt-2 md:mt-0">
                          <div className="flex -space-x-2 mr-3">
                            {project.team.slice(0, 3).map((member, index) => (
                              <div
                                key={index}
                                className="w-8 h-8 bg-teal bg-opacity-20 border-2 border-white rounded-full flex items-center justify-center text-xs font-medium text-teal"
                              >
                                {member
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                            ))}
                            {project.team.length > 3 && (
                              <div className="w-8 h-8 bg-gray-200 border-2 border-white rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                                +{project.team.length - 3}
                              </div>
                            )}
                          </div>

                          <Link href={`/projects/${project.id}`}>
                            <button className="flex items-center text-teal hover:text-teal-dark text-sm font-medium transition">
                              View Details
                              <ArrowRightIcon className="h-4 w-4 ml-1" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <UserGroupIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  No projects found
                </h3>
                <p className="text-gray-400 mb-6">
                  {activeTab === "all"
                    ? "You haven't started any projects yet. Create your first project to get started."
                    : `No ${activeTab} projects found. Try switching to a different tab.`}
                </p>
                {activeTab === "all" && (
                  <button className="bg-teal text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition">
                    Create Your First Project
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
