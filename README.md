# Crochet911 - SEO Programmatic Crochet Patterns Website

A comprehensive Next.js-based website for crochet patterns built with Supabase as the backend database. Features SEO optimization, dynamic pattern pages, and organized categories.

## Features

- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🔍 **SEO Optimized** - Meta tags, structured data, and optimized URLs
- 🎯 **Dynamic Categories** - Extensive category system with subcategories
- 🔗 **Pattern Details** - Complete pattern information with images, difficulty, materials
- 🎨 **Modern UI** - Clean, modern design with Tailwind CSS
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized for speed
- 💾 **Supabase Backend** - Scalable database with real-time capabilities

## Category Structure

The website includes comprehensive categories:

### Main Categories
- **Animals** (Cats, Dogs, Frogs, Owls, Bears, Rabbits, Elephants, Turtles, Foxes, Dolphins)
- **Holidays & Seasonal** (Christmas, Halloween, Easter, Valentine's, Thanksgiving)
- **Flowers & Plants** (Roses, Sunflowers, Tulips, Lilies, Daisies, Succulents, Cacti)
- **Fantasy & Mythical** (Unicorns, Dragons, Mermaids, Fairies, Wizards)
- **Clothing & Accessories** (Hats, Scarves, Sweaters, Socks, Gloves, Shawls)
- **Blankets & Afghans** (Granny square, Chevron, Baby blankets, Mandala)
- **Home Decor** (Doilies, Wall hangings, Rugs, Baskets, Pillow covers)
- **Food & Drink** (Cupcakes, Donuts, Fruits, Vegetables, Coffee cups)
- **Baby & Kids** (Baby booties, Baby hats, Toys, Pacifier clips, Rattles)
- **Toys & Dolls** (Amigurumi dolls, Finger puppets, Teddy bears)
- **Bags & Purses** (Tote bags, Market bags, Clutch purses, Backpacks)
- **Jewelry & Small Accessories** (Earrings, Necklaces, Bracelets, Headbands)
- **Cultural & Flags** (Country flags, Pride flags, Ethnic patterns)
- **Religious & Spiritual** (Crosses, Stars, Prayer rugs, Angels, Mandalas)
- **Pets & Pet Accessories** (Dog sweaters, Cat toys, Pet beds)
- **Nature & Outdoors** (Seashells, Mountains, Clouds, Snowflakes)
- **Patterns by Stitch Style** (Granny square, Filet, Tunisian, Mosaic)
- **Utility & Everyday Items** (Dishcloths, Towels, Pot holders, Aprons)
- **Seasonal Wear** (Summer tops, Winter hats, Autumn shawls)
- **Special Occasions** (Wedding dresses, Baby shower gifts, Halloween costumes)

## Quick Setup

### Prerequisites
- Node.js 18+ 
- A Supabase account (free tier available)

### 1. Clone and Install

```bash
# Install dependencies
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Set Up Database

1. In your Supabase dashboard, go to the SQL editor
2. Run the schema from `database/schema.sql`
3. Run the seed data from `database/seed.sql`

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your website!

## Database Schema

The database includes the following main tables:

- **categories** - Main and subcategories for organizing patterns
- **designers** - Pattern creators and their information
- **patterns** - Main patterns table with all pattern details
- **tags** - Flexible tagging system for patterns
- **pattern_tags** - Many-to-many relationship between patterns and tags

### Key Features of Each Pattern:
- Title, description, and SEO metadata
- Difficulty level (beginner to expert)
- Yarn weight and material details
- Hook size and finished dimensions
- Free or premium pricing
- High-quality images
- Designer attribution
- Category classification
- View counts and engagement metrics

## SEO Features

- **Meta Tags** - Dynamic meta titles and descriptions for each page
- **Structured Data** - JSON-LD schema markup for patterns and breadcrumbs
- **Open Graph** - Social media sharing optimization
- **Semantic URLs** - Clean, descriptive URLs for all pages
- **Image Optimization** - Next.js Image component with proper alt text
- **Performance** - Optimized for Core Web Vitals

## File Structure

```
src/
├── app/                    # Next.js app router
│   ├── categories/         # Category listing and detail pages
│   ├── patterns/           # Pattern detail pages
│   ├── designers/          # Designer pages
│   ├── layout.tsx          # Root layout with navigation
│   └── page.tsx            # Homepage
├── components/             # Reusable React components
│   ├── Navigation.tsx      # Main navigation with categories
│   └── PatternCard.tsx     # Pattern display component
└── lib/                    # Utility functions and data fetching
    ├── supabase.ts         # Supabase client configuration
    ├── data.ts             # Data fetching functions
    └── utils.ts            # Helper utilities and SEO functions
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Customization

### Adding New Categories
1. Add categories to the database via Supabase dashboard
2. Update category icons in the utility functions if needed

### Adding New Patterns
1. Use the Supabase dashboard to add patterns
2. Ensure proper image URLs and SEO metadata

### Styling
- Built with Tailwind CSS
- Color scheme uses pink/purple gradients
- Fully responsive design
- Easy to customize via Tailwind configuration

## Performance Optimizations

- **Image Optimization** - Next.js Image component with proper sizing
- **Code Splitting** - Automatic code splitting with Next.js
- **Static Generation** - Pre-rendered pages where possible
- **Database Indexing** - Optimized database queries with proper indexes
- **Lazy Loading** - Images and components loaded as needed

## Contributing

This is a complete, production-ready crochet patterns website. You can:

1. Add more patterns to the database
2. Customize the design and branding
3. Add new features like user accounts, favorites, etc.
4. Implement search functionality
5. Add payment processing for premium patterns

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (recommended)
- **Images**: Next.js Image optimization
- **SEO**: Built-in meta tags and structured data

## License

MIT License - feel free to use this as a starting point for your own crochet patterns website!
