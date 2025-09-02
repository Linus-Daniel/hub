"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import {
  Search,
  Filter,
  MapPin,
  GraduationCap,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  Code,
  Award,
  Briefcase,
  TrendingUp,
  Users,
} from "lucide-react";
import { toast } from "sonner";

interface SearchResult {
  talents: any[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    majors: string[];
    locations: string[];
    popularSkills: string[];
    popularTechnologies: string[];
  };
}

export default function TalentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [filters, setFilters] = useState({
    major: searchParams.get("major") || "",
    location: searchParams.get("location") || "",
    skill: searchParams.get("skill") || "",
    technology: searchParams.get("technology") || "",
  });
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "relevance"
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((searchTerm: string) => {
        performSearch({ ...filters, q: searchTerm });
      }, 500),
    [filters]
  );

  useEffect(() => {
    performSearch();
  }, []);

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => debouncedSearch.cancel();
  }, [searchQuery, debouncedSearch]);

  useEffect(() => {
    performSearch();
  }, [filters, sortBy, currentPage]);

  const performSearch = async (overrideFilters?: any) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      const activeFilters = overrideFilters || { ...filters, q: searchQuery };

      if (activeFilters.q) params.append("q", activeFilters.q);
      if (activeFilters.major) params.append("major", activeFilters.major);
      if (activeFilters.location)
        params.append("location", activeFilters.location);
      if (activeFilters.skill) params.append("skill", activeFilters.skill);
      if (activeFilters.technology)
        params.append("technology", activeFilters.technology);
      params.append("sortBy", sortBy);
      params.append("page", currentPage.toString());
      params.append("limit", "12");

      const response = await fetch(`/api/talents/search?${params}`);
      if (!response.ok) throw new Error("Search failed");

      const data = await response.json();
      setSearchResult(data);

      // Update URL params
      const newParams = new URLSearchParams();
      if (searchQuery) newParams.set("q", searchQuery);
      if (filters.major) newParams.set("major", filters.major);
      if (filters.location) newParams.set("location", filters.location);
      if (filters.skill) newParams.set("skill", filters.skill);
      if (filters.technology) newParams.set("technology", filters.technology);
      if (sortBy !== "relevance") newParams.set("sortBy", sortBy);
      if (currentPage > 1) newParams.set("page", currentPage.toString());

      router.push(
        `/talents${newParams.toString() ? "?" + newParams.toString() : ""}`,
        { scroll: false }
      );
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search talents");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setFilters({
      major: "",
      location: "",
      skill: "",
      technology: "",
    });
    setSortBy("relevance");
    setCurrentPage(1);
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Talents
          </h1>
          <p className="text-gray-600">
            Search across profiles, skills, and projects to find the perfect
            match
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, skills, projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 border rounded-lg flex items-center gap-2 transition-colors ${
                showFilters
                  ? "bg-teal-50 border-teal-500 text-teal-700"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Filter className="h-5 w-5" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-teal-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <select
                value={filters.major}
                onChange={(e) => handleFilterChange("major", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="">All Majors</option>
                {searchResult?.filters.majors.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
              </select>

              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="">All Locations</option>
                {searchResult?.filters.locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              <select
                value={filters.skill}
                onChange={(e) => handleFilterChange("skill", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Any Skill</option>
                {searchResult?.filters.popularSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>

              <select
                value={filters.technology}
                onChange={(e) =>
                  handleFilterChange("technology", e.target.value)
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Any Technology</option>
                {searchResult?.filters.popularTechnologies.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="relevance">Most Relevant</option>
                <option value="name">Name (A-Z)</option>
                <option value="skills">Most Skills</option>
                <option value="projects">Most Projects</option>
                <option value="endorsements">Most Endorsed</option>
              </select>
            </div>
          )}

          {/* Active Filters & Clear */}
          {(activeFiltersCount > 0 || searchQuery) && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery("")}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {Object.entries(filters).map(
                  ([key, value]) =>
                    value && (
                      <span
                        key={key}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {key}: {value}
                        <button onClick={() => handleFilterChange(key, "")}>
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )
                )}
              </div>

              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Stats */}
        {searchResult && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              Found{" "}
              <span className="font-semibold">
                {searchResult.metadata.total}
              </span>{" "}
              talents
              {searchQuery && ` matching "${searchQuery}"`}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>
                Page {searchResult.metadata.page} of{" "}
                {searchResult.metadata.totalPages}
              </span>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : searchResult?.talents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No talents found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearAllFilters}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResult?.talents.map((talent) => (
              <EnhancedTalentCard
                key={talent._id}
                talent={talent}
                onClick={() => router.push(`/talents/${talent._id}`)}
                searchQuery={searchQuery}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {searchResult && searchResult.metadata.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={!searchResult.metadata.hasPrevPage}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex gap-1">
                {generatePageNumbers(
                  currentPage,
                  searchResult.metadata.totalPages
                ).map((pageNum, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      pageNum !== "..." && setCurrentPage(parseInt(pageNum))
                    }
                    disabled={pageNum === "..."}
                    className={`px-3 py-1 rounded-lg ${
                      currentPage === parseInt(pageNum)
                        ? "bg-teal-600 text-white"
                        : pageNum === "..."
                        ? "cursor-default"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={!searchResult.metadata.hasNextPage}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced Talent Card with skill and project info
function EnhancedTalentCard({
  talent,
  onClick,
  searchQuery,
}: {
  talent: any;
  onClick: () => void;
  searchQuery: string;
}) {
  const highlightMatch = (text: string) => {
    if (!searchQuery || !text) return text;

    const regex = new RegExp(`(${searchQuery})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="text-center">
        {/* Avatar */}
        <div className="w-24 h-24 mx-auto mb-4 relative">
          {talent.avatar ? (
            <img
              src={talent.avatar}
              alt={talent.fullname}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
              {talent.fullname
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </div>
          )}

          {/* Stats badges */}
          <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-1">
            {talent.skills?.length > 0 && (
              <div className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                <Award className="h-3 w-3" />
                {talent.skills.length}
              </div>
            )}
            {talent.projects?.length > 0 && (
              <div className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                {talent.projects.length}
              </div>
            )}
          </div>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-lg text-gray-900 mb-1">
          {highlightMatch(talent.fullname)}
        </h3>

        {/* Major */}
        {talent.major && (
          <p className="text-sm text-gray-600 mb-2">
            {highlightMatch(talent.major)}
          </p>
        )}

        {/* University & Location */}
        <div className="space-y-1 mb-3">
          {talent.university && (
            <div className="flex items-center justify-center text-xs text-gray-500">
              <GraduationCap className="h-3 w-3 mr-1" />
              <span>{highlightMatch(talent.university)}</span>
            </div>
          )}
          {talent.location && (
            <div className="flex items-center justify-center text-xs text-gray-500">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{talent.location}</span>
            </div>
          )}
        </div>

        {/* Top Skills */}
        {talent.skills?.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap justify-center gap-1">
              {talent.skills.slice(0, 3).map((skill: any, idx: number) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 px-2 py-0.5 rounded"
                >
                  {highlightMatch(skill.name)}
                </span>
              ))}
              {talent.skills.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{talent.skills.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Bio Preview */}
        {talent.bio && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {highlightMatch(talent.bio)}
          </p>
        )}

        {/* View Profile Button */}
        <button className="text-teal-600 text-sm font-medium group-hover:text-teal-700">
          View Profile →
        </button>
      </div>
    </div>
  );
}

// Helper function to generate page numbers with ellipsis
function generatePageNumbers(current: number, total: number): string[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => (i + 1).toString());
  }

  const pages: string[] = [];

  if (current <= 4) {
    for (let i = 1; i <= 5; i++) pages.push(i.toString());
    pages.push("...");
    pages.push(total.toString());
  } else if (current >= total - 3) {
    pages.push("1");
    pages.push("...");
    for (let i = total - 4; i <= total; i++) pages.push(i.toString());
  } else {
    pages.push("1");
    pages.push("...");
    for (let i = current - 1; i <= current + 1; i++) pages.push(i.toString());
    pages.push("...");
    pages.push(total.toString());
  }

  return pages;
}
