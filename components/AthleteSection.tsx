"use client";
import { Athlete, ClubConfig } from '../types';
import { ArrowRight, Plus } from 'lucide-react';
import { AnimatedLink } from './AnimatedLink';
import { getThemeBySlug } from '@/utils/theme';
import { useState } from 'react';
import defaultImage from '@/utils/default-user.avif';

interface AthleteSectionProps {
    athletes: Athlete[];
    config: ClubConfig;
    visible: boolean;
}

const AthleteCard = ({ athlete, visible }: { athlete: Athlete, visible: boolean }) => {
    return (
        <div className="group relative flex flex-col cursor-pointer">
            {/* Square Image Wrapper */}
            <div className="relative sm:p-0 md:p-2 aspect-square overflow-hidden bg-white">
                <span className=" absolute inset-0 border border-dashed border-cyan-400/30 group-hover:border-cyan-400/60 z-10 transition-colors duration-300"></span>
                <img
                    src={athlete.imageUrl || defaultImage.src}
                    alt={athlete.name}
                    className={`h-full w-full object-cover transition-all duration-700 ${visible ? 'grayscale group-hover:grayscale-0 group-hover:scale-110' : ''} `}
                />
                {/* Subtle Overlay on Hover */}
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Text Content */}
            <div className="mt-4 space-y-1">
                <h4 className="text-lg font-semibold text-slate-900 uppercase tracking-tight group-hover:text-cyan-600 transition-colors duration-300">
                    {athlete.name}
                </h4>
                {athlete.role && <div className="inline-block px-2 py-0.5 bg-slate-200  group-hover:bg-cyan-100 transition-colors duration-300">
                    <p className="text-sm font-bold text-slate-500 group-hover:text-cyan-700 uppercase tracking-widest">
                        {athlete.role}
                    </p>
                </div>}
            </div>
        </div>
    );
};

const ViewMoreCard = ({ slug, visible }: { slug: string, visible: boolean }) => {
    return (
        visible && <AnimatedLink to={`/${slug}/athletes`}>
            <div className="group relative flex flex-col cursor-pointer h-full">
                {/* Square Wrapper */}
                <div className="relative aspect-square overflow-hidden rounded-sm bg-slate-900 flex flex-col items-center justify-center transition-all duration-500 hover:bg-slate-800">
                    <Plus className="text-white w-10 h-10 transition-transform duration-500 group-hover:scale-125" />
                    <span className="mt-2 text-white text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 opacity-100 transition-all duration-500 translate-y-2 translate-y-0">
                        Vedi Tutti
                    </span>
                </div>
            </div>
        </AnimatedLink>
    );
};

export const AthleteSection: React.FC<AthleteSectionProps> = ({ athletes, config, visible }) => {
    const [showAll, setShowAll] = useState(false);
    const theme = getThemeBySlug(config.slug.current);

    if (!athletes || athletes.length === 0) return null;

    const initialCount = 9;
    const displayedAthletes = !visible ? athletes : athletes.slice(0, initialCount);
    const hasMore = athletes.length > initialCount;

    return (
        <div className=''>
            {/* Content Container */}
            <div className="container mx-auto px-6 relative z-10">
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12 max-w-7xl mx-auto'>
                    {displayedAthletes.map((athlete) => (
                        <AthleteCard key={athlete.id} athlete={athlete} visible={visible} />
                    ))}
                    {hasMore && !showAll && <ViewMoreCard slug={config.slug.current} visible={visible} />}
                </div>
            </div>

        </div>
    );
};
