import React from 'react';
import { notFound } from 'next/navigation';
import { FIXED_EVENTS } from '@/data/events';
import { getThemeBySlug } from '@/utils/theme';
import { getClubContent } from '@/services/sanityService';
import { ClubType } from '@/types';
import { ChevronRight, Calendar, MapPin, Trophy, Award, Shirt, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function EventDetailPage({
    params,
}: {
    params: Promise<{ club: string; slug: string }>;
}) {
    const { club, slug } = await params;

    const event = FIXED_EVENTS.find((e) => e.slug?.current === slug);
    if (!event) {
        notFound();
    }

    const clubType = club as ClubType;
    const clubContent = await getClubContent(clubType);
    if (!clubContent) {
        notFound();
    }

    const theme = getThemeBySlug(clubContent.config.slug.current);

    return (
        <div className={`min-h-screen ${theme.bg}`}>

            {/* Immersive Hero Section */}
            <section className="container mx-auto mb-20 pt-[64px]">
                <div className="relative h-[40vh] md:h-[35vh] overflow-hidden group">
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                        <div className="max-w-4xl space-y-6">
                            <div className="flex flex-wrap gap-4">
                                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-[0.2em]">
                                    {event.type}
                                </span>
                                {event.distanza && (
                                    <span className="px-4 py-1.5 rounded-full bg-cyan-600/50 backdrop-blur-md border border-cyan-400/30 text-white text-xs font-black uppercase tracking-[0.2em]">
                                        {event.distanza}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-5xl md:text-8xl font-black text-white italic leading-[1.1] uppercase tracking-tighter">
                                {event.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-x-12 gap-y-4 pt-4">
                                <div className="flex items-center gap-3 text-white/80">
                                    <Calendar className="text-cyan-400" size={24} />
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Data</p>
                                        <p className="text-lg font-black uppercase">
                                            {event.date ? new Date(event.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Da definire'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-white/80">
                                    <MapPin className="text-cyan-400" size={24} />
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Location</p>
                                        <p className="text-lg font-black uppercase">{event.place}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                    {/* Left: Details */}
                    <div className="lg:col-span-12 space-y-16">

                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-[4px] bg-slate-900 rounded-full" />
                                <h3 className="text-2xl font-black uppercase italic tracking-tight">Informazioni</h3>
                            </div>
                            <article>
                                {event.description}
                            </article>
                        </div>



                        {/* Highlights Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                            {/* Bullet Section 1 */}
                            {event.bullet?.levelOne && event.bullet.levelOne.length > 0 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-[4px] bg-slate-900 rounded-full" />
                                        <h3 className="text-2xl font-black uppercase italic tracking-tight">Competizioni</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {event.bullet.levelOne.map((item, i) => (
                                            <li key={i} className="flex items-start gap-4 group">

                                                <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Bullet Section 2 */}
                            {event.bullet?.levelTwo && event.bullet.levelTwo.length > 0 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-[4px] bg-slate-900 rounded-full" />
                                        <h3 className="text-2xl font-black uppercase italic tracking-tight">Attività</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {event.bullet.levelTwo.map((item, i) => (
                                            <li key={i} className="flex items-start gap-4 group">
                                                <span className="text-slate-600 font-medium group-hover:text-slate-900 transition-colors">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Gadgets */}
                            {event.bullet?.gadget && event.bullet.gadget.length > 0 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-[4px] bg-slate-900 rounded-full" />
                                        <h3 className="text-2xl font-black uppercase italic tracking-tight">Pacco Gara</h3>
                                    </div>
                                    <div className="flex flex-col flex-wrap gap-3">
                                        {event.bullet.gadget.map((item, i) => (
                                            <div key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-xl flex items-center gap-2 group hover:border-rose-200 transition-all">
                                                <span className="text-sm font-bold uppercase tracking-tight text-slate-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <hr className="border-slate-200" />

                        {/* CTA / Registration */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12 p-12 rounded-[2rem] bg-slate-900 overflow-hidden relative group">
                            <div className="absolute inset-0 opacity-10 pointer-events-none">
                                <img src={event.imageUrl} className="w-full h-full object-cover scale-150 grayscale blur-xl" />
                            </div>

                            <div className="relative z-10 space-y-2 text-center md:text-left">
                                <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter">
                                    Sei pronto per la sfida?
                                </h3>
                                <p className="text-slate-400 font-medium max-w-md">
                                    Unisciti a noi per un'esperienza indimenticabile. Le iscrizioni sono aperte per un tempo limitato.
                                </p>
                            </div>

                            <div className="relative z-10 flex flex-col items-center gap-4">
                                {event.enabled ? (
                                    <>
                                        <a
                                            href={event.subscribeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-12 py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black uppercase tracking-widest rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-cyan-500/20"
                                        >
                                            Iscriviti Ora
                                        </a>
                                        <span className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest">
                                            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                                            Iscrizioni Aperte
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            disabled
                                            className="px-12 py-5 bg-slate-800 text-slate-500 font-black uppercase tracking-widest rounded-2xl cursor-not-allowed"
                                        >
                                            Iscrizioni Chiuse
                                        </button>
                                        <span className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest">
                                            Iscrizioni momentaneamente chiuse
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                        {/* Badges Section */}
                        {event.badges && event.badges.length > 0 && (
                            <div className="pt-8">
                                <p className="text-center text-[20px] uppercase font-light tracking-[0.3em] text-slate-400 mb-8">In Collaborazione Con</p>
                                <div className="flex flex-wrap justify-center items-start gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                                    {event.badges.map((badge, i) => (
                                        <img key={i} src={badge.image} alt={badge.description} className="h-32 w-auto object-contain" />
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </section>
        </div>
    );
}
