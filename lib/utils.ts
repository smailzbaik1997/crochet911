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
  
  switch (weight) {
    case 'lace':
      return 'Lace (0)'
    case 'super_fine':
      return 'Super Fine (1)'
    case 'fine':
      return 'Fine (2)'
    case 'light':
      return 'Light (3)'
    case 'medium':
      return 'Medium (4)'
    case 'bulky':
      return 'Bulky (5)'
    case 'super_bulky':
      return 'Super Bulky (6)'
    case 'jumbo':
      return 'Jumbo (7)'
    default:
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
export function generatePatternStructuredData(pattern: any) {
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
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/patterns/${pattern.slug}`
    },
    keywords: pattern.keywords?.join(', ') || '',
    articleSection: pattern.category?.name || 'Crochet Patterns'
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
      return 'bg-green-100 text-green-800'
    case 'easy':
      return 'bg-blue-100 text-blue-800'
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800'
    case 'advanced':
      return 'bg-orange-100 text-orange-800'
    case 'expert':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
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