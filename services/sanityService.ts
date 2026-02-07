import { createClient } from '@sanity/client';
import { ClubContext, ClubType, BlogPost, ClubConfig } from '../types';
import { getThemeBySlug } from '../utils/theme';

// Initialize Sanity Client
export const client = createClient({
  projectId: "xm41fhrg",
  dataset: "production",
  apiVersion: "2026-01-04",
  useCdn: true, // Set to true for production to cache content
});

// Helper to map ClubType to the Slug expected in Sanity
const SLUG_MAP: Record<ClubType, string> = {
  alba13: 'alba13',
  ros6team: 'ros6team'
};

const TEAM_NAME_MAP: Record<ClubType, string> = {
  alba13: 'Alba13',
  ros6team: 'Ros6Team'
};

export const getClubContent = async (type: ClubType): Promise<ClubContext | null> => {
  const slug = SLUG_MAP[type];

  const teamName = TEAM_NAME_MAP[type];

  // GROQ Query - Simplified, colors and theme are handled locally
  const query = `*[_type == "club" && slug.current == $slug][0]{
    "id": _id,
    name,
    "slug": slug,
    hero {
      title,
      subtitle,
      description,
      "imageUrl": image.asset->url,
      image
    },
    about {
      title,
      description,
      "imageUrl": image.asset->url,
      image
    },

    "athletes": *[_type == "athlete" && team == $teamName] | order(order asc) {
      "id": _id,
      name,
      category,
      role,
      "imageUrl": select(defined(urlImage) => urlImage, image.asset->url)
    },
    "blogPosts": *[_type == "blogPost" && team == $teamName] {
      "id": _id,
      title,
      subtitle,
      slug,
      date,
      category,
      author,
      image,
      "imageUrl": image.asset->url,
      main,
      durata,
      level,
      distanza
    }
  }`;

  try {
    console.log(`Fetching Sanity data for slug: ${slug} and team: ${teamName}...`);
    const data = await client.fetch<any>(query, { slug, teamName });

    if (data) {
      // Reconstruct config using local theme
      const localTheme = getThemeBySlug(type);
      const config: ClubConfig = {
        id: data.id,
        name: data.name,
        slug: data.slug
      };

      console.log("Data fetched successfully with local theme.");
      return { ...data, config };
    } else {
      console.warn(`Sanity fetch returned no data for slug: ${slug}.`);
      return null;
    }
  } catch (error) {
    console.error("Sanity fetch failed completely. Check network or CORS:", error);
    return null;
  }
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const query = `*[_type == "blogPost" && slug.current == $slug][0]{
    "id": _id,
    "id": _id,
    title,
    subtitle,
    slug,
    date,
    category,
    author,
    image,
    "imageUrl": image.asset->url,
    "team": team,
    durata,
    level,
    distanza,
    content[] {
      ...,
      _type == "gallery" => {
        ...,
        images[] {
          ...,
          "url": asset->url
        }
      }
    }
  }`;

  try {
    const data = await client.fetch<BlogPost>(query, { slug });
    return data || null;
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }
};