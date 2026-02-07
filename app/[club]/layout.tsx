import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { getClubContent } from '../../services/sanityService';
import { notFound } from 'next/navigation';
import { ClubType } from '../../types';

export default async function ClubLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ club: string }>;
}) {
    const { club } = await params;
    const activeClub = (club === 'ros6team' || club === 'alba13') ? club as ClubType : 'alba13' as ClubType;

    const clubData = await getClubContent(activeClub);
    if (!clubData) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
