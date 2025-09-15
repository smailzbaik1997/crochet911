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

// Fetch patterns by category
export async function getPatternsByCategory(categorySlug: string, limit = 20, offset = 0) {
  const { data, error } = await supabase
    .from('patterns')
    .select(`
      *,
      designer:designers(*),
      category:categories(*)
    `)
    .eq('is_published', true)
    .eq('category.slug', categorySlug)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching patterns by category:', error)
    return []
  }

  return data || []
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
  const { data, error } = await supabase
    .from('patterns')
    .select(`
      *,
      designer:designers(*),
      category:categories(*)
    `)
    .eq('is_published', true)
    .textSearch('title', query)
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

// Increment view count
export async function incrementPatternViews(patternId: string) {
  const { error } = await supabase.rpc('increment_view_count', {
    pattern_id: patternId
  })

  if (error) {
    console.error('Error incrementing view count:', error)
  }
}