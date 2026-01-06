'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  interface NavItem {
    name: string;
    href: string;
    subItems?: NavItem[];
  }

  const navLinks: NavItem[] = [
    { name: 'HOME', href: '/' },
    {
      name: 'ABOUT',
      href: '/about',
      subItems: [
        { name: 'About Us', href: '/about' },
        { name: 'Founder’s Letter', href: '/founders-letter' },
        { name: 'The Vision', href: '/about#vision' },
        { name: 'The Mission', href: '/about#mission' },
      ]
    },
    { name: 'SCHOLARSHIPS', href: '/scholarship' },
    {
      name: 'INITIATIVES',
      href: '/initiatives',
      subItems: [
        { name: 'Growth Community', href: 'https://growthcommunity.thefeb10project.org' }
      ]
    },
    {
      name: 'MEDIA',
      href: '/media',
      subItems: [
        { name: 'Testimonials', href: '/media/testimonials' },
        { name: 'Videos', href: '/media/videos' },
        { name: 'Social Links', href: '/media/social-links' }
      ]
    },
  ];

  return (
    <nav className="bg-[#2e3b86] text-white w-full z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="Logo" width={250} height={250} />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => {
                    if (link.subItems) setActiveDropdown(link.name);
                  }}
                  onMouseLeave={() => {
                    setActiveDropdown(null);
                    setActiveSubDropdown(null);
                  }}
                >
                  <Link
                    href={link.href}
                    className="hover:text-gray-300 px-3 py-2 rounded-md text-sm font-bold tracking-wide transition-colors flex items-center gap-1"
                  >
                    {link.name}
                    {link.subItems && (
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    )}
                  </Link>

                  {/* Level 1 Dropdown */}
                  {link.subItems && (
                    <div className="absolute left-0 mt-0 w-64 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-gray-800 border-t-4 border-[#f06436]">
                      {link.subItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="relative group/sub"
                          onMouseEnter={() => item.subItems && setActiveSubDropdown(item.name)}
                          onMouseLeave={() => setActiveSubDropdown(null)}
                        >
                          <Link
                            href={item.href}
                            className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#f06436] hover:bg-gray-50 transition-colors"
                          >
                            {item.name}
                            {item.subItems && (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            )}
                          </Link>

                          {/* Level 2 Dropdown (Flyout) */}
                          {item.subItems && (
                            <div className="absolute left-full top-0 mt-0 w-56 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group/sub-hover:opacity-100 group/sub-hover:visible transition-all duration-200 z-50 text-gray-800 border-l-4 border-[#2e3b86]">
                              {item.subItems.map((sub, sIdx) => (
                                <Link key={sIdx} href={sub.href} className="block px-4 py-2 text-sm text-gray-700 hover:text-[#f06436] hover:bg-gray-50 transition-colors">
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/volunteer"
                className="bg-[#f06436] hover:bg-[#d95328] text-white px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-colors"
              >
                VOLUNTEER
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#2e3b86] border-t border-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.subItems ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === link.name ? null : link.name)}
                      className="w-full flex items-center justify-between px-3 py-2 text-base font-bold text-gray-300 uppercase hover:bg-blue-800 rounded-md transition-colors"
                    >
                      <span>{link.name}</span>
                      {mobileExpanded === link.name ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {mobileExpanded === link.name && (
                      <div className="pl-4 border-l-2 border-blue-700 ml-3 space-y-1 animate-in slide-in-from-top-2 duration-200">
                        {link.subItems.map((item, idx) => (
                          <div key={idx}>
                            {item.subItems ? (
                              <div className="mt-1">
                                <Link
                                  href={item.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block px-3 py-2 rounded-md text-sm font-bold text-white hover:bg-blue-800"
                                >
                                  {item.name}
                                </Link>
                                <div className="pl-4 border-l border-blue-600 ml-2 mt-1 space-y-1">
                                  {item.subItems.map((sub, sIdx) => (
                                    <Link
                                      key={sIdx}
                                      href={sub.href}
                                      onClick={() => setIsOpen(false)}
                                      className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 text-gray-300"
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <Link
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 text-white"
                              >
                                {item.name}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/volunteer"
              className="block w-full text-center bg-[#f06436] text-white px-6 py-3 rounded-md text-base font-bold mt-4"
              onClick={() => setIsOpen(false)}
            >
              VOLUNTEER
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
