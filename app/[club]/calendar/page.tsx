import React from 'react';
import { notFound } from 'next/navigation';
import { ClubType } from '@/types';
import { CalendarContent } from '@/components/CalendarContent';

const VALID_CLUBS = ['alba13', 'ros6team'];

export default async function CalendarPage({ params }: { params: Promise<{ club: string }> }) {
    const { club } = await params;

    if (!VALID_CLUBS.includes(club)) {
        notFound();
    }

    const activeClub = club as ClubType;

    return (
        <CalendarContent activeClub={activeClub} />
    );
}
