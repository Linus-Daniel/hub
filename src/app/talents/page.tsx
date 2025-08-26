"use client";
// pages/talents.js
import { useState } from "react";
import Layout from "@/components/Layout";
import TalentCard from "@/components/TalentCard";
import FilterModal from "@/components/FilterModal";
import { talents } from "@/constants";
import { useSearch } from "@/hooks/useSearch";
import {
  AdjustmentsHorizontalIcon,
  TableCellsIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function Talents() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const talentsPerPage = 9;

  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredAndSortedTalents,
    activeFilters,
    removeFilter,
    clearAllFilters,
  } = useSearch(talents);

  // Pagination logic
  const totalPages = Math.ceil(
    filteredAndSortedTalents.length / talentsPerPage
  );
  const startIndex = (currentPage - 1) * talentsPerPage;
  const endIndex = startIndex + talentsPerPage;
  const currentTalents = filteredAndSortedTalents.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      {/* Page Title and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading mb-2">
            All Talents
          </h1>
          <p className="text-gray-600">
            Browse through our complete directory of student talents
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <option value="newest">Newest</option>
              <option value="highest-rated">Highest Rated</option>
              <option value="most-popular">Most Popular</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
          </div>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center space-x-2 text-navy hover:text-teal"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
            <span className="hidden md:inline">Filters</span>
          </button>
          <button className="hidden md:flex items-center space-x-2 text-navy bg-white py-2 px-4 rounded-lg border border-gray-300 hover:bg-softgray">
            <TableCellsIcon className="h-5 w-5" />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by name, skills, or university..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeFilters.map((filter, index) => (
            <div
              key={index}
              className="bg-white rounded-full py-1 px-4 text-sm flex items-center space-x-2 border border-gray-200"
            >
              <span>{filter.label}</span>
              <button onClick={() => removeFilter(filter)}>
                <XMarkIcon className="h-4 w-4 cursor-pointer hover:text-red-500" />
              </button>
            </div>
          ))}
          <button
            onClick={clearAllFilters}
            className="text-teal text-sm hover:underline"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {currentTalents.length} of {filteredAndSortedTalents.length}{" "}
          talents
        </p>
      </div>

      {/* Talent Grid */}
      {currentTalents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {currentTalents.map((talent: any, index: number) => (
            <TalentCard
              key={talent.id}
              talent={talent}
              index={startIndex + index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-gray-400 mb-4">
            <MagnifyingGlassIcon className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No talents found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search or filters to find more results.
          </p>
          <button
            onClick={clearAllFilters}
            className="bg-teal text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-navy bg-white border border-gray-300 rounded-l-lg hover:bg-softgray disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-1 inline" />
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 text-sm font-medium border-t border-b ${
                    currentPage === page
                      ? "text-white bg-navy border-navy"
                      : "text-navy bg-white border-gray-300 hover:bg-softgray"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-navy bg-white border border-gray-300 rounded-r-lg hover:bg-softgray disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRightIcon className="h-4 w-4 ml-1 inline" />
            </button>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </Layout>
  );
}
