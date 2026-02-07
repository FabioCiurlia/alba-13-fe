'use client';

import React, { useState } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { AnimatedLink } from './AnimatedLink';
import { useParams } from 'next/navigation';
import { getThemeBySlug } from '../utils/theme';

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
          <div className="absolute hidden md:flex items-center gap-8 text-sm font-medium z-20">
            <AnimatedLink to={clubPrefix} className="opacity-80 hover:opacity-100 hover:text-white transition-opacity uppercase">Home</AnimatedLink>
            <AnimatedLink to={`${clubPrefix}/news`} className="opacity-80 hover:opacity-100 hover:text-white transition-opacity uppercase">Eventi</AnimatedLink>
            <AnimatedLink to={`${clubPrefix}/athletes`} className="opacity-80 hover:opacity-100 hover:text-white transition-opacity uppercase">Atleti</AnimatedLink>
            <AnimatedLink to={`${clubPrefix}/calendar`} className="opacity-80 hover:opacity-100 hover:text-white transition-opacity uppercase">Calendario</AnimatedLink>
          </div>

          {/* Right: Social Links */}
          <div className="hidden md:flex items-center gap-8 z-20 ml-auto  text-sm font-medium">
            <AnimatedLink to={clubPrefix} className="opacity-80 hover:opacity-100 hover:text-white transition-opacity uppercase">Facebook</AnimatedLink>
            <AnimatedLink to={`${clubPrefix}/training`} className="opacity-80 hover:opacity-100 transition-opacity uppercase">Strava</AnimatedLink>
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