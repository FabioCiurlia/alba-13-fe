export type ClubType = 'alba13' | 'ros6team';

export interface HeroData {
  title: string;
  subtitle: string;
  imageUrl: string;
  description: string;
}

export interface AboutData {
  title: string;
  description: string;
  imageUrl: string;
}



export interface Athlete {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  role?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  category: 'Training' | 'News' | 'Event' | 'Lifestyle';
  imageUrl?: string;
  slug: { current: string };
  author: string;
  team?: 'Alba13' | 'Ros6Team';
  content?: any[];
  main?: boolean;
  durata?: string;
  level?: 'Leggero' | 'Intenso' | 'Al Massimo';
  distanza?: string;
}

export interface ClubContext {
  id: string;
  name: string;
  themeColor: string;
  hero: HeroData;
  about: AboutData;
  athletes: Athlete[];
  blogPosts: BlogPost[];
}