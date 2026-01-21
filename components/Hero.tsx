import React from 'react';
import { ClubType, HeroData, BlogPost } from '../types';
import { ChevronRight, Calendar, User, Clock, ArrowRight, Activity, MapPin, Zap, Coffee, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/dateUtils';

interface HeroProps {
  activeClub: ClubType;
  data?: HeroData;
  mainPost?: BlogPost;
  recentPosts?: BlogPost[];
}

// Helper to get icon by category
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Training': return <Activity size={16} />;
    case 'Event': return <MapPin size={16} />;
    case 'Lifestyle': return <Coffee size={16} />;
    default: return <Zap size={16} />;
  }
};

export const Hero: React.FC<HeroProps> = ({ activeClub, data, mainPost, recentPosts = [] }) => {
  if (!data) return null;

  const isAlba = activeClub === 'alba13';
  const accentColor = isAlba ? 'text-cyan-400' : 'text-yellow-400';
  const accentBg = isAlba ? 'bg-cyan-600' : 'bg-yellow-600';

  // Decide which image to show: Article Image (if exists) OR Club Hero Image
  const bgImage = mainPost?.imageUrl || data.imageUrl;

  // Determine if we are showing Main Post details or just Club details
  const title = mainPost?.title || data.title;
  const subtitle = mainPost ? null : data.subtitle; // Don't show club subtitle if showing an article
  const date = mainPost?.date;
  const author = mainPost?.author;
  const category = mainPost?.category;

  // Link to either the blog post or nowhere (if just hero data)
  const MainWrapper = mainPost
    ? ({ children }: { children: React.ReactNode }) => <Link to={`/blog/${mainPost.slug.current}`} className="block h-full group">{children}</Link>
    : ({ children }: { children: React.ReactNode }) => <div className="h-full">{children}</div>;

  return (
    <div className="relative w-full h-[85vh] md:h-[90vh] bg-slate-900 overflow-hidden">

      {/* --- MAIN BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] ease-out hover:scale-105"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10 opacity-90" />
        <div className="absolute inset-0 bg-black/20 z-10" />
      </div>

      <MainWrapper>
        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col pt-32 pb-48 md:pb-40 justify-center md:justify-end">

          {/* Main Content (Title etc) */}
          <div className="max-w-4xl animate-fade-in-up">
            {category && (
              <div className="flex items-center gap-4 mb-6">
                <span className={`px-4 py-1.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white font-bold uppercase tracking-widest text-xs shadow-sm`}>
                  In Copertina
                </span>
                <span className={`text-white/90 font-bold uppercase tracking-wider text-sm flex items-center gap-2 ${accentColor}`}>
                  {getCategoryIcon(category)} {category}
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-6 drop-shadow-xl tracking-tight">
              {title}
            </h1>

            {subtitle && (
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl font-light">
                {subtitle}
              </p>
            )}

            {mainPost && (
              <div className="flex items-center gap-8 text-white/80 font-medium text-lg mt-8">
                <div className="flex items-center gap-2">
                  <User size={20} className={accentColor} /> {author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={20} className={accentColor} /> {formatDate(date!)}
                </div>
              </div>
            )}
          </div>

        </div>
      </MainWrapper>

      {/* --- RECENT ARTICLES OVERLAY (Floating at Bottom) --- */}
      <div className="absolute bottom-0 left-0 w-full z-30 bg-gradient-to-t from-black via-black/80 to-transparent pb-8 pt-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-end gap-6">

            {/* Header for Strip (Mobile only mostly) */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:ml-16">
              {recentPosts.map((post) => (
                <Link
                  to={`/blog/${post.slug.current}`}
                  key={post.id}
                  className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all duration-300 group p-4 flex gap-4 items-center"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-black/40 relative">
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20"><Zap /></div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${accentColor} flex items-center gap-1.5`}>
                      {getCategoryIcon(post.category)} {post.category || 'News'}
                    </div>
                    <h3 className="text-white font-bold leading-tight line-clamp-2 text-sm md:text-base group-hover:text-white/90">
                      {post.title}
                    </h3>
                    <div className="text-xs text-white/40 mt-2 font-medium">
                      {formatDate(post.date)}
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 text-white">
                    <ChevronRight size={20} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};