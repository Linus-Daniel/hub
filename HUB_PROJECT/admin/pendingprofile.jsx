import { useState } from 'react';
import ProfileModal from './ProfileModal';

export default function PendingProfiles() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const profiles = [
    {
      id: 1,
      name: 'Jessica Adams',
      role: 'UI/UX Designer',
      university: 'Stanford University',
      skills: ['Figma', 'Sketch', 'Adobe XD'],
      date: 'Aug 12, 2023',
      avatar: 'avatar-1.jpg'
    },
    // Other profiles...
  ];

  const openProfileModal = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-navy font-montserrat font-bold text-lg mb-2 md:mb-0">Pending Profiles</h2>
        
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search profiles..." 
              className="pl-8 pr-3 py-1 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-gold w-full" 
            />
            <i className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 fas fa-magnifying-glass" />
          </div>
          
          <select className="px-3 py-1 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-gold w-full md:w-auto">
            <option>All Universities</option>
            {/* Other options... */}
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-softgray">
                <th className="text-left py-3 px-4 md:py-4 md:px-6 font-montserrat text-navy text-xs md:text-sm">Photo</th>
                {/* Other headers... */}
              </tr>
            </thead>
            <tbody>
              {profiles.map(profile => (
                <tr key={profile.id} className="border-b border-gray-200 hover:bg-softgray">
                  <td className="py-3 px-4 md:py-4 md:px-6">
                    <img 
                      src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/${profile.avatar}`} 
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full" 
                      alt="Profile" 
                    />
                  </td>
                  {/* Other cells... */}
                  <td className="py-3 px-4 md:py-4 md:px-6">
                    <button 
                      onClick={() => openProfileModal(profile)}
                      className="bg-navy text-white text-xs px-2 py-1 md:px-3 md:py-1 rounded-md hover:bg-opacity-90"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination... */}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {profiles.map(profile => (
          <div key={profile.id} className="bg-white rounded-lg shadow-sm p-3">
            <div className="flex items-center mb-2">
              <img 
                src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/${profile.avatar}`} 
                className="w-10 h-10 rounded-full" 
                alt="Profile" 
              />
              <div className="ml-3">
                <div className="font-medium text-navy text-sm">{profile.name}</div>
                <div className="text-xs text-gray-500">{profile.role} • {profile.university}</div>
              </div>
              <span className="ml-auto bg-gold text-navy text-xs px-2 py-1 rounded-full">Pending</span>
            </div>
            {/* Skills and date... */}
            <button 
              onClick={() => openProfileModal(profile)}
              className="w-full bg-navy text-white text-xs py-2 rounded-md hover:bg-opacity-90 mt-2"
            >
              Review Profile
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ProfileModal 
          profile={selectedProfile} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </section>
  );
}