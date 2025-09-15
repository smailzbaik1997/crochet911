// Real-time data hooks using Supabase subscriptions
'use client'

import { useState, useEffect } from 'react'
import { supabase } from './supabase'

// Generic type for pattern data
interface Pattern {
  id: string
  title: string
  slug: string
  description: string
  short_description: string | null
  difficulty: 'beginner' | 'easy' | 'intermediate' | 'advanced' | 'expert'
  featured_image_url: string | null
  image_alt_text: string | null
  is_free: boolean
  price: number | null
  view_count: number
  created_at: string
  updated_at: string
  is_published: boolean
  featured: boolean
  designer?: {
    name: string
    slug: string
  }
  category?: {
    name: string
    slug: string
  }
}

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  parent_id: string | null
  sort_order: number
  pattern_count?: number
  subcategories?: Category[]
}

// Hook for real-time featured patterns
export function useRealtimeFeaturedPatterns(limit = 6) {
  const [patterns, setPatterns] = useState<Pattern[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Initial fetch
    async function fetchFeaturedPatterns() {
      try {
        const { data, error } = await supabase
          .from('patterns')
          .select(`
            *,
            designer:designers(*),
            category:categories(*)
          `)
          .eq('is_published', true)
          .eq('featured', true)
          .order('created_at', { ascending: false })
          .limit(limit)

        if (error) throw error
        setPatterns(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedPatterns()

    // Set up real-time subscription
    const channel = supabase
      .channel('featured-patterns')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'patterns',
          filter: 'featured=eq.true'
        },
        async (payload) => {
          console.log('Featured patterns change:', payload)
          // Refetch data when changes occur
          await fetchFeaturedPatterns()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [limit])

  return { patterns, loading, error }
}

// Hook for real-time recent patterns
export function useRealtimeRecentPatterns(limit = 12) {
  const [patterns, setPatterns] = useState<Pattern[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Initial fetch
    async function fetchRecentPatterns() {
      try {
        const { data, error } = await supabase
          .from('patterns')
          .select(`
            *,
            designer:designers(*),
            category:categories(*)
          `)
          .eq('is_published', true)
          .order('created_at', { ascending: false })
          .limit(limit)

        if (error) throw error
        setPatterns(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchRecentPatterns()

    // Set up real-time subscription
    const channel = supabase
      .channel('recent-patterns')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'patterns'
        },
        async (payload) => {
          console.log('Patterns change:', payload)
          // Refetch data when changes occur
          await fetchRecentPatterns()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [limit])

  return { patterns, loading, error }
}

// Hook for real-time categories
export function useRealtimeCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Initial fetch
    async function fetchCategories() {
      try {
        const { data: mainCategories, error } = await supabase
          .from('categories')
          .select('*')
          .is('parent_id', null)
          .order('sort_order')

        if (error) throw error

        // Fetch subcategories and pattern counts for each main category
        const categoriesWithSubs = await Promise.all(
          (mainCategories || []).map(async (category) => {
            const [subcategoriesResult, patternCountResult] = await Promise.all([
              // Get subcategories
              supabase
                .from('categories')
                .select('*')
                .eq('parent_id', category.id)
                .order('sort_order'),
              // Get pattern count for this category
              supabase
                .from('patterns')
                .select('*', { count: 'exact', head: true })
                .eq('is_published', true)
                .eq('category_id', category.id)
            ])

            // Get pattern counts for subcategories too
            const subcategoriesWithCounts = await Promise.all(
              (subcategoriesResult.data || []).map(async (subcat) => {
                const { count } = await supabase
                  .from('patterns')
                  .select('*', { count: 'exact', head: true })
                  .eq('is_published', true)
                  .eq('category_id', subcat.id)

                return {
                  ...subcat,
                  pattern_count: count || 0
                }
              })
            )

            return {
              ...category,
              pattern_count: patternCountResult.count || 0,
              subcategories: subcategoriesWithCounts || []
            }
          })
        )

        // Sort categories by pattern count (descending) to prioritize active categories
        const sortedCategories = categoriesWithSubs.sort((a, b) => (b.pattern_count || 0) - (a.pattern_count || 0))
        setCategories(sortedCategories)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()

    // Set up real-time subscription for categories
    const categoriesChannel = supabase
      .channel('categories')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'categories'
        },
        async () => {
          console.log('Categories change detected')
          await fetchCategories()
        }
      )
      .subscribe()

    // Set up real-time subscription for patterns (to update counts)
    const patternsChannel = supabase
      .channel('patterns-for-categories')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'patterns'
        },
        async () => {
          console.log('Patterns change detected, updating category counts')
          await fetchCategories()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(categoriesChannel)
      supabase.removeChannel(patternsChannel)
    }
  }, [])

  return { categories, loading, error }
}

// Hook for real-time patterns with filters
export function useRealtimePatterns(filters: {
  difficulty?: string
  is_free?: boolean
  sort?: string
  limit?: number
  offset?: number
  categorySlug?: string
} = {}) {
  const [patterns, setPatterns] = useState<Pattern[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Initial fetch
    async function fetchPatterns() {
      try {
        let query = supabase
          .from('patterns')
          .select(`
            *,
            designer:designers(*),
            category:categories(*)
          `)
          .eq('is_published', true)

        // Apply category filter if specified
        if (filters.categorySlug) {
          const { data: category } = await supabase
            .from('categories')
            .select('id')
            .eq('slug', filters.categorySlug)
            .single()

          if (category) {
            query = query.eq('category_id', category.id)
          }
        }

        // Apply difficulty filter
        if (filters.difficulty) {
          query = query.eq('difficulty', filters.difficulty)
        }

        // Apply free/premium filter
        if (filters.is_free !== undefined) {
          query = query.eq('is_free', filters.is_free)
        }

        // Apply sorting
        switch (filters.sort) {
          case 'oldest':
            query = query.order('created_at', { ascending: true })
            break
          case 'popular':
            query = query.order('view_count', { ascending: false })
            break
          case 'title':
            query = query.order('title', { ascending: true })
            break
          case 'newest':
          default:
            query = query.order('created_at', { ascending: false })
            break
        }

        // Apply pagination
        if (filters.limit) {
          const offset = filters.offset || 0
          query = query.range(offset, offset + filters.limit - 1)
        }

        const { data, error } = await query

        if (error) throw error
        setPatterns(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPatterns()

    // Set up real-time subscription
    const channel = supabase
      .channel('filtered-patterns')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'patterns'
        },
        async (payload) => {
          console.log('Patterns change:', payload)
          // Refetch data when changes occur
          await fetchPatterns()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [filters.difficulty, filters.is_free, filters.sort, filters.limit, filters.offset, filters.categorySlug])

  return { patterns, loading, error }
}

// Hook for real-time pattern by slug
export function useRealtimePattern(slug: string) {
  const [pattern, setPattern] = useState<Pattern | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    // Initial fetch
    async function fetchPattern() {
      try {
        const { data, error } = await supabase
          .from('patterns')
          .select(`
            *,
            designer:designers(*),
            category:categories(*),
            pattern_tags(
              tag:tags(*)
            )
          `)
          .eq('slug', slug)
          .eq('is_published', true)
          .single()

        if (error) throw error
        setPattern(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Pattern not found')
      } finally {
        setLoading(false)
      }
    }

    fetchPattern()

    // Set up real-time subscription for this specific pattern
    const channel = supabase
      .channel(`pattern-${slug}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'patterns',
          filter: `slug=eq.${slug}`
        },
        async (payload) => {
          console.log('Pattern change:', payload)
          await fetchPattern()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [slug])

  return { pattern, loading, error }
}

// Hook for real-time search results
export function useRealtimeSearch(query: string, limit = 20) {
  const [patterns, setPatterns] = useState<Pattern[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query.trim()) {
      setPatterns([])
      setLoading(false)
      return
    }

    // Initial search
    async function searchPatterns() {
      try {
        // First try full-text search using the database index
        const { data: fullTextResults, error: fullTextError } = await supabase
          .from('patterns')
          .select(`
            *,
            designer:designers(*),
            category:categories(*)
          `)
          .eq('is_published', true)
          .textSearch('title,description,yarn_details', query)
          .order('created_at', { ascending: false })
          .limit(limit)

        if (!fullTextError && fullTextResults && fullTextResults.length > 0) {
          setPatterns(fullTextResults)
          return
        }

        // If full-text search doesn't work or returns no results, try ilike search
        const searchTerm = `%${query.toLowerCase()}%`
        const { data, error } = await supabase
          .from('patterns')
          .select(`
            *,
            designer:designers(*),
            category:categories(*)
          `)
          .eq('is_published', true)
          .or(`title.ilike.${searchTerm},description.ilike.${searchTerm},yarn_details.ilike.${searchTerm}`)
          .order('created_at', { ascending: false })
          .limit(limit)

        if (error) throw error
        setPatterns(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed')
      } finally {
        setLoading(false)
      }
    }

    searchPatterns()

    // Set up real-time subscription for search results
    const channel = supabase
      .channel('search-patterns')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'patterns'
        },
        async () => {
          console.log('Patterns changed, updating search results')
          await searchPatterns()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [query, limit])

  return { patterns, loading, error }
}