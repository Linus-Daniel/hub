"use client";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Head from "next/head";
import {
  FaMagnifyingGlass,
  FaSliders,
  FaBell,
  FaCircleUser,
  FaChevronDown,
  FaXmark,
  FaArrowLeft,
  FaEnvelope,
  FaStar,
  FaLocationDot,
  FaGraduationCap,
  FaBuildingColumns,
  FaHouse,
  FaUserGroup,
  FaUser,
  FaGlobe,
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaBookmark,
  FaHeart,
  FaSpinner,
} from "react-icons/fa6";
import Link from "next/link";

// Types
interface Student {
  id: string;
  name: string;
  title: string;
  status: string;
  skills: string[];
  university: string;
  image: string;
  gradient: string;
  location?: string;
  graduationYear?: string;
  email?: string;
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  bio?: string;
  major: string;
  emailVerified?: boolean;
  createdAt?: string;
}

// Constants
const GRADIENT_OPTIONS = [
  "from-navy to-teal",
  "from-gold to-teal",
  "from-navy to-gold",
  "from-teal to-navy",
  "from-gold to-navy",
  "from-teal to-gold",
];

const MAJOR_SKILL_MAP: Record<string, string[]> = {
  Mechatronics: ["Arduino", "Robotics", "3D Modeling", "Programming"],
  "Computer Science": ["React", "Node.js", "Python", "JavaScript"],
  "Electrical Engineering": [
    "Circuit Design",
    "MATLAB",
    "Arduino",
    "PCB Design",
  ],
  "Software Engineering": ["Full Stack", "React", "Node.js", "Database Design"],
  "Mechanical Engineering": ["CAD", "SolidWorks", "3D Modeling", "AutoCAD"],
  "Civil Engineering": [
    "AutoCAD",
    "Revit",
    "Project Management",
    "Structural Analysis",
  ],
  "UI/UX Design": ["Figma", "Adobe XD", "Prototyping", "User Research"],
  "Graphic Design": ["Adobe Suite", "Branding", "Typography", "Illustration"],
};

const DEFAULT_SKILLS = [
  "Programming",
  "Problem Solving",
  "Teamwork",
  "Communication",
];

// Utility Functions
const getRandomGradient = (index: number): string => {
  return GRADIENT_OPTIONS[index % GRADIENT_OPTIONS.length];
};

const extractSkills = (student: Partial<Student>): string[] => {
  return student.major && MAJOR_SKILL_MAP[student.major]
    ? MAJOR_SKILL_MAP[student.major]
    : DEFAULT_SKILLS;
};

