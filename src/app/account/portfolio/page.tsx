"use client";
// pages/portfolio.js
import { useState } from "react";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  createdAt: Date;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}
import Layout from "@/components/accont/Layout";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  XMarkIcon,
  PhotoIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: 1,
      title: "Modern E-commerce Platform",
      description:
        "A complete e-commerce solution with modern UI/UX design, featuring responsive layouts, shopping cart functionality, and payment integration.",
      category: "Web Design",
      technologies: ["React", "Node.js", "Stripe API", "MongoDB"],
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/f3022e92cc-2a04e8e8412e3edd6095.png",
      liveUrl: "https://example-ecommerce.com",
      githubUrl: "https://github.com/user/ecommerce-project",
      featured: true,
      createdAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      title: "Mobile Banking App UI",
      description:
        "Secure and intuitive mobile banking interface designed for seamless financial transactions and account management.",
      category: "Mobile Design",
      technologies: ["Figma", "React Native", "TypeScript"],
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/ba6173455f-86ad43407f42fd1e7255.png",
      liveUrl: "",
      githubUrl: "",
      featured: false,
      createdAt: new Date("2024-02-10"),
    },
    {
      id: 3,
      title: "SaaS Analytics Dashboard",
      description:
        "Business intelligence dashboard with real-time data visualization and advanced analytics capabilities.",
      category: "Dashboard Design",
      technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/425703d595-0fa704803957c22f7214.png",
      liveUrl: "https://analytics-demo.com",
      githubUrl: "https://github.com/user/analytics-dashboard",
      featured: true,
      createdAt: new Date("2024-03-05"),
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    technologies: [],
    image: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
  });

  const categories = [
    "Web Design",
    "Mobile Design",
    "UI/UX Design",
    "Dashboard Design",
    "Branding",
    "Illustration",
    "Frontend Development",
    "Full Stack Development",
  ];

  const openModal = (item: PortfolioItem | null = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description,
        category: item.category,
        technologies: item.technologies,
        image: item.image,
        liveUrl: item.liveUrl,
        githubUrl: item.githubUrl,
        featured: item.featured,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        description: "",
        category: "",
        technologies: [],
        image: "",
        liveUrl: "",
        githubUrl: "",
        featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTechnologyAdd = (tech: string) => {
    if (tech.trim() && !formData.technologies.includes(tech.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, tech.trim()],
      }));
    }
  };

  const handleTechnologyRemove = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingItem) {
      // Update existing item
      setPortfolioItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...item, ...formData } : item
        )
      );
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        ...formData,
        createdAt: new Date(),
      };
      setPortfolioItems((prev) => [newItem, ...prev]);
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this portfolio item?")) {
      setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const toggleFeatured = (id: number) => {
    setPortfolioItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, featured: !item.featured } : item
      )
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">Portfolio</h1>
            <p className="text-gray-600">
              Manage your portfolio items and showcase your work
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-teal text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition mt-4 md:mt-0"
          >
            <PlusIcon className="h-5 w-5" />
            Add Project
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-teal bg-opacity-10 rounded-lg">
                <PhotoIcon className="h-6 w-6 text-teal" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-navy">
                  {portfolioItems.length}
                </p>
                <p className="text-gray-600">Total Projects</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gold bg-opacity-10 rounded-lg">
                <EyeIcon className="h-6 w-6 text-gold" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-navy">
                  {portfolioItems.filter((item) => item.featured).length}
                </p>
                <p className="text-gray-600">Featured</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-navy bg-opacity-10 rounded-lg">
                <LinkIcon className="h-6 w-6 text-navy" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-navy">
                  {portfolioItems.filter((item) => item.liveUrl).length}
                </p>
                <p className="text-gray-600">Live Projects</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-500 bg-opacity-10 rounded-lg">
                <PencilIcon className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-navy">1.2k</p>
                <p className="text-gray-600">Total Views</p>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                {item.featured && (
                  <div className="absolute top-3 left-3 bg-gold text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button
                    onClick={() => openModal(item)}
                    className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition"
                  >
                    <PencilIcon className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition"
                  >
                    <TrashIcon className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-teal bg-teal bg-opacity-10 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  <button
                    onClick={() => toggleFeatured(item.id)}
                    className={`text-sm ${
                      item.featured ? "text-gold" : "text-gray-400"
                    } hover:text-gold transition`}
                  >
                    ★
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {item.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {item.technologies.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{item.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-xs text-teal hover:text-teal-dark transition"
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        Live Demo
                      </a>
                    )}
                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-xs text-gray-600 hover:text-navy transition"
                      >
                        <LinkIcon className="h-4 w-4 mr-1" />
                        Code
                      </a>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {item.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {portfolioItems.length === 0 && (
          <div className="text-center py-12">
            <PhotoIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No portfolio items yet
            </h3>
            <p className="text-gray-400 mb-6">
              Start by adding your first project to showcase your work.
            </p>
            <button
              onClick={() => openModal()}
              className="bg-teal text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              Add Your First Project
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-navy">
                {editingItem ? "Edit Project" : "Add New Project"}
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
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  placeholder="Describe your project..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Live URL
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) =>
                      handleInputChange("liveUrl", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                    placeholder="https://your-project.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) =>
                      handleInputChange("githubUrl", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                    placeholder="https://github.com/user/repo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technologies
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="flex items-center bg-teal bg-opacity-10 text-teal px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleTechnologyRemove(tech)}
                        className="ml-2 hover:text-red-500"
                      >
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Press Enter to add technology"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const target = e.target as HTMLInputElement;
                      handleTechnologyAdd(target.value);
                      target.value = "";
                    }
                  }}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    handleInputChange("featured", e.target.checked)
                  }
                  className="h-4 w-4 text-teal border-gray-300 rounded focus:ring-teal"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 text-sm text-gray-700"
                >
                  Feature this project (show it prominently)
                </label>
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
                  {editingItem ? "Update Project" : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
