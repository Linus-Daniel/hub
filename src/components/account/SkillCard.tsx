"use client";

import { Edit2, Trash2, Star, Clock } from "lucide-react";

interface SkillCardProps {
  skill: {
    _id: string;
    name: string;
    level: string;
    proficiency: number;
    experience: number;
    endorsements: number;
    description?: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export default function SkillCard({ skill, onEdit, onDelete }: SkillCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-green-100 text-green-800";
      case "Advanced":
        return "bg-blue-100 text-blue-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (proficiency: number) => {
    if (proficiency >= 80) return "bg-green-500";
    if (proficiency >= 60) return "bg-blue-500";
    if (proficiency >= 40) return "bg-yellow-500";
    return "bg-gray-500";
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-teal-500 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{skill.name}</h3>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getLevelColor(
              skill.level
            )}`}
          >
            {skill.level}
          </span>
        </div>

        <div className="flex gap-1">
          <button
            onClick={onEdit}
            className="p-1 text-gray-400 hover:text-teal-600 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Proficiency</span>
          <span className="font-medium">{skill.proficiency}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${getProgressColor(
              skill.proficiency
            )}`}
            style={{ width: `${skill.proficiency}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-gray-600">
          <Clock className="h-3 w-3" />
          <span>{skill.experience} years</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <Star className="h-3 w-3" />
          <span>{skill.endorsements}</span>
        </div>
      </div>

      {skill.description && (
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {skill.description}
        </p>
      )}
    </div>
  );
}
