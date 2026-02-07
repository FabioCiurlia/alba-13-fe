import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const gopron = localFont({
    src: '../utils/gopron.regular.otf',
    variable: '--font-gopron',
});

const krosur = localFont({
    src: '../utils/krosur.otf',
    variable: '--font-krosur',
});

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
        <html lang="it" className={`${gopron.variable} ${krosur.variable}`}>
            <body className="antialiased overflow-x-hidden font-sans">{children}</body>
        </html>
    );
}
