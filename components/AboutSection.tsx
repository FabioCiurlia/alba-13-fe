import React from 'react';
import { AboutData, ClubType } from '../types';

interface AboutSectionProps {
  data?: AboutData;
  activeClub: ClubType;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ data, activeClub }) => {
  if (!data) return null;
  const isAlba = activeClub === 'alba13';

  return (
    <section className="py-12 container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">

        <div className="order-2 md:order-1 relative">
          <div className={`absolute -inset-4 rounded-3xl opacity-20 transform -rotate-2 ${isAlba ? 'bg-cyan-600' : 'bg-yellow-600'}`} />
          <img
            src={data.imageUrl}
            alt="Running Club"
            className="relative rounded-2xl shadow-2xl w-full object-cover h-[500px]"
          />
        </div>

        <div className="order-1 md:order-2 space-y-8">
          <div>
            <span className={`text-sm font-bold tracking-wider uppercase ${isAlba ? 'text-cyan-600' : 'text-yellow-600'}`}>
              Who We Are
            </span>
            <h2 className="text-4xl font-bold mt-2 mb-6">{data.title}</h2>
            <p className="text-lg opacity-70 leading-relaxed">
              {data.description}
            </p>
          </div>


        </div>

      </div>
    </section>
  );
};