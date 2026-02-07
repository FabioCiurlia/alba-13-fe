export type ClubType = 'alba13' | 'ros6team';

export interface ClubConfig {
  id: string;
  name: string;
  slug: { current: string };
}

export interface HeroData {
  title: string;
  subtitle: string;
  imageUrl: string;
  image?: any;
  description: string;
}

export interface AboutData {
  title: string;
  description: string;
  imageUrl: string;
  image?: any;
}



export interface Athlete {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  image?: any;
  role?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  category: 'News' | 'Event' | 'Lifestyle';
  imageUrl?: string;
  image?: any;
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
  config: ClubConfig;
  hero: HeroData;
  about: AboutData;
  athletes: Athlete[];
  blogPosts: BlogPost[];
}