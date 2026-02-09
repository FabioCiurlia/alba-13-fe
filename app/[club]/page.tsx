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
import { SponsorSection } from '@/components/SponsorSection';
import { getThemeBySlug } from '@/utils/theme';
import { FIXED_EVENTS } from '@/data/events';
import MainEvents from '@/components/MainEvents';


// Define valid clubs
const VALID_CLUBS = ['alba13', 'ros6team'];

export default async function ClubPage({ params }: { params: Promise<{ club: string }> }) {
    const { club } = await params;

    if (!VALID_CLUBS.includes(club)) {
        notFound();
    }

    const clubType = club as ClubType;

    // Fetch data for the active club AND all clubs for the carousel
    const [data, albaData, rosData] = await Promise.all([
        getClubContent(clubType),
        getClubContent('alba13'),
        getClubContent('ros6team')
    ]);

    // Prepare all clubs data for the carousel
    const allClubsData = [albaData, rosData].filter(Boolean) as ClubContext[];

    // Error State if no data found
    if (!data) {
        // Fallback or 404
        notFound();
    }

    const config = data.config;
    const theme = getThemeBySlug(config.slug.current);

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
        <main className={`${theme.bg} pt-[64px]`}>
            {/*<section className={`hidden md:block relative py-0 md:pt-6 ${theme.bg}`}>
                
                <nav className={`container mx-auto md:px-6 flex items-start justify-between font-sans ${theme.bg}`}>
                    <div className="max-w-[150px]">
                        <h1 className={`text-2xl font-bold leading-tight tracking-tighter uppercase text-${theme.primary}`}>
                            Alba 13 Running Club
                        </h1>
                    </div>

                    <div className="flex flex-1 justify-around font-bold tracking-widest uppercase text-sm font-medium">

                        <div className="flex flex-col gap-2">
                            <a href="#" className="hover:text-orange-500 text-lg">TRAIL DEL CROCEFISSO</a>
                            <a href="#" className="hover:text-orange-500">STORICO EVENTI</a>
                            <a href="#" className="hover:text-orange-500">Contact</a>
                        </div>

                        <div className="flex flex-col gap-2">
                            <a href="#" className="hover:text-orange-500">Events</a>
                            <a href="#" className="hover:text-orange-500">Articles</a>
                            <a href="#" className="hover:text-gray-600">Faq</a>
                        </div>

                        <div className="flex flex-col gap-2">
                            <a href="#" className="hover:text-gray-600">Race Info</a>
                            <a href="#" className="hover:text-gray-600">Official Partner</a>
                            <a href="#" className="hover:text-gray-600">Volunteer</a>
                        </div>

                        <div className="flex flex-col gap-2">
                            <a href="#" className="hover:text-gray-600">Media Section</a>
                            <a href="#" className="hover:text-gray-600">Press Releases</a>
                            <a href="#" className="hover:text-gray-600">Gallery</a>
                        </div>

                    </div>
                </nav>

            </section>
             Hero Section 
            
            <Hero
                data={data.hero}
                mainPost={mainPost}
                recentPosts={recentPosts}
                config={config}
            />
            */}
            <MainEvents />
            <div className="animate-fade-in-up">
                {/* About Section - All Clubs Carousel */}
                {/* Athletes Section - Only for active club */}
                <div className="mt-12 md:mt-24">
                    <AthleteList
                        athletes={data.athletes}
                        config={config}
                    />
                </div>

                <BlogSection posts={data.blogPosts} config={config} />
                <CompetitionsSection />
                <SponsorSection />
            </div>
        </main>
    );
}
