"use client"
import Sidebar from '@/components/Sidebar';
import { Toaster } from '@/components/ui/sonner';
import { SidebarProvider } from '@/providers/SidebarContextProvider';
import React, { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleSidebarToggle = (isExpanded: boolean) => {
    setIsSidebarExpanded(isExpanded);
  };
 

  return (
    <div className="flex pt-16">
      <SidebarProvider>
        <Sidebar onExpand={handleSidebarToggle} />
        <div
          className={`transition-all duration-300 ease-in-out w-full  bg-[#f2f9f1] h-screen p-4
            ${isSidebarExpanded ? 'lg:ml-64' : 'lg:ml-16'} `}
        >
            {children}
        </div>
      </SidebarProvider>
      <Toaster/>
    </div>
  );
};

export default Layout;
