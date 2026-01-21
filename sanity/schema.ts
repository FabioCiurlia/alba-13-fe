

// 2. DOCUMENT: Athlete
const athlete = {
  name: 'athlete',
  title: 'Athlete',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Full Name' },
    { name: 'category', type: 'string', title: 'Category (e.g., Elite Sprinter)' },
    { name: 'role', type: 'string', title: 'Role (Optional)' },
    { name: 'image', type: 'image', title: 'Profile Picture', options: { hotspot: true } },
    { name: 'team', type: 'string', title: 'Squadra', options: { list: ['Alba13', 'Ros6Team'] } }
  ]
};

// 3. DOCUMENT: Blog Post
const blogPost = {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'team', type: 'string', title: 'Squadra', options: { list: ['Alba13', 'Ros6Team'] } },
    { name: 'title', type: 'string', title: 'Titolo Articolo' },
    { name: 'subtitle', type: 'string', title: 'Sottotitolo (Anteprima)' },
    {
      name: 'content',
      title: 'Testo Articolo',
      type: 'array',
      of: [
        { type: 'block' }, { type: 'image' }, { type: 'gallery' }
      ]
    },
    {
      name: 'date', type: 'date', title: 'Data', options: {
        dateFormat: 'DD-MM-YYYY',
        calendarTodayLabel: 'Oggi'
      }
    },
    { name: 'author', type: 'string', title: 'Autore' },
    {
      name: 'category',
      type: 'string',
      title: 'Categoria Articolo',
      options: { list: ['Training', 'News', 'Event', 'Lifestyle'] }
    },
    {
      name: 'durata',
      type: 'string',
      title: 'Durata (es. 58:30)',
      hidden: ({ document }) => document?.category !== 'Training'
    },
    {
      name: 'level',
      type: 'string',
      title: 'Livello Intensità',
      options: {
        list: ['Leggero', 'Intenso', 'Al Massimo']
      },
      hidden: ({ document }) => document?.category !== 'Training'
    },
    {
      name: 'distanza',
      type: 'string',
      title: 'Distanza (es. 12km)',
      hidden: ({ document }) => document?.category !== 'Training'
    },
    { name: 'image', type: 'image', title: 'Cover Image', options: { hotspot: true } },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 }
    },
    { name: 'main', type: 'boolean', title: 'In Copertina' }

  ]
};

// 4. DOCUMENT: Club (The Main Page Content)
const club = {
  name: 'club',
  title: 'Club Page',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Nome Squadra' },
    { name: 'slug', type: 'slug', title: 'Slug (ID)', options: { source: 'name' } },
    { name: 'themeColor', type: 'string', title: 'Colore Principale' },

    // Hero Section
    {
      name: 'hero',
      type: 'object',
      title: 'Cover',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'subtitle', type: 'string' },
        { name: 'description', type: 'text' },
        { name: 'image', type: 'image' }
      ]
    },

    // About Section
    {
      name: 'about',
      type: 'object',
      title: 'Storia',
      fields: [
        { name: 'title', type: 'string', title: 'Titolo' },
        { name: 'description', type: 'text', title: 'Descrizione' },
        { name: 'image', type: 'image', title: 'Immagine' },
      ]
    },


  ]
};

// A reusable Rich Text array
const portableText = {
  name: 'portableText',
  type: 'array',
  title: 'Content',
  of: [{ type: 'block' }]
};

const gallery = {
  name: 'gallery',
  type: 'object',
  title: 'Galleria Immagini',
  fields: [
    {
      name: 'images',
      type: 'array',
      title: 'Immagini',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Testo Alternativo (SEO)',
            }
          ]
        }
      ],
      options: {
        layout: 'grid' // Visualizzazione a griglia nello Studio
      }
    },
    {
      name: 'display',
      type: 'string',
      title: 'Visualizzazione',
      options: {
        list: [
          { title: 'Slider', value: 'slider' },
          { title: 'Griglia', value: 'grid' }
        ]
      }
    }
  ]
};

export const schemaTypes = [club, athlete, blogPost, gallery];
