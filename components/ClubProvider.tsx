"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ClubType } from '../types';

interface ClubContextType {
    activeClub: ClubType;
    setActiveClub: (club: ClubType) => void;
}

const ClubContext = createContext<ClubContextType | undefined>(undefined);

export function ClubProvider({ children, initialClub = 'alba13' }: { children: React.ReactNode, initialClub?: ClubType }) {
    const pathname = usePathname();
    const router = useRouter();
    const [activeClub, setActiveClubState] = useState<ClubType>(initialClub);

    useEffect(() => {
        // Extract club from URL if present
        const pathSegments = pathname?.split('/').filter(Boolean);
        if (pathSegments && pathSegments.length > 0) {
            const firstSegment = pathSegments[0];
            if (firstSegment === 'alba13' || firstSegment === 'ros6team') {
                setActiveClubState(firstSegment as ClubType);
            }
        }
    }, [pathname]);

    const setActiveClub = (club: ClubType) => {
        setActiveClubState(club);
        // Calculate new path
        const pathSegments = pathname?.split('/').filter(Boolean) || [];
        if (pathSegments.length > 0 && (pathSegments[0] === 'alba13' || pathSegments[0] === 'ros6team')) {
            pathSegments[0] = club;
            router.push(`/${pathSegments.join('/')}`);
        } else {
            router.push(`/${club}`);
        }
    };

    return (
        <ClubContext.Provider value={{ activeClub, setActiveClub }}>
            {children}
        </ClubContext.Provider>
    );
}

export const useClub = () => {
    const context = useContext(ClubContext);
    if (context === undefined) {
        throw new Error('useClub must be used within a ClubProvider');
    }
    return context;
};
