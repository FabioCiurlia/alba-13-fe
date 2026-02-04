'use client';

import React, { useState, useEffect } from 'react';
import { ClubType } from '@/types';
import { findCompetitions, Competition, getStartAndEndOfWeek, getStartAndEndOfMonth } from '@/services/competitionService';
import { Navbar } from './Navbar';
import { ArrowLeft, Calendar as CalendarIcon, MapPin, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ShareButton } from './ShareButton';
import Link from 'next/link';

interface CalendarContentProps {
    activeClub: ClubType;
}

const ITALIAN_REGIONS = [
    "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna",
    "Friuli-Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche",
    "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia", "Toscana",
    "Trentino-Alto Adige", "Umbria", "Valle d'Aosta", "Veneto"
];

const RUNNING_TYPES = [
    "CROSS", "INDOOR", "MARCIA SU STRADA", "MONTAGNA", "OUTDOOR",
    "RUNNING", "TRAIL", "ULTRAMARATONA"
];

export const CalendarContent: React.FC<CalendarContentProps> = ({ activeClub }) => {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month'>('month');

    const router = useRouter();
    const isAlba = activeClub === 'alba13';

    const themeColors = isAlba
        ? 'bg-slate-50 text-slate-900'
        : 'bg-neutral-50 text-neutral-900';
    const accentColor = isAlba ? 'text-cyan-600' : 'text-yellow-600';
    const cardBg = isAlba ? 'bg-slate-900 text-white' : 'bg-stone-900 text-white';

    useEffect(() => {
        const fetchCompetitions = async () => {
            setLoading(true);
            try {
                // Calculate dates based on filter
                let fromDate: string | undefined;
                let toDate: string | undefined;

                if (timeFilter === 'week') {
                    const { start, end } = getStartAndEndOfWeek();
                    fromDate = start;
                    toDate = end;
                } else if (timeFilter === 'month') {
                    const { start, end } = getStartAndEndOfMonth();
                    fromDate = start;
                    toDate = end;
                }

                const data = await findCompetitions(
                    selectedRegion || undefined,
                    fromDate,
                    toDate,
                    selectedType || undefined
                );
                setCompetitions(data || []);
            } catch (error) {
                console.error("Failed to load competitions", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompetitions();
    }, [selectedRegion, timeFilter, selectedType]);

    return (
        <div className={`min-h-screen ${themeColors}`}>
            <Navbar />

            {/* Fixed Sub-Navbar */}
            <div className={`fixed top-16 left-0 right-0 z-40 border-b backdrop-blur-md ${isAlba ? 'bg-slate-50/90 border-slate-200' : 'bg-neutral-50/90 border-neutral-200'}`}>
                <div className="container mx-auto px-6 h-16 flex items-center justify-between relative">
                    <Link
                        href={`/${activeClub}`}
                        className={`flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors ${accentColor}`}
                    >
                        <ArrowLeft size={24} />
                    </Link>

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold md:opacity-100 transition-opacity">
                        Calendario Gare
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 pt-40 pb-12">
                <div className="flex items-center gap-3 mb-8">
                    <div className={`p-3 rounded-full ${isAlba ? 'bg-cyan-100 text-cyan-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        <CalendarIcon size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl text-2xl font-bold">Calendario Gare</h1>
                        <p className="opacity-60 mt-1">Trova le prossime competizioni</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="sticky top-32 z-30 py-4 -mx-6 px-6 from-transparent via-current to-transparent backdrop-blur-sm mb-8 flex flex-col md:flex-row gap-4">
                    {/* Region Select */}
                    <div className="relative">
                        <select
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className={`appearance-none pl-4 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2 w-full ${isAlba ? 'bg-white border-slate-200 focus:ring-cyan-500' : 'bg-white border-neutral-200 focus:ring-yellow-500'}`}
                        >
                            <option value="">Tutte le Regioni</option>
                            {ITALIAN_REGIONS.map(region => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                        <MapPin size={16} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
                    </div>

                    {/* Type Select */}
                    <div className="relative">
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className={`appearance-none pl-4 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2 w-full ${isAlba ? 'bg-white border-slate-200 focus:ring-cyan-500' : 'bg-white border-neutral-200 focus:ring-yellow-500'}`}
                        >
                            <option value="">Tutte le tipologie</option>
                            {RUNNING_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <Trophy size={16} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
                    </div>

                    {/* Time Filters */}
                    <div className={`inline-flex rounded-lg p-1 border ${isAlba ? 'bg-slate-100 border-slate-200' : 'bg-neutral-100 border-neutral-200'}`}>
                        <button
                            onClick={() => setTimeFilter('week')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${timeFilter === 'week' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Questa Settimana
                        </button>
                        <button
                            onClick={() => setTimeFilter('month')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${timeFilter === 'month' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Questo Mese
                        </button>
                        <button
                            onClick={() => setTimeFilter('all')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${timeFilter === 'all' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Tutti
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                {loading ? (
                    <div className="text-center py-20 opacity-50">Caricamento competizioni...</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {competitions.map((comp) => (
                            <div key={comp.id} className={`group rounded-2xl overflow-hidden shadow-lg ${cardBg} hover:shadow-xl transition-all relative`}>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${isAlba ? 'bg-cyan-900/50 text-cyan-300' : 'bg-yellow-900/50 text-yellow-300'}`}>
                                            {comp.type || 'Gara'}
                                        </span>
                                        <span className="text-xs opacity-60 flex items-center gap-1">
                                            <MapPin size={12} />{comp.city ? (comp.city.charAt(0).toUpperCase() + comp.city.slice(1).toLowerCase()) : ''}, {comp.region}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors flex-1 pr-2">
                                            {comp.name}
                                        </h3>
                                        <ShareButton competition={comp} className={`p-2 rounded-full ${isAlba ? 'bg-slate-800 text-cyan-400 hover:bg-slate-700' : 'bg-stone-800 text-yellow-400 hover:bg-stone-700'}`} />
                                    </div>
                                    <h4 className="text-md mb-2 group-hover:text-cyan-400 transition-colors">
                                        {comp.subname}
                                    </h4>

                                    <div className="flex items-center gap-2 mb-4 opacity-80">
                                        <CalendarIcon size={16} />
                                        <span>{new Date(comp.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && competitions.length === 0 && (
                    <div className="text-center py-20 opacity-50 flex flex-col items-center">
                        <Trophy size={48} className="mb-4 opacity-20" />
                        <p>Nessuna competizione trovata per i filtri selezionati.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
