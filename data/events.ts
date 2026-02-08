import { BlogPost } from '../types';

export const FIXED_EVENTS: Partial<BlogPost>[] = [
    {
        id: 'trail-del-crocefisso',
        title: 'VIII Trail del Crocefisso',
        subtitle: 'Campionato Interregionale Trail',
        category: 'Event',
        type: 'Trail',
        imageUrl: 'https://res.cloudinary.com/drxidw3hj/image/upload/v1770477101/trail-del-crocefisso_gtbeij.webp',
        slug: { current: 'trail-del-crocefisso' },
        date: '2026-02-22',
        author: 'Staff',
        bullet: {
            levelOne: ['🏆 Campionato Interregionale Trail', '🏆 Campionato Puglia Trail', '🏆 Running in Salento', '⛰️ 17.5 KM + D350'],
            levelTwo: ['🚶 Camminata 5 KM'],
            gadget: ['👕 T-Shirt Gara', '🏅 Medaglia']
        },
        badges: [{
            image: 'https://www.pugliatrail.it/wp-content/uploads/2023/01/Senza-titolo-1-1.svg',
            description: 'Puglia Trail'
        }]
    },
    {
        id: 'eco-race-spartan-kids',
        title: 'Eco Race Spartan Kids',
        category: 'Event',
        imageUrl: 'https://res.cloudinary.com/drxidw3hj/image/upload/t_qwebp/v1770478108/athletic-man-participating-cross-country_phvsct.webp',
        slug: { current: 'eco-race-spartan-kids' },
        date: '2026-06-20',
        author: 'Staff',
        bullet: {
            levelOne: ['🏆 Campionato Spartan'],
            levelTwo: [],
            gadget: ['🏅 Medaglia']
        },
    },
    {
        id: 'fixed-5k',
        title: 'Spartan Kids 5K',
        category: 'Training',
        imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2000&auto=format&fit=crop',
        slug: { current: 'spartan-kids-5k' },
        date: '2026-07-10',
        author: 'Staff',
    },
    {
        id: 'StraTaurisano',
        title: 'StraTaurisano',
        category: '10km',
        imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2000&auto=format&fit=crop',
        slug: { current: 'spartan-kids-5k' },
        date: '2026-11-02',
        author: 'Staff',
    }
];
