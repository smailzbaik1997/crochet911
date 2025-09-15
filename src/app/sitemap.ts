import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/crochetpatterns`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/freecrochetpatterns`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  // Get all categories for SEO-optimized category pages
  const { data: categories } = await supabase
    .from('categories')
    .select('slug, updated_at')
    .order('updated_at', { ascending: false })

  const categoryPages = (categories || []).map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(category.updated_at || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Add SEO-optimized "crochet patterns for [category]" pages
  const seoPages = (categories || []).map((category) => ({
    url: `${baseUrl}/crochetpatternsfor/${category.slug}`,
    lastModified: new Date(category.updated_at || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Get all patterns
  const { data: patterns } = await supabase
    .from('patterns')
    .select('slug, updated_at')
    .eq('is_published', true)
    .order('updated_at', { ascending: false })

  const patternPages = (patterns || []).map((pattern) => ({
    url: `${baseUrl}/crochetpatterns/${pattern.slug}`,
    lastModified: new Date(pattern.updated_at || Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...seoPages, ...patternPages]
}