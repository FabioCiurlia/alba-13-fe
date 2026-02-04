import { createClient } from '@sanity/client';
import { ClubContext, ClubType, BlogPost } from '../types';

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

  // GROQ Query to fetch Club data and expand references (Athletes, Blog Posts)
  // We rename fields (e.g., image.asset->url as imageUrl) to match our frontend interfaces.
  const query = `*[_type == "club" && slug.current == $slug][0]{
    "id": _id,
    name,
    hero {
      title,
      subtitle,
      description,
      "imageUrl": image.asset->url
    },
    about {
      title,
      description,
      "imageUrl": image.asset->url
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
      "id": _id,
      title,
      subtitle,
      slug,
      date,
      category,
      author,
      "imageUrl": image.asset->url,
      main,
      durata,
      level,
      distanza
    }
  }`;

  try {
    console.log(`Fetching Sanity data for slug: ${slug} and team: ${teamName}...`);
    const data = await client.fetch<ClubContext>(query, { slug, teamName });

    if (data) {
      console.log("Data fetched successfully:", data);
      return data;
    } else {
      console.warn(`Sanity fetch returned no data for slug: ${slug}. Check if document exists and is published.`);
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