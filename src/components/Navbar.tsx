'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'SCHOLARSHIPS', href: '/scholarships' },
    { name: 'INITIATIVES', href: '/initiatives' },
    { name: 'MEDIA', href: '/media' },
  ];

  return (
    <nav className="bg-[#2e3b86] text-white w-full z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="Logo" width={250} height={250} />
              {/* <span className="font-bold text-xl tracking-wide">TheFeb10Project</span> */}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-gray-300 px-3 py-2 rounded-md text-sm font-bold tracking-wide transition-colors"
                >
                  {link.name}
                </Link>
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
        <div className="md:hidden bg-[#2e3b86]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
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
