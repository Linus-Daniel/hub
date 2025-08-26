// components/Layout.js
import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MoreHorizontalIcon,
  BellIcon,
  UserCircleIcon,
  HomeIcon,
  Users,
  UserIcon,
} from "lucide-react";

export default function Layout({ children }:{children: React.ReactNode}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-softgray text-navy font-sans min-h-screen">
      {/* Header Navigation */}
      <header className="bg-white sticky top-0 z-50 shadow-sm px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-navy font-heading mr-10"
            >
              <span className="text-navy">CONCES</span>
              <span className="text-teal">Talent</span>
            </Link>
            <div className="hidden md:block relative w-72">
              <input
                type="text"
                placeholder="Search talents, skills..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-navy hover:text-teal">
              <MoreHorizontalIcon className="h-5 w-5" />
              <span className="hidden md:inline">Filters</span>
            </button>
            <div className="hidden md:flex items-center space-x-2 text-navy hover:text-teal cursor-pointer">
              <BellIcon className="h-5 w-5" />
            </div>
            <div className="flex items-center space-x-2 text-navy hover:text-teal cursor-pointer">
              <UserCircleIcon className="h-6 w-6" />
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
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 pb-20 md:pb-10">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex justify-around">
          <Link href="/" className="flex flex-col items-center text-navy">
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <button className="flex flex-col items-center text-navy">
            <Search className="h-6 w-6" />
            <span className="text-xs mt-1">Search</span>
          </button>
          <Link
            href="/talents"
            className="flex flex-col items-center text-teal"
          >
            <Users className="h-6 w-6" />
            <span className="text-xs mt-1">Talents</span>
          </Link>
          <button className="flex flex-col items-center text-navy">
            <UserIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
