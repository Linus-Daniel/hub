"use client";

import { Edit2, Trash2, ExternalLink, Github, Calendar } from "lucide-react";

interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    description: string;
    thumbnail?: string;
    githubLink?: string;
    link?: string;
    technologies: string[];
    createdAt: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-100 relative group">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
            >
              <Edit2 className="h-4 w-4 text-gray-700" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
          {project.title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
          </div>

          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(project.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
