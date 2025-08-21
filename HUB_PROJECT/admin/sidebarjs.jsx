import Link from 'next/link';

export default function Sidebar({ isOpen, isCollapsed, toggleCollapse }) {
  return (
    <aside 
      className={`bg-navy text-white fixed h-full z-20 transition-all duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-opacity-20 border-white">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gold rounded-md flex items-center justify-center text-navy font-bold text-xl">C</div>
          {!isCollapsed && (
            <div className="ml-3">
              <div className="font-montserrat font-bold text-lg">CONCES</div>
              <div className="text-xs text-gray-300">Talent Hub</div>
            </div>
          )}
        </div>
        <button 
          onClick={toggleCollapse}
          className="text-white focus:outline-none"
        >
          <i className={`fas fa-chevron-${isCollapsed ? 'right' : 'left'}`} />
        </button>
      </div>

      <nav className="mt-6">
        <Link href="#" className={`flex items-center px-6 py-3 text-white hover:bg-navy-800 bg-opacity-70 border-l-4 border-gold cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}>
          <i className="fas fa-chart-pie w-5" />
          {!isCollapsed && <span className="ml-3">Dashboard Overview</span>}
        </Link>
        
        <Link href="#" className={`flex items-center px-6 py-3 text-gray-300 hover:bg-navy-800 hover:text-white cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}>
          <i className="fas fa-clock w-5" />
          {!isCollapsed && (
            <>
              <span className="ml-3">Pending Profiles</span>
              <span className="ml-auto bg-gold text-navy rounded-full w-6 h-6 flex items-center justify-center text-xs">12</span>
            </>
          )}
        </Link>
        
        {/* Other nav items... */}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-opacity-20 border-white">
        <div className="flex items-center">
          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-10 h-10 rounded-full" alt="Admin" />
          {!isCollapsed && (
            <div className="ml-3">
              <div className="font-medium">Michael Scott</div>
              <div className="text-xs text-gray-300">Admin Manager</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}