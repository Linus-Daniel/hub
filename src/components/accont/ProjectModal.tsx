"use client";

import { useState, useEffect, useCallback } from "react";
import {
  X,
  Plus,
  ExternalLink,
  Github,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import ImageUpload from "../ImageUpload";
import { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSave: (data: Project) => void;
  isLoading?: boolean;
}

interface FormErrors {
  title?: string;
  description?: string;
  technologies?: string;
  githubLink?: string;
  link?: string;
}

// Validation functions
const validateUrl = (url: string): boolean => {
  if (!url) return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const validateGithubUrl = (url: string): boolean => {
  if (!url) return true; // Optional field
  return validateUrl(url) && url.includes("github.com");
};

const validateForm = (data: Project): FormErrors => {
  const errors: FormErrors = {};

  // Required fields
  if (!data.title.trim()) {
    errors.title = "Title is required";
  } else if (data.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }

  if (!data.description.trim()) {
    errors.description = "Description is required";
  } else if (data.description.length < 10) {
    errors.description = "Description must be at least 10 characters";
  } else if (data.description.length > 500) {
    errors.description = "Description must be less than 500 characters";
  }

  if (data.technologies.length === 0) {
    errors.technologies = "At least one technology is required";
  }

  // URL validations
  if (data.githubLink && !validateGithubUrl(data.githubLink)) {
    errors.githubLink = "Please enter a valid GitHub URL";
  }

  if (data.link && !validateUrl(data.link)) {
    errors.link = "Please enter a valid URL";
  }

  return errors;
};

export default function ProjectModal({
  project,
  onClose,
  onSave,
  isLoading = false,
}: ProjectModalProps) {
  const [formData, setFormData] = useState<Project>({
    title: "",
    description: "",
    thumbnail: "",
    githubLink: "",
    link: "",
    technologies: [],
  });

  const [techInput, setTechInput] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when project changes
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        thumbnail: project.thumbnail || "",
        githubLink: project.githubLink || "",
        link: project.link || "",
        technologies: project.technologies || [],
      });
    } else {
      // Reset form for new project
      setFormData({
        title: "",
        description: "",
        thumbnail: "",
        githubLink: "",
        link: "",
        technologies: [],
      });
    }
    setErrors({});
    setTouched({});
  }, [project]);

  // Validate form on data change
  useEffect(() => {
    const newErrors = validateForm(formData);
    setErrors(newErrors);
  }, [formData]);

  const handleInputChange = useCallback(
    (field: keyof Project, value: string | string[]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (!touched[field]) {
        setTouched((prev) => ({ ...prev, [field]: true }));
      }
    },
    [touched]
  );

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allFields = [
      "title",
      "description",
      "technologies",
      "githubLink",
      "link",
    ];
    setTouched(
      allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );

    // Validate form
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = useCallback(
    (url: string) => {
      handleInputChange("thumbnail", url);
    },
    [handleInputChange]
  );

  const addTechnology = useCallback(() => {
    const tech = techInput.trim();
    if (tech && !formData.technologies.includes(tech)) {
      if (formData.technologies.length >= 10) {
        return; // Limit to 10 technologies
      }
      handleInputChange("technologies", [...formData.technologies, tech]);
      setTechInput("");
    }
  }, [techInput, formData.technologies, handleInputChange]);

  const removeTechnology = useCallback(
    (tech: string) => {
      handleInputChange(
        "technologies",
        formData.technologies.filter((t) => t !== tech)
      );
    },
    [formData.technologies, handleInputChange]
  );

  const handleTechInputKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTechnology();
      }
    },
    [addTechnology]
  );

  const isFormValid = Object.keys(errors).length === 0;
  const showError = (field: keyof FormErrors) =>
    touched[field] && errors[field];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {project ? "Edit Project" : "Create New Project"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {project
                ? "Update your project details"
                : "Add a new project to your portfolio"}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    onBlur={() => handleBlur("title")}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                      showError("title")
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter project title..."
                    maxLength={100}
                  />
                  {showError("title") && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.title}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.title.length}/100 characters
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    onBlur={() => handleBlur("description")}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none ${
                      showError("description")
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Describe your project, its purpose, and key features..."
                    maxLength={500}
                  />
                  {showError("description") && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.description}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.description.length}/500 characters
                  </p>
                </div>

                {/* URLs */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Github className="inline h-4 w-4 mr-1" />
                      GitHub Repository
                    </label>
                    <input
                      type="url"
                      value={formData.githubLink}
                      onChange={(e) =>
                        handleInputChange("githubLink", e.target.value)
                      }
                      onBlur={() => handleBlur("githubLink")}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                        showError("githubLink")
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="https://github.com/username/repo"
                    />
                    {showError("githubLink") && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.githubLink}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <ExternalLink className="inline h-4 w-4 mr-1" />
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      value={formData.link}
                      onChange={(e) =>
                        handleInputChange("link", e.target.value)
                      }
                      onBlur={() => handleBlur("link")}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors ${
                        showError("link")
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="https://your-project-demo.com"
                    />
                    {showError("link") && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.link}
                      </p>
                    )}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Technologies & Tools *
                  </label>

                  {/* Technology Tags */}
                  {formData.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-lg">
                      {formData.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechnology(tech)}
                            className="hover:text-red-600 transition-colors"
                            aria-label={`Remove ${tech}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Add Technology Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyPress={handleTechInputKeyPress}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                      placeholder="Add technology (e.g., React, Node.js, Python)..."
                      disabled={formData.technologies.length >= 10}
                    />
                    <button
                      type="button"
                      onClick={addTechnology}
                      disabled={
                        !techInput.trim() || formData.technologies.length >= 10
                      }
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:opacity-50 rounded-lg transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>

                  {showError("technologies") && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.technologies}
                    </p>
                  )}

                  <p className="mt-1 text-xs text-gray-500">
                    {formData.technologies.length}/10 technologies added
                  </p>
                </div>
              </div>

              {/* Right Column - Image Upload and Preview */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <ImageIcon className="inline h-4 w-4 mr-1" />
                    Project Thumbnail
                  </label>

                  {/* Image Preview */}
                  {formData.thumbnail ? (
                    <div className="relative mb-4 group">
                      <img
                        src={formData.thumbnail}
                        alt="Project thumbnail"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleInputChange("thumbnail", "")}
                          className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <X className="h-4 w-4 mr-1 inline" />
                          Remove Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4 bg-gray-50">
                      <div className="text-center">
                        <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">
                          No image selected
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Upload Button */}
                  <ImageUpload
                    title="Upload Project Thumbnail"
                    onSuccess={(info) => handleImageUpload(info.url)}
                    className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                  >
                    <ImageIcon className="h-4 w-4 mr-2 inline" />
                    {formData.thumbnail ? "Change Thumbnail" : "Add Thumbnail"}
                  </ImageUpload>

                  <p className="mt-2 text-xs text-gray-500">
                    Recommended: 16:9 aspect ratio, max 5MB
                  </p>
                </div>

                {/* Preview Card */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Preview
                  </h3>
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {formData.thumbnail && (
                      <img
                        src={formData.thumbnail}
                        alt="Preview"
                        className="w-full h-32 object-cover"
                      />
                    )}
                    <div className="p-3">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {formData.title || "Project Title"}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {formData.description ||
                          "Project description will appear here..."}
                      </p>
                      {formData.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {formData.technologies
                            .slice(0, 3)
                            .map((tech, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          {formData.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              +{formData.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting || isLoading}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting || isLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    {project ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{project ? "Update Project" : "Create Project"}</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
