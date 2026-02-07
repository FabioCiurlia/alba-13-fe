'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ClubContext } from '../types';
import { Quote, Activity } from 'lucide-react';
import { getThemeBySlug } from '@/utils/theme';

interface ClubCarouselProps {
    clubs: ClubContext[];
    currentIndex: number;
    onIndexChange: (index: number) => void;
}

export const ClubCarousel: React.FC<ClubCarouselProps> = ({ clubs, currentIndex, onIndexChange }) => {
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const currentClub = clubs[currentIndex];
    if (!currentClub) return null;

    const theme = getThemeBySlug(currentClub.config.slug.current);
    const accentColor = `text-${theme.primary}`;

    // --- TOUCH HANDLERS ---
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // Reset
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            if (currentIndex < clubs.length - 1) onIndexChange(currentIndex + 1);
        }
        if (isRightSwipe) {
            if (currentIndex > 0) onIndexChange(currentIndex - 1);
        }
    };


    if (!currentClub || !currentClub.about) return null;
    const { about: aboutData } = currentClub;
    const displayImage = aboutData.imageUrl || '/utils/default-user.avif';

    return (
        <div
            className="relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >

            {/* --- DESKTOP VIEW (MD+) --- */}
            <div className="hidden md:block transition-opacity duration-500 ease-in-out">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-12">
                    {/* Image */}
                    <div className="order-2 md:order-1 relative group">
                        <div className={`absolute -inset-4 rounded-[2rem] opacity-20 transform -rotate-3 transition-transform group-hover:-rotate-2 duration-700 bg-${theme.primary}`} />
                        <div className={`absolute -inset-4 rounded-[2rem] opacity-20 transform rotate-2 transition-transform group-hover:rotate-1 duration-700 bg-slate-800`} />
                        <img
                            src={displayImage}
                            alt={aboutData.title}
                            className="relative rounded-2xl shadow-2xl w-full object-cover h-[450px] md:h-[550px]"
                        />
                        <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-${theme.secondary} flex items-center justify-center text-white shadow-lg animate-bounce-slow transition-colors duration-500`}>
                            <Quote size={32} fill="currentColor" className="text-white/90" />
                        </div>
                    </div>

                    {/* Text */}
                    <div className="order-1 md:order-2 space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`h-px w-8 bg-${theme.primary} transition-colors duration-500`}></span>
                                <span className={`text-sm font-bold tracking-widest uppercase ${accentColor} transition-colors duration-500`}>
                                    Who We Are
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                                {aboutData.title}
                            </h2>
                            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                                {aboutData.description}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 pt-4">
                            <div>
                                <span className={`block text-3xl font-bold text-${theme.primary} transition-colors duration-500`}>{currentClub.athletes?.length || 0}+</span>
                                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Athletes</span>
                            </div>
                            <div>
                                <span className={`block text-3xl font-bold text-${theme.primary} transition-colors duration-500`}>100%</span>
                                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Passion</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <a
                                href="https://www.strava.com/clubs/1688974/members"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:-translate-y-1 shadow-md hover:shadow-lg bg-[#FC4C02] hover:bg-[#E34402]"
                            >
                                <Activity size={20} /> Trovaci su Strava
                            </a>
                        </div>
                    </div>
                </div>
            </div>



            {/* --- MOBILE VIEW (Assume < MD) --- */}
            <div className="md:hidden container mx-auto px-6">
                {/* Mobile Card: Image + Title Overlay - Click to navigate */}
                <div className='text-center text-4xl my-3 leading-none text-black'>
                    {currentClub.name}
                </div>
                <Link
                    href={`/${currentClub.config.slug.current}`}
                    className="block relative w-full h-[450px] rounded-[2rem] overflow-hidden shadow-xl transition-transform active:scale-95 my-4"
                >
                    <img
                        src={displayImage}
                        alt={aboutData.title}
                        className={`w-full h-full object-cover ${theme.cardFilter}`}
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                </Link>
                <div className="pt-2 w-full">
                    <a
                        href="https://www.strava.com/clubs/1688974/members"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:-translate-y-1 shadow-md hover:shadow-lg bg-[#FC4C02] hover:bg-[#E34402]"
                    >
                        <Activity size={20} /> Trovaci su Strava
                    </a>
                </div>

                {/* Mobile Dots - Only show if multiple clubs */}
                {clubs.length > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                        {clubs.map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index ? `w-8 bg-${theme.primary}` : 'w-2 bg-slate-200'}`}
                            />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};
