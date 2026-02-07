import React from 'react';
import { ClubConfig, HeroData, BlogPost } from '../types';
import { ChevronRight, Zap, MapPin, Activity, Coffee, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getThemeBySlug } from '@/utils/theme';
import { FIXED_EVENTS } from '../data/events';

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
  post: any;
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

  // Determine the primary hover color based on the theme to avoid JIT issues with dynamic classes
  const hoverBgClass = theme.primary === 'cyan-600' ? 'group-hover:bg-cyan-600' : 'group-hover:bg-yellow-600';

  return (
    <CardWrapper>
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={post.title}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${theme.cardFilter}`}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-20 group-hover:opacity-0 transition-opacity" />



      {/* Content */}
      <div className="absolute inset-0 p-4 md:p-4 flex flex-col justify-between z-10">
        <div></div>
        <div>
          <div className="flex items-center gap-4">
            <div className={`justify-between w-full py-2 px-3 rounded-xl bg-white text-black font-bold text-sm flex items-center gap-2 transform transition-all transition-colors ${hoverBgClass} group-hover:shadow-lg transition-colors`}>
              <span className="group-hover:text-white transition-colors">Leggi Ora</span>
              <ArrowRight size={18} className="group-hover:text-white transition-colors" />
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

  // Prepare all blocks (Main + Fixed Events)
  // Slot 0 is always the Featured/Main post
  // Slots 1-3 are populated with Fixed Events if available, otherwise Recent Posts
  const blocks = [
    mainPost || { ...data, category: 'Main' },
    ...FIXED_EVENTS,
    ...recentPosts
  ].slice(0, 4);

  return (
    <section className={`${theme.bg} pb-12 overflow-hidden`}>
      {/* Search/Desktop Version (Bento Grid) */}
      <div className="container mx-auto px-6 hidden md:block md:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 h-auto lg:h-[800px]">

          {/* Main Card (Large) */}
          {blocks[0] && (
            <div className="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 h-[500px] lg:h-full">
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

      {/* Mobile Version (Full Screen Background + Slider) */}
      <div className="md:hidden relative h-[90vh] w-full flex flex-col justify-between">
        {/* Full Screen Background */}
        <div className='flex justify-between'>
          <div className="absolute inset-0 z-0 bg-white">

            <img
              src='https://res.cloudinary.com/drxidw3hj/image/upload/t_qwebp/v1770478108/athletic-man-participating-cross-country_phvsct.webp'
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-transparent" />
          </div>
          <div className="flex flex-row z-10 w-full mx-6 mt-16 pb-8 text-white z-99 gap-4 align-center">
            <div className=""><img src="https://res.cloudinary.com/drxidw3hj/image/upload/t_noBack/v1770211717/alba13-logo.png" width={128} height={128} alt="" /></div>
            <div className='text-5xl font-bold font-gopron'>Alba 13 <br /> Running Club</div>
          </div>
        </div>


        {/* Floating Content/Slider */}
        <div className="relative z-10 w-full pb-8">
          <div className="px-8 mb-2">
            <h6 className="text-white font-bold text-2xl relative inline-block tracking-wide">
              I Nostri Eventi
            </h6>

          </div>

          {/* Horizontal Slider */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 no-scrollbar pb-0">
            {blocks.map((block: any, idx: number) => (
              <div key={idx} className="flex-none w-[280px] h-[360px] snap-center">
                <BentoCard post={block} theme={theme} className="h-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};