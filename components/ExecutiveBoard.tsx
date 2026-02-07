import React from 'react';
import { ClubConfig } from '../types';
import { getThemeBySlug } from '@/utils/theme';
import { User, Shield, Star, Award, Users } from 'lucide-react';

interface ExecutiveBoardProps {
    config: ClubConfig;
}

const MEMBERS = [
    {
        name: 'Mario Rossi',
        role: 'Presidente',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=500&auto=format&fit=crop',
        icon: <Shield size={18} />
    },
    {
        name: 'Chiara Bianchi',
        role: 'Vice Presidente',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=500&auto=format&fit=crop',
        icon: <Star size={18} />
    },
    {
        name: 'Luca Neri',
        role: 'Segretario',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&auto=format&fit=crop',
        icon: <Award size={18} />
    },
    {
        name: 'Elena Verdi',
        role: 'Tesoriere',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=500&auto=format&fit=crop',
        icon: <Users size={18} />
    }
];

export const ExecutiveBoard: React.FC<ExecutiveBoardProps> = ({ config }) => {
    const theme = getThemeBySlug(config.slug.current);

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">

                <div className="flex flex-col items-center mb-16 text-center">
                    <div className="flex items-center gap-3 mb-4">
                        <span className={`h-px w-8 bg-${theme.primary}`}></span>
                        <span className={`text-xs font-bold tracking-[0.3em] uppercase text-slate-500`}>
                            La Nostra Guida
                        </span>
                        <span className={`h-px w-8 bg-${theme.primary}`}></span>
                    </div>
                    <h2 className={`text-4xl md:text-5xl font-black italic uppercase font-gopron ${theme.text} tracking-tight`}>
                        Consiglio Direttivo
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {MEMBERS.map((member, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col h-[450px] overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Background Image with Theme Filter */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${theme.cardFilter}`}
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity`} />
                            </div>

                            {/* Decorative Accent (using theme primary) */}
                            <div className={`absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white z-10 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                                <div className={`text-${theme.primary}`}>
                                    {member.icon}
                                </div>
                            </div>

                            {/* Info Overlay */}
                            <div className="mt-auto relative z-10 p-8">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-bold uppercase tracking-wider mb-3`}>
                                    <div className={`text-${theme.primary}`}>
                                        {member.icon}
                                    </div>
                                    {member.role}
                                </div>

                                <h4 className="text-2xl font-bold text-white mb-1 font-gopron italic tracking-wide group-hover:translate-x-1 transition-transform">
                                    {member.name}
                                </h4>

                                <div className={`h-1 w-0 group-hover:w-12 bg-${theme.primary} transition-all duration-500 rounded-full`} />
                            </div>

                            {/* Interactive Border Light */}
                            <div className={`absolute inset-0 border-2 border-transparent group-hover:border-${theme.primary}/30 rounded-[2rem] transition-colors pointer-events-none`} />
                        </div>
                    ))}
                </div>

                {/* Bottom CTA or Info */}
                <div className="mt-20 text-center">
                    <p className="text-slate-400 text-sm italic font-medium max-w-2xl mx-auto leading-relaxed">
                        "Lo sport non costruisce il carattere, lo rivela. Il nostro obiettivo è guidare ogni atleta verso la propria vetta."
                    </p>
                </div>
            </div>
        </section>
    );
};
