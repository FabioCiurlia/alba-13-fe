import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Twin Stride Clubs',
    description: 'Running Clubs Site',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="it">
            <body className="antialiased overflow-x-hidden">{children}</body>
        </html>
    );
}
