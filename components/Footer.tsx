'use client';

import { useParams } from 'next/navigation';
import { getThemeBySlug } from '../utils/theme';
import { AnimatedLink } from './AnimatedLink';

export const Footer: React.FC = () => {
  const params = useParams();
  const slug = params?.club as string || 'alba13';
  const config = getThemeBySlug(slug);

  return (
    <footer className={`
        text-md
      ${config.footer.bg} ${config.footer.text}
    `}>
      <div className="container mx-auto px-6 md:px-24 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-16">
          {/* Section 1: Brand & Info */}
          <div className="md:col-span-2 lg:col-span-6 space-y-6">
            <h4 className="text-white font-bold text-3xl md:text-4xl leading-tight tracking-wide font-gopron">
              Asd Gruppo Podistico <br />
              Alba 13 Taurisano
            </h4>
            <div className="space-y-1 text-slate-100 decoration-slate-400">
              <p className="text-md">Registro al Coni e Fidal</p>
              <p className="text-md">Codice meccanografico LE346</p>
            </div>
          </div>

          {/* Section 2: Contacts */}
          <div className="md:col-span-1 lg:col-span-3 space-y-6">
            <h6 className="text-white font-bold text-xl relative inline-block tracking-wide font-gopron">
              Contatti
            </h6>
            <div className="flex flex-col gap-4 text-slate-300">
              <a href="tel:+393807047447" className="hover:text-white transition-colors flex items-center gap-2">
                Telefono
              </a>
              <a href="mailto:gp.alba13taurisano@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
                Email
              </a>
              <a href="https://www.strava.com/clubs/1688974/members" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                Strava Club
              </a>
            </div>
          </div>

          {/* Section 3: Navigation */}
          <div className="md:col-span-1 lg:col-span-3 space-y-6">
            <h6 className="text-white font-bold text-xl relative inline-block tracking-wide font-gopron">
              I Nostri Eventi
            </h6>
            <div className="flex flex-col gap-4 text-slate-300">
              <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                Trail del Crocefisso
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                Spartan Kids
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                StraTaurisano
              </a>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                Vertical Sprint
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={`text-sm text-center p-3 bg-${config.primary} text-white`}>
        &copy; {new Date().getFullYear()} Asd Gruppo Podistico Alba 13 Taurisano
      </div>
    </footer>
  );
};