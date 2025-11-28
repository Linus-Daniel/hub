"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BriefcaseIcon,
  StarIcon,
  UserCircleIcon,
  PlusIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // console.log(session?.user)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
    if (status === "authenticated") {
      fetchDashboardData();
    }
  }, [status, router]);

  const fetchDashboardData = async () => {
    try {
      const [projectsRes, skillsRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/skills"),
      ]);

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json();
        setProjects(projectsData);
      }

      if (skillsRes.ok) {
        const skillsData = await skillsRes.json();
        setSkills(skillsData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect in useEffect
  }

  const projectCount = projects.length;
  const skillCount = skills.length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;

  const quickActions = [
    {
      title: "Add Project",
      href: "/account/portfolio",
      icon: PlusIcon,
      color: "bg-teal hover:bg-teal-dark",
    },
    {
      title: "Update Skills",
      href: "/account/skills",
      icon: ChartBarIcon,
      color: "bg-navy hover:bg-navy-dark",
    },
    {
      title: "Edit Profile",
      href: "/account/profile",
      icon: UserCircleIcon,
      color: "bg-gold hover:bg-gold-dark",
    },
    {
      title: "Settings",
      href: "/account/settings",
      icon: Cog6ToothIcon,
      color: "bg-gray-600 hover:bg-gray-700",
    },
  ];

  const StatCard = ({
    title,
    value,
    icon: Icon,
  }: {
    title: string;
    value: number;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }) => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-navy">
            {value.toLocaleString()}
          </p>
        </div>
        <div className="p-3 bg-teal bg-opacity-10 rounded-lg">
          <Icon className="h-6 w-6 text-teal" />
        </div>
      </div>
    </div>
  );

  return (
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-navy mb-2">Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {session?.user?.name || 'User'}! Here's your portfolio overview.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Projects"
            value={projectCount}
            icon={BriefcaseIcon}
          />
          <StatCard
            title="Completed Projects"
            value={completedProjects}
            icon={BriefcaseIcon}
          />
          <StatCard
            title="Skills Added"
            value={skillCount}
            icon={StarIcon}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-navy">
                  Recent Projects
                </h2>
                <Link href="/account/portfolio" className="text-teal hover:text-teal-dark text-sm font-medium">
                  View All
                </Link>
              </div>

              {projects.length === 0 ? (
                <div className="text-center py-8">
                  <BriefcaseIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No projects yet</p>
                  <Link
                    href="/account/portfolio"
                    className="inline-flex items-center px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-dark transition-colors"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Your First Project
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.slice(0, 3).map((project: any) => (
                    <div key={project._id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="p-2 rounded-lg bg-teal bg-opacity-10">
                        <BriefcaseIcon className="h-4 w-4 text-teal" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800">
                          {project.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {project.description?.substring(0, 100)}...
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-navy mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link key={index} href={action.href}>
                      <div
                        className={`${action.color} text-white p-4 rounded-lg text-center transition-colors cursor-pointer`}
                      >
                        <Icon className="h-6 w-6 mx-auto mb-2" />
                        <span className="text-sm font-medium">
                          {action.title}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-navy mb-4">
                Profile Progress
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    session?.user?.name ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                  <span className="text-gray-600">Basic info</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    projectCount > 0 ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                  <span className="text-gray-600">Portfolio projects</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    skillCount > 0 ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                  <span className="text-gray-600">Skills added</span>
                </div>
              </div>
            </div>

            {/* Recent Skills */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-navy">Your Skills</h3>
                <Link href="/account/skills" className="text-teal hover:text-teal-dark text-sm font-medium">
                  View All
                </Link>
              </div>

              {skills.length === 0 ? (
                <div className="text-center py-4">
                  <StarIcon className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 mb-3">No skills added yet</p>
                  <Link
                    href="/account/skills"
                    className="text-xs text-teal hover:text-teal-dark font-medium"
                  >
                    Add Skills
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {skills.slice(0, 4).map((skill: any) => (
                    <div key={skill._id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{skill.name}</span>
                      <span className="text-xs text-gray-500 capitalize">{skill.proficiency}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
