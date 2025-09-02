"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Award, TrendingUp } from "lucide-react";
import SkillCard from "@/components/accont/SkillCard";
import SkillModal from "@/components/accont/SkillModal";
import { toast } from "sonner";

interface Skill {
  _id: string;
  category: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  proficiency: number;
  experience: number;
  endorsements: number;
  description?: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const categories = [
    "Frontend Development",
    "Backend Development",
    "Mobile Development",
    "Design",
    "Design Tools",
    "Programming Languages",
    "Databases",
    "Cloud & DevOps",
    "Data Science",
    "Marketing",
    "Project Management",
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/skills");
      if (!response.ok) throw new Error("Failed to fetch skills");
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete skill");

      setSkills(skills.filter((s) => s._id !== id));
      toast.success("Skill deleted successfully");
    } catch (error) {
      toast.error("Failed to delete skill");
    }
  };

  const handleSave = async (skillData: Partial<Skill>) => {
    try {
      const url = editingSkill
        ? `/api/skills/${editingSkill._id}`
        : "/api/skills";

      const method = editingSkill ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skillData),
      });

      if (!response.ok) throw new Error("Failed to save skill");

      const savedSkill = await response.json();

      if (editingSkill) {
        setSkills(
          skills.map((s) => (s._id === savedSkill._id ? savedSkill : s))
        );
        toast.success("Skill updated successfully");
      } else {
        setSkills([savedSkill, ...skills]);
        toast.success("Skill added successfully");
      }

      setIsModalOpen(false);
      setEditingSkill(null);
    } catch (error) {
      toast.error("Failed to save skill");
    }
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const totalEndorsements = skills.reduce(
    (sum, skill) => sum + skill.endorsements,
    0
  );
  const expertSkills = skills.filter((s) => s.level === "Expert").length;
  const avgProficiency =
    skills.length > 0
      ? Math.round(
          skills.reduce((sum, s) => sum + s.proficiency, 0) / skills.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Skills & Expertise
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your professional skills
            </p>
          </div>

          <button
            onClick={() => {
              setEditingSkill(null);
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Skill</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-50 rounded-lg">
              <Award className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {skills.length}
              </div>
              <div className="text-sm text-gray-600">Total Skills</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {expertSkills}
              </div>
              <div className="text-sm text-gray-600">Expert Level</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Award className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {totalEndorsements}
              </div>
              <div className="text-sm text-gray-600">Endorsements</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {avgProficiency}%
              </div>
              <div className="text-sm text-gray-600">Avg. Proficiency</div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills by Category */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      ) : Object.keys(groupedSkills).length === 0 ? (
        <div className="text-center py-12">
          <Award className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No skills found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || selectedCategory
              ? "Try adjusting your filters"
              : "Start by adding your first skill"}
          </p>
          {!searchTerm && !selectedCategory && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Add Your First Skill
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {category}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({categorySkills.length})
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill) => (
                  <SkillCard
                    key={skill._id}
                    skill={skill}
                    onEdit={() => {
                      setEditingSkill(skill);
                      setIsModalOpen(true);
                    }}
                    onDelete={() => handleDelete(skill._id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <SkillModal
          skill={editingSkill}
          categories={categories}
          onClose={() => {
            setIsModalOpen(false);
            setEditingSkill(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
