"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
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

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
  githubLink?: string;
  status?: 'pending' | 'in_progress' | 'completed' | 'on_hold';
  startDate?: string;
  endDate?: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Projects() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
      return;
    }
    if (status === "authenticated") {
      fetchProjects();
    }
  }, [status, router]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");

      setProjects(projects.filter((p) => p._id !== id));
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 border-green-200";
      case "in_progress":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "on_hold":
        return "text-red-600 bg-red-50 border-red-200";
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
      case "on_hold":
        return ExclamationCircleIcon;
      default:
        return ClockIcon;
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
      case "on_hold":
        return "On Hold";
      default:
        return "Unknown";
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "all") return true;
    if (activeTab === "active")
      return ["in_progress", "pending"].includes(project.status || "pending");
    if (activeTab === "completed") return project.status === "completed";
    return project.status === activeTab;
  });

  const stats = {
    total: projects.length,
    active: projects.filter((p) =>
      ["in_progress", "pending"].includes(p.status || "pending")
    ).length,
    completed: projects.filter((p) => p.status === "completed").length,
    featured: projects.filter((p) => p.featured).length,
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/auth");
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy mb-2">Projects</h1>
          <p className="text-gray-600">
            Manage your project portfolio
          </p>
        </div>
        <Link href="/account/portfolio">
          <button className="flex items-center gap-2 bg-teal text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition mt-4 md:mt-0">
            <PlusIcon className="h-5 w-5" />
            New Project
          </button>
        </Link>
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
              <p className="text-2xl font-bold text-navy">{stats.completed}</p>
              <p className="text-gray-600">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-gold bg-opacity-10 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-gold" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-navy">{stats.featured}</p>
              <p className="text-gray-600">Featured</p>
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
                const StatusIcon = getStatusIcon(project.status || "pending");

                return (
                  <div
                    key={project._id}
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
                              project.status || "pending"
                            )}`}
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {getStatusLabel(project.status || "pending")}
                          </span>
                          {project.featured && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 mb-3">{project.description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          {project.startDate && (
                            <div className="flex items-center">
                              <CalendarDaysIcon className="h-4 w-4 mr-1" />
                              <span>
                                Started {new Date(project.startDate).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          {project.endDate && (
                            <div className="flex items-center">
                              <CalendarDaysIcon className="h-4 w-4 mr-1" />
                              <span>
                                Ended {new Date(project.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            <span>
                              Updated {new Date(project.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-teal transition"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </a>
                        )}
                        <Link href={`/account/portfolio?edit=${project._id}`}>
                          <button className="p-2 text-gray-400 hover:text-navy transition">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 5).map((tech, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="text-xs text-gray-500">
                            +{project.technologies.length - 5} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center mt-2 md:mt-0 space-x-2">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-600 hover:text-navy"
                          >
                            GitHub
                          </a>
                        )}
                        <Link href={`/account/portfolio?view=${project._id}`}>
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
                  ? "You haven't created any projects yet. Create your first project to get started."
                  : `No ${activeTab} projects found. Try switching to a different tab.`}
              </p>
              {activeTab === "all" && (
                <Link href="/account/portfolio">
                  <button className="bg-teal text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition">
                    Create Your First Project
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}