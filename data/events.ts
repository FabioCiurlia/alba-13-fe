import { BlogPost } from '../types';

export const FIXED_EVENTS: Partial<BlogPost>[] = [
    {
        id: 'trail-del-crocefisso',
        title: 'VIII Trail del Crocefisso',
        subtitle: 'Campionato Interregionale Trail',
        category: 'Event',
        type: 'Trail',
        imageUrl: 'https://res.cloudinary.com/drxidw3hj/image/upload/v1770674213/h2-img-1_dyry2u.jpg',
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
        }],
        place: 'Taurisano',
        distanza: '17.5 KM',
        enabled: true,
        link: 'https://www.pugliatrail.it/trail-del-crocefisso/',
        overlayColor: 'bg-cyan-900/40'
    },
    {
        id: 'eco-race-spartan-kids',
        title: 'Eco Race Spartan Kids',
        category: 'Event',
        imageUrl: 'https://res.cloudinary.com/drxidw3hj/image/upload/v1770675359/spartan-kids_wrui9y.jpg',
        slug: { current: 'eco-race-spartan-kids' },
        date: '2026-06-20',
        author: 'Staff',
        bullet: {
            levelOne: ['🏆 Eco Race Spartan Kids'],
            levelTwo: [],
            gadget: ['🏅 Medaglia']
        },
        place: 'Gallipoli',
        type: 'Spartan',
        enabled: false,
        link: 'https://www.pugliatrail.it/eco-race-spartan-kids/',
        overlayColor: 'bg-emerald-900/40'
    },
    {
        id: 'vertical-sprint',
        title: 'Vertical Sprint',
        category: 'Event',
        imageUrl: 'https://res.cloudinary.com/drxidw3hj/image/upload/t_qwebp/v1770675682/Vertical_Sprint_gara_hjpuzb.webp',
        slug: { current: 'spartan-kids-5k' },
        date: '2026-07-10',
        author: 'Staff',
        bullet: {
            levelOne: ['🏆 Vertical Sprint'],
            levelTwo: [],
            gadget: ['🏅 Medaglia']
        },
        place: 'Gallipoli',
        type: 'Vertical',
        enabled: false,
        link: 'https://www.pugliatrail.it/vertical-sprint/',
        overlayColor: 'bg-blue-900/40'
    },
    {
        id: 'StraTaurisano',
        title: 'StraTaurisano',
        category: 'Event',
        imageUrl: 'https://res.cloudinary.com/drxidw3hj/image/upload/v1770674214/h2-img-4_ncelsk.jpg',
        slug: { current: 'spartan-kids-5k' },
        date: '2026-11-02',
        author: 'Staff',
        bullet: {
            levelOne: ['🏆 10 KM'],
            levelTwo: [],
            gadget: ['🏅 Medaglia']
        },
        place: 'Taurisano',
        type: 'Running',
        enabled: false,
        link: 'https://www.pugliatrail.it/stra-taurisano/',
        overlayColor: 'bg-amber-900/40'
    }
];
