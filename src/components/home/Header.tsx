"use client"
// components/Navigation.js
import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname()

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
    { name: "Join Us", href: "  auth" },
  ];

  const handleSmoothScroll = (e:FormEvent, href:string) => {
    e.preventDefault();
    if (pathname !== "/") {
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
        className={`fixed w-full bg-white z-50 transition-all duration-300 ${
          isScrolled ? "shadow-md py-2" : "shadow-sm py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="font-montserrat font-bold text-xl mr-8">
              CONCES
            </Link>
          </div>

          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden ml-4"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                className="text-navy text-xl w-6 h-6"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 448 512"
                fill="currentColor"
              >
                <path
                  fill="currentColor"
                  d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-navy hover:text-gold transition-colors duration-300 cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="font-montserrat font-bold text-xl">CONCES</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-navy"
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

          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-navy hover:text-gold transition-colors duration-300 text-lg"
              >
                {item.name}
              </a>
            ))}

            <Link
              href="/auth"
              className="bg-gold text-navy px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors duration-300 font-medium text-center mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Join the Directory
            </Link>
          </div>
        </div>
      </div>

      {/* Add padding to prevent content from being hidden behind fixed nav */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Navigation;
