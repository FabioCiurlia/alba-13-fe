import React, { useState, useEffect } from 'react';
import { ClubType } from '../types';
import { findCompetitions, Competition, getStartAndEndOfMonth } from '../services/competitionService';
import { Calendar, MapPin, ArrowRight, Trophy } from 'lucide-react';
import { AnimatedLink } from './AnimatedLink';

interface CompetitionsSectionProps {
    activeClub: ClubType;
}

export const CompetitionsSection: React.FC<CompetitionsSectionProps> = ({ activeClub }) => {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [loading, setLoading] = useState(true);

    const isAlba = activeClub === 'alba13';

    // Theme colors
    const sectionBg = isAlba ? 'bg-slate-50' : 'bg-neutral-50';
    const subHeaderColor = isAlba ? 'text-cyan-600' : 'text-yellow-600';
    const cardBg = isAlba ? 'bg-white text-slate-900 border-slate-100' : 'bg-white text-neutral-900 border-neutral-100';
    const accentColor = isAlba ? 'text-cyan-600' : 'text-yellow-600';
    const accentBg = isAlba ? 'bg-cyan-100' : 'bg-yellow-100';

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

    // Don't render section if no events (optional choice, but usually better to show "No events" or hide? 
    // User asked to "show upcoming competitions", maybe if 0 we can show empty state or hide.
    // Let's show empty state or just a few if exist.
    if (!loading && competitions.length === 0) return null;

    return (
        <section className={`py-12 ${sectionBg} border-t ${isAlba ? 'border-slate-200' : 'border-neutral-200'}`}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                    <div>
                        <span className={`text-xs font-bold tracking-[0.2em] uppercase ${subHeaderColor}`}>
                            Prossimi Appuntamenti
                        </span>
                        <h2 className={`text-4xl font-bold mt-2 ${isAlba ? 'text-slate-900' : 'text-neutral-900'}`}>
                            Gare in Puglia
                        </h2>
                        <p className="opacity-60 mt-2">Competizioni in programma questo mese nella nostra regione</p>
                    </div>
                    <AnimatedLink to="/calendar" className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors ${isAlba ? 'hover:text-cyan-600' : 'hover:text-yellow-600'}`}>
                        Vedi Calendario Completo <ArrowRight size={16} />
                    </AnimatedLink>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {competitions.slice(0, 4).map((comp) => (
                        <div key={comp.id} className={`group rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all ${cardBg}`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-2 rounded-lg ${accentBg} ${accentColor}`}>
                                    <Trophy size={20} />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider opacity-50 bg-black/5 px-2 py-1 rounded">
                                    {comp.type}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold mb-1 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                                {comp.name}
                            </h3>
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
                    <AnimatedLink to="/calendar" className={`flex w-full items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm bg-white border ${isAlba ? 'text-cyan-700 border-slate-200' : 'text-yellow-700 border-neutral-200'}`}>
                        Vedi Calendario Completo <ArrowRight size={16} />
                    </AnimatedLink>
                </div>
            </div>
        </section>
    );
};
