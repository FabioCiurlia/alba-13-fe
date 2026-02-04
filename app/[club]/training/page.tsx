import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getClubContent } from '@/services/sanityService';
import { ClubType } from '@/types';
import { Navbar } from '@/components/Navbar';
import { AnimatedLink } from '@/components/AnimatedLink';
import { formatDate } from '@/utils/dateUtils';
import { ArrowLeft, Activity } from 'lucide-react';

const VALID_CLUBS = ['alba13', 'ros6team'];

export default async function TrainingPage({ params }: { params: Promise<{ club: string }> }) {
    const { club } = await params;

    if (!VALID_CLUBS.includes(club)) {
        notFound();
    }

    const activeClub = club as ClubType;
    const content = await getClubContent(activeClub);
    const posts = content?.blogPosts?.filter(p => p.category === 'Training') || [];

    const isAlba = activeClub === 'alba13';
    const themeColors = isAlba
        ? 'bg-slate-50 text-slate-900'
        : 'bg-neutral-50 text-neutral-900';
    const accentColor = isAlba ? 'text-cyan-600' : 'text-yellow-600';
    const cardBg = isAlba ? 'bg-slate-900 text-white' : 'bg-stone-900 text-white';

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
                        Tutti gli Allenamenti
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 pt-40 pb-12">

                <div className="flex items-center gap-3 mb-12">
                    <div className={`p-3 rounded-full ${isAlba ? 'bg-cyan-100 text-cyan-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        <Activity size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl text-2xl font-bold">Tutti gli Allenamenti</h1>
                        <p className="opacity-60 mt-1">Tutti gli Allenamenti della squadra</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <AnimatedLink key={post.id} to={`/${activeClub}/blog/${post.slug?.current || ''}`} className={`group block rounded-2xl overflow-hidden shadow-lg ${cardBg} hover:shadow-xl transition-all`}>
                            <div className="aspect-video relative overflow-hidden bg-slate-800">
                                {post.imageUrl ? (
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center opacity-30">
                                        <Activity size={48} />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {formatDate(post.date)}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{post.title}</h3>
                                <p className="text-sm opacity-60 line-clamp-2">{post.subtitle}</p>
                                <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-50">
                                    <span>{post.author}</span>
                                </div>
                            </div>
                        </AnimatedLink>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20 opacity-50">
                        No training logs found for this team yet.
                    </div>
                )}
            </div>
        </div>
    );
}
