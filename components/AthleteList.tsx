import { Athlete, ClubConfig } from '../types';
import { ArrowRight } from 'lucide-react';
import { AnimatedLink } from './AnimatedLink';
import { getThemeBySlug } from '@/utils/theme';
import defaultImage from '@/utils/default-user.avif'

interface AthleteListProps {
    athletes: Athlete[];
    config: ClubConfig;
}

export const AthleteList: React.FC<AthleteListProps> = ({ athletes, config }) => {
    if (!athletes || athletes.length === 0) return null;

    const theme = getThemeBySlug(config.slug.current);
    const accentColor = `text-${theme.primary}`;

    return (
        <div className={`container mx-auto px-6`}>
            {/* Section Header */}
            <div className="flex justify-between items-end mb-1 px-2 md:px-0">
                <div className="hidden md:block h-[2px] flex-grow mx-8 bg-slate-200 mb-3" />
                <div>
                    <p className="text-4xl font-black text-slate-900 italic tracking-tighter uppercase">Gli Atleti di <span className="text-cyan-600">Alba 13</span></p>
                </div>
            </div>
            <div className='flex justify-end mb-6'>
                <AnimatedLink
                    to={`/${config.slug.current}/athletes`}
                    className={`hidden md:flex items-center gap-2 text-lg font-semibold transition-colors hover:text-${theme.primary}`}
                >
                    Vedi Tutti <ArrowRight size={16} />
                </AnimatedLink>
            </div>


            {/* Horizontal Scroll Carousel */}
            <div className="flex overflow-x-auto gap-2 pb-12 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory pt-4">
                {athletes.map((athlete) => (
                    <div
                        key={athlete.id}
                        className="flex-shrink-0 w-[300px] sm:w-[250px] h-[400px] group relative overflow-hidden rounded-[0.5rem] bg-gray-200 snap-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    >
                        {/* Image & Gradient Overlay */}
                        <img
                            src={athlete.imageUrl || defaultImage.src}
                            alt={athlete.name}
                            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${theme.cardFilter}`}
                        />

                        {/* Modern Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                        <div className={`absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t ${theme.cardOverlay} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 p-8 w-full z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            {athlete.category && <div className={`inline-block px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white mb-3 shadow-sm`}>
                                {athlete.category}
                            </div>}

                            <h3 className="text-3xl font-black text-white leading-none mb-2 drop-shadow-md">
                                {athlete.name}
                            </h3>

                            {athlete.role && (
                                <div className="text-sm font-medium text-white flex items-center gap-2">
                                    <span className={`w-2.5 h-2.5 rounded-full bg-${theme.primary}`}></span>
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
                    to={`/${config.slug.current}/athletes`}
                    className={`flex w-full items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm bg-white border border-slate-200 shadow-sm text-${theme.primary}`}
                >
                    Vedi Tutti <ArrowRight size={20} />
                </AnimatedLink>
            </div>
        </div>
    );
};
