"use client";
import { Athlete, ClubConfig } from '../types';
import { ArrowRight, Plus } from 'lucide-react';
import { AnimatedLink } from './AnimatedLink';
import { getThemeBySlug } from '@/utils/theme';
import { useState } from 'react';

interface AthleteSectionProps {
    athletes: Athlete[];
    config: ClubConfig;
}

export const AthleteSection: React.FC<AthleteSectionProps> = ({ athletes, config }) => {
    const [showAll, setShowAll] = useState(false);
    const theme = getThemeBySlug(config.slug.current);

    if (!athletes || athletes.length === 0) return null;

    // Show only first 10 on mobile/desktop unless expanded, 
    // or maybe show a grid row count? Let's just limit to a reasonable number initially.
    const initialCount = 3;
    const displayedAthletes = showAll ? athletes : athletes.slice(0, initialCount);
    const hasMore = athletes.length > initialCount;

    return (
        <section className='relative w-full py-12 md:py-20 overflow-hidden bg-gradient-to-b ro-slate-50 from-slate-200'>

            {/* Background Decorative SVG */}
            <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-${theme.primary}/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none`} />


            {/* Content Container */}
            <div className="container mx-auto px-6 relative z-10">
                {/* Header similar to MainEvents */}
                <div className="flex justify-between items-end mb-12 px-2 md:px-0">
                    <div>
                        <p className="text-4xl font-black text-slate-600 italic tracking-tighter uppercase">
                            Il <span className={`text-${theme.primary}`}>Team</span>
                        </p>
                    </div>
                    <div className="hidden md:block h-[2px] flex-grow mx-8 bg-slate-200 mb-3" />
                    {!showAll && hasMore && (
                        <AnimatedLink to={`/${config.slug.current}/athletes`}>
                            <button
                                className={`hidden md:flex items-center gap-2 text-${theme.primary} font-bold hover:opacity-80 transition-opacity`}
                            >
                                VEDI TUTTI <Plus size={20} />
                            </button>
                        </AnimatedLink>
                    )}
                </div>

                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12 md:gap-y-16'>
                    {displayedAthletes.map((athlete) => (
                        <div key={athlete.id} className='group relative flex flex-col items-center'>

                            {/* Image Container with "Square Line" Effect */}
                            <div className="relative w-full aspect-[4/5] mb-4">

                                {/* The "Square Line" Offset Border - Front (Optional, strictly one line requested, choosing offset behind for depth) */}
                                {/* Let's try an outline that goes OVER the image size as requested "go over" */}

                                <div className={`relative w-full h-full overflow-hidden ${theme.primary} filter grayscale-[100%] group-hover:grayscale-0 transition-all duration-500`}>
                                    <img
                                        className='w-full h-full object-cover rounded-[0.25rem] transform w-full h-full object-center transition-transform duration-700 group-hover:scale-110'
                                        src={athlete.imageUrl}
                                        alt={athlete.name}
                                        loading="lazy"
                                    />
                                </div>

                                {/* Corner Accent - Top Right */}
                                <div className={`absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-${theme.primary} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                {/* Corner Accent - Bottom Left */}
                                <div className={`absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-${theme.primary} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                            </div>

                            {/* Name Info */}
                            <div className="text-center z-10 w-full px-2">
                                <p className="font-semibold text-slate-600 uppercase tracking-tight truncate">
                                    {athlete.name}
                                </p>
                                {athlete.role && (
                                    <p className={`text-sm font-semibold text-${theme.primary} uppercase tracking-widest mt-1`}>
                                        {athlete.role}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile "Show More" Button */}
                {!showAll && hasMore && (
                    <div className="mt-12 flex justify-center md:hidden">
                        <AnimatedLink to={`/${config.slug.current}/athletes`}>
                            <button
                                className={`px-8 py-3 bg-slate-900 text-white font-bold uppercase tracking-widest text-sm rounded-none border border-slate-900 hover:bg-transparent hover:text-slate-900 transition-all`}
                            >
                                Scopri tutto il team
                            </button>
                        </AnimatedLink>
                    </div>
                )}
            </div>

        </section>
    );
};