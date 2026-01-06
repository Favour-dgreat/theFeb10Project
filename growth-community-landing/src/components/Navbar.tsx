'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-[#4a4a4a] w-full z-50 relative border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/images/GC_Logo_Green_PNG.png"
                alt="Growth Community Logo"
                width={150}
                height={50}
                className="transition-all duration-300"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <Link
              href="https://thefeb10project.org"
              className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-primary transition-colors"
            >
              The FEB10 Project
            </Link>
            <Link
              href="#membership-form"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 shadow-lg shadow-primary/20"
            >
              Become a Member
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-xl text-primary hover:bg-primary/5 transition-colors focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top-4 duration-500 ease-out">
          <div className="px-6 pt-6 pb-12 space-y-6">
            <Link
              href="https://thefeb10project.org"
              className="block py-6 text-base font-bold tracking-[0.2em] uppercase border-b border-gray-100 text-gray-500"
              onClick={() => setIsOpen(false)}
            >
               The FEB10 Project
            </Link>
            <Link
              href="#membership-form"
              className="block w-full text-center bg-primary text-white px-6 py-5 rounded-2xl text-sm font-black tracking-[0.2em] uppercase shadow-xl shadow-primary/20"
              onClick={() => setIsOpen(false)}
            >
              Become a Member
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
