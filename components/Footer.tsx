import React from 'react';
import { ClubType } from '../types';

export const Footer: React.FC<{ activeClub: ClubType }> = ({ activeClub }) => {
  const isAlba = activeClub === 'alba13';

  return (
    <footer className={`
        text-sm
      ${isAlba ? 'bg-slate-900 text-slate-400' : 'bg-neutral-900 text-neutral-400'}
    `}>
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-row p-4">
          <div className="basis-3/4">
            <h4 className="text-white font-bold text-lg mb-2">Alba 13 & Ros6Team</h4>
            <p className="w-3/5">Qualcosa su i due team</p>

            <div className="mt-8">
              <div className="flex gap-2 mb-8">
                <a href="https://www.strava.com/clubs/1688974/members" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Strava</a>
                <a href="mailto:gp.alba13taurisano@gmail.com" className="hover:text-white transition-colors">Email</a>
              </div>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-white hover:text-white/80 transition-colors uppercase text-xs font-bold tracking-wider border border-white/20 px-4 py-2 rounded-full hover:bg-white/10"
            >
              Torna Su
            </button>

          </div>
          <div className="basis-1/4 flex flex-col">
            <h6 className="text-white font-bold text-lg mb-2">Site Map</h6>
            <div className="mt-4">
              <div className="flex flex-col gap-2 mb-2">
                <a href="#" className="hover:text-white transition-colors">Home</a>
                <a href="#" className="hover:text-white transition-colors">About</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`text-sm text-center p-3 ${isAlba ? 'bg-cyan-600' : 'bg-yellow-600'} text-white`}>
        &copy; {new Date().getFullYear()} Alba 13 & Ros6Team
      </div>
    </footer>
  );
};