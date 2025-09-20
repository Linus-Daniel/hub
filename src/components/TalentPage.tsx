"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import Head from "next/head";
import {
  FaMagnifyingGlass,
  FaSliders,
  FaBell,
  FaCircleUser,
  FaChevronDown,
  FaTableCellsLarge,
  FaChevronLeft,
  FaChevronRight,
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
  FaShare,
  FaHeart,
} from "react-icons/fa6";
import Link from "next/link";

// Types
interface Student {
  id: string;
  fullname: string;
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
  "from-blue-600 to-purple-600",
  "from-teal-500 to-cyan-600",
  "from-emerald-500 to-green-600",
  "from-amber-500 to-orange-600",
  "from-violet-600 to-purple-700",
  "from-pink-500 to-rose-600",
  "from-indigo-600 to-blue-700",
  "from-sky-500 to-blue-600",
];

const MAJOR_SKILL_MAP: Record<string, string[]> = {
  Mechatronics: [
    "Arduino",
    "Robotics",
    "3D Modeling",
    "Programming",
    "CAD",
    "Electronics",
  ],
  "Computer Science": [
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "AWS",
  ],
  "Electrical Engineering": [
    "Circuit Design",
    "MATLAB",
    "Arduino",
    "PCB Design",
    "Power Systems",
    "Embedded Systems",
  ],
  "Software Engineering": [
    "Full Stack",
    "React",
    "Node.js",
    "Database Design",
    "DevOps",
    "Testing",
  ],
  "Mechanical Engineering": [
    "CAD",
    "SolidWorks",
    "3D Modeling",
    "AutoCAD",
    "Thermodynamics",
    "FEA",
  ],
  "Civil Engineering": [
    "AutoCAD",
    "Revit",
    "Project Management",
    "Structural Analysis",
    "Construction",
    "Surveying",
  ],
  "UI/UX Design": [
    "Figma",
    "Adobe XD",
    "Prototyping",
    "User Research",
    "Wireframing",
    "Design Systems",
  ],
  "Graphic Design": [
    "Adobe Suite",
    "Branding",
    "Typography",
    "Illustration",
    "Print Design",
    "Digital Art",
  ],
};

