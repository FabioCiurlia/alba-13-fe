'use client';

import React, { useState } from 'react';
import { ClubContext } from '../types';
import { ClubCarousel } from './ClubCarousel';

interface AboutSectionProps {
  clubs: ClubContext[];
  initialIndex?: number;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ clubs, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentClub = clubs[currentIndex];

  if (!currentClub) return null;

  const isAlba = currentClub.name.toLowerCase().includes('alba');

  return (
    <section className="relative py-10 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-50 z-0 transition-colors duration-1000 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
        <div className={`absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-b ${isAlba ? 'from-cyan-100/50 via-cyan-50/30 to-transparent' : 'from-yellow-100/50 via-yellow-50/30 to-transparent'} rounded-full blur-3xl opacity-60 transform translate-x-1/4 md:translate-x-1/3 -translate-y-1/4 pointer-events-none transition-all duration-1000`} />
        <div className={`absolute bottom-0 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-gradient-to-t ${isAlba ? 'from-cyan-100/50 via-cyan-50/30 to-transparent' : 'from-yellow-100/50 via-yellow-50/30 to-transparent'} rounded-full blur-3xl opacity-40 transform -translate-x-1/4 md:-translate-x-1/3 translate-y-1/4 pointer-events-none transition-all duration-1000`} />
      </div>

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <ClubCarousel
          clubs={clubs}
          currentIndex={currentIndex}
          onIndexChange={setCurrentIndex}
        />
      </div>
    </section>
  );
};