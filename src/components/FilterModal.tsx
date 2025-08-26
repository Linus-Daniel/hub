"use client";
// components/FilterModal.js
import { XMarkIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { categories, universities } from "@/constants";
import { Interface } from "readline";

interface FilterModalProps  {
    isOpen: boolean;
    onClose: () => void;
    filters: {
        categories: string[];
        university: string;
        availability: string[];
        minRating: number;
    };
    onFiltersChange: (newFilters: {
        categories: string[];
        university: string;
        availability: string[];
        minRating: number;
    }) => void;
};

export default function FilterModal({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}: FilterModalProps) {
  if (!isOpen) return null;

  const handleCategoryChange = (category:string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleAvailabilityChange = (availability:string) => {
    const newAvailability = filters.availability.includes(availability)
      ? filters.availability.filter((a) => a !== availability)
      : [...filters.availability, availability];

    onFiltersChange({ ...filters, availability: newAvailability });
  };

  const handleUniversityChange = (university:string) => {
    onFiltersChange({ ...filters, university });
  };

  const handleRatingChange = (rating:number) => {
    onFiltersChange({ ...filters, minRating: rating });
  };

  const resetFilters = () => {
    onFiltersChange({
      categories: [],
      university: "",
      availability: [],
      minRating: 0,
    });
  };

  const applyFilters = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold font-heading">Filter Talents</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-navy">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {/* Skill Category */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Skill Category</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="h-5 w-5 text-teal rounded border-gray-300 focus:ring-teal"
                  />
                  <span className="ml-2">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* University */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">University</h4>
            <select
              value={filters.university}
              onChange={(e) => handleUniversityChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <option value="">All Universities</option>
              {universities.map((university) => (
                <option key={university} value={university}>
                  {university}
                </option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Availability</h4>
            <div className="space-y-2">
              {[
                "Available Now",
                "Available Part-time",
                "Available for Internship",
              ].map((availability) => (
                <label key={availability} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.availability.includes(availability)}
                    onChange={() => handleAvailabilityChange(availability)}
                    className="h-5 w-5 text-teal rounded border-gray-300 focus:ring-teal"
                  />
                  <span className="ml-2">{availability}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Minimum Rating</h4>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className="focus:outline-none"
                >
                  {rating <= filters.minRating ? (
                    <StarIconSolid className="h-6 w-6 text-gold" />
                  ) : (
                    <StarIcon className="h-6 w-6 text-gray-300" />
                  )}
                </button>
              ))}
              <span className="ml-2 text-sm">{filters.minRating}.0+</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-softgray flex justify-between">
          <button
            onClick={resetFilters}
            className="px-4 py-2 border border-gray-300 rounded-lg text-navy hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-opacity-90"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
