import { BlogPost } from '../types';

export const FIXED_EVENTS: Partial<BlogPost>[] = [
    {
        id: 'trail-del-crocefisso',
        title: 'VIII Trail del Crocefisso',
        category: 'Event',
        imageUrl: 'https://res.cloudinary.com/drxidw3hj/image/upload/v1770477101/trail-del-crocefisso_gtbeij.webp',
        slug: { current: 'trail-del-crocefisso' },
        date: '2026-05-15',
        author: 'Staff',
    },
    {
        id: 'fixed-10k',
        title: '10K City Trail',
        category: 'Event',
        imageUrl: 'https://res.cloudinary.com/drxidw3hj/image/upload/t_qwebp/v1770478108/athletic-man-participating-cross-country_phvsct.webp',
        slug: { current: '10k-city-trail' },
        date: '2026-06-20',
        author: 'Staff',
    },
    {
        id: 'fixed-5k',
        title: 'Spartan Kids 5K',
        category: 'Training',
        imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2000&auto=format&fit=crop',
        slug: { current: 'spartan-kids-5k' },
        date: '2026-07-10',
        author: 'Staff',
    }
];
