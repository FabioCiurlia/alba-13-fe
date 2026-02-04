import React from 'react';
import { notFound } from 'next/navigation';
import { getClubContent } from '@/services/sanityService';
import { ClubType, ClubContext } from '@/types';
import { Hero } from '@/components/Hero';
import { AboutSection } from '@/components/AboutSection';
import { AthleteList } from '@/components/AthleteList';
import { BlogSection } from '@/components/BlogSection';
import { CompetitionsSection } from '@/components/CompetitionsSection';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// Define valid clubs
const VALID_CLUBS = ['alba13', 'ros6team'];

export default async function ClubPage({ params }: { params: Promise<{ club: string }> }) {
    const { club } = await params;

    if (!VALID_CLUBS.includes(club)) {
        notFound();
    }

    const activeClub = club as ClubType;

    // Fetch data for the active club AND all clubs for the carousel
    const [data, albaData, rosData] = await Promise.all([
        getClubContent(activeClub),
        getClubContent('alba13'),
        getClubContent('ros6team')
    ]);

    // Prepare all clubs data for the carousel
    const allClubsData = [albaData, rosData].filter(Boolean) as ClubContext[];

    // Determine theme based on active club from URL
    const isAlba = activeClub === 'alba13';

    // Error State if no data found
    if (!data) {
        const themeColors = isAlba
            ? 'bg-slate-50 text-slate-900 selection:bg-cyan-200'
            : 'bg-neutral-50 text-neutral-900 selection:bg-yellow-200';

        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 min-h-[60vh]">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isAlba ? 'bg-cyan-100 text-cyan-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    <AlertCircle size={32} />
                </div>
                <div className="max-w-lg">
                    <h2 className="text-2xl font-bold mb-2">Content Not Found</h2>
                    <p className="opacity-70 mb-8">
                        We connected to Sanity, but couldn't find published content for <strong>{isAlba ? 'Alba 13' : 'Ros6Team'}</strong>.
                    </p>
                    <div className="bg-black/5 p-6 rounded-xl text-sm text-left font-mono space-y-3 mb-8">
                        <p className="font-bold opacity-80 border-b border-black/10 pb-2 mb-2">Troubleshooting Guide</p>
                        <ul className="list-disc pl-4 space-y-2 opacity-70">
                            <li>Check <strong>CORS Origins</strong> in Sanity (add your current URL).</li>
                            <li>Ensure the Club document is <strong>Published</strong> (not Draft).</li>
                            <li>Verify the slug is <code>{isAlba ? 'alba-13' : 'ros-6-team'}</code>.</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    // Prepare Posts Logic
    const allPosts = data?.blogPosts || [];
    const mainPost = data?.blogPosts?.find(p => p.main);

    const recentPosts = (() => {
        const mainId = mainPost?.id;
        // Sort by date desc
        const sorted = [...allPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const usedCategories = new Set();
        const result = [];

        for (const post of sorted) {
            if (post.id === mainId) continue;
            const cat = post.category || 'News';
            if (!usedCategories.has(cat)) {
                usedCategories.add(cat);
                result.push(post);
            }
            if (result.length >= 4) break;
        }
        return result;
    })();

    return (
        <main>
            <Hero
                activeClub={activeClub}
                data={data.hero}
                mainPost={mainPost}
                recentPosts={recentPosts}
            />

            <div className="animate-fade-in-up">
                {/* About Section - All Clubs Carousel */}
                <AboutSection
                    clubs={allClubsData}
                    initialIndex={activeClub === 'alba13' ? 0 : 1}
                />

                {/* Athletes Section - Only for active club */}
                <div className="mt-12 md:mt-24">
                    <AthleteList
                        athletes={data.athletes}
                        activeClub={activeClub}
                        isAlba={isAlba}
                    />
                </div>

                <BlogSection posts={data.blogPosts} activeClub={activeClub} />
                <CompetitionsSection activeClub={activeClub} />
            </div>
        </main>
    );
}
