import { ClubContext, ClubType } from '../types';

export const MOCK_DB: Record<ClubType, ClubContext> = {
  alba13: {
    id: 'alba-13',
    name: 'Alba 13',
    themeColor: 'cyan',
    hero: {
      title: 'Ignite the Morning',
      subtitle: 'Alba 13 is the premier dawn patrol crew. We own the streets before the city wakes up. High contrast, high speed, zero excuses.',
      imageUrl: 'https://picsum.photos/1920/1080?grayscale&blur=2',
      description: 'Join Alba 13'
    },
    about: {
      title: 'Precision & Pace',
      description: 'Named after the dawn, Alba 13 represents the new beginning of every day. We are a performance-focused squad navigating the concrete grid with precision. Whether you are training for a sub-3 marathon or just love the electric feeling of a sunrise run, this is your squad.',
      imageUrl: 'https://picsum.photos/800/600?random=1'
    },
    athletes: [
      { id: 'a1', name: 'Jaxon "Jet" Silva', category: 'Elite Sprinter', role: 'Founder & Lead Coach', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800' },
      { id: 'a2', name: 'Elena Kross', category: 'Marathon Pacer', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400' },
      { id: 'a3', name: 'Marcus Chen', category: 'Strength Coach', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
      { id: 'a4', name: 'Sarah O’Neil', category: 'Triathlete', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400' },
    ],

    blogPosts: [
      { id: 'b1', title: 'Mastering the Negative Split', subtitle: 'Why finishing fast is the key to marathon success.', date: '2023-10-12', category: 'Training', author: 'Coach Jet', imageUrl: 'https://images.unsplash.com/photo-1552674605-469455965631?auto=format&fit=crop&q=80&w=800', slug: { current: 'mastering-the-negative-split' }, durata: '1h 15m', level: 'Intenso', distanza: '15km' },
      { id: 'b2', title: 'VO2 Max: The Science', subtitle: 'Breaking down the numbers behind your performance.', date: '2023-10-08', category: 'Training', author: 'Dr. A. Ray', imageUrl: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&q=80&w=800', slug: { current: 'vo2-max-the-science' }, durata: '45m', level: 'Leggero', distanza: '8km' },
      { id: 'b3', title: 'City Marathon Recap', subtitle: 'Alba 13 takes 3 podium spots in the downtown classic.', date: '2023-09-29', category: 'News', author: 'Team Alba', imageUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=800', slug: { current: 'city-marathon-recap' } },
      { id: 'b4', title: 'Winter Gear Guide', subtitle: 'Stay fast when the temperature drops below zero.', date: '2023-09-15', category: 'Lifestyle', author: 'Sarah O.', imageUrl: 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=800', slug: { current: 'winter-gear-guide' } },
    ]
  },
  ros6team: {
    id: 'ros-6-team',
    name: 'Ros6Team',
    themeColor: 'yellow',
    hero: {
      title: 'Heart of the Run',
      subtitle: 'Ros6Team is built on passion and endurance. We run for the connection, the community, and the sheer love of movement.',
      imageUrl: 'https://picsum.photos/1920/1080?blur=2',
      description: 'Run With Heart'
    },
    about: {
      title: 'Strength in Numbers',
      description: 'Ros6Team believes that no one runs alone. Our philosophy blends serious athletic discipline with an inclusive, supportive atmosphere. We tackle trails, hills, and long distances, fueled by team spirit and grit.',
      imageUrl: 'https://picsum.photos/800/600?random=2'
    },
    athletes: [
      { id: 'r1', name: 'Maria Rodriguez', category: 'Ultra Runner', role: 'Team Captain', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800' },
      { id: 'r2', name: 'Tom Baker', category: 'Trail Guide', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400' },
      { id: 'r3', name: 'Lisa Ray', category: 'Community Manager', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400' },
      { id: 'r4', name: 'Davide Rossi', category: 'Endurance Coach', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
    ],

    blogPosts: [
      { id: 'br1', title: 'Trail Safety Basics', subtitle: 'Essential tips for navigating technical terrain safely.', date: '2023-10-10', category: 'Training', author: 'Tom B.', imageUrl: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=800', slug: { current: 'trail-safety-basics' }, durata: '2h 00m', level: 'Intenso', distanza: '12km' },
      { id: 'br2', title: 'Hydration Strategy', subtitle: 'How to manage fluids on your first ultra marathon.', date: '2023-10-05', category: 'Training', author: 'Maria R.', imageUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800', slug: { current: 'hydration-strategy' }, durata: '30m', level: 'Leggero', distanza: '-' },
      { id: 'br3', title: 'Annual Charity Run', subtitle: 'We raised over $10k for local schools! See the photos.', date: '2023-10-01', category: 'Event', author: 'Lisa R.', imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800', slug: { current: 'annual-charity-run' } },
      { id: 'br4', title: 'Post-Run Nutrition', subtitle: 'Best spots in town for a recovery brunch.', date: '2023-09-20', category: 'Lifestyle', author: 'Davide', imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800', slug: { current: 'post-run-nutrition' } },
    ]
  }
};
