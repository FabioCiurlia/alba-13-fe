'use client';

import React, { useState } from 'react';
import { ClubContext } from '../types';
import { ClubCarousel } from './ClubCarousel';
import { AthleteList } from './AthleteList';

interface ClubExplorerProps {
    clubs: ClubContext[];
    initialActiveClubIndex?: number;
}

export const ClubExplorer: React.FC<ClubExplorerProps> = ({ clubs, initialActiveClubIndex = 0 }) => {
    const [currentClubIndex, setCurrentClubIndex] = useState(initialActiveClubIndex);

    const currentClub = clubs[currentClubIndex];

    if (!currentClub) return null;

    const isAlba = currentClub.name.toLowerCase().includes('alba');

    const ambientGradient = isAlba
        ? 'from-cyan-100/50 via-cyan-50/30 to-transparent'
        : 'from-yellow-100/50 via-yellow-50/30 to-transparent';

    return (
        <section className="container mx-auto px-6 py-10 md:py-32 overflow-hidden">
            {/* --- BACKGROUND TEXTURE & AMBIENT GLOWS --- */}
            <div className="absolute inset-0 bg-slate-50 z-0 transition-colors duration-1000">
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
                        backgroundSize: '32px 32px'
                    }}
                />
                <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b ${ambientGradient} rounded-full blur-3xl opacity-60 transform translate-x-1/3 -translate-y-1/4 pointer-events-none transition-all duration-1000`} />
                <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t ${ambientGradient} rounded-full blur-3xl opacity-40 transform -translate-x-1/3 translate-y-1/4 pointer-events-none transition-all duration-1000`} />
            </div>

            <div className="container mx-auto px-10 relative z-10">
                <ClubCarousel
                    clubs={clubs}
                    currentIndex={currentClubIndex}
                    onIndexChange={setCurrentClubIndex}
                />
            </div>
        </section>
    );
};
