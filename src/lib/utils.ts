// Utility functions for the crochet patterns website

// Format difficulty level for display
export function formatDifficulty(difficulty: string): string {
  switch (difficulty) {
    case 'beginner':
      return 'Beginner'
    case 'easy':
      return 'Easy'
    case 'intermediate':
      return 'Intermediate'
    case 'advanced':
      return 'Advanced'
    case 'expert':
      return 'Expert'
    default:
      return difficulty
  }
}

// Format yarn weight for display
export function formatYarnWeight(weight: string | null): string {
  if (!weight) return 'Any weight'
  
  // Handle both old format (with underscores) and new format (with spaces and numbers)
  switch (weight.toLowerCase()) {
    case 'lace':
    case 'lace (0)':
      return 'Lace (0)'
    case 'super_fine':
    case 'super fine (1)':
      return 'Super Fine (1)'
    case 'fine':
    case 'fine (2)':
      return 'Fine (2)'
    case 'light':
    case 'light (3)':
      return 'Light (3)'
    case 'medium':
    case 'medium (4)':
      return 'Medium (4)'
    case 'bulky':
    case 'bulky (5)':
      return 'Bulky (5)'
    case 'super_bulky':
    case 'super bulky (6)':
      return 'Super Bulky (6)'
    case 'jumbo':
    case 'jumbo (7)':
      return 'Jumbo (7)'
    default:
      // If it's already in the descriptive format, return as-is
      return weight
  }
}

// Generate SEO-friendly URL slug
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

// Truncate text to specified length
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Generate structured data for SEO
export function generatePatternStructuredData(pattern: any, basePath: string = '/crochetpatterns') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pattern.title,
    description: pattern.short_description || pattern.description,
    image: pattern.featured_image_url,
    author: {
      '@type': 'Person',
      name: pattern.designer?.name || 'Anonymous'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Crochet911',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png'
      }
    },
    datePublished: pattern.created_at,
    dateModified: pattern.updated_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}${basePath}/${pattern.slug}`
    },
    keywords: pattern.keywords?.join(', ') || '',
    articleSection: pattern.category?.name || 'Crochet Patterns',
    offers: pattern.is_free ? {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    } : undefined
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${process.env.NEXT_PUBLIC_SITE_URL}${item.url}`
    }))
  }
}

// Get difficulty color for badges
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'beginner':
      return 'bg-emerald-100 text-emerald-800'
    case 'easy':
      return 'bg-blue-100 text-blue-800'
    case 'intermediate':
      return 'bg-amber-100 text-amber-800'
    case 'advanced':
      return 'bg-orange-100 text-orange-800'
    case 'expert':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-slate-100 text-slate-800'
  }
}

// Generate meta description from pattern data
export function generateMetaDescription(pattern: any): string {
  if (pattern.meta_description) return pattern.meta_description
  
  const description = pattern.short_description || pattern.description
  const maxLength = 155
  
  let meta = `Free crochet pattern: ${pattern.title}.`
  
  if (pattern.difficulty) {
    meta += ` ${formatDifficulty(pattern.difficulty)} level.`
  }
  
  if (pattern.category?.name) {
    meta += ` Category: ${pattern.category.name}.`
  }
  
  const remaining = maxLength - meta.length
  if (remaining > 0 && description) {
    const truncated = truncateText(description, remaining - 3)
    meta += ` ${truncated}`
  }
  
  return meta.substring(0, maxLength)
}

// Validate image URL
export function getValidImageUrl(url: string | null, fallback: string = '/placeholder-pattern.jpg'): string {
  if (!url) return fallback
  
  // Check if it's a valid URL
  try {
    new URL(url)
    return url
  } catch {
    return fallback
  }
}

// Format category path for breadcrumbs
export function getCategoryPath(category: any, subcategory?: any) {
  const path = [
    { name: 'Home', url: '/' },
    { name: 'Categories', url: '/categories' }
  ]
  
  if (category) {
    path.push({
      name: category.name,
      url: `/categories/${category.slug}`
    })
  }
  
  if (subcategory) {
    path.push({
      name: subcategory.name,
      url: `/categories/${subcategory.slug}`
    })
  }
  
  return path
}

// Generate SEO-optimized category description
export function generateCategoryDescription(categoryName: string, patternCount?: number): string {
  const count = patternCount ? `${patternCount}+ ` : ''
  return `Discover ${count}${categoryName.toLowerCase()} crochet patterns for all skill levels. Browse free and premium ${categoryName.toLowerCase()} crochet designs from talented designers worldwide. Perfect patterns for beginners to experts with detailed instructions and helpful tips.`
}

// Generate long-tail keywords for category pages
export function generateCategoryKeywords(categoryName: string): string[] {
  const base = categoryName.toLowerCase()
  return [
    `${base} crochet patterns`,
    `crochet patterns for ${base}`,
    `free ${base} crochet patterns`,
    `${base} amigurumi patterns`,
    `easy ${base} crochet`,
    `beginner ${base} crochet patterns`,
    `${base} crochet designs`,
    `${base} crochet tutorial`,
    `${base} crochet ideas`,
    `how to crochet ${base}`,
    `${base} crochet pattern free`,
    `crochet ${base} step by step`,
    `${base} crochet instructions`,
    `${base} crochet guide`,
    `${base} crochet projects`
  ]
}

// Generate FAQ content for categories
export function generateCategoryFAQ(categoryName: string) {
  const base = categoryName.toLowerCase()
  return [
    {
      question: `What skill level do I need for ${base} crochet patterns?`,
      answer: `Our ${base} crochet pattern collection includes designs for all skill levels. Beginners can start with simple ${base} patterns that use basic stitches, while experienced crocheters can challenge themselves with intricate designs featuring advanced techniques.`
    },
    {
      question: `Are there free ${base} crochet patterns available?`,
      answer: `Yes! We offer many free ${base} crochet patterns alongside our premium designs. Free patterns include basic instructions and are perfect for trying new techniques or quick projects.`
    },
    {
      question: `What materials do I need for ${base} crochet projects?`,
      answer: `Each ${base} crochet pattern includes a complete materials list with yarn weight, hook sizes, and any additional supplies needed. Most patterns can be adapted to use different yarn weights with appropriate hook size adjustments.`
    },
    {
      question: `How long does it take to complete ${base} crochet patterns?`,
      answer: `The time required depends on the complexity of the pattern and your skill level. Simple ${base} projects might take a few hours, while detailed designs could take several days or weeks. Each pattern includes an estimated completion time to help you plan your project.`
    }
  ]
}