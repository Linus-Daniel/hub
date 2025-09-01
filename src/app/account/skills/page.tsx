"use client";
// pages/skills.js
import { FormEvent, useState } from "react";

interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
  experience: string;
  endorsed: boolean;
  endorsements: number;
  description: string;
}

interface SkillFormData {
  name: string;
  category: string;
  level: number;
  experience: string;
  description: string;
}
import Layout from "@/components/accont/Layout";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  StarIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: 1,
      name: "React",
      category: "Frontend Development",
      level: 90,
      experience: "3 years",
      endorsed: true,
      endorsements: 12,
      description:
        "Advanced proficiency in React development with hooks, context API, and modern patterns",
    },
    {
      id: 2,
      name: "UI/UX Design",
      category: "Design",
      level: 85,
      experience: "4 years",
      endorsed: true,
      endorsements: 18,
      description:
        "User-centered design approach with expertise in wireframing, prototyping, and user research",
    },
    {
      id: 3,
      name: "Node.js",
      category: "Backend Development",
      level: 75,
      experience: "2 years",
      endorsed: false,
      endorsements: 8,
      description:
        "Server-side development with Express.js, MongoDB integration, and API development",
    },
    {
      id: 4,
      name: "Figma",
      category: "Design Tools",
      level: 95,
      experience: "3 years",
      endorsed: true,
      endorsements: 15,
      description:
        "Expert-level proficiency in creating designs, prototypes, and design systems",
    },
    {
      id: 5,
      name: "Python",
      category: "Programming Languages",
      level: 70,
      experience: "2 years",
      endorsed: false,
      endorsements: 5,
      description:
        "Data analysis, automation scripts, and basic web development with Django",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<SkillFormData>({
    name: "",
    category: "",
    level: 50,
    experience: "",
    description: "",
  });

  const categories = [
    "Frontend Development",
    "Backend Development",
    "Design",
    "Design Tools",
    "Programming Languages",
    "Databases",
    "Cloud & DevOps",
    "Mobile Development",
    "Data Science",
    "Marketing",
    "Project Management",
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend Development":
      case "Backend Development":
      case "Programming Languages":
        return CodeBracketIcon;
      case "Design":
      case "Design Tools":
        return PaintBrushIcon;
      case "Data Science":
        return ChartBarIcon;
      default:
        return AcademicCapIcon;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Frontend Development": "text-blue-600 bg-blue-50",
      "Backend Development": "text-green-600 bg-green-50",
      Design: "text-purple-600 bg-purple-50",
      "Design Tools": "text-pink-600 bg-pink-50",
      "Programming Languages": "text-indigo-600 bg-indigo-50",
      Databases: "text-orange-600 bg-orange-50",
      "Cloud & DevOps": "text-gray-600 bg-gray-50",
      "Mobile Development": "text-emerald-600 bg-emerald-50",
      "Data Science": "text-red-600 bg-red-50",
      Marketing: "text-yellow-600 bg-yellow-50",
      "Project Management": "text-teal-600 bg-teal-50",
    };
    return (
      colors[category as keyof typeof colors] || "text-gray-600 bg-gray-50"
    );
  };

  const openModal = (skill: Skill | null = null) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        name: skill.name,
        category: skill.category,
        level: skill.level,
        experience: skill.experience,
        description: skill.description,
      });
    } else {
      setEditingSkill(null);
      setFormData({
        name: "",
        category: "",
        level: 50,
        experience: "",
        description: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSkill(null);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (editingSkill) {
      setSkills((prev) =>
        prev.map((skill) =>
          skill.id === editingSkill.id ? { ...skill, ...formData } : skill
        )
      );
    } else {
      const newSkill = {
        id: Date.now(),
        ...formData,
        endorsed: false,
        endorsements: 0,
      };
      setSkills((prev) => [newSkill, ...prev]);
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      setSkills((prev) => prev.filter((skill) => skill.id !== id));
    }
  };

  const toggleEndorsed = (id: number) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id ? { ...skill, endorsed: !skill.endorsed } : skill
      )
    );
  };

  const getLevelColor = (level: number) => {
    if (level >= 80) return "bg-green-500";
    if (level >= 60) return "bg-yellow-500";
    if (level >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  const getLevelLabel = (level: number) => {
    if (level >= 80) return "Expert";
    if (level >= 60) return "Advanced";
    if (level >= 40) return "Intermediate";
    return "Beginner";
  };

  const groupedSkills = skills.reduce((acc: Record<string, Skill[]>, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">
              Skills & Expertise
            </h1>
            <p className="text-gray-600">
              Manage your skills, set proficiency levels, and track endorsements
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-teal text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition mt-4 md:mt-0"
          >
            <PlusIcon className="h-5 w-5" />
            Add Skill
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-teal bg-opacity-10 rounded-lg">
                <AcademicCapIcon className="h-6 w-6 text-teal" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-navy">{skills.length}</p>
                <p className="text-gray-600">Total Skills</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-500 bg-opacity-10 rounded-lg">
                <StarIcon className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-navy">
                  {skills.filter((s) => s.level >= 80).length}
                </p>
                <p className="text-gray-600">Expert Level</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gold bg-opacity-10 rounded-lg">
                <StarIconSolid className="h-6 w-6 text-gold" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-navy">
                  {skills.filter((s) => s.endorsed).length}
                </p>
                <p className="text-gray-600">Endorsed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-navy bg-opacity-10 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-navy" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-navy">
                  {skills.reduce((acc, s) => acc + s.endorsements, 0)}
                </p>
                <p className="text-gray-600">Total Endorsements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills by Category */}
        <div className="space-y-8">
          {Object.entries(groupedSkills).map(
            ([category, categorySkills]: [string, Skill[]]) => {
              const IconComponent = getCategoryIcon(category);
              const colorClass = getCategoryColor(category);

              return (
                <div
                  key={category}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-center mb-6">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-semibold text-navy ml-3">
                      {category}
                    </h2>
                    <span className="ml-auto text-sm text-gray-500">
                      {categorySkills.length} skill
                      {categorySkills.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-teal transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-navy">
                              {skill.name}
                            </h3>
                            <div className="flex items-center mt-1">
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-medium ${getLevelColor(
                                  skill.level
                                )} text-white`}
                              >
                                {getLevelLabel(skill.level)}
                              </span>
                              {skill.endorsed && (
                                <StarIconSolid className="h-4 w-4 text-gold ml-2" />
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => openModal(skill)}
                              className="p-1 text-gray-400 hover:text-teal transition"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(skill.id)}
                              className="p-1 text-gray-400 hover:text-red-500 transition"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Proficiency</span>
                            <span className="text-navy font-medium">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${getLevelColor(
                                skill.level
                              )}`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            <span className="font-medium">Experience:</span>{" "}
                            {skill.experience}
                          </p>
                          <p>
                            <span className="font-medium">Endorsements:</span>{" "}
                            {skill.endorsements}
                          </p>
                        </div>

                        {skill.description && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>

        {skills.length === 0 && (
          <div className="text-center py-12">
            <AcademicCapIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No skills added yet
            </h3>
            <p className="text-gray-400 mb-6">
              Start by adding your first skill to showcase your expertise.
            </p>
            <button
              onClick={() => openModal()}
              className="bg-teal text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              Add Your First Skill
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-navy">
                {editingSkill ? "Edit Skill" : "Add New Skill"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-navy"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  placeholder="e.g., React, Python, UI Design"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proficiency Level: {formData.level}% (
                  {getLevelLabel(formData.level)})
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={(e) =>
                    handleInputChange("level", parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Expert</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) =>
                    handleInputChange("experience", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  placeholder="e.g., 2 years, 6 months"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  placeholder="Brief description of your expertise with this skill..."
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-teal text-white rounded-lg hover:bg-opacity-90 transition"
                >
                  {editingSkill ? "Update Skill" : "Add Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
