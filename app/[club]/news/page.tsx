import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getClubContent } from '@/services/sanityService';
import { ClubType } from '@/types';
import { Navbar } from '@/components/Navbar';
import { AnimatedLink } from '@/components/AnimatedLink';
import { formatDate } from '@/utils/dateUtils';
import { ArrowLeft, BookOpen } from 'lucide-react';

const VALID_CLUBS = ['alba13', 'ros6team'];

export default async function NewsPage({ params }: { params: Promise<{ club: string }> }) {
    const { club } = await params;

    if (!VALID_CLUBS.includes(club)) {
        notFound();
    }

    const activeClub = club as ClubType;
    const content = await getClubContent(activeClub);
    const posts = content?.blogPosts?.filter(p => p.category !== 'Training') || [];

    const isAlba = activeClub === 'alba13';
    const themeColors = isAlba
        ? 'bg-slate-50 text-slate-900'
        : 'bg-neutral-50 text-neutral-900';
    const accentColor = isAlba ? 'text-cyan-600' : 'text-yellow-600';

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
                        News & Eventi
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 pt-40 pb-12">

                <div className="flex items-center gap-3 mb-12">
                    <div className={`p-3 rounded-full ${isAlba ? 'bg-cyan-100 text-cyan-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        <BookOpen size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold">News & Eventi</h1>
                        <p className="opacity-60 mt-1">Tutte le novità dal mondo {isAlba ? 'Alba 13' : 'Ros6Team'}.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <AnimatedLink key={post.id} to={`/${activeClub}/blog/${post.slug?.current || ''}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                            <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                                {post.imageUrl ? (
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <BookOpen size={48} />
                                    </div>
                                )}
                                <div className={`absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${isAlba ? 'text-slate-900' : 'text-neutral-900'}`}>
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="text-xs font-medium opacity-50 mb-2">
                                    {formatDate(post.date)}
                                </div>
                                <h3 className={`text-xl font-bold mb-2 ${isAlba ? 'group-hover:text-cyan-600' : 'group-hover:text-yellow-600'} transition-colors`}>
                                    {post.title}
                                </h3>
                                <p className="text-sm opacity-60 line-clamp-2">{post.subtitle}</p>
                            </div>
                        </AnimatedLink>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20 opacity-50">
                        Nessuna notizia trovata.
                    </div>
                )}
            </div>
        </div>
    );
}
