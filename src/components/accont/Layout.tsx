"use client"// components/Layout.js - Updated with new navigation
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  BellIcon,
  UserCircleIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function Layout({ children }:{children: React.ReactNode}) {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/account", icon: ChartBarIcon },
    { name: "Portfolio", href: "/account/portfolio", icon: BriefcaseIcon },
    { name: "Skills", href: "/account/skills", icon: AcademicCapIcon },
    { name: "Settings", href: "/account/settings", icon: Cog6ToothIcon },
  ];

  console.log("Current pathname:", pathname);

  const isActive = (href:string) => {
    if (href === pathname) return true;
    return false;
  };

  return (
    <div className="bg-softgray text-navy font-sans min-h-screen">
      {/* Header Navigation */}
      <header className="bg-white sticky top-0 z-50 shadow-sm px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
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
                        ? "text-white bg-teal bg-opacity-10"
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

      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 pb-20 md:pb-10">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex justify-around">
       {navigation.map((item) =>{
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
