import { BlogPost } from '@/types';
import { ThemeType } from '@/utils/theme';
import { Calendar, Tag } from 'lucide-react';


interface PricingSectionProps {
    events: Partial<BlogPost>[];
    theme: ThemeType;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ events, theme }) => {
    return (
        <section
            className={`py-8 bg-white relative overflow-hidden`}
            style={{
                backgroundImage: 'radial-gradient(circle, #e5e7eb 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px'
            }}
        >
            <div className="container mx-auto px-6">


                {/* Mobile: Horizontal Scroll | Desktop: Grid */}
                <div className="flex overflow-x-auto md:grid lg:grid-cols-4 md:grid-cols-2 gap-4 no-scrollbar snap-x snap-mandatory pb-8 ">
                    {events.map((event, index) => (
                        <div
                            key={event.id || index}
                            className={`
                                relative flex flex-col shrink-0 w-[85vw] md:w-auto snap-center
                                bg-white border border-slate-200 rounded-[0.5rem] overflow-hidden 
                                transition-all duration-500 group
                                hover:-translate-y-2 hover:shadow-xl
                            `}
                        >
                            {/* Hover Gradient Overlay */}
                            <div
                                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none z-0`}
                                style={{
                                    background: `linear-gradient(135deg, white 0%, var(--${theme.primary}-raw, ${theme.primary === 'cyan-600' ? '#0891b2' : '#ca8a04'}) 100%)`
                                }}
                            />
                            {/* Category Badge */}
                            <div className={`absolute text-md top-4 right-4 z-20 py-2 px-4 rounded-full text-[10px] font-bold uppercase tracking-tighter bg-${theme.primary} text-white shadow-lg`}>
                                {event.category}
                            </div>

                            {/* Header Image 4/3 */}
                            <div className="aspect-[4/3] sm:aspect-[6/3] w-full overflow-hidden relative">
                                <img
                                    src={event.imageUrl || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2000&auto=format&fit=crop'}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 "
                                />
                                <div className="absolute inset-0" />
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-1 justify-between">
                                <div className="flex items-center gap-2 mb-4 text-black/80">
                                    <Calendar size={16} className={`text-${theme.primary}`} />
                                    <span className="text-sm font-bold uppercase tracking-widest">
                                        {event.date ? new Date(event.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Data da definire'}
                                    </span>
                                </div>

                                <div className='flex-1 my-2'>
                                    {event.bullet?.levelOne && event.bullet.levelOne.length > 0 && <hr />}
                                    {event.bullet?.levelOne && event.bullet.levelOne.length > 0 && event.bullet.levelOne.map((bullet, index) => (
                                        <div key={index} className="text-sm text-black/80 text-sm my-3 leading-relaxed line-clamp-3 flex items-center gap-2">
                                            {bullet}
                                        </div>
                                    ))}
                                    {event.bullet?.levelTwo && event.bullet.levelTwo.length > 0 && <hr />}
                                    {event.bullet?.levelTwo && event.bullet.levelTwo.length > 0 && event.bullet.levelTwo.map((bullet, index) => (
                                        <div key={index} className="text-sm text-black/80 text-sm my-3 leading-relaxed line-clamp-3 flex items-center gap-2">
                                            {bullet}
                                        </div>
                                    ))}
                                    {event.bullet?.gadget && event.bullet.gadget.length > 0 && <hr />}
                                    {event.bullet?.gadget && event.bullet.gadget.length > 0 && event.bullet.gadget.map((bullet, index) => (
                                        <div key={index} className="text-sm text-black/80 text-sm my-3 leading-relaxed line-clamp-3 flex items-center gap-2">
                                            {bullet}
                                        </div>
                                    ))}
                                </div>

                                <div className="hidden space-y-4 mb-10 flex flex-row gap-2 justify-start align-start item-start">
                                    {event.badges && event.badges.length > 0 && event.badges.map((badge, index) => (
                                        <div key={index} className=" items-center gap-3 text-sm text-black/80">
                                            <img src={badge.image} alt={badge.description} className="w-20 h-20" />
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className={`
                                        w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all border
                                        bg-white text-${theme.primary} group-hover:text-white hover:bg-${theme.primary} group-hover:bg-${theme.primary} active:scale-95
                                    `}
                                >
                                    ISCRIVITI
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
