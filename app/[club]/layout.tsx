"use client";

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ClubProvider } from '../../components/ClubProvider';

export default async function ClubLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ club: string }>;
}) {
    const { club } = await params;
    const activeClub = (club === 'ros6team' || club === 'alba13') ? club : 'alba13';

    return (
        <ClubProvider initialClub={activeClub}>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                {children}
                <Footer activeClub={activeClub} />
            </div>
        </ClubProvider>
    );
}
