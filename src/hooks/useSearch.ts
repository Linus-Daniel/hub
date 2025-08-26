// hooks/useSearch.js
import { useState, useMemo } from "react";

interface Talent {
  id: string;
  name: string;
  title: string;
  university: string;
  location: string;
  image: string;
  skills: string[];
  status: string;
  rating: number;
  isTopTalent: boolean;
  categories: string[];
  about: string;
  interests: string[];
  education: {
    school: string;
    degree: string;
    years: string;
  };
  email: string;
}

interface Filters {
  categories: string[];
  university: string;
  availability: string[];
  minRating: number;
}

interface Filter {
  type: string;
  value: string | number | string[];
  label: string;
}

export function useSearch(talents: Talent[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    categories: [] as string[],
    university: "",
    availability: [] as string[],
    minRating: 0,
  });
  const [sortBy, setSortBy] = useState("newest");

  const filteredAndSortedTalents = useMemo(() => {
    let filtered = talents.filter((talent) => {
      // Search query filter
      const matchesSearch =
        searchQuery === "" ||
        talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        talent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        talent.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        talent.university.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.some((category) =>
          talent.categories.includes(category)
        );

      // University filter
      const matchesUniversity =
        filters.university === "" || talent.university === filters.university;

      // Availability filter (simplified - in real app you'd have more complex availability logic)
      const matchesAvailability =
        filters.availability.length === 0 ||
        filters.availability.includes("Available Now");

      // Rating filter
      const matchesRating = talent.rating >= filters.minRating;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesUniversity &&
        matchesAvailability &&
        matchesRating
      );
    });

    // Sort the filtered results
    switch (sortBy) {
      case "highest-rated":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "most-popular":
        filtered.sort(
          (a, b) => (b.isTopTalent ? 1 : 0) - (a.isTopTalent ? 1 : 0)
        );
        break;
      case "newest":
      default:
        // Keep original order for "newest"
        break;
    }

    return filtered;
  }, [talents, searchQuery, filters, sortBy]);

  const activeFilters = useMemo(() => {
    const active: Filter[] = [];

    filters.categories.forEach((category) => {
      active.push({ type: "category", value: category, label: category });
    });

    if (filters.university) {
      active.push({
        type: "university",
        value: filters.university,
        label: filters.university,
      });
    }

    filters.availability.forEach((availability) => {
      active.push({
        type: "availability",
        value: availability,
        label: availability,
      });
    });

    if (filters.minRating > 0) {
      active.push({
        type: "rating",
        value: filters.minRating,
        label: `${filters.minRating}+ Stars`,
      });
    }

    return active;
  }, [filters]);

  const removeFilter = (filterToRemove: Filter) => {
    const newFilters = { ...filters };

    switch (filterToRemove.type) {
      case "category":
        newFilters.categories = newFilters.categories.filter(
          (c) => c !== filterToRemove.value
        );
        break;
      case "university":
        newFilters.university = "";
        break;
      case "availability":
        newFilters.availability = newFilters.availability.filter(
          (a) => a !== filterToRemove.value
        );
        break;
      case "rating":
        newFilters.minRating = 0;
        break;
    }

    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [] as string[],
      university: "",
      availability: [] as string[],
      minRating: 0,
    });
    setSearchQuery("");
  };

  return {
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
  };
}
