import React from 'react';
import { ClubConfig } from '../types';
import { getThemeBySlug } from '@/utils/theme';

interface ClubGovernanceProps {
    config: ClubConfig;
}

export const ClubGovernance: React.FC<ClubGovernanceProps> = ({ config }) => {

    const theme = getThemeBySlug(config.slug.current);
    const accentColor = `text-${theme.primary}`;


    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Header Section */}
                <div className="flex flex-col items-center mb-16 relative">
                    <div className="absolute left-0 top-0 hidden lg:block">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400">
                            (( IL DIRETTIVO ))
                        </span>
                    </div>

                    <h2 className={`text-3xl md:text-5xl lg:text-6xl italic tracking-tight text-center max-w-5xl uppercase font-gopron ${theme.primary}`}>
                        IL DIRETTIVO DI {config.name}
                    </h2>
                </div>

                {/* Visual Grid Section */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 mb-16">

                    {/* Left Images */}
                    <div className="hidden lg:flex flex-col gap-16">
                        <div className="relative group">
                            <div className={`absolute -right-3 -bottom-3 w-full h-full bg-${theme.primary} rounded-[2rem] opacity-40 transition-transform group-hover:scale-105`} />
                            <div className="relative w-64 h-48 overflow-hidden rounded-[2rem] bg-slate-100 border-b-4 border-r-4 border-slate-200">
                                <img src="https://res.cloudinary.com/drxidw3hj/image/upload/v1770396936/eco-race-spartan-kids_lpoy0y.png" alt="Running" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="relative group">
                            <div className={`absolute -right-3 -bottom-3 w-full h-full bg-${theme.primary} rounded-[2rem] opacity-20 transition-transform group-hover:scale-105`} />
                            <div className="relative w-64 h-48 overflow-hidden rounded-[2rem] bg-slate-100 border-b-4 border-r-4 border-slate-200">
                                <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=600" alt="Team" className="w-full h-full object-cover grayscale" />
                            </div>
                        </div>
                    </div>

                    {/* Main Center Image */}
                    <div className="relative group mx-4 shrink-0">
                        <div className={`absolute -right-4 -bottom-4 w-full h-full bg-${theme.primary} rounded-[3rem] opacity-10 blur-xl transition-all group-hover:opacity-20`} />
                        <div className="relative w-full max-w-[350px] aspect-[3/4] overflow-hidden rounded-[3rem] shadow-2xl bg-slate-200">
                            <img
                                src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800"
                                alt="Mindful Running"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>

                    {/* Right Images */}
                    <div className="hidden lg:flex flex-col gap-16">
                        <div className="relative group">
                            <div className={`absolute -left-3 -bottom-3 w-full h-full bg-${theme.primary} rounded-[2rem] opacity-20 transition-transform group-hover:scale-105`} />
                            <div className="relative w-64 h-48 overflow-hidden rounded-[2rem] bg-slate-100 border-b-4 border-l-4 border-slate-200">
                                <img src="https://images.unsplash.com/photo-1502904550040-7534597429ae?q=80&w=600" alt="Race" className="w-full h-full object-cover grayscale" />
                            </div>
                        </div>
                        <div className="relative group">
                            <div className={`absolute -left-3 -bottom-3 w-full h-full bg-${theme.primary} rounded-[2rem] opacity-20 transition-transform group-hover:scale-105`} />
                            <div className="relative w-64 h-48 overflow-hidden rounded-[2rem] bg-slate-100 border-b-4 border-l-4 border-slate-200">
                                <img src="https://images.unsplash.com/photo-1452626038306-9aae0e07173a?q=80&w=600" alt="City Run" className="w-full h-full object-cover grayscale" />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Grid (Show only on smaller screens) */}
                    <div className="lg:hidden grid grid-cols-2 gap-4 mt-8 px-4 w-full max-w-2xl">
                        <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 grayscale"><img src="https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=600" className="w-full h-full object-cover" /></div>
                        <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 grayscale"><img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=600" className="w-full h-full object-cover" /></div>
                    </div>
                </div>

                {/* Text Section */}
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed">
                        We combine workouts with support for your mental <br className="hidden md:block" />
                        well-being and create a community where everyone <br className="hidden md:block" />
                        feels cared for, supported, and truly able to grow.
                    </p>

                    <div className="space-y-2">
                        <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
                            <span className="text-slate-900">We choose:</span> mindfulness / running workouts / community <br className="hidden md:block" />
                            support / mental health / daily energy
                        </p>
                    </div>

                    {/* Special Membership Button */}
                    <div className="pt-12 flex justify-center">
                        <button className="relative group py-6 px-16 rounded-full overflow-hidden transition-all active:scale-95">
                            {/* Concentric Borders Design */}
                            <div className="absolute inset-0 border border-slate-200 rounded-full" />
                            <div className="absolute inset-1 border border-slate-200 rounded-full" />
                            <div className="absolute inset-2 border border-slate-200 rounded-full" />

                            {/* Interactive Lime/Yellow Dots */}
                            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-${theme.primary} shadow-[0_0_10px_rgba(0,0,0,0.1)]`} />
                            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-${theme.primary} shadow-[0_0_10px_rgba(0,0,0,0.1)]`} />

                            <span className={`relative text-md font-black italic tracking-widest uppercase font-gopron ${theme.text}`}>
                                MEMBERSHIP
                            </span>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};
