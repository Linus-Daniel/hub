// components/Layout.js - Updated with new navigation
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  BellIcon,
  UserCircleIcon,
  HomeIcon,
  UserGroupIcon,
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function Layout({ children }:{children: React.ReactNode}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/student/", icon: ChartBarIcon },
    { name: "Portfolio", href: "/student/portfolio", icon: BriefcaseIcon },
    { name: "Skills", href: "/student/skills", icon: AcademicCapIcon },
    { name: "Settings", href: "/student/settings", icon: Cog6ToothIcon },
  ];

  const isActive = (href:string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "text-teal bg-teal bg-opacity-10"
                        : "text-navy hover:text-teal"
                    }`}
                  >
                    {/* <Icon className="h-5 w-5" /> */}
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:block lg:hidden relative w-72 ml-8">
              <input
                type="text"
                placeholder="Search talents, skills..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden lg:block relative w-72">
              <input
                type="text"
                placeholder="Search talents, skills..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            <button className="lg:hidden flex items-center space-x-2 text-navy hover:text-teal">
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              <span className="hidden md:inline">Filters</span>
            </button>

            <div className="hidden md:flex items-center space-x-2 text-navy hover:text-teal cursor-pointer relative">
              <BellIcon className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>

            <div className="flex items-center space-x-2 text-navy hover:text-teal cursor-pointer">
              <UserCircleIcon className="h-6 w-6" />
              <span className="hidden md:inline">Account</span>
            </div>

            {/* Mobile menu button */}
            {/* <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-navy"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button> */}
          </div>
        </div>

        {/* Mobile Navigation Menu
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2 mt-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "text-teal bg-teal bg-opacity-10"
                        : "text-navy hover:text-teal"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )} */}
      </header>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 py-3 bg-white border-t border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search talents, skills..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 pb-20 md:pb-10">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex justify-around">
       {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex flex-col items-center ${
                    isActive(item.href) ? "text-teal" : "text-navy"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs mt-1">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
