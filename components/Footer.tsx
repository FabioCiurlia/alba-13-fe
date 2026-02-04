import React from 'react';
import { ClubType } from '../types';

export const Footer: React.FC<{ activeClub: ClubType }> = ({ activeClub }) => {
  const isAlba = activeClub === 'alba13';

  return (
    <footer className={`
        text-sm
      ${isAlba ? 'bg-slate-900 text-slate-400' : 'bg-neutral-900 text-neutral-400'}
    `}>
      {/* Partner Logos Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 py-8">
          <h5 className="text-white font-bold text-center text-sm uppercase tracking-wider mb-6">I Nostri Partner</h5>
          <div className="flex flex-row items-center justify-center gap-8 md:gap-12">
            {/* Logo 1 */}
            <div className="flex-1 w-full flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/drxidw3hj/image/upload/t_qwebp/v1770211714/maggio-logo.webp"
                alt="Partner Logo 1"
                className="max-h-24 md:max-h-30 w-full object-contain opacity-100 transition-opacity hover:scale-105 transition-transform"
              />
            </div>

            {/* Logo 2 */}
            <div className="flex-1 w-full flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/drxidw3hj/image/upload/t_qwebp/v1770211721/scarlino-logo.webp"
                alt="Partner Logo 2"
                className="max-h-24 md:max-h-30 w-full object-contain opacity-100 transition-opacity hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex md:flex-row md:gap-12 flex-col gap-8 p-4">
          <div className="basis-3/4">
            <h4 className="text-white font-bold md:text-lg text-2xl mb-2">Asd Gruppo Podistico Alba 13 Taurisano</h4>
            <h5 className="text-white mb-2">Registro al Coni e Fidal</h5>
            <h5 className="text-white mb-2">Codice meccanografico LE346</h5>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-8 text-white hover:text-white/80 transition-colors uppercase text-xs font-bold tracking-wider border border-white/20 px-4 py-2 rounded-full hover:bg-white/10"
            >
              Torna Su
            </button>

          </div>
          <div className="basis-1/4 flex flex-col">
            <h6 className="text-white font-bold md:text-lg text-xl mb-2">Contatti</h6>
            <div className="mt-4">
              <div className="flex flex-col gap-2 mb-2">
                <a href="tel:+393807047447" className="hover:text-white transition-colors">Telefono</a>
                <a href="mailto:gp.alba13taurisano@gmail.com" className="hover:text-white transition-colors">Email</a>
                <a href="https://www.strava.com/clubs/1688974/members" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Il Nostro Club Strava</a>
              </div>
            </div>
          </div>
          <div className="basis-1/4 flex flex-col">
            <h6 className="text-white font-bold md:text-lg text-xl mb-2">Contenuti</h6>
            <div className="mt-4">
              <div className="flex flex-col gap-2 mb-2">
                <a href="#" className="hover:text-white transition-colors">Home</a>
                <a href="#" className="hover:text-white transition-colors">Atleti</a>
                <a href="#" className="hover:text-white transition-colors">News & Eventi</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`text-sm text-center p-3 ${isAlba ? 'bg-cyan-600' : 'bg-yellow-600'} text-white`}>
        &copy; {new Date().getFullYear()} Asd Gruppo Podistico Alba 13 Taurisano Alba
      </div>
    </footer>
  );
};