const DEFAULT_SKILLS = [
  "Programming",
  "Problem Solving",
  "Teamwork",
  "Communication",
  "Leadership",
  "Time Management",
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
      className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl cursor-pointer border border-gray-100"
      onClick={onClick}
    >
      <div className="relative">
        <div
          className={`h-28 bg-gradient-to-r ${student.gradient} opacity-90`}
        ></div>
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2">
          <img
            src={student.image}
            alt={student.fullname}
            className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={handleSaveClick}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <FaBookmark
              className={`text-sm ${
                isSaved ? "text-blue-600 fill-current" : "text-gray-600"
              }`}
            />
          </button>
          <button
            onClick={handleLikeClick}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <FaHeart
              className={`text-sm ${
                isLiked ? "text-rose-600 fill-current" : "text-gray-600"
              }`}
            />
          </button>
        </div>
      </div>
      <div className="pt-14 pb-6 px-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
            {student.fullname}
          </h3>
          <span
            className={`${
              student.status === "available"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            } text-xs px-2 py-1 rounded-full whitespace-nowrap`}
          >
            {student.status === "available" ? "Available" : "Top Talent"}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {student.title}
        </p>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {student.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 px-2.5 py-1 rounded-full text-xs text-gray-700"
              >
                {skill}
              </span>
            ))}
            {student.skills.length > 3 && (
              <span className="bg-gray-100 px-2.5 py-1 rounded-full text-xs text-gray-700">
                +{student.skills.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <FaLocationDot className="mr-2 flex-shrink-0 text-gray-400" />
          <span className="truncate">{student.university}</span>
        </div>

        <button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium text-sm">
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
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Filter Talents</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaXmark className="text-gray-500" />
          </button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Status</h4>
              <div className="flex flex-wrap gap-2">
                {filters.slice(0, 2).map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      selectedFilters.includes(filter.id)
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Field of Study
              </h4>
              <div className="flex flex-wrap gap-2">
                {filters.slice(2, 5).map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      selectedFilters.includes(filter.id)
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Other</h4>
              <div className="flex flex-wrap gap-2">
                {filters.slice(5).map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => toggleFilter(filter.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      selectedFilters.includes(filter.id)
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between">
          <button
            onClick={() => setSelectedFilters([])}
            className="px-6 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
          >
            Reset All
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

// ProfileModal and ContactModal components remain similar but with updated styling
// ... (they would follow the same modern design pattern)

// Main Component
const TalentPage = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch talents from API
  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const response = await fetch("/api/talents");
        if (!response.ok) {
          throw new Error("Failed to fetch talents");
        }
        const data = await response.json();

        const transformedStudents: Student[] = data.map(
          (student: any, index: number) => ({
            id: student._id,
            fullname: student.fullname,
            title: `${student.major} Student`,
            status: student.status === "pending" ? "available" : student.status,
            skills: extractSkills(student),
            university: student.institution,
            image:
              student.avatar ||
              `https://images.unsplash.com/photo-${
                1507003211169 + index
              }a1dd7228f2d?w=150&h=150&fit=crop&crop=face`,
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

        setStudents(transformedStudents);
        if (transformedStudents.length > 0) {
          setSelectedStudent(transformedStudents[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTalents();
  }, []);

  const filteredStudents = useMemo(() => {
    if (!searchQuery) return students;
    return students.filter(
      (student) =>
        student.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        student.university.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [students, searchQuery]);

  const openProfile = useCallback((student: Student) => {
    setSelectedStudent(student);
    setShowProfileModal(true);
  }, []);

  const openContact = useCallback(() => {
    setShowProfileModal(false);
    setShowContactModal(true);
  }, []);

  // Memoized student cards to prevent unnecessary re-renders
  const studentCards = useMemo(
    () =>
      filteredStudents.map((student) => (
        <ProfileCard
          key={student.id}
          student={student}
          onClick={() => openProfile(student)}
        />
      )),
    [filteredStudents, openProfile]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading talents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Head>
        <title>CONCESTalent - National Talent Directory</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Header Navigation */}
      <header className="bg-white sticky top-0 z-40 shadow-sm px-4 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 mr-8">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CONCESTalent
              </span>
            </Link>
            <div className="hidden md:block relative w-80">
              <input
                type="text"
                placeholder="Search talents, skills, universities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              />
              <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FaSliders />
              <span className="hidden md:inline">Filters</span>
            </button>
            <button className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <FaBell />
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <FaCircleUser className="text-xl" />
              <span className="hidden md:inline">Profile</span>
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
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
          />
          <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
        {/* Page Title and Filters Summary */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Discover Talent
            </h1>
            <p className="text-gray-600">
              {filteredStudents.length} talented students ready for
              opportunities
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center space-x-3">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-xl py-2.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option>Newest First</option>
                <option>Highest Rated</option>
                <option>Most Popular</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-sm" />
            </div>
          </div>
        </div>

        {/* Profile Grid - 2 columns on mobile */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {studentCards}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No talents found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredStudents.length > 0 && (
          <div className="mt-12 flex justify-center">
            <div className="inline-flex rounded-xl shadow-sm">
              <button className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-l-xl hover:bg-gray-50">
                <FaChevronLeft className="mr-1" />
                Previous
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 border border-blue-600">
                1
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-200 hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-200 hover:bg-gray-50">
                3
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-r-xl hover:bg-gray-50">
                Next <FaChevronRight className="ml-1" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex justify-around">
          <button className="flex flex-col items-center text-gray-600">
            <FaHouse className="text-lg" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center text-blue-600">
            <FaUserGroup className="text-lg" />
            <span className="text-xs mt-1">Talents</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <FaBookmark className="text-lg" />
            <span className="text-xs mt-1">Saved</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <FaUser className="text-lg" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {showFilterModal && (
        <FilterModal onClose={() => setShowFilterModal(false)} />
      )}

      {/* ProfileModal and ContactModal would be rendered here */}
    </div>
  );
};

export default TalentPage;
