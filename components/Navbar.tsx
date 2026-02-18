'use client';

import React, { useState } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { AnimatedLink } from './AnimatedLink';
import { useParams, usePathname } from 'next/navigation';
import { getThemeBySlug } from '../utils/theme';
import { FIXED_EVENTS } from '@/data/events';
import { ChevronDown, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const params = useParams();
  const pathname = usePathname();
  const slug = params?.club as string || 'alba13';
  const config = getThemeBySlug(slug);

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const activeClub = slug;

  // Theme colors for the drawer
  const drawerBg = config.navbar.drawerBg;
  const itemHover = `hover:text-${config.secondary}`;
  const activeColor = `text-${config.secondary}`;

  const clubPrefix = `/${activeClub}`;

  const isActive = (path: string) => {
    if (path === clubPrefix && pathname === clubPrefix) return true;
    if (path !== clubPrefix && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-50 px-8 transition-all duration-300 border-b
        ${config.navbar.bg} ${config.navbar.border} ${config.navbar.text}
        `}>
        <div className="container max-w-7xl mx-auto h-16 flex items-center justify-between relative">

          {/* Center: Desktop Nav */}
          <div className="absolute hidden md:flex items-center gap-8 text-sm font-medium z-20">
            <AnimatedLink to={clubPrefix} className={`transition-opacity uppercase ${isActive(clubPrefix) ? activeColor : 'opacity-80 hover:opacity-100 hover:text-white'}`}>Home</AnimatedLink>

            {/* Events Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 transition-opacity uppercase ${isActive(`${clubPrefix}/events`) ? activeColor : 'opacity-90 hover:opacity-100 hover:text-white'}`}
              >
                Eventi <ChevronDown size={14} />
              </button>

              <div className={`absolute top-full left-0 w-48 py-2 mt-1 bg-slate-900 rounded-lg shadow-xl transition-all duration-200 transform origin-top ${dropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                <div className="flex flex-col">
                  <AnimatedLink
                    to={`${clubPrefix}/news`}
                    className={`px-4 py-2 opacity-90 hover:bg-white hover:text-${config.secondary} transition-colors text-xs uppercase tracking-wider`}
                  >
                    Tutte le News
                  </AnimatedLink>

                  {FIXED_EVENTS.filter(e => e.enabled !== false).map((event) => (
                    <AnimatedLink
                      key={event.id}
                      to={`${clubPrefix}/events/${event.slug?.current}`}
                      className={`px-4 py-2 opacity-90 hover:bg-white hover:text-${config.secondary} transition-colors text-xs uppercase tracking-wider`}
                    >
                      {event.title}
                    </AnimatedLink>
                  ))}
                </div>
              </div>
            </div>

            <AnimatedLink to={`${clubPrefix}/athletes`} className={`transition-opacity uppercase ${isActive(`${clubPrefix}/athletes`) ? activeColor : 'opacity-80 hover:opacity-100 hover:text-white'}`}>Atleti</AnimatedLink>
            <AnimatedLink to={`${clubPrefix}/calendar`} className={`transition-opacity uppercase ${isActive(`${clubPrefix}/calendar`) ? activeColor : 'opacity-80 hover:opacity-100 hover:text-white'}`}>Calendario</AnimatedLink>
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
            to={`${clubPrefix}/athletes`}
            className={`transition-colors ${itemHover}`}
            onClick={() => setIsOpen(false)}
          >
            Atleti
          </AnimatedLink>
          <div className="flex flex-col items-center gap-4 w-full">
            <span className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Eventi</span>
            <AnimatedLink
              to={`${clubPrefix}/news`}
              className={`transition-colors text-lg font-bold ${itemHover}`}
              onClick={() => setIsOpen(false)}
            >
              Tutte le News
            </AnimatedLink>
            {FIXED_EVENTS.filter(e => e.enabled !== false).map((event) => (
              <AnimatedLink
                key={event.id}
                to={`${clubPrefix}/events/${event.slug?.current}`}
                className={`transition-colors text-lg ${itemHover} text-center`}
                onClick={() => setIsOpen(false)}
              >
                {event.title}
              </AnimatedLink>
            ))}
          </div>
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