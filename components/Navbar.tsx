'use client';

import React, { useState } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { AnimatedLink } from './AnimatedLink';
import { useParams } from 'next/navigation';
import { getThemeBySlug } from '../utils/theme';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const params = useParams();
  const slug = params?.club as string || 'alba13';
  const config = getThemeBySlug(slug);

  const [isOpen, setIsOpen] = useState(false);
  const activeClub = slug;

  // Theme colors for the drawer
  const drawerBg = config.navbar.drawerBg;
  const itemHover = `hover:text-${config.secondary}`;

  const clubPrefix = `/${activeClub}`;

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b
        ${config.navbar.bg} ${config.navbar.border} ${config.navbar.text}
        `}>
        <div className="container mx-auto px-6 h-16 flex items-center justify-between relative">

          {/* Center: Desktop Nav */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8 text-sm font-medium opacity-80 z-20">
            <AnimatedLink to={clubPrefix} className="hover:opacity-100 transition-opacity uppercase">Home</AnimatedLink>
            <AnimatedLink to={`${clubPrefix}/training`} className="hover:opacity-100 transition-opacity uppercase">Allenamenti</AnimatedLink>
            <AnimatedLink to={`${clubPrefix}/athletes`} className="hover:opacity-100 transition-opacity uppercase">Atleti</AnimatedLink>
            <AnimatedLink to={`${clubPrefix}/news`} className="hover:opacity-100 transition-opacity uppercase">Eventi</AnimatedLink>
            <AnimatedLink to={`${clubPrefix}/calendar`} className="hover:opacity-100 transition-opacity uppercase">Calendario</AnimatedLink>
          </div>

          {/* Right: Elegant Switch */}
          <div className="hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 md:static md:transform-none md:flex md:ml-auto z-20">
            <div className="bg-black/20 p-1 rounded-full flex items-center backdrop-blur-sm border border-white/10">
              <Link
                href="/alba13"
                className={`
                            px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300
                            ${activeClub === 'alba13' ? 'bg-cyan-600 text-white shadow-lg' : 'text-white/50 hover:text-white'}
                        `}
              >
                ALBA 13
              </Link>
              <Link
                href="/ros6team"
                className={`
                            px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300
                            ${activeClub === 'ros6team' ? 'bg-yellow-600 text-white shadow-lg' : 'text-white/50 hover:text-white'}
                        `}
              >
                ROS 6 TEAM
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle & Calendar */}
          <div className="md:hidden flex items-center gap-4 z-30">
            <AnimatedLink to={`${clubPrefix}/calendar`} className="text-white/90 hover:text-white">
              <Calendar size={24} />
            </AnimatedLink>
            <button
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`
            fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            ${drawerBg} text-white
        `}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl font-bold">
          <AnimatedLink
            to={clubPrefix}
            className={`transition-colors ${itemHover}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </AnimatedLink>
          <AnimatedLink
            to={`${clubPrefix}/training`}
            className={`transition-colors ${itemHover}`}
            onClick={() => setIsOpen(false)}
          >
            Allenamenti
          </AnimatedLink>
          <AnimatedLink
            to={`${clubPrefix}/athletes`}
            className={`transition-colors ${itemHover}`}
            onClick={() => setIsOpen(false)}
          >
            Atleti
          </AnimatedLink>
          <AnimatedLink
            to={`${clubPrefix}/news`}
            className={`transition-colors ${itemHover}`}
            onClick={() => setIsOpen(false)}
          >
            Eventi
          </AnimatedLink>
          <AnimatedLink
            to={`${clubPrefix}/calendar`}
            className={`transition-colors ${itemHover}`}
            onClick={() => setIsOpen(false)}
          >
            Calendario
          </AnimatedLink>
        </div>
      </div>
    </>
  );
};