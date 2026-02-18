'use client';

import { useParams } from 'next/navigation';
import { getThemeBySlug } from '../utils/theme';
import logo from '@/utils/logo-alba13.svg';
import logoRos from '@/utils/logo-ros6.svg';
import logoSpartanKids from '@/utils/logo-spartan-kids.svg';

export const Footer: React.FC = () => {
  const params = useParams();
  const slug = params?.club as string || 'alba13';
  const config = getThemeBySlug(slug);

  return (
    <footer className={`text-md ${config.footer.bg} ${config.footer.text}
    `}>
      <div className="container mx-auto px-6 md:px-24 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-16">
          {/* Section 1: Brand & Info */}
          <div className="md:col-span-2 lg:col-span-6 space-y-6">

            <h4 className="font-bold text-3xl md:text-4xl leading-tight tracking-wide font-gopron">
              Asd Gruppo Podistico <br />
              Alba 13 Taurisano
            </h4>
            <div className="space-y-2">
              <p className={`text-md ${config.footer.text}`}>Registro al Coni e Fidal</p>
              <p className={`text-md ${config.footer.text}`}>Codice meccanografico LE346</p>
            </div>
            <div className='flex flex-row gap-4 justify-start items-center mt-[12px] group'>
              <img src={logo.src} alt="Logo" className='w-24 h-24 grayscale group-hover:grayscale-0 transition-all duration-500' />
              <img src={logoRos.src} alt="Logo" className='w-24 h-24 grayscale group-hover:grayscale-0 transition-all duration-500' />
              <img src={logoSpartanKids.src} alt="Logo" className='w-24 h-24 grayscale group-hover:grayscale-0 transition-all duration-500' />
            </div>
          </div>

          {/* Section 2: Contacts */}
          <div className="md:col-span-1 lg:col-span-3 space-y-6">
            <h6 className="font-bold text-xl relative inline-block tracking-wide font-gopron">
              Contatti
            </h6>
            <div className="flex flex-col gap-4">
              <a href="tel:+393807047447" className={`hover:text-white ${config.footer.text} transition-colors flex items-center gap-2`}>
                Telefono
              </a>
              <a href="mailto:gp.alba13taurisano@gmail.com" className={`hover:text-white ${config.footer.text} transition-colors flex items-center gap-2`}>
                Email
              </a>
              <a href="https://www.strava.com/clubs/1688974/members" target="_blank" rel="noopener noreferrer" className={`hover:text-white ${config.footer.text} transition-colors flex items-center gap-2`}>
                Strava Club
              </a>
            </div>
          </div>

          {/* Section 3: Navigation */}
          <div className="md:col-span-1 lg:col-span-3 space-y-6">
            <h6 className="font-bold text-xl relative inline-block tracking-wide font-gopron">
              I Nostri Eventi
            </h6>
            <div className="flex flex-col gap-4">
              <a href="/alba13/events/trail-del-crocefisso" className="hover:text-white transition-colors flex items-center gap-2">
                Trail del Crocefisso
              </a>
              <a href="/alba13/events/eco-race-spartan-kids" className="hover:text-white transition-colors flex items-center gap-2">
                Spartan Kids
              </a>
              <a href="/alba13/events/stra-taurisano" className="hover:text-white transition-colors flex items-center gap-2">
                StraTaurisano
              </a>
              <a href="/alba13/events/vertical-sprint" className="hover:text-white transition-colors flex items-center gap-2">
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