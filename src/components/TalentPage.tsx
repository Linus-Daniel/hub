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
} from "react-icons/fa6";

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
  "from-purple-600 to-blue-600",
  "from-green-600 to-teal-600",
  "from-orange-600 to-red-600",
  "from-indigo-600 to-purple-600",
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
  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <div
          className={`h-32 bg-gradient-to-r ${student.gradient} opacity-90`}
        ></div>
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
          <img
            src={student.image}
            alt={student.name}
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>
      <div className="pt-16 pb-6 px-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold font-heading">{student.name}</h3>
          <span
            className={`${
              student.status === "available"
                ? "bg-teal bg-opacity-10 text-teal"
                : "bg-gold bg-opacity-10 text-gold"
            } text-xs px-2 py-1 rounded-full`}
          >
            {student.status === "available" ? "Available" : "Top Talent"}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {student.title}
        </p>

        <div className="mb-4 overflow-x-auto flex pb-1 no-scrollbar">
          <div className="flex space-x-2">
            {student.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="whitespace-nowrap bg-softgray px-3 py-1 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
            {student.skills.length > 3 && (
              <span className="whitespace-nowrap bg-softgray px-3 py-1 rounded-full text-xs">
                +{student.skills.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-6">
          <FaLocationDot className="mr-2 flex-shrink-0" />
          <span className="truncate">{student.university}</span>
        </div>

        <button className="w-full py-2 bg-navy text-white rounded-lg hover:bg-opacity-90">
          View Profile
        </button>
      </div>
    </div>
  );
};

const FilterModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold font-heading">Filter Talents</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-navy">
            <FaXmark />
          </button>
        </div>
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {/* Filter content remains the same */}
        </div>
        <div className="p-4 border-t bg-softgray flex justify-between">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-navy">
            Reset
          </button>
          <button className="px-4 py-2 bg-teal text-white rounded-lg">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileModal = ({
  student,
  activeTab,
  onTabChange,
  onClose,
  onContact,
}: {
  student: Student;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onClose: () => void;
  onContact: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
   <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <button onClick={onClose} className="mr-4 text-navy">
              <FaArrowLeft />
            </button>
            <h3 className="text-lg font-bold font-heading">Talent Profile</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-navy">
            <FaXmark />
          </button>
        </div>

        <div className="overflow-y-auto flex-grow">
          {/* Hero Section */}
          <div className="relative">
            <div className={`h-48 bg-gradient-to-r ${student.gradient}`}></div>
            <div className="absolute top-32 left-4 md:left-10">
              <img
                src={student.image}
                alt="Profile"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>

          <div className="pt-16 md:pt-20 px-4 md:px-10 pb-10">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl md:text-2xl font-bold font-heading">
                  {student.name}
                </h2>
                <p className="text-gray-600">{student.title}</p>
              </div>
              <button
                onClick={onContact}
                className="bg-teal text-white px-6 py-2 rounded-lg hover:bg-opacity-90 flex items-center"
              >
                <FaEnvelope className="mr-2" />
                Contact
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              {student.location && (
                <div className="flex items-center text-sm text-gray-600">
                  <FaLocationDot className="mr-2" />
                  <span>{student.location}</span>
                </div>
              )}
              <div className="flex items-center text-sm text-gray-600">
                <FaGraduationCap className="mr-2" />
                <span>{student.university}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FaBuildingColumns className="mr-2" />
                <span>Class of {student.graduationYear}</span>
              </div>
            </div>

            {/* Contact Links */}
            <div className="flex flex-wrap gap-4 mb-8">
              {student.website && (
                <a
                  href={student.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-teal hover:underline"
                >
                  <FaGlobe className="mr-2" />
                  Website
                </a>
              )}
              {student.github && (
                <a
                  href={student.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-teal hover:underline"
                >
                  <FaGithub className="mr-2" />
                  GitHub
                </a>
              )}
              {student.linkedin && (
                <a
                  href={student.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-teal hover:underline"
                >
                  <FaLinkedin className="mr-2" />
                  LinkedIn
                </a>
              )}
              {student.phone && (
                <a
                  href={`tel:${student.phone}`}
                  className="flex items-center text-sm text-teal hover:underline"
                >
                  <FaPhone className="mr-2" />
                  {student.phone}
                </a>
              )}
            </div>

            {/* Tabs */}
            <div className="border-b mb-6">
              <div className="flex space-x-4 md:space-x-8 overflow-x-auto">
                <button
                  className={`pb-3 ${
                    activeTab === "overview"
                      ? "border-b-2 border-teal text-navy font-medium"
                      : "text-gray-500 hover:text-navy"
                  }`}
                  onClick={() => onTabChange("overview")}
                >
                  Overview
                </button>
                <button
                  className={`pb-3 ${
                    activeTab === "skills"
                      ? "border-b-2 border-teal text-navy font-medium"
                      : "text-gray-500 hover:text-navy"
                  }`}
                  onClick={() => onTabChange("skills")}
                >
                  Skills
                </button>
              </div>
            </div>

            {/* Overview Tab Content */}
            {activeTab === "overview" && (
              <div className="mb-10">
                <h3 className="text-lg font-bold font-heading mb-4">
                  About Me
                </h3>
                <p className="text-gray-700 mb-6">
                  {student.bio ||
                    `I'm a passionate ${student.major} student at ${student.university}. I'm always eager to learn new technologies and apply my skills in real-world projects.`}
                </p>

                <h3 className="text-lg font-bold font-heading mb-4">
                  Education
                </h3>
                <div className="mb-6">
                  <div className="flex items-start">
                    <div className="bg-navy text-white p-2 rounded-lg mr-4">
                      <FaBuildingColumns />
                    </div>
                    <div>
                      <h4 className="font-medium">{student.university}</h4>
                      <p className="text-gray-600 text-sm">{student.major}</p>
                      <p className="text-gray-500 text-sm">
                        Expected Graduation: {student.graduationYear}
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold font-heading mb-4">
                  Skills & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {student.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-softgray px-3 py-1 md:px-4 md:py-2 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Tab Content */}
            {activeTab === "skills" && (
              <div className="mb-10">
                <h3 className="text-lg font-bold font-heading mb-4">
                  Technical Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {student.skills.map((skill, index) => (
                    <div key={index} className="bg-softgray p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{skill}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-sm ${
                                i < Math.floor(Math.random() * 3) + 3
                                  ? "text-gold"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-teal h-2 rounded-full"
                          style={{
                            width: `${Math.floor(Math.random() * 40) + 60}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-bold font-heading mb-4">
                  Major Focus
                </h3>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-lg mb-2">{student.major}</h4>
                  <p className="text-gray-600">
                    Specialized knowledge and hands-on experience in{" "}
                    {student.major.toLowerCase()}, with a focus on practical
                    applications and innovative solutions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>


  );
};

const ContactModal = ({
  student,
  onClose,
}: {
  student: Student;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert("Message sent successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
        

        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold font-heading">
            Contact {student.name}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-navy">
            <FaXmark />
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Your Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Message *
              </label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal h-32"
                placeholder="Describe your project or opportunity"
              ></textarea>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border border-gray-300 text-navy rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-teal text-white rounded-lg hover:bg-opacity-90"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Quick Contact Options */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Or contact directly:</p>
            <div className="flex flex-wrap gap-2">
              {student.email && (
                <a
                  href={`mailto:${student.email}`}
                  className="flex items-center text-sm text-teal hover:underline"
                >
                  <FaEnvelope className="mr-1" />
                  Email
                </a>
              )}
              {student.phone && (
                <a
                  href={`tel:${student.phone}`}
                  className="flex items-center text-sm text-teal hover:underline"
                >
                  <FaPhone className="mr-1" />
                  Call
                </a>
              )}
              {student.linkedin && (
                <a
                  href={student.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-teal hover:underline"
                >
                  <FaLinkedin className="mr-1" />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

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
            name: student.fullname,
            title: `${student.major} Student${
              student.bio ? ` – ${student.bio}` : ""
            }`,
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
      students.map((student) => (
        <ProfileCard
          key={student.id}
          student={student}
          onClick={() => openProfile(student)}
        />
      )),
    [students, openProfile]
  );

  if (loading) {
    return (
      <div className="bg-softgray text-navy font-sans min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal mx-auto mb-4"></div>
          <p>Loading talents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-softgray text-navy font-sans min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-softgray text-navy font-sans min-h-screen">
      <Head>
        <title>CONCESTalent - National Talent Directory</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Header Navigation */}
      <header className="bg-white sticky top-0 z-50 shadow-sm px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="./hub.html"
              className="text-2xl font-bold text-navy font-heading mr-10"
            >
              <span className="text-navy">CONCES</span>
              <span className="text-teal">Talent</span>
            </a>
            <div className="hidden md:block relative w-72">
              <input
                type="text"
                placeholder="Search talents, skills..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              />
              <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center space-x-2 text-navy hover:text-teal"
            >
              <FaSliders />
              <span className="hidden md:inline">Filters</span>
            </button>
            <div className="hidden md:flex items-center space-x-2 text-navy hover:text-teal cursor-pointer">
              <FaBell />
            </div>
            <div className="flex items-center space-x-2 text-navy hover:text-teal cursor-pointer">
              <FaCircleUser className="text-xl" />
              <span className="hidden md:inline">Account</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 py-3 bg-white border-t border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search talents, skills..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
          />
          <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Page Title and Filters Summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading mb-2">
              National Talent Directory
            </h1>
            <p className="text-gray-600">
              Discover exceptional student talents across all disciplines (
              {students.length} talents found)
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-teal">
                <option>Newest</option>
                <option>Highest Rated</option>
                <option>Most Popular</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <button className="hidden md:flex items-center space-x-2 text-navy bg-white py-2 px-4 rounded-lg border border-gray-300 hover:bg-softgray">
              <FaTableCellsLarge />
              <span>Grid</span>
            </button>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="bg-white rounded-full py-1 px-4 text-sm flex items-center space-x-2 border border-gray-200">
            <span>All Disciplines</span>
            <FaXmark className="text-xs cursor-pointer" />
          </div>
          <div className="bg-white rounded-full py-1 px-4 text-sm flex items-center space-x-2 border border-gray-200">
            <span>Available Now</span>
            <FaXmark className="text-xs cursor-pointer" />
          </div>
          <button className="text-teal text-sm hover:underline">
            Clear All
          </button>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentCards}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm">
            <button className="px-4 py-2 text-sm font-medium text-navy bg-white border border-gray-300 rounded-l-lg hover:bg-softgray">
              <FaChevronLeft className="mr-1" />
              Previous
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-navy border border-navy">
              1
            </button>
            <button className="px-4 py-2 text-sm font-medium text-navy bg-white border-t border-b border-gray-300 hover:bg-softgray">
              2
            </button>
            <button className="px-4 py-2 text-sm font-medium text-navy bg-white border-t border-b border-gray-300 hover:bg-softgray">
              3
            </button>
            <button className="px-4 py-2 text-sm font-medium text-navy bg-white border border-gray-300 rounded-r-lg hover:bg-softgray">
              Next <FaChevronRight className="ml-1" />
            </button>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
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

      {/* Modals */}
      {showFilterModal && (
        <FilterModal onClose={() => setShowFilterModal(false)} />
      )}

      {showProfileModal && selectedStudent && (
        <ProfileModal
          student={selectedStudent}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onClose={() => setShowProfileModal(false)}
          onContact={openContact}
        />
      )}

      {showContactModal && selectedStudent && (
        <ContactModal
          student={selectedStudent}
          onClose={() => {
            setShowContactModal(false);
            setShowProfileModal(true);
          }}
        />
      )}
    </div>
  );
};

export default TalentPage;
