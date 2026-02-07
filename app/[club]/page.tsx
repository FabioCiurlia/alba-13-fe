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
import { ClubGovernance } from '@/components/ClubGovernance';
import { SponsorSection } from '@/components/SponsorSection';
import { ExecutiveBoard } from '@/components/ExecutiveBoard';

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
                data={data.hero}
                mainPost={mainPost}
                recentPosts={recentPosts}
                config={config}
            />

            <div className="animate-fade-in-up">
                {/* About Section - All Clubs Carousel */}
                <ClubGovernance config={config} />
                <ExecutiveBoard config={config} />
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
