'use client';

import React, { useState, useEffect } from 'react';
import { findCompetitions, Competition, getStartAndEndOfMonth } from '../services/competitionService';
import { useParams } from 'next/navigation';
import { getThemeBySlug } from '../utils/theme';
import { Calendar, MapPin, ArrowRight, Trophy } from 'lucide-react';

import { AnimatedLink } from './AnimatedLink';
import { ShareButton } from './ShareButton';

interface CompetitionsSectionProps {
}

export const CompetitionsSection: React.FC<CompetitionsSectionProps> = () => {
    const params = useParams();
    const slug = params?.club as string || 'alba13';
    const theme = getThemeBySlug(slug);

    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [loading, setLoading] = useState(true);

    const isAlba = slug === 'alba13';

    // Theme colors
    const sectionBg = theme.bg;
    const subHeaderColor = `text-${theme.primary}`;
    const cardBg = `bg-white ${theme.text} border-slate-100`;
    const accentColor = `text-${theme.primary}`;
    const accentBg = `bg-${theme.light}`;

    useEffect(() => {
        const fetchPugliaEvents = async () => {
            setLoading(true);
            try {
                const { start, end } = getStartAndEndOfMonth();
                // Fetch Puglia events for this month
                const data = await findCompetitions('Puglia', start, end);
                setCompetitions(data || []);
            } catch (error) {
                console.error("Failed to load home competitions", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPugliaEvents();
    }, []);

    if (!loading && competitions.length === 0) return null;

    return (
        <section className={`py-12 ${sectionBg} border-t ${isAlba ? 'border-slate-200' : 'border-neutral-200'}`}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                    <div>
                        <span className={`text-xs font-bold tracking-[0.2em] uppercase ${subHeaderColor}`}>
                            Prossimi Appuntamenti
                        </span>
                        <h2 className={`text-4xl font-bold mt-2 ${theme.text}`}>
                            Gare in Puglia questo mese
                        </h2>
                    </div>
                    <AnimatedLink to={`/${slug}/calendar`} className={`hidden md:flex items-center gap-2 text-lg font-semibold transition-colors hover:text-${theme.primary}`}>
                        Vedi Calendario Completo <ArrowRight size={16} />
                    </AnimatedLink>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {competitions.map((comp) => (
                        <div key={comp.id} className={`group rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all ${cardBg}`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-2 rounded-lg ${accentBg} ${accentColor}`}>
                                    <Trophy size={20} />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider opacity-50 bg-black/5 px-2 py-1 rounded">
                                    {comp.type}
                                </span>
                            </div>

                            <div className="flex justify-between items-start">
                                <h3 className={`text-lg font-bold mb-1 line-clamp-2 hover:text-${theme.primary} transition-colors flex-1 pr-2`}>
                                    {comp.name}
                                </h3>
                            </div>
                            {comp.subname && (
                                <p className="text-sm opacity-60 mb-4 line-clamp-1">{comp.subname}</p>
                            )}

                            <div className="mt-auto space-y-2 text-sm opacity-80">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} />
                                    <span>{new Date(comp.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} />
                                    <span>{comp.city}, {comp.region}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 md:hidden">
                    <AnimatedLink to={`/${slug}/calendar`} className={`flex w-full items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm bg-white border text-${theme.primary} ${isAlba ? 'border-slate-200' : 'border-neutral-200'}`}>
                        Vedi Calendario Completo <ArrowRight size={16} />
                    </AnimatedLink>
                </div>
            </div>
        </section>
    );
};
