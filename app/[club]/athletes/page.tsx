import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getClubContent } from '@/services/sanityService';
import { ClubType, Athlete } from '@/types';
import { Navbar } from '@/components/Navbar';
import { ArrowLeft, Users } from 'lucide-react';
import { getThemeBySlug } from '@/utils/theme';
import { AthleteSection } from '@/components/AthleteSection';

const VALID_CLUBS = ['alba13', 'ros6team'];

export default async function AthletesPage({ params }: { params: Promise<{ club: string }> }) {
    const { club } = await params;

    if (!VALID_CLUBS.includes(club)) {
        notFound();
    }

    const activeClub = club as ClubType;
    const content = await getClubContent(activeClub);
    if (!content) {
        notFound();
    }


    const athletes = content.athletes || [];
    const config = content.config;

    const theme = getThemeBySlug(config.slug.current);
    const accentColor = `text-${theme.primary}`;

    // Group athletes by category
    const groupedAthletes = athletes.reduce((acc, athlete) => {
        const category = athlete.category || 'Other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(athlete);
        return acc;
    }, {} as Record<string, Athlete[]>);

    return (
        <div className={`min-h-screen ${theme.bg}`}>
            <Navbar />

            {/* Fixed Sub-Navbar */}
            <div className={`fixed top-16 left-0 right-0 z-40 border-b backdrop-blur-md ${theme.bg}/90 border-slate-200`}>
                <div className="container mx-auto px-6 h-16 flex items-center justify-between relative">
                    <Link
                        href={`/${activeClub}`}
                        className={`flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors ${accentColor}`}
                    >
                        <ArrowLeft size={24} />
                    </Link>

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold md:opacity-100 transition-opacity">
                        Il Team Completo
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 pt-40 pb-12">

                <AthleteSection athletes={athletes} config={config} />

                {athletes.length === 0 && (
                    <div className="text-center py-20 opacity-50">
                        Nessun atleta trovato.
                    </div>
                )}
            </div>
        </div>
    );
}
