export default function Header({ toggleSidebar, isMobile }) {
  return (
    <header className="bg-white h-16 flex items-center justify-between px-6 shadow-sm fixed top-0 right-0 left-0 md:left-64 z-10 transition-all duration-300 ease-in-out">
      <div className="flex items-center">
        {isMobile && (
          <button onClick={toggleSidebar} className="md:hidden mr-2">
            <i className="fas fa-bars text-navy" />
          </button>
        )}
        <h1 className="text-navy font-montserrat font-bold text-xl">Admin Dashboard</h1>
      </div>
      
      <div className="flex items-center">
        <div className="relative mr-4">
          <button className="relative">
            <i className="far fa-bell text-navy" />
            <span className="absolute top-0 right-0 bg-gold text-navy rounded-full w-4 h-4 flex items-center justify-center text-xs">4</span>
          </button>
        </div>
        
        <div className="flex items-center cursor-pointer">
          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-10 h-10 rounded-full" alt="Admin" />
          <span className="ml-2 text-navy font-medium hidden md:block">Michael Scott</span>
          <i className="ml-2 text-navy text-xs fas fa-chevron-down" />
        </div>
      </div>
    </header>
  );
}