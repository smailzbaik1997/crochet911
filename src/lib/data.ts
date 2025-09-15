import { supabase } from './supabase'

// Fetch all main categories (no parent)
export async function getMainCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .is('parent_id', null)
    .order('sort_order')

  if (error) {
    console.error('Error fetching main categories:', error)
    return []
  }

  return data || []
}

// Fetch subcategories for a parent category
export async function getSubcategories(parentSlug: string) {
  const { data: parent } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', parentSlug)
    .single()

  if (!parent) return []

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('parent_id', parent.id)
    .order('sort_order')

  if (error) {
    console.error('Error fetching subcategories:', error)
    return []
  }

  return data || []
}

// Fetch featured patterns for homepage
export async function getFeaturedPatterns(limit = 6) {
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

  if (error) {
    console.error('Error fetching featured patterns:', error)
    return []
  }

  return data || []
}

// Fetch recent patterns
export async function getRecentPatterns(limit = 12) {
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

  if (error) {
    console.error('Error fetching recent patterns:', error)
    return []
  }

  return data || []
}

// Fetch patterns by category with enhanced SEO data
export async function getPatternsByCategory(categorySlug: string, limit = 20, offset = 0) {
  // First, get the category to use in the filter
  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single()

  if (!category) return []

  const { data, error } = await supabase
    .from('patterns')
    .select(`
      *,
      designer:designers(*),
      category:categories(*)
    `)
    .eq('is_published', true)
    .eq('category_id', category.id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching patterns by category:', error)
    return []
  }

  return data || []
}

// Fetch patterns by category ID (for internal use)
export async function getPatternsByCategoryId(categoryId: string, options: { limit?: number; offset?: number } = {}) {
  const { limit = 20, offset = 0 } = options
  
  const { data, error } = await supabase
    .from('patterns')
    .select(`
      *,
      designer:designers(*),
      category:categories(*)
    `)
    .eq('is_published', true)
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching patterns by category ID:', error)
    return []
  }

  return data || []
}

// Enhanced function to get patterns by category including subcategories
export async function getPatternsByCategoryAndSubcategories(categorySlug: string, options: { limit?: number; offset?: number } = {}) {
  const { limit = 50, offset = 0 } = options
  
  // Get the main category
  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single()

  if (!category) return []

  // Get all subcategories of this category
  const { data: subcategories } = await supabase
    .from('categories')
    .select('id')
    .eq('parent_id', category.id)

  // Create array of category IDs (main category + all subcategories)
  const categoryIds = [category.id, ...(subcategories || []).map(sub => sub.id)]

  // Get patterns from main category and all subcategories
  const { data, error } = await supabase
    .from('patterns')
    .select(`
      *,
      designer:designers(*),
      category:categories(*)
    `)
    .eq('is_published', true)
    .in('category_id', categoryIds)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching patterns by category and subcategories:', error)
    return []
  }

  return data || []
}

// Get pattern count by category for SEO stats
export async function getPatternCountByCategory(categorySlug: string) {
  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single()

  if (!category) return 0

  const { count, error } = await supabase
    .from('patterns')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true)
    .eq('category_id', category.id)

  if (error) {
    console.error('Error fetching pattern count:', error)
    return 0
  }

  return count || 0
}

// Get category stats for SEO content
export async function getCategoryStats(categorySlug: string) {
  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single()

  if (!category) return null

  const [totalPatterns, freePatterns, difficultyStats] = await Promise.all([
    // Total patterns count
    supabase
      .from('patterns')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true)
      .eq('category_id', category.id),
    
    // Free patterns count
    supabase
      .from('patterns')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true)
      .eq('category_id', category.id)
      .eq('is_free', true),
    
    // Difficulty distribution
    supabase
      .from('patterns')
      .select('difficulty')
      .eq('is_published', true)
      .eq('category_id', category.id)
  ])

  const difficulties = difficultyStats.data?.reduce((acc: any, pattern) => {
    acc[pattern.difficulty] = (acc[pattern.difficulty] || 0) + 1
    return acc
  }, {}) || {}

  return {
    totalPatterns: totalPatterns.count || 0,
    freePatterns: freePatterns.count || 0,
    premiumPatterns: (totalPatterns.count || 0) - (freePatterns.count || 0),
    difficulties
  }
}

// Fetch single pattern by slug
export async function getPatternBySlug(slug: string) {
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

  if (error) {
    console.error('Error fetching pattern:', error)
    return null
  }

  return data
}

// Search patterns
export async function searchPatterns(query: string, limit = 20) {
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
    return fullTextResults
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

  if (error) {
    console.error('Error searching patterns:', error)
    return []
  }

  return data || []
}

// Get category by slug
export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching category:', error)
    return null
  }

  return data
}

// Get all categories with their subcategories
export async function getCategoriesWithSubcategories() {
  const { data: mainCategories, error: mainError } = await supabase
    .from('categories')
    .select('*')
    .is('parent_id', null)
    .order('sort_order')

  if (mainError) {
    console.error('Error fetching main categories:', mainError)
    return []
  }

  // Fetch subcategories for each main category
  const categoriesWithSubs = await Promise.all(
    (mainCategories || []).map(async (category) => {
      const { data: subcategories } = await supabase
        .from('categories')
        .select('*')
        .eq('parent_id', category.id)
        .order('sort_order')

      return {
        ...category,
        subcategories: subcategories || []
      }
    })
  )

  return categoriesWithSubs
}

// Get categories with pattern counts for navigation prioritization
export async function getCategoriesWithPatternCounts() {
  const { data: mainCategories, error: mainError } = await supabase
    .from('categories')
    .select('*')
    .is('parent_id', null)
    .order('sort_order')

  if (mainError) {
    console.error('Error fetching main categories:', mainError)
    return []
  }

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
  return categoriesWithSubs.sort((a, b) => (b.pattern_count || 0) - (a.pattern_count || 0))
}

// Get all patterns with filtering options
export async function getAllPatterns(filters: {
  difficulty?: string
  is_free?: boolean
  sort?: string
  limit?: number
  offset?: number
} = {}) {
  let query = supabase
    .from('patterns')
    .select(`
      *,
      designer:designers(*),
      category:categories(*)
    `)
    .eq('is_published', true)

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

  if (error) {
    console.error('Error fetching filtered patterns:', error)
    return []
  }

  return data || []
}

// Increment view count
export async function incrementPatternViews(patternId: string) {
  const { error } = await supabase.rpc('increment_view_count', {
    pattern_id: patternId
  })

  if (error) {
    console.error('Error incrementing view count:', error)
  }
}