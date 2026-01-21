import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { ArrowLeft, User, Clock, MapPin, TrendingUp, Timer } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogPostBySlug } from '../services/sanityService';
import { formatDate } from '../utils/dateUtils';
import { navigateBackWithTransition } from '../utils/navigationUtils';
import { AnimatedLink } from './AnimatedLink';
import { ArrowRight } from 'lucide-react';
import { Gallery } from './Gallery';

import { Navbar } from './Navbar';
import { ClubType } from '../types';

interface ArticleDetailProps {
    activeClub?: ClubType;
    setActiveClub?: (club: ClubType) => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ activeClub: propActiveClub, setActiveClub: propSetActiveClub }) => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    // Default to 'alba13' if not provided (fallback)
    const activeClub = propActiveClub || 'alba13';
    const setActiveClub = propSetActiveClub || (() => { });

    useEffect(() => {
        const loadPost = async () => {
            if (!slug) return;
            const data = await getBlogPostBySlug(slug);
            setPost(data);
            setLoading(false);
        };
        loadPost();
    }, [slug]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading article...</div>;
    if (!post) return <div className="min-h-screen flex items-center justify-center">Article not found</div>;

    // Derive theme from post team or default
    const isAlba = post.team === 'Alba13';
    const isTraining = post.category === 'Training';

    // Theme colors
    const themeColor = isAlba ? 'text-cyan-600' : 'text-yellow-600';
    const themeBg = isAlba ? 'bg-cyan-600' : 'bg-yellow-600';
    const headingColor = isAlba ? 'text-slate-900' : 'text-neutral-900';

    if (isTraining) {
        // Specialized Layout for Training Log
        return (
            <div className={`min-h-screen ${isAlba ? 'bg-slate-50' : 'bg-neutral-50'}`}>
                <Navbar activeClub={activeClub} setActiveClub={setActiveClub} />

                {/* Fixed Sub-Navbar for Back Navigation */}
                <div className={`fixed top-16 left-0 right-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${isAlba ? 'bg-slate-50/90 border-slate-200' : 'bg-neutral-50/90 border-neutral-200'}`}>
                    <div className="container mx-auto px-6 max-w-4xl h-16 flex items-center justify-between relative">
                        <button
                            onClick={() => navigateBackWithTransition(navigate)}
                            className={`flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors ${themeColor}`}
                        >
                            <ArrowLeft size={24} />
                        </button>

                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold md:opacity-100 transition-opacity truncate max-w-[60%]">
                            {post.title}
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 max-w-4xl pt-40 pb-12">

                    <div className="mb-12">
                        <div className={`p-8 md:p-12 rounded-2xl ${isAlba ? 'bg-slate-900' : 'bg-stone-900'} text-white relative overflow-hidden shadow-lg`}>
                            <div className={`absolute top-0 right-0 w-96 h-96 opacity-10 transform translate-x-1/3 -translate-y-1/3 rounded-full ${themeBg}`} />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider opacity-70 mb-4">
                                    <span className="bg-white/10 px-3 py-1 rounded-full">{post.category}</span>
                                    <span>{formatDate(post.date)}</span>
                                </div>

                                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">{post.author}</div>
                                        <div className="text-xs opacity-60">Coach</div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 md:gap-8 mt-8 pt-6 border-t border-white/10">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} className="opacity-70" />
                                        <span className="font-bold text-lg">{post.distanza || '-'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp size={18} className="opacity-70" />
                                        <span className="font-bold text-lg">{post.level || '-'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Timer size={18} className="opacity-70" />
                                        <span className="font-bold text-lg">{post.durata || '-'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 md:px-0">
                        {post.content ? (
                            <div className="space-y-4 text-slate-600">
                                {post.content.map((block: any, i: number) => (
                                    block._type === 'block' && block.children
                                        ? <p key={i}>{block.children.map((c: any) => c.text).join('')}</p>
                                        : null
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-500 italic">Non ci sono informazioni specifiche per l'allenamento.</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Standard Layout
    return (
        <div className="min-h-screen bg-white">
            <Navbar activeClub={activeClub} setActiveClub={setActiveClub} />

            {/* Fixed Sub-Navbar for Back Navigation */}
            <div className={`fixed top-16 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100`}>
                <div className="container mx-auto px-6 max-w-3xl h-16 flex items-center justify-between relative">
                    <button
                        onClick={() => navigateBackWithTransition(navigate)}
                        className={`flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 transition-colors ${themeColor}`}
                    >
                        <ArrowLeft size={24} />
                    </button>

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold md:opacity-100 transition-opacity truncate max-w-[60%] text-slate-900">
                        {post.title}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-3xl pt-32 pb-12">

                <header className="mb-12">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6 ${themeBg} text-white`}>
                        {post.category}
                    </div>
                    <h1 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${headingColor}`}>{post.title}</h1>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                <User size={20} className="text-slate-400" />
                            </div>
                            <div className="text-sm">
                                <span className="font-bold block">{post.author}</span>
                                <span className="text-slate-500">{formatDate(post.date)}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="mb-12 rounded-2xl overflow-hidden shadow-lg aspect-video bg-slate-100">
                    {post.imageUrl && (
                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                    )}
                </div>

                <article className="prose prose-lg max-w-none prose-slate">
                    {post.content ? (
                        <div className="space-y-4">
                            {/* Simple block renderer for example purposes. Real app should use @portabletext/react */}
                            {post.content.map((block: any, i: number) => {
                                if (block._type === 'block' && block.children) {
                                    return <p key={i}>{block.children.map((child: any) => child.text).join('')}</p>;
                                }
                                if (block._type === 'gallery' && block.images) {
                                    // Parse images based on sanity helper or expected format
                                    const images = block.images.map((img: any) => ({
                                        url: img?.asset?.url || img?.url || '', // Adjust based on your actual GROQ projection for gallery
                                        alt: img?.alt,
                                        _key: img?._key
                                    })).filter((img: any) => img.url);

                                    return (
                                        <Gallery
                                            key={block._key || i}
                                            images={images}
                                            display={block.display || 'grid'}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </div>
                    ) : (
                        <>
                            <p className="lead text-xl text-slate-600 font-medium mb-8">{post.subtitle}</p>
                            <p className="opacity-50 italic">Full article content not available for this post.</p>
                        </>
                    )}
                </article>
                <div className="mt-8">
                    <AnimatedLink to="/news" className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors ${isAlba ? 'hover:text-cyan-600' : 'hover:text-yellow-600'}`}>
                        Vedi tutte le News <ArrowRight size={16} />
                    </AnimatedLink>
                </div>
            </div>
        </div>
    );
};
