import React from 'react';
import { Athlete, ClubType, AboutData } from '../types';
import { Trophy, ArrowUpRight, ArrowRight, Quote, Activity } from 'lucide-react';
import { AnimatedLink } from './AnimatedLink';

interface AthleteSectionProps {
  athletes?: Athlete[];
  aboutData?: AboutData;
  activeClub: ClubType;
}

export const AthleteSection: React.FC<AthleteSectionProps> = ({ athletes, aboutData, activeClub }) => {
  const isAlba = activeClub === 'alba13';

  // Colors & Styles
  const accentColor = isAlba ? 'text-cyan-600' : 'text-yellow-600';
  const ambientGradient = isAlba
    ? 'from-cyan-100/50 via-cyan-50/30 to-transparent'
    : 'from-yellow-100/50 via-yellow-50/30 to-transparent';

  if ((!athletes || athletes.length === 0) && !aboutData) return null;

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">

      {/* --- BACKGROUND TEXTURE & AMBIENT GLOWS --- */}
      <div className="absolute inset-0 bg-slate-50 z-0">
        {/* Subtle Dot Pattern Texture */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Ambient Color Blobs */}
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b ${ambientGradient} rounded-full blur-3xl opacity-60 transform translate-x-1/3 -translate-y-1/4 pointer-events-none`} />
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t ${ambientGradient} rounded-full blur-3xl opacity-40 transform -translate-x-1/3 translate-y-1/4 pointer-events-none`} />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* --- MERGED ABOUT SECTION --- */}
        {aboutData && (
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24 md:mb-40">

            {/* Image Composition */}
            <div className="order-2 md:order-1 relative group">
              <div className={`absolute -inset-4 rounded-[2rem] opacity-20 transform -rotate-3 transition-transform group-hover:-rotate-2 duration-700 ${isAlba ? 'bg-cyan-600' : 'bg-yellow-600'}`} />
              <div className={`absolute -inset-4 rounded-[2rem] opacity-20 transform rotate-2 transition-transform group-hover:rotate-1 duration-700 ${isAlba ? 'bg-slate-800' : 'bg-slate-800'}`} />

              <img
                src={aboutData.imageUrl}
                alt="Club Activity"
                className="relative rounded-2xl shadow-2xl w-full object-cover h-[450px] md:h-[550px]"
              />

              {/* Decorative Badge */}
              <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full ${isAlba ? 'bg-cyan-500' : 'bg-yellow-500'} flex items-center justify-center text-white shadow-lg animate-bounce-slow`}>
                <Quote size={32} fill="currentColor" className="text-white/90" />
              </div>
            </div>

            {/* Text Content */}
            <div className="order-1 md:order-2 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`h-px w-8 ${isAlba ? 'bg-cyan-600' : 'bg-yellow-600'}`}></span>
                  <span className={`text-sm font-bold tracking-widest uppercase ${accentColor}`}>
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

              {/* Stats or subtle extra details could go here */}
              <div className="flex gap-8 pt-4">
                <div>
                  <span className={`block text-3xl font-bold ${isAlba ? 'text-cyan-900' : 'text-yellow-900'}`}>{athletes?.length || 0}+</span>
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Athletes</span>
                </div>
                <div>
                  <span className={`block text-3xl font-bold ${isAlba ? 'text-cyan-900' : 'text-yellow-900'}`}>100%</span>
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
        )}


        {/* --- ATHLETE CAROUSEL --- */}
        {athletes && athletes.length > 0 && (
          <>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 pt-12">
              <div>
                <span className={`text-xs font-bold tracking-[0.2em] uppercase ${accentColor} mb-2 block`}>
                  Il Team
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                  Gli Atleti di {isAlba ? 'Alba 13' : 'Ros6Team'}
                </h2>
              </div>

              <AnimatedLink to="/athletes" className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors ${isAlba ? 'hover:text-cyan-600' : 'hover:text-yellow-600'}`}>
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

              <AnimatedLink to="/athletes" className={`flex w-full items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm bg-white border border-slate-200 shadow-sm ${isAlba ? 'text-cyan-700' : 'text-yellow-700'}`}>
                Vedi Tutti <ArrowRight size={20} />
              </AnimatedLink>
            </div>
          </>
        )}
      </div>
    </section>
  );
}