import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { AthleteSection } from './AthleteSection';
import { BlogSection } from './BlogSection';
import { CompetitionsSection } from './CompetitionsSection';
import { Footer } from './Footer';
import { ClubContext, ClubType } from '../types';
import { getClubContent } from '../services/sanityService';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface HomeProps {
    activeClub: ClubType;
    setActiveClub: (club: ClubType) => void;
}

export const Home: React.FC<HomeProps> = ({ activeClub, setActiveClub }) => {
    const [data, setData] = useState<ClubContext | null>(null);
    const [loading, setLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const content = await getClubContent(activeClub);
                setData(content);
            } catch (error) {
                console.error("Failed to load CMS data", error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [activeClub, retryCount]);

    // Dynamic theme colors
    const themeColors = activeClub === 'alba13'
        ? 'bg-slate-50 text-slate-900 selection:bg-cyan-200'
        : 'bg-neutral-50 text-neutral-900 selection:bg-yellow-200';

    if (!data && loading) return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;

    // Error State
    if (!data && !loading) {
        return (
            <div className={`min-h-screen theme-transition ${themeColors} flex flex-col`}>
                <Navbar activeClub={activeClub} setActiveClub={setActiveClub} />
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${activeClub === 'alba13' ? 'bg-cyan-100 text-cyan-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        <AlertCircle size={32} />
                    </div>
                    <div className="max-w-lg">
                        <h2 className="text-2xl font-bold mb-2">Content Not Found</h2>
                        <p className="opacity-70 mb-8">
                            We connected to Sanity, but couldn't find published content for <strong>{activeClub === 'alba13' ? 'Alba 13' : 'Ros6Team'}</strong>.
                        </p>

                        <div className="bg-black/5 p-6 rounded-xl text-sm text-left font-mono space-y-3 mb-8">
                            <p className="font-bold opacity-80 border-b border-black/10 pb-2 mb-2">Troubleshooting Guide</p>
                            <ul className="list-disc pl-4 space-y-2 opacity-70">
                                <li>Check <strong>CORS Origins</strong> in Sanity (add your current URL).</li>
                                <li>Ensure the Club document is <strong>Published</strong> (not Draft).</li>
                                <li>Verify the slug is <code>{activeClub === 'alba13' ? 'alba-13' : 'ros-6-team'}</code>.</li>
                                <li>Check browser console for connection errors.</li>
                            </ul>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setRetryCount(c => c + 1)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors ${activeClub === 'alba13' ? 'bg-cyan-600 text-white hover:bg-cyan-500' : 'bg-yellow-600 text-white hover:bg-yellow-500'}`}
                            >
                                <RefreshCw size={18} /> Retry Connection
                            </button>
                            <button
                                onClick={() => setActiveClub(activeClub === 'alba13' ? 'ros6team' : 'alba13')}
                                className="px-6 py-3 rounded-full border border-current hover:bg-black/5 transition-colors font-semibold"
                            >
                                Switch Club
                            </button>
                        </div>
                    </div>
                </div>
                <Footer activeClub={activeClub} />
            </div>
        );
    }

    return (
        <div className={`min-h-screen theme-transition ${themeColors}`}>
            <Navbar activeClub={activeClub} setActiveClub={setActiveClub} />

            <main>
                <Hero
                    activeClub={activeClub}
                    data={data?.hero}
                    mainPost={data?.blogPosts?.find(p => p.main)}
                    recentPosts={(() => {
                        const allPosts = data?.blogPosts || [];
                        const mainId = data?.blogPosts?.find(p => p.main)?.id;
                        const sorted = [...allPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                        const usedCategories = new Set();
                        const result = [];

                        for (const post of sorted) {
                            if (post.id === mainId) continue;
                            // Ensure we show 'Training', 'Event', etc. distinct types
                            // Fallback to 'News' if category missing, but treat it as a category
                            const cat = post.category || 'News';
                            if (!usedCategories.has(cat)) {
                                usedCategories.add(cat);
                                result.push(post);
                            }
                            if (result.length >= 4) break;
                        }
                        return result;
                    })()}
                />

                {loading ? (
                    <div className="py-20 text-center opacity-50">Switching Tracks...</div>
                ) : (
                    <div className="animate-fade-in-up">
                        <AthleteSection
                            athletes={data?.athletes}
                            aboutData={data?.about}
                            activeClub={activeClub}
                        />
                        <BlogSection posts={data?.blogPosts} activeClub={activeClub} />
                        <CompetitionsSection activeClub={activeClub} />
                    </div>
                )}
            </main>

            <Footer activeClub={activeClub} />
        </div>
    );
};
