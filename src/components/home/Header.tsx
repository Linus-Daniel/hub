"use client";
// components/Navigation.js
import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Why", href: "#why" },
    { name: "Who", href: "#who" },
    { name: "Benefits", href: "#benefits" },
    { name: "Join Us", href: "/auth", isCta: true },
  ];

  const handleSmoothScroll = (e: FormEvent, href: string) => {
    e.preventDefault();
    if (href.startsWith("/")) {
      router.push(href);
    } else if (pathname !== "/") {
      router.push(`/${href}`);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        id="header"
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
            : "bg-white/90 backdrop-blur-sm shadow-sm py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="font-bold text-2xl bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"
            >
              CONCES
            </Link>
          </div>

          <div className="flex items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) =>
                item.isCta ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="ml-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="px-4 py-2 text-slate-700 hover:text-teal-600 transition-colors duration-300 cursor-pointer font-medium rounded-lg hover:bg-slate-50/50"
                  >
                    {item.name}
                  </a>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden ml-6 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span
                  className={`block h-0.5 w-6 bg-slate-700 transition-transform duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-slate-700 opacity-100 transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-slate-700 transition-transform duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-lg shadow-2xl z-50 transform transition-transform duration-300 md:hidden flex flex-col ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-2xl bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              CONCES
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-slate-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col space-y-2 flex-1">
            {navItems.map((item) =>
              item.isCta ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-4 rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 font-medium text-center mt-4 mb-2 shadow-md hover:shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="px-6 py-4 text-slate-700 hover:text-teal-600 transition-colors duration-300 text-lg font-medium rounded-lg hover:bg-slate-50/50"
                >
                  {item.name}
                </a>
              )
            )}
          </div>

          <div className="pt-6 border-t border-slate-200 mt-auto">
            <p className="text-sm text-slate-500 text-center">
              Connecting talent with opportunity
            </p>
          </div>
        </div>
      </div>

      {/* Add padding to prevent content from being hidden behind fixed nav */}
      <div
        className={`h-16 transition-all duration-300 ${
          isScrolled ? "md:h-16" : "md:h-20"
        }`}
      ></div>
    </>
  );
};

export default Navigation;
