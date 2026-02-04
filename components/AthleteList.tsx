import React from 'react';
import { Athlete, ClubType } from '../types';
import { ArrowRight } from 'lucide-react';
import { AnimatedLink } from './AnimatedLink';

interface AthleteListProps {
    athletes: Athlete[];
    activeClub: ClubType;
    isAlba: boolean;
}

export const AthleteList: React.FC<AthleteListProps> = ({ athletes, activeClub, isAlba }) => {
    const accentColor = isAlba ? 'text-cyan-600' : 'text-yellow-600';

    if (!athletes || athletes.length === 0) return null;

    return (
        <div className='container mx-auto px-6'>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 pt-12 border-t border-slate-200">
                <div>
                    <span className={`text-xs font-bold tracking-[0.2em] uppercase ${accentColor} mb-2 block transition-colors duration-500`}>
                        Il Team
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                        Gli Atleti di {isAlba ? 'Alba 13' : 'Ros6Team'}
                    </h2>
                </div>

                <AnimatedLink
                    to={`/${activeClub}/athletes`}
                    className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors ${isAlba ? 'hover:text-cyan-600' : 'hover:text-yellow-600'}`}
                >
                    Vedi Tutti <ArrowRight size={16} />
                </AnimatedLink>
            </div>

            {/* Horizontal Scroll Carousel */}
            <div className="flex overflow-x-auto gap-6 pb-12 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory pt-4">
                {athletes.map((athlete) => (
                    <div
                        key={athlete.id}
                        className="flex-shrink-0 w-[280px] sm:w-[340px] h-[480px] group relative overflow-hidden rounded-[2rem] bg-gray-200 snap-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    >
                        {/* Image & Gradient Overlay */}
                        <img
                            src={athlete.imageUrl}
                            alt={athlete.name}
                            className={`
                w-full h-full object-cover transition-transform duration-700 ease-out 
                group-hover:scale-110
                ${isAlba ? 'grayscale-[20%] group-hover:grayscale-0' : 'sepia-[20%] group-hover:sepia-0'}
              `}
                        />

                        {/* Modern Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                        <div className={`absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t ${isAlba ? 'from-cyan-900/80' : 'from-yellow-900/80'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 p-8 w-full z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            <div className={`inline-block px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white mb-3 shadow-sm`}>
                                {athlete.category}
                            </div>

                            <h3 className="text-3xl font-black text-white leading-none mb-2 drop-shadow-md">
                                {athlete.name}
                            </h3>

                            {athlete.role && (
                                <div className="text-sm font-medium text-white/80 flex items-center gap-2">
                                    <span className={`w-1.5 h-1.5 rounded-full ${isAlba ? 'bg-cyan-400' : 'bg-yellow-400'}`}></span>
                                    {athlete.role}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Action Button */}
            <div className="mt-4 md:hidden flex justify-center">
                <AnimatedLink
                    to={`/${activeClub}/athletes`}
                    className={`flex w-full items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm bg-white border border-slate-200 shadow-sm ${isAlba ? 'text-cyan-700' : 'text-yellow-700'}`}
                >
                    Vedi Tutti <ArrowRight size={20} />
                </AnimatedLink>
            </div>
        </div>
    );
};
