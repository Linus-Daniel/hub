"use client"; // pages/dashboard.js
import { useState } from "react";
import Layout from "@/components/accont/Layout";
import Link from "next/link";
import {
  EyeIcon,
  ChatBubbleLeftIcon,
  BriefcaseIcon,
  StarIcon,
  UserGroupIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  BellIcon,
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("7days");

  // Mock data - in real app this would come from API
  const stats = {
    profileViews: { current: 1247, change: 12.5, trend: "up" },
    messages: { current: 23, change: -8.2, trend: "down" },
    projectInquiries: { current: 8, change: 25.0, trend: "up" },
    endorsements: { current: 45, change: 15.8, trend: "up" },
  };

  const recentActivity = [
    {
      id: 1,
      type: "view",
      message: "Your profile was viewed by TechCorp recruiter",
      time: "2 hours ago",
      icon: EyeIcon,
      color: "text-blue-600 bg-blue-50",
    },
    {
      id: 2,
      type: "message",
      message: "New message from Sarah Williams about UI project",
      time: "4 hours ago",
      icon: ChatBubbleLeftIcon,
      color: "text-green-600 bg-green-50",
    },
    {
      id: 3,
      type: "endorsement",
      message: "John Doe endorsed you for React development",
      time: "1 day ago",
      icon: StarIcon,
      color: "text-yellow-600 bg-yellow-50",
    },
    {
      id: 4,
      type: "project",
      message: "Project inquiry for e-commerce website development",
      time: "2 days ago",
      icon: BriefcaseIcon,
      color: "text-purple-600 bg-purple-50",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Complete portfolio review",
      due: "Today",
      priority: "high",
    },
    {
      id: 2,
      title: "Update skills section",
      due: "Tomorrow",
      priority: "medium",
    },
    {
      id: 3,
      title: "Respond to client messages",
      due: "Dec 28",
      priority: "high",
    },
    {
      id: 4,
      title: "Upload new project screenshots",
      due: "Dec 30",
      priority: "low",
    },
  ];

  const quickActions = [
    {
      title: "Add Project",
      href: "/portfolio",
      icon: PlusIcon,
      color: "bg-teal hover:bg-teal-dark",
    },
    {
      title: "Update Skills",
      href: "/skills",
      icon: ChartBarIcon,
      color: "bg-navy hover:bg-navy-dark",
    },
    {
      title: "View Messages",
      href: "/messages",
      icon: ChatBubbleLeftIcon,
      color: "bg-gold hover:bg-gold-dark",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: UserGroupIcon,
      color: "bg-gray-600 hover:bg-gray-700",
    },
  ];

  const StatCard = ({
    title,
    value,
    change,
    trend,
    icon: Icon,
  }: {
    title: string;
    value: number;
    change: number;
    trend: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }) => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-navy">
            {value.toLocaleString()}
          </p>
          <div className="flex items-center mt-2">
            {trend === "up" ? (
              <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-sm font-medium ${
                trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {Math.abs(change)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last week</span>
          </div>
        </div>
        <div className="p-3 bg-teal bg-opacity-10 rounded-lg">
          <Icon className="h-6 w-6 text-teal" />
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-navy mb-2">Dashboard</h1>
              <p className="text-gray-600">
                Welcome back! Here's your activity overview.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 3 months</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Profile Views"
            value={stats.profileViews.current}
            change={stats.profileViews.change}
            trend={stats.profileViews.trend}
            icon={EyeIcon}
          />
          <StatCard
            title="Messages"
            value={stats.messages.current}
            change={stats.messages.change}
            trend={stats.messages.trend}
            icon={ChatBubbleLeftIcon}
          />
          <StatCard
            title="Project Inquiries"
            value={stats.projectInquiries.current}
            change={stats.projectInquiries.change}
            trend={stats.projectInquiries.trend}
            icon={BriefcaseIcon}
          />
          <StatCard
            title="Endorsements"
            value={stats.endorsements.current}
            change={stats.endorsements.change}
            trend={stats.endorsements.trend}
            icon={StarIcon}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-navy">
                  Recent Activity
                </h2>
                <button className="text-teal hover:text-teal-dark text-sm font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <div className={`p-2 rounded-lg ${activity.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
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
            {/* Profile Completion */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-navy mb-4">
                Profile Completion
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Overall Progress
                  </span>
                  <span className="text-sm font-medium text-navy">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-teal h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Basic info completed</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Portfolio added</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Add more skills</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                    <span className="text-gray-400">Get endorsements</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-navy">Tasks</h3>
                <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
              </div>

              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-teal border-gray-300 rounded focus:ring-teal"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">{task.title}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">
                          {task.due}
                        </span>
                        <span
                          className={`ml-2 text-xs px-2 py-1 rounded-full ${
                            task.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : task.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-teal text-sm font-medium hover:text-teal-dark transition">
                + Add New Task
              </button>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-navy">
                  Notifications
                </h3>
                <BellIcon className="h-5 w-5 text-gray-400" />
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">
                    Profile Tip
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Adding more project details can increase your profile views
                    by 40%
                  </p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    New Feature
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    You can now showcase video portfolios! Check it out.
                  </p>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800 font-medium">
                    Reminder
                  </p>
                  <p className="text-xs text-yellow-600 mt-1">
                    Complete your profile to unlock premium features
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
