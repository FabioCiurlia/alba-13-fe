import React, { useState } from 'react';
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
              News & Allenamenti
            </h2>
          </div>
          <AnimatedLink to="/news" className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors ${isAlba ? 'hover:text-cyan-600' : 'hover:text-yellow-600'}`}>
            Vedi Tutte le News <ArrowRight size={16} />
          </AnimatedLink>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Subsection: Training Log (Featured Left Side) */}
          <div className={`lg:w-1/3 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between ${trainingBg}`}>
            {/* Abstract Background Decoration */}
            <div className={`absolute top-0 right-0 w-64 h-64 opacity-10 transform translate-x-1/3 -translate-y-1/3 rounded-full ${isAlba ? 'bg-cyan-500' : 'bg-yellow-500'}`} />



            <div className="space-y-8 relative z-10">
              <div className="relative z-10 flex items-center gap-2 mb-8">
                <Activity size={20} className={isAlba ? 'text-cyan-400' : 'text-yellow-400'} />
                <h3 className="text-xl font-bold tracking-tight">Storico Allenamenti</h3>
              </div>
              {trainingPosts.map((post) => (
                <AnimatedLink key={post.id} to={`/blog/${post.slug?.current || ''}`} className="group block cursor-pointer">
                  <div className={`text-xs font-bold uppercase tracking-wider mb-2 opacity-60 ${isAlba ? 'text-cyan-200' : 'text-yellow-200'}`}>
                    {formatDate(post.date)} • {post.author}
                  </div>
                  <h4 className={`text-2xl font-bold mb-3 transition-colors ${buttonStyle}`}>
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-4 text-xs font-mono opacity-80 mb-4">
                    {post.durata && (
                      <div className="flex items-center gap-1.5">
                        <Timer size={14} /> {post.durata}
                      </div>
                    )}
                    {post.distanza && (
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} /> {post.distanza}
                      </div>
                    )}
                    {post.level && (
                      <div className="flex items-center gap-1.5">
                        <TrendingUp size={14} /> {post.level}
                      </div>
                    )}
                  </div>
                  <div className="h-px w-full bg-white/10 group-last:hidden" />
                </AnimatedLink>
              ))}
            </div>

            <div className="mt-12">
              <AnimatedLink to="/training" className={`block w-full text-center py-3 rounded-xl text-sm font-bold border border-white/20 hover:bg-white/10 transition-all`}>
                Vedi tutti gli Allenamenti
              </AnimatedLink>
            </div>

          </div>

          {/* General Blog Grid (Right Side) */}
          <div className="lg:w-2/3 flex flex-col h-full">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {otherPosts.map((post) => (
                <AnimatedLink key={post.id} to={`/blog/${post.slug?.current || ''}`} className="group flex flex-col h-full cursor-pointer">
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
              <AnimatedLink to="/news" className={`flex w-full items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm bg-slate-100 ${isAlba ? 'text-cyan-700' : 'text-yellow-700'}`}>
                Vedi Tutte le News <ArrowRight size={16} />
              </AnimatedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};