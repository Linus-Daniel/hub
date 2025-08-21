export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-navy text-white z-20 lg:hidden flex justify-around py-3 shadow-lg">
      <button className="flex flex-col items-center text-gold">
        <i className="fas fa-chart-pie text-lg" />
        <span className="text-xs mt-1">Dashboard</span>
      </button>
      
      <button className="flex flex-col items-center text-gray-300">
        <i className="fas fa-clock text-lg" />
        <span className="text-xs mt-1">Pending</span>
      </button>
      
      {/* Other mobile nav items... */}
    </nav>
  );
}