// components/StudentDirectory.jsx
import { useState } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMagnifyingGlass, 
  faSliders, 
  faBell, 
  faCircleUser,
  faChevronDown,
  faTableCellsLarge,
  faChevronLeft,
  faChevronRight,
  faXmark,
  faArrowLeft,
  faEnvelope,
  faStar,
  faLocationDot,
  faGraduationCap,
  faBuildingColumns,
  faHouse,
  faUserGroup,
  faUser
} from '@fortawesome/free-solid-svg-icons';

const StudentDirectory = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const students = [
    {
      id: 1,
      name: "Michael Chen",
      title: "Electrical Engineering Student – UI/UX Enthusiast",
      status: "available",
      skills: ["UI Design", "Arduino", "3D Modeling", "React"],
      university: "Boston University",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
      gradient: "from-navy to-teal"
    },
    {
      id: 2,
      name: "Sophia Williams",
      title: "Graphic Design Major – Brand Identity Specialist",
      status: "top",
      skills: ["Branding", "Illustration", "Typography", "Adobe Suite"],
      university: "Rhode Island School of Design",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
      gradient: "from-gold to-teal"
    },
    {
      id: 3,
      name: "David Johnson",
      title: "Computer Science Student – Full Stack Developer",
      status: "available",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      university: "MIT",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      gradient: "from-navy to-gold"
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      title: "Marketing Student – Social Media Strategist",
      status: "top",
      skills: ["Content Creation", "Analytics", "Campaign Design"],
      university: "New York University",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      gradient: "from-teal to-navy"
    },
    {
      id: 5,
      name: "James Wilson",
      title: "Film & Media Production – Cinematographer",
      status: "available",
      skills: ["Video Editing", "Color Grading", "After Effects"],
      university: "USC School of Cinematic Arts",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg",
      gradient: "from-gold to-navy"
    },
    {
      id: 6,
      name: "Olivia Martinez",
      title: "Architecture Student – Sustainable Design",
      status: "top",
      skills: ["3D Modeling", "AutoCAD", "Revit", "SketchUp"],
      university: "Cornell University",
      image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
      gradient: "from-teal to-gold"
    }
  ];

  const [selectedStudent, setSelectedStudent] = useState(students[0]);

  const openProfile = (student) => {
    setSelectedStudent(student);
    setShowProfileModal(true);
  };

  const openContact = () => {
    setShowProfileModal(false);
    setShowContactModal(true);
  };

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
            <a href="./hub.html" className="text-2xl font-bold text-navy font-heading mr-10">
              <span className="text-navy">CONCES</span>
              <span className="text-teal">Talent</span>
            </a>
            <div className="hidden md:block relative w-72">
              <input 
                type="text" 
                placeholder="Search talents, skills..." 
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent" 
              />
              <FontAwesomeIcon 
                icon={faMagnifyingGlass} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setShowFilterModal(true)}
              className="flex items-center space-x-2 text-navy hover:text-teal"
            >
              <FontAwesomeIcon icon={faSliders} />
              <span className="hidden md:inline">Filters</span>
            </button>
            <div className="hidden md:flex items-center space-x-2 text-navy hover:text-teal cursor-pointer">
              <FontAwesomeIcon icon={faBell} />
            </div>
            <div className="flex items-center space-x-2 text-navy hover:text-teal cursor-pointer">
              <FontAwesomeIcon icon={faCircleUser} className="text-xl" />
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
          <FontAwesomeIcon 
            icon={faMagnifyingGlass} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Page Title and Filters Summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading mb-2">National Talent Directory</h1>
            <p className="text-gray-600">Discover exceptional student talents across all disciplines</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-teal">
                <option>Newest</option>
                <option>Highest Rated</option>
                <option>Most Popular</option>
              </select>
              <FontAwesomeIcon 
                icon={faChevronDown} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
              />
            </div>
            <button className="hidden md:flex items-center space-x-2 text-navy bg-white py-2 px-4 rounded-lg border border-gray-300 hover:bg-softgray">
              <FontAwesomeIcon icon={faTableCellsLarge} />
              <span>Grid</span>
            </button>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="bg-white rounded-full py-1 px-4 text-sm flex items-center space-x-2 border border-gray-200">
            <span>UI/UX Design</span>
            <FontAwesomeIcon icon={faXmark} className="text-xs cursor-pointer" />
          </div>
          <div className="bg-white rounded-full py-1 px-4 text-sm flex items-center space-x-2 border border-gray-200">
            <span>Available Now</span>
            <FontAwesomeIcon icon={faXmark} className="text-xs cursor-pointer" />
          </div>
          <div className="bg-white rounded-full py-1 px-4 text-sm flex items-center space-x-2 border border-gray-200">
            <span>Top Talent</span>
            <FontAwesomeIcon icon={faXmark} className="text-xs cursor-pointer" />
          </div>
          <button className="text-teal text-sm hover:underline">Clear All</button>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map(student => (
            <ProfileCard 
              key={student.id} 
              student={student} 
              onClick={() => openProfile(student)}
            />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm">
            <button className="px-4 py-2 text-sm font-medium text-navy bg-white border border-gray-300 rounded-l-lg hover:bg-softgray">
              <FontAwesomeIcon icon={faChevronLeft} className="mr-1" />
              Previous
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-navy border border-navy">1</button>
            <button className="px-4 py-2 text-sm font-medium text-navy bg-white border-t border-b border-gray-300 hover:bg-softgray">2</button>
            <button className="px-4 py-2 text-sm font-medium text-navy bg-white border-t border-b border-gray-300 hover:bg-softgray">3</button>
            <button className="px-4 py-2 text-sm font-medium text-navy bg-white border border-gray-300 rounded-r-lg hover:bg-softgray">
              Next <FontAwesomeIcon icon={faChevronRight} className="ml-1" />
            </button>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex justify-around">
          <button className="flex flex-col items-center text-navy">
            <FontAwesomeIcon icon={faHouse} className="text-lg" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center text-navy">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg" />
            <span className="text-xs mt-1">Search</span>
          </button>
          <button className="flex flex-col items-center text-teal">
            <FontAwesomeIcon icon={faUserGroup} className="text-lg" />
            <span className="text-xs mt-1">Talents</span>
          </button>
          <button className="flex flex-col items-center text-navy">
            <FontAwesomeIcon icon={faUser} className="text-lg" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <FilterModal onClose={() => setShowFilterModal(false)} />
      )}

      {/* Profile Detail Modal */}
      {showProfileModal && (
        <ProfileModal 
          student={selectedStudent} 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onClose={() => setShowProfileModal(false)}
          onContact={openContact}
        />
      )}

      {/* Contact Form Modal */}
      {showContactModal && (
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

// Profile Card Component
const ProfileCard = ({ student, onClick }) => {
  return (
    <div 
      className="profile-card bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <div className={`h-32 bg-gradient-to-r ${student.gradient} opacity-90`}></div>
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
          <img 
            src={student.image} 
            alt="Profile" 
            className="w-24 h-24 rounded-full border-4 border-white object-cover" 
          />
        </div>
      </div>
      <div className="pt-16 pb-6 px-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold font-heading">{student.name}</h3>
          <span className={`${student.status === 'available' ? 'bg-teal bg-opacity-10 text-teal' : 'bg-gold bg-opacity-10 text-gold'} text-xs px-2 py-1 rounded-full`}>
            {student.status === 'available' ? 'Available' : 'Top Talent'}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{student.title}</p>
        
        <div className="mb-4 overflow-x-auto flex pb-1 no-scrollbar">
          <div className="flex space-x-2">
            {student.skills.map((skill, index) => (
              <span key={index} className="whitespace-nowrap bg-softgray px-3 py-1 rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
          <span>{student.university}</span>
        </div>
        
        <button className="view-profile-btn w-full py-2 bg-navy text-white rounded-lg hover:bg-opacity-90 transform translate-y-4 opacity-0 transition-all duration-300">
          View Profile
        </button>
      </div>
    </div>
  );
};

// Filter Modal Component
const FilterModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold font-heading">Filter Talents</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-navy">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <div className="mb-6">
            <h4 className="font-medium mb-3">Skill Category</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-teal rounded" />
                <span className="ml-2">UI/UX Design</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-teal rounded" />
                <span className="ml-2">Web Development</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-teal rounded" />
                <span className="ml-2">Graphic Design</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-teal rounded" />
                <span className="ml-2">Video Production</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-teal rounded" />
                <span className="ml-2">3D Modeling</span>
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-3">University</h4>
            <select className="w-full p-2 border border-gray-300 rounded-lg">
              <option>All Universities</option>
              <option>Boston University</option>
              <option>MIT</option>
              <option>Harvard University</option>
              <option>NYU</option>
              <option>Cornell University</option>
            </select>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-3">Availability</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-teal rounded" />
                <span className="ml-2">Available Now</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-teal rounded" />
                <span className="ml-2">Available Part-time</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-teal rounded" />
                <span className="ml-2">Available for Internship</span>
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium mb-3">Rating</h4>
            <div className="flex items-center space-x-1">
              {[...Array(4)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="text-gold" />
              ))}
              <FontAwesomeIcon icon={faStar} className="text-gold" />
              <span className="ml-2 text-sm">4.0+</span>
            </div>
          </div>
        </div>
        <div className="p-4 border-t bg-softgray flex justify-between">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-navy">Reset</button>
          <button className="px-4 py-2 bg-teal text-white rounded-lg">Apply Filters</button>
        </div>
      </div>
    </div>
  );
};

// Profile Modal Component
const ProfileModal = ({ student, activeTab, onTabChange, onClose, onContact }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <button onClick={onClose} className="mr-4 text-navy">
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h3 className="text-lg font-bold font-heading">Talent Profile</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-navy">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        
        <div className="overflow-y-auto flex-grow">
          {/* Hero Section */}
          <div className="relative">
            <div className="h-48 bg-gradient-to-r from-navy to-teal"></div>
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
                <h2 className="text-xl md:text-2xl font-bold font-heading">{student.name}</h2>
                <p className="text-gray-600">{student.title}</p>
              </div>
              <button 
                onClick={onContact}
                className="bg-teal text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Contact
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center text-sm text-gray-600">
                <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                <span>Boston, MA</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
                <span>{student.university}</span>
              </div>
              <div className="flex items-center text-sm text-gold">
                <FontAwesomeIcon icon={faStar} className="mr-1" />
                <span>4.8</span>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-b mb-6">
              <div className="flex space-x-4 md:space-x-8 overflow-x-auto">
                <button 
                  className={`pb-3 ${activeTab === 'overview' ? 'border-b-2 border-teal text-navy font-medium' : 'text-gray-500 hover:text-navy'}`}
                  onClick={() => onTabChange('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`pb-3 ${activeTab === 'portfolio' ? 'border-b-2 border-teal text-navy font-medium' : 'text-gray-500 hover:text-navy'}`}
                  onClick={() => onTabChange('portfolio')}
                >
                  Portfolio
                </button>
                <button 
                  className={`pb-3 ${activeTab === 'skills' ? 'border-b-2 border-teal text-navy font-medium' : 'text-gray-500 hover:text-navy'}`}
                  onClick={() => onTabChange('skills')}
                >
                  Skills
                </button>
                <button 
                  className={`pb-3 ${activeTab === 'testimonials' ? 'border-b-2 border-teal text-navy font-medium' : 'text-gray-500 hover:text-navy'}`}
                  onClick={() => onTabChange('testimonials')}
                >
                  Testimonials
                </button>
              </div>
            </div>
            
            {/* Overview Tab Content */}
            {activeTab === 'overview' && (
              <div className="mb-10">
                <h3 className="text-lg font-bold font-heading mb-4">About Me</h3>
                <p className="text-gray-700 mb-6">
                  I'm a passionate Electrical Engineering student with a strong interest in UI/UX design. I combine my technical knowledge with creative design thinking to build intuitive and functional interfaces. I'm currently seeking opportunities to apply my skills in real-world projects.
                </p>
                
                <div className="bg-softgray p-4 rounded-lg mb-6 italic text-gray-600">
                  "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs
                </div>
                
                <h3 className="text-lg font-bold font-heading mb-4">Education</h3>
                <div className="mb-6">
                  <div className="flex items-start">
                    <div className="bg-navy text-white p-2 rounded-lg mr-4">
                      <FontAwesomeIcon icon={faBuildingColumns} />
                    </div>
                    <div>
                      <h4 className="font-medium">{student.university}</h4>
                      <p className="text-gray-600 text-sm">Bachelor of Science in Electrical Engineering</p>
                      <p className="text-gray-500 text-sm">2021 - 2025</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold font-heading mb-4">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-softgray px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">UI/UX Design</span>
                  <span className="bg-softgray px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">Arduino Projects</span>
                  <span className="bg-softgray px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">Mobile App Development</span>
                  <span className="bg-softgray px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">3D Printing</span>
                  <span className="bg-softgray px-3 py-1 md:px-4 md:py-2 rounded-full text-sm">Photography</span>
                </div>
              </div>
            )}
            
            {/* Other tabs would be implemented similarly */}
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Modal Component
const ContactModal = ({ student, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold font-heading">Contact {student.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-navy">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="p-6">
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal" 
                placeholder="Enter your name" 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Your Email</label>
              <input 
                type="email" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal" 
                placeholder="Enter your email" 
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal h-32" 
                placeholder="Describe your project or opportunity"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full py-3 bg-teal text-white rounded-lg hover:bg-opacity-90"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentDirectory;