import React from 'react';
import { ClubConfig, HeroData, BlogPost } from '../types';
import { ChevronRight, Zap, MapPin, Activity, Coffee, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getThemeBySlug } from '@/utils/theme';

interface HeroProps {
  data?: HeroData;
  mainPost?: BlogPost;
  recentPosts?: BlogPost[];
  config: ClubConfig;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Training': return <Activity size={16} />;
    case 'Event': return <MapPin size={16} />;
    case 'Lifestyle': return <Coffee size={16} />;
    default: return <Zap size={16} />;
  }
};

interface BentoCardProps {
  post: BlogPost | HeroData;
  className?: string;
  theme: any;
  isMain?: boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({ post, className = '', theme, isMain = false }) => {
  const isPost = 'slug' in post;
  const slug = isPost ? (post as BlogPost).slug?.current : '';
  const imageUrl = post.imageUrl || (typeof post.image === 'string' ? post.image : '/utils/default-user.avif');
  const category = isPost ? (post as BlogPost).category : 'News';

  const CardWrapper = slug
    ? ({ children }: { children: React.ReactNode }) => <Link href={`/${post.slug.current}/blog/${slug}`} className={`group block w-full h-full relative overflow-hidden rounded-[1rem] shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${className}`}>{children}</Link>
    : ({ children }: { children: React.ReactNode }) => <div className={`block h-full relative overflow-hidden rounded-[1rem] shadow-xl ${className}`}>{children}</div>;

  return (
    <CardWrapper>
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={post.title}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${theme.cardFilter}`}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

      {/* Background Text Accent (The "Big Number" feel) */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 select-none pointer-events-none transition-transform duration-700 group-hover:scale-110 opacity-10">
        <span
          className="text-[120px] md:text-[200px] font-black uppercase italic leading-none text-white tracking-tighter"
          style={{ WebkitTextStroke: '2px white', color: 'transparent' }}
        >
          {category?.charAt(0) || 'A'}
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 md:p-4 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <div className="px-4 py-1.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white font-bold uppercase tracking-widest text-[10px] md:text-xs shadow-sm flex items-center gap-2">
            {getCategoryIcon(category || '')} {category || 'In Copertina'}
          </div>
        </div>

        <div>
          <h3 className={`${isMain ? 'text-3xl md:text-5xl lg:text-6xl' : 'text-xl md:text-2xl'} font-black text-white italic uppercase font-gopron leading-[0.9] tracking-tight mb-6 drop-shadow-2xl`}>
            {post.title}
          </h3>

          <div className="flex items-center gap-4">
            <div className={`justify-between w-full py-2 px-3 rounded-xl bg-white text-black font-bold text-sm flex items-center gap-2 transform transition-all group-hover:bg-${theme.primary} group-hover:scale-105 group-hover:shadow-lg transition-colors`}>
              Leggi Ora <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export const Hero: React.FC<HeroProps> = ({ data, mainPost, recentPosts = [], config }) => {
  if (!data) return null;

  const theme = getThemeBySlug(config.slug.current);

  // Prepare all blocks (Main + 3 Recent)
  const blocks = [
    mainPost || { ...data, category: 'Main' },
    ...recentPosts.slice(0, 3)
  ];

  return (
    <section className={`${theme.bg} py-12 md:py-24`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 h-auto lg:h-[800px]">

          {/* Main Card (Large) */}
          {blocks[0] && (
            <div className="lg:col-span-2 lg:row-span-2 h-[500px] lg:h-full">
              {/* Passing a simple index for button coloring inside the sub-component if needed, 
                   but let's define colors here or pass theme */}
              <BentoCard post={blocks[0]} theme={theme} isMain={true} />
            </div>
          )}

          {/* Top Right Card (Wide) */}
          {blocks[1] && (
            <div className="md:col-span-2 lg:col-span-2 h-[300px] lg:h-full">
              <BentoCard post={blocks[1]} theme={theme} />
            </div>
          )}

          {/* Bottom Right Card 1 */}
          {blocks[2] && (
            <div className="lg:col-span-1 h-[300px] lg:h-full">
              <BentoCard post={blocks[2]} theme={theme} />
            </div>
          )}

          {/* Bottom Right Card 2 */}
          {blocks[3] && (
            <div className="lg:col-span-1 h-[300px] lg:h-full">
              <BentoCard post={blocks[3]} theme={theme} />
            </div>
          )}

        </div>
      </div>
    </section>
  );
};