import { useState, useEffect } from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import Header from './Header';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-softgray overflow-hidden">
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin dashboard for talent management" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        isCollapsed={sidebarCollapsed} 
        toggleCollapse={toggleCollapse} 
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <Header 
          toggleSidebar={toggleSidebar} 
          isMobile={isMobile} 
        />
        
        <main className="flex-1 overflow-y-auto pt-16 pb-20 md:pb-0">
          <div className="px-4 md:px-6 py-4">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      {isMobile && <MobileNav />}
    </div>
  );
}