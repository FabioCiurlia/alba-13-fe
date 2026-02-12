"use client";

import React from 'react';
import { ChevronRight, MapPin, Zap } from 'lucide-react';
import { BlogPost } from '@/types';
import { FIXED_EVENTS } from '@/data/events';
import { AnimatedLink } from './AnimatedLink';
// --- Improved Event Card ---
const EventCard = ({ event, isActive = false }: { event: Partial<BlogPost>, isActive?: boolean }) => {
    return (
        <AnimatedLink to={event.link}>
            <div className={`group relative flex-shrink-0 w-[85vw] md:w-full h-[70vh] md:h-[500px] snap-center overflow-hidden rounded-[2rem] bg-slate-900 transition-all duration-500 ${isActive ? 'ring-2 ring-cyan-500 md:ring-0' : ''}`}>

                {/* Background Image with requested Grayscale filter */}
                <div className="absolute inset-0">
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className={`h-full w-full object-cover transition-all duration-700 ${isActive ? 'grayscale-0 md:grayscale-[20%] md:group-hover:grayscale-0 scale-105 md:scale-100 md:group-hover:scale-105' : 'grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105'}`}
                    />
                    {/* Gradient Overlay: Using your 'cardOverlay' cyan-900/80 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent " />
                    <div className={`absolute inset-0 bg-cyan-900/40 transition-opacity duration-500 ${isActive ? 'opacity-100 md:opacity-0 md:group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </div>

                {/* Top Floating Badge */}
                <div className="absolute top-6 left-6">
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        {event.type}
                    </span>
                </div>

                {/* Content Area - More "Breathable" Spacing */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-6">

                    <div className="space-y-3">
                        {/* Title & Date */}
                        <div className="space-y-2">
                            <div className='flex flex-col gap-2'>
                                <span className={`text-sm tracking-widest uppercase transition-colors ${isActive ? 'text-white md:text-white/70 md:group-hover:text-white' : 'text-white/70 group-hover:text-white'}`}>
                                    {event.place}
                                </span>
                                <span className={`text-sm tracking-widest uppercase transition-colors ${isActive ? 'text-white md:text-white/70 md:group-hover:text-white' : 'text-white/70 group-hover:text-white'}`}>
                                    {event.date ? new Date(event.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Data da definire'}
                                </span>
                            </div>
                            <h3 className="text-3xl md:text-2xl font-black text-white leading-tight uppercase">
                                {event.title}
                            </h3>
                        </div>

                        {/* Simple Stats Row - Smooth Reveal */}
                        <div className={`grid transition-all duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100 pb-20' : 'grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100'}`}>
                            <div className="overflow-hidden">
                                <div className="flex flex-col gap-2">
                                    {event.bullet?.levelOne && event.bullet.levelOne.length > 0 && event.bullet.levelOne.map((bullet, index) => (
                                        <div key={index} className={`text-md leading-relaxed flex items-center gap-2 transition-all ${isActive ? 'text-white md:text-white/70 md:group-hover:text-white' : 'text-white/70 group-hover:text-white'}`}>
                                            {bullet}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Clean CTA */}
                        {event.enabled &&
                            <div className="flex flex-col justify-start">

                                <button className={`flex items-center gap-2 transition-all duration-500 font-bold ${isActive ? 'text-cyan-400 text-lg md:text-white md:text-base md:group-hover:text-cyan-400 md:group-hover:text-lg' : 'text-white group-hover:text-cyan-400 group-hover:text-lg'}`}>
                                    ISCRIVITI ORA
                                    <ChevronRight size={24} className={`transition-transform ${isActive ? 'translate-x-1 md:translate-x-0 md:group-hover:translate-x-1' : 'group-hover:translate-x-1'}`} />
                                </button>
                                <span className="text-sm font-bold text-white/70 group-hover:text-green-400 transition-all duration-500">Iscrizioni Aperte</span>
                            </div>}
                        {!event.enabled && <div className="flex flex-col justify-start"><button className={`flex items-center gap-2 transition-all duration-500 font-bold ${isActive ? 'text-cyan-400 text-lg md:text-white md:text-base md:group-hover:text-cyan-400 md:group-hover:text-lg' : 'text-white group-hover:text-cyan-400 group-hover:text-lg'}`}>
                            SCOPRI L'EVENTO
                            <ChevronRight size={24} className={`transition-transform ${isActive ? 'translate-x-1 md:translate-x-0 md:group-hover:translate-x-1' : 'group-hover:translate-x-1'}`} />
                        </button><span className="text-sm font-bold text-white/70 group-hover:text-red-400 transition-all duration-500">Iscrizioni Chiuse</span></div>}
                    </div>
                </div>
            </div>
        </AnimatedLink>
    );
};

// --- Main Section with Horizontal Scroll ---
export default function MainEvents({ events, theme }: { events: Partial<BlogPost>[], theme: any }) {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setActiveIndex(0);
        }
    }, []);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, offsetWidth } = scrollRef.current;
            const containerWidth = scrollRef.current.scrollWidth;
            const cardWidth = scrollRef.current.querySelector('div')?.offsetWidth || (offsetWidth * 0.85);
            const gap = 24; // gap-6 is 1.5rem = 24px

            // Calculate index precisely
            const index = Math.round(scrollLeft / (cardWidth + gap));
            console.log(index);
            if (index !== activeIndex) {
                setActiveIndex(index);
            }
        }
    };

    return (
        <section className="bg-gradient-to-b from-slate-50 to-slate-200 py-6 px-4 md:px-6 selection:bg-cyan-100 selection:text-cyan-900 md:h-[60vh]">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="flex justify-between items-end mb-6 px-2 md:px-0">
                    <div>
                        <p className="text-4xl font-black text-slate-900 italic tracking-tighter uppercase">I Nostri <span className="text-cyan-600">eventi</span></p>
                    </div>
                    <div className="hidden md:block h-[2px] flex-grow mx-8 bg-slate-200 mb-3" />
                </div>

                {/* SCROLL CONTAINER 
          Mobile: Horizontal flex with snapping
          Desktop: Standard Grid
        */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="
          flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 no-scrollbar
          md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0
        ">
                    {FIXED_EVENTS.map((event, idx) => (
                        <EventCard key={event.id} event={event} isActive={activeIndex === idx} />
                    ))}
                </div>

                {/* Pagination Dots - Mobile Only (Optional, added for feedback) */}
                <div className="flex justify-center gap-2 mt-2 md:hidden">
                    {FIXED_EVENTS.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-6 bg-cyan-600' : 'w-2 bg-slate-300'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
