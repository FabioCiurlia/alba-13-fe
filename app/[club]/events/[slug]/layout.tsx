import React from 'react';
import { Navbar } from '../../../../components/Navbar';
import { Footer } from '../../../../components/Footer';

export default function EventDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            {children}
        </div>
    );
}
