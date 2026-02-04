import React from 'react';
import { BlogPost, ClubType } from '../types';
import { ArrowRight, BookOpen, Activity, Timer, TrendingUp, MapPin } from 'lucide-react';
import { AnimatedLink } from './AnimatedLink';
import { formatDate } from '../utils/dateUtils';

interface BlogSectionProps {
  posts?: BlogPost[];
  activeClub: ClubType;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts, activeClub }) => {
  if (!posts || posts.length === 0) return null;

  const isAlba = activeClub === 'alba13';

  // Filter posts
  const trainingPosts = posts.filter(p => p.category === 'Training');
  const otherPosts = posts.filter(p => p.category !== 'Training');

  // Styling
  const subHeaderColor = isAlba ? 'text-cyan-600' : 'text-yellow-600';
  const trainingBg = isAlba ? 'bg-slate-900 text-white' : 'bg-stone-900 text-white';
  const cardHoverBorder = isAlba ? 'group-hover:border-cyan-400' : 'group-hover:border-yellow-400';
  const buttonStyle = isAlba
    ? 'text-cyan-400 hover:text-cyan-300'
    : 'text-yellow-400 hover:text-yellow-300';

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <span className={`text-xs font-bold tracking-[0.2em] uppercase ${subHeaderColor}`}>
              Il Nostro Percorso
            </span>
            <h2 className={`text-4xl font-bold mt-2 ${isAlba ? 'text-slate-900' : 'text-neutral-900'}`}>
              News & Eventi
            </h2>
          </div>
          <AnimatedLink to={`/${activeClub}/news`} className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors ${isAlba ? 'hover:text-cyan-600' : 'hover:text-yellow-600'}`}>
            Vedi Tutte le News <ArrowRight size={16} />
          </AnimatedLink>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* General Blog Grid (Right Side) */}
          <div className="lg:w-2/3 flex flex-col h-full">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {otherPosts.map((post) => (
                <AnimatedLink key={post.id} to={`/${activeClub}/blog/${post.slug?.current || ''}`} className="group flex flex-col h-full cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[16/10] bg-slate-100">
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

                  <div className={`pl-4 flex-1 border-l-2 transition-colors border-transparent ${cardHoverBorder}`}>
                    <div className="text-xs font-medium opacity-50 mb-2">
                      {formatDate(post.date)}
                    </div>
                    <h4 className={`text-xl font-bold mb-2 group-hover:opacity-80 transition-opacity ${isAlba ? 'text-slate-900' : 'text-neutral-900'}`}>
                      {post.title}
                    </h4>
                    <p className="text-sm opacity-60 line-clamp-2">
                      {post.subtitle}
                    </p>
                  </div>
                </AnimatedLink>
              ))}
            </div>

            {/* Mobile-only "View All" button at the bottom */}
            <div className="mt-auto md:hidden">
              <AnimatedLink to={`/${activeClub}/news`} className={`flex w-full items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm bg-slate-100 ${isAlba ? 'text-cyan-700' : 'text-yellow-700'}`}>
                Vedi Tutte le News <ArrowRight size={16} />
              </AnimatedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};