import { useSidebarContext } from '@/providers/SidebarContextProvider';
import { GalleryVerticalEnd, Menu, PanelLeft, Plus, Star, Trash, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import logo from '../../public/assets/bracket_17856274.png';
import EditTagsDialog from './tags/EditTagsDialog';

interface SidebarProps {
  onExpand: (expanded: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onExpand }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState('all');
  const { changeContent } = useSidebarContext();
  const {handleTagUpdate} = useSidebarContext()
  const {handleTagDelete} = useSidebarContext()
  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    onExpand(!isExpanded);
  };

  const handleLinkClick = (content: string) => {
    setActiveLink(content);
    changeContent(content);
  };

  const renderIcon = (IconComponent: React.ElementType, content: string) => {
    return (
      <IconComponent
        size={20}
        color="black"
        fill={activeLink === content ? "black" : "none"}
      />
    );
  };

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <button
        className="fixed top-4 left-4 z-50 p-2 text-black rounded-md lg:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X size={24} color='black' /> : <Menu size={24} color='#142d4c'/>}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full transition-all duration-300 ease-in-out
          ${isOpen ? 'w-64' : 'w-0'} lg:w-16 ${isExpanded ? 'lg:w-64' : ''}
          bg-white text-black overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Toggle Icon Area */}
          <div className={`relative p-4 flex justify-center items-center ${!isExpanded ? 'group' : ''}`}>
            <Link href="/dashboard" className={`${!isExpanded ? 'group-hover:opacity-0' : ''} transition-opacity duration-300`}>
              <Image src={logo} width={60} height={60} alt="logo" />
            </Link>
            {!isExpanded ? (
              <button
                className="absolute inset-0 flex items-center justify-center
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={toggleExpand}
                aria-label="Expand Sidebar"
              >
                <PanelLeft color="black" size={16} />
              </button>
            ) : (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2
                  transition-opacity duration-300"
                onClick={toggleExpand}
                aria-label="Collapse Sidebar"
              >
                <PanelLeft size={18} color="black" />
              </button>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="mt-8">
            <ul className="space-y-2 px-2">
              <li>
                <Link 
                  href="/dashboard" 
                  onClick={() => {
                    handleLinkClick("all")
                    setIsOpen(false)
                  }}  
                  className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                >
                  {renderIcon(GalleryVerticalEnd, "all")}
                  {(isExpanded || isOpen) && <span className="ml-4">All Snippets</span>}
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard/create"  
                  onClick={() => {
                    handleLinkClick("create")
                    setIsOpen(false)
                  }}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                >
                  {renderIcon(Plus, "create")}
                  {(isExpanded || isOpen) && <span className="ml-4">Create</span>}
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard" 
                  onClick={() => {
                    handleLinkClick("favorite")
                    setIsOpen(false)
                  }}  
                  className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                >
                  {renderIcon(Star, "favorite")}
                  {(isExpanded || isOpen) && <span className="ml-4">Favorites</span>}
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard" 
                  onClick={() => {
                    handleLinkClick("trash")
                    setIsOpen(false)
                  }} 
                  className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                >
                  {renderIcon(Trash, "trash")}
                  {(isExpanded || isOpen) && <span className="ml-4">Trash</span>}
                </Link>
              </li>
            </ul>
            <div className="border-t my-4 mx-2"></div>
            <ul className="space-y-2 px-2">
              <li className='flex items-center px-4 py-2 hover:bg-gray-100 transition-colors duration-300'>
                <EditTagsDialog onDelete={handleTagDelete} onUpdate = {handleTagUpdate}/>
                {(isExpanded || isOpen) && <span className="ml-4">Tags</span>}
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;