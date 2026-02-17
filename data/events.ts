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
            levelOne: ['🏆 1^ Prova Circuito Interregionale Trail Fidal Sud 2026', '🏆 1^ Tappa del Circuito Puglia Trail', '🏆 2^ Prova Running in Salento Trail, Cross & Mountain Running 2026'],
            levelTwo: ['⛰️ Trail', '🚶 Camminata 5 KM'],
            gadget: ['👕 T-Shirt Gara', '🏅 Medaglia', 'Ristoro']
        },
        badges: [{
            image: 'https://www.pugliatrail.it/wp-content/uploads/2023/01/Senza-titolo-1-1.svg',
            description: 'Puglia Trail'
        },
        ],
        place: 'Taurisano',
        distanza: '17.5 KM',
        enabled: true,
        open: true,
        link: `/alba13/events/trail-del-crocefisso`,
        overlayColor: 'bg-cyan-900/40',
        subscribeLink: 'https://www.icron.it/newgo/#/evento/20264663',
        description: "Il Trail del Crocefisso è arrivato alla sua 8* edizione ed quest'anno ha il compito di aprire la nuova stagione del trail in Puglia."
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
        enabled: true,
        open: false,
        link: '/alba13/events/eco-race-spartan-kids',
        overlayColor: 'bg-emerald-900/40'
    },
    {
        id: 'vertical-sprint',
        title: 'Vertical Sprint',
        category: 'Event',
        imageUrl: 'https://res.cloudinary.com/drxidw3hj/image/upload/t_qwebp/v1770675682/Vertical_Sprint_gara_hjpuzb.webp',
        slug: { current: 'vertical-sprint' },
        date: '2026-07-10',
        author: 'Staff',
        bullet: {
            levelOne: ['🏆 Vertical Sprint'],
            levelTwo: [],
            gadget: ['🏅 Medaglia']
        },
        place: 'Gallipoli',
        type: 'Vertical',
        enabled: true,
        open: false,
        link: '/alba13/events/vertical-sprint',
        overlayColor: 'bg-blue-900/40'
    },
    {
        id: 'StraTaurisano',
        title: 'StraTaurisano',
        category: 'Event',
        imageUrl: 'https://res.cloudinary.com/drxidw3hj/image/upload/v1770674214/h2-img-4_ncelsk.jpg',
        slug: { current: 'stra-taurisano' },
        date: '2026-11-02',
        author: 'Staff',
        bullet: {
            levelOne: ['🏆 10 KM'],
            levelTwo: [],
            gadget: ['🏅 Medaglia']
        },
        place: 'Taurisano',
        type: 'Running',
        enabled: true,
        open: false,
        link: '/alba13/events/stra-taurisano',
        overlayColor: 'bg-amber-900/40'
    }
];
