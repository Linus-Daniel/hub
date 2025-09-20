// Types
interface TalentProfile {
  _id: string;
  fullname: string;
  email: string;
  phone?: string;
  university?: string;
  major?: string;
  graduationYear?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  privacy: {
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
  };
  createdAt: string;
  updatedAt?: string;
}

interface Skill {
  _id: string;
  name: string;
  category: string;
  level: string;
  proficiency: number;
  experience: number;
  endorsements: number;
  description?: string;
  createdAt: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  githubLink?: string;
  link?: string;
  technologies: string[];
  createdAt: string;
  status?: "completed" | "in-progress" | "planned";
  featured?: boolean;
}

interface TalentData {
  profile: TalentProfile;
  skills: Skill[];
  projects: Project[];
}

// Error class for API errors
class APIError extends Error {
  constructor(message: string, public status: number, public endpoint: string) {
    super(message);
    this.name = "APIError";
  }
}

// Base fetch function with error handling
async function apiRequest<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new APIError(
        `HTTP Error: ${response.status} ${response.statusText}`,
        response.status,
        url
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      `Network Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      0,
      url
    );
  }
}

// Individual API Functions

/**
 * Fetch talent profile information
 * @param talentId - The ID of the talent
 * @returns Promise<TalentProfile>
 */
export async function fetchTalentProfile(
  talentId: string
): Promise<TalentProfile> {
  if (!talentId) {
    throw new Error("Talent ID is required");
  }

  return apiRequest<TalentProfile>(`/api/talents/${talentId}`);
}

/**
 * Fetch talent skills
 * @param talentId - The ID of the talent
 * @returns Promise<Skill[]>
 */
export async function fetchTalentSkills(talentId: string): Promise<Skill[]> {
  if (!talentId) {
    throw new Error("Talent ID is required");
  }

  return apiRequest<Skill[]>(`/api/talents/${talentId}/skills`);
}

/**
 * Fetch talent projects
 * @param talentId - The ID of the talent
 * @returns Promise<Project[]>
 */
export async function fetchTalentProjects(
  talentId: string
): Promise<Project[]> {
  if (!talentId) {
    throw new Error("Talent ID is required");
  }

  return apiRequest<Project[]>(`/api/talents/${talentId}/projects`);
}

// Combined Function

/**
 * Fetch all talent data (profile, skills, and projects) in a single call
 * @param talentId - The ID of the talent
 * @returns Promise<TalentData>
 */
export async function fetchTalentData(talentId: string): Promise<TalentData> {
  if (!talentId) {
    throw new Error("Talent ID is required");
  }

  try {
    // Fetch all data in parallel for better performance
    const [profile, skills, projects] = await Promise.all([
      fetchTalentProfile(talentId),
      fetchTalentSkills(talentId),
      fetchTalentProjects(talentId),
    ]);

    return {
      profile,
      skills,
      projects,
    };
  } catch (error) {
    console.error("Error fetching talent data:", error);
    throw error;
  }
}

// Alternative: Combined function with error tolerance (continues even if some requests fail)

/**
 * Fetch all talent data with error tolerance
 * Returns partial data if some requests fail
 * @param talentId - The ID of the talent
 * @returns Promise<Partial<TalentData> & { errors: string[] }>
 */
export async function fetchTalentDataWithErrorTolerance(
  talentId: string
): Promise<Partial<TalentData> & { errors: string[] }> {
  if (!talentId) {
    throw new Error("Talent ID is required");
  }

  const errors: string[] = [];
  const result: Partial<TalentData> = {};

  // Fetch profile
  try {
    result.profile = await fetchTalentProfile(talentId);
  } catch (error) {
    errors.push(
      `Profile: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }

  // Fetch skills
  try {
    result.skills = await fetchTalentSkills(talentId);
  } catch (error) {
    errors.push(
      `Skills: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }

  // Fetch projects
  try {
    result.projects = await fetchTalentProjects(talentId);
  } catch (error) {
    errors.push(
      `Projects: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }

  return { ...result, errors };
}

// Utility function for React Query
export const createTalentQueries = (talentId: string) => ({
  profile: {
    queryKey: ["talent", "profile", talentId],
    queryFn: () => fetchTalentProfile(talentId),
    enabled: !!talentId,
  },
  skills: {
    queryKey: ["talent", "skills", talentId],
    queryFn: () => fetchTalentSkills(talentId),
    enabled: !!talentId,
  },
  projects: {
    queryKey: ["talent", "projects", talentId],
    queryFn: () => fetchTalentProjects(talentId),
    enabled: !!talentId,
  },
});

// Usage Examples:

/*
// 1. Individual functions
const profile = await fetchTalentProfile('123');
const skills = await fetchTalentSkills('123');
const projects = await fetchTalentProjects('123');

// 2. Combined function (all or nothing)
const { profile, skills, projects } = await fetchTalentData('123');

// 3. Error-tolerant function
const { profile, skills, projects, errors } = await fetchTalentDataWithErrorTolerance('123');
if (errors.length > 0) {
  console.warn('Some data failed to load:', errors);
}

// 4. With React Query
import { useQueries } from '@tanstack/react-query';

const talentQueries = createTalentQueries(talentId);
const [profileQuery, skillsQuery, projectsQuery] = useQueries({
  queries: [talentQueries.profile, talentQueries.skills, talentQueries.projects]
});

// 5. Single React Query for all data
import { useQuery } from '@tanstack/react-query';

const { data, isLoading, error } = useQuery({
  queryKey: ['talent', 'complete', talentId],
  queryFn: () => fetchTalentData(talentId),
  enabled: !!talentId,
});
*/