// Components
const ProfileCard = ({
  student,
  onClick,
}: {
  student: Student;
  onClick: () => void;
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl cursor-pointer border border-gray-100"
      onClick={onClick}
    >
      <div className="relative">
        <div
          className={`h-28 bg-gradient-to-r ${student.gradient} opacity-90`}
        ></div>
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2">
          <img
            src={student.image}
            alt={student.name}
            className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-md"
          />
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleSaveClick}
            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <FaBookmark
              className={`text-xs ${isSaved ? "text-teal" : "text-gray-500"}`}
            />
          </button>
          <button
            onClick={handleLikeClick}
            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <FaHeart
              className={`text-xs ${isLiked ? "text-gold" : "text-gray-500"}`}
            />
          </button>
        </div>
      </div>
      <div className="pt-12 pb-5 px-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-navy line-clamp-1">
            {student.name}
          </h3>
          <span
            className={`${
              student.status === "available"
                ? "bg-teal/10 text-teal"
                : "bg-gold/10 text-gold"
            } text-xs px-2 py-1 rounded-full whitespace-nowrap`}
          >
            {student.status === "available" ? "Available" : "Top Talent"}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {student.title}
        </p>

        <div className="mb-3">
          <div className="flex flex-wrap gap-1.5">
            {student.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="bg-softgray px-2.5 py-1 rounded-full text-xs text-navy"
              >
                {skill}
              </span>
            ))}
            {student.skills.length > 3 && (
              <span className="bg-softgray px-2.5 py-1 rounded-full text-xs text-navy">
                +{student.skills.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <FaLocationDot className="mr-2 flex-shrink-0 text-teal" />
          <span className="truncate">{student.university}</span>
        </div>

        <button className="w-full py-2 bg-navy text-white flex items-center justify-center rounded-lg hover:bg-opacity-90 transition-all font-medium text-sm">
          View Profile
        </button>
      </div>
    </div>
  );
};

const FilterModal = ({ onClose }: { onClose: () => void }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = [
    { id: "available", label: "Available Now" },
    { id: "top", label: "Top Talent" },
    { id: "cs", label: "Computer Science" },
    { id: "engineering", label: "Engineering" },
    { id: "design", label: "Design" },
    { id: "recent", label: "Recently Added" },
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h3 className="text-lg font-bold text-navy">Filter Talents</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-softgray rounded-lg transition-colors"
          >
            <FaXmark className="text-gray-500 text-lg" />
          </button>
        </div>
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <div className="space-y-5">
            <div>
              <h4 className="font-semibold text-navy mb-3">Status</h4>
              <div className="flex flex-wrap gap-2">
                {filters.slice(0, 2).map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedFilters.includes(filter.id)
                        ? "bg-teal text-white"
                        : "bg-softgray text-navy hover:bg-gray-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-navy mb-3">Field of Study</h4>
              <div className="flex flex-wrap gap-2">
                {filters.slice(2, 5).map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedFilters.includes(filter.id)
                        ? "bg-teal text-white"
                        : "bg-softgray text-navy hover:bg-gray-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-navy mb-3">Other</h4>
              <div className="flex flex-wrap gap-2">
                {filters.slice(5).map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedFilters.includes(filter.id)
                        ? "bg-teal text-white"
                        : "bg-softgray text-navy hover:bg-gray-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 border-t border-gray-200 bg-softgray flex justify-between">
          <button
            onClick={() => setSelectedFilters([])}
            className="px-5 py-2.5 text-navy font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Reset All
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-teal text-white font-medium rounded-lg hover:bg-teal/90 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const TalentPage = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastStudentRef = useRef<HTMLDivElement | null>(null);

  // Fetch talents from API
  useEffect(() => {
    const fetchTalents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/talents?page=${page}&limit=12`);
        if (!response.ok) {
          throw new Error("Failed to fetch talents");
        }
        const data = await response.json();

        const transformedStudents: Student[] = data.map(
          (student: any, index: number) => ({
            id: student._id,
            name: student.fullname,
            title: `${student.major} Student`,
            status: student.status === "pending" ? "available" : student.status,
            skills: extractSkills(student),
            university: student.institution,
            image:
              student.avatar ||
              `https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-${
                (index % 6) + 1
              }.jpg`,
            gradient: getRandomGradient(index),
            location: student.location,
            graduationYear: student.graduationYear,
            email: student.email,
            phone: student.phone,
            website: student.website,
            github: student.github,
            linkedin: student.linkedin,
            bio: student.bio,
            major: student.major,
            emailVerified: student.emailVerified,
            createdAt: student.createdAt,
          })
        );

        if (page === 1) {
          setStudents(transformedStudents);
        } else {
          setStudents((prev) => [...prev, ...transformedStudents]);
        }

        setLoadingMore(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoadingMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchTalents();
  }, [page]);

  const filteredStudents = useMemo(() => {
    if (!searchQuery) return students;
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        student.university.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [students, searchQuery]);

  const openProfile = useCallback((student: Student) => {
    setSelectedStudent(student);
  }, []);

  // Memoized student cards to prevent unnecessary re-renders
  const studentCards = useMemo(
    () =>
      filteredStudents.map((student, index) => {
        if (index === filteredStudents.length - 1) {
          return (
            <div key={student.id} ref={lastStudentRef}>
              <ProfileCard
                student={student}
                onClick={() => openProfile(student)}
              />
            </div>
          );
        }
        return (
          <ProfileCard
            key={student.id}
            student={student}
            onClick={() => openProfile(student)}
          />
        );
      }),
    [filteredStudents, openProfile]
  );

  if (loading && students.length === 0) {
    return (
      <div className="bg-softgray min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal mx-auto mb-4"></div>
          <p className="text-navy">Loading talents...</p>
        </div>
      </div>
    );
  }

  if (error && students.length === 0) {
    return (
      <div className="bg-softgray min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-softgray min-h-screen">
      <Head>
        <title>CONCESTalent - National Talent Directory</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Header Navigation */}
      <header className="bg-white sticky top-0 z-40 shadow-sm px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-navy mr-8">
              <span className="text-navy">CONCES</span>
              <span className="text-teal">Talent</span>
            </Link>
            <div className="hidden md:block relative w-72">
              <input
                type="text"
                placeholder="Search talents, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              />
              <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center space-x-2 text-navy hover:text-teal p-2 rounded-lg hover:bg-softgray transition-colors"
            >
              <FaSliders />
              <span className="hidden md:inline">Filters</span>
            </button>
            <button className="hidden md:flex items-center space-x-2 text-navy hover:text-teal p-2 rounded-lg hover:bg-softgray transition-colors">
              <FaBell />
            </button>
            <button className="flex items-center space-x-2 text-navy hover:text-teal p-2 rounded-lg hover:bg-softgray transition-colors">
              <FaCircleUser className="text-xl" />
              <span className="hidden md:inline">Account</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 py-3 bg-white border-t border-gray-200 sticky top-16 z-30">
        <div className="relative">
          <input
            type="text"
            placeholder="Search talents, skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
          />
          <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Page Title and Stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">
              National Talent Directory
            </h1>
            <p className="text-gray-600">
              Discover exceptional student talents across all disciplines
              {filteredStudents.length > 0 &&
                ` (${filteredStudents.length} talents)`}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-teal text-sm">
                <option>Newest First</option>
                <option>Highest Rated</option>
                <option>Most Popular</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-sm" />
            </div>
          </div>
        </div>

        {/* Profile Grid - 2 columns on mobile */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {studentCards}
        </div>

        {filteredStudents.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-navy mb-2">
              No talents found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Loading spinner for infinite scroll */}
        {loadingMore && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal"></div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-40">
        <div className="flex justify-around">
          <button className="flex flex-col items-center text-navy">
            <FaHouse className="text-lg" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center text-navy">
            <FaMagnifyingGlass className="text-lg" />
            <span className="text-xs mt-1">Search</span>
          </button>
          <button className="flex flex-col items-center text-teal">
            <FaUserGroup className="text-lg" />
            <span className="text-xs mt-1">Talents</span>
          </button>
          <button className="flex flex-col items-center text-navy">
            <FaUser className="text-lg" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <FilterModal onClose={() => setShowFilterModal(false)} />
      )}
    </div>
  );
};

export default TalentPage;
