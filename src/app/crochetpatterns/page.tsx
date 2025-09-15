'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Metadata } from 'next'
import { getAllPatterns, searchPatterns } from '@/lib/data'
import PatternCard from '@/components/PatternCard'
import Link from 'next/link'

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
  designer?: {
    name: string
    slug: string
  }
  category?: {
    name: string
    slug: string
  }
}

export default function CrochetPatternsPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')
  
  const [patterns, setPatterns] = useState<Pattern[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    difficulty: '',
    type: '',
    sort: 'newest'
  })
  const [currentPage, setCurrentPage] = useState(1)
  const patternsPerPage = 24

  useEffect(() => {
    async function fetchPatterns() {
      setLoading(true)
      try {
        let data: Pattern[] = []
        
        if (searchQuery) {
          // If there's a search query, use search function
          data = await searchPatterns(searchQuery, 100)
        } else {
          // Otherwise use regular filtering
          const filterOptions: any = {
            sort: filters.sort,
            limit: 100 // Get more patterns for client-side filtering
          }

          if (filters.difficulty) {
            filterOptions.difficulty = filters.difficulty
          }

          if (filters.type === 'free') {
            filterOptions.is_free = true
          } else if (filters.type === 'premium') {
            filterOptions.is_free = false
          }

          data = await getAllPatterns(filterOptions)
        }
        
        setPatterns(data)
      } catch (error) {
        console.error('Error fetching patterns:', error)
        setPatterns([])
      } finally {
        setLoading(false)
      }
    }

    fetchPatterns()
  }, [filters, searchQuery])

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
    setCurrentPage(1) // Reset to first page when filtering
  }

  // Calculate pagination
  const totalPatterns = patterns.length
  const totalPages = Math.ceil(totalPatterns / patternsPerPage)
  const startIndex = (currentPage - 1) * patternsPerPage
  const endIndex = startIndex + patternsPerPage
  const currentPatterns = patterns.slice(startIndex, endIndex)

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: searchQuery ? `Search Results for "${searchQuery}" - Crochet Patterns` : 'Free Crochet Patterns & Premium Designs',
    description: searchQuery 
      ? `Found ${totalPatterns} crochet patterns matching "${searchQuery}". Browse free and premium designs for all skill levels.`
      : 'Browse thousands of free crochet patterns and premium designs. Find patterns for all skill levels including beginner crochet patterns, advanced designs, and everything in between.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/crochetpatterns${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: totalPatterns,
      itemListElement: currentPatterns.map((pattern, index) => ({
        '@type': 'CreativeWork',
        position: startIndex + index + 1,
        name: pattern.title,
        description: pattern.short_description || pattern.description,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/crochetpatterns/${pattern.slug}`,
        image: pattern.featured_image_url,
        author: {
          '@type': 'Person',
          name: pattern.designer?.name || 'Unknown Designer'
        },
        offers: pattern.is_free ? {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        } : undefined
      }))
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: process.env.NEXT_PUBLIC_SITE_URL
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Crochet Patterns',
          item: `${process.env.NEXT_PUBLIC_SITE_URL}/crochetpatterns`
        }
      ]
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SEO-Optimized Header */}
        <div className="text-center mb-12">
          {searchQuery ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Search Results for "{searchQuery}"
              </h1>
              <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Found {patterns.length} <strong>crochet patterns</strong> matching your search for "{searchQuery}". 
                Browse through our collection of <em>free and premium crochet patterns</em> that match your query.
              </p>
              {patterns.length > 0 && (
                <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-slate-600">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{patterns.length} Results Found</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Free & Premium</span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">All Skill Levels</span>
                </div>
              )}
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Free Crochet Patterns & Premium Designs
              </h1>
              <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Discover thousands of <strong>free crochet patterns</strong> and premium designs from talented designers worldwide. 
                Browse our comprehensive collection of <em>crochet patterns</em> for all skill levels - from 
                <strong>beginner crochet patterns</strong> to advanced expert designs. Find the perfect pattern for your next project!
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-slate-600">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Free Crochet Patterns</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Beginner Friendly</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">Expert Designs</span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">All Skill Levels</span>
              </div>
            </>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Filter Crochet Patterns</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Difficulty Level
              </label>
              <select 
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">All Skill Levels</option>
                <option value="beginner">Beginner Crochet Patterns</option>
                <option value="easy">Easy Crochet Patterns</option>
                <option value="intermediate">Intermediate Patterns</option>
                <option value="advanced">Advanced Crochet Patterns</option>
                <option value="expert">Expert Crochet Patterns</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Pattern Type
              </label>
              <select 
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">All Crochet Patterns</option>
                <option value="free">Free Crochet Patterns Only</option>
                <option value="premium">Premium Crochet Patterns</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Sort By
              </label>
              <select 
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="newest">Newest Crochet Patterns</option>
                <option value="oldest">Classic Patterns</option>
                <option value="popular">Most Popular Patterns</option>
                <option value="title">Alphabetical A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-slate-600">Loading crochet patterns...</p>
          </div>
        )}

        {/* Patterns Grid */}
        {!loading && currentPatterns.length > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-slate-600">
                {searchQuery ? (
                  <>Showing {startIndex + 1}-{Math.min(endIndex, totalPatterns)} of {totalPatterns} search results for "{searchQuery}"</>
                ) : (
                  <>Showing {startIndex + 1}-{Math.min(endIndex, totalPatterns)} of {totalPatterns} crochet patterns</>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentPatterns.map((pattern, index) => (
                <PatternCard key={pattern.id} pattern={pattern} priority={index < 8} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNumber = Math.max(1, currentPage - 2) + i
                      if (pageNumber <= totalPages) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                              pageNumber === currentPage
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        )
                      }
                      return null
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : !loading ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto bg-white rounded-xl p-12 border border-slate-200">
              <svg className="mx-auto h-16 w-16 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {searchQuery ? (
                <>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    No results found for "{searchQuery}"
                  </h3>
                  <p className="text-slate-600 mb-6">
                    We couldn't find any crochet patterns matching your search. Try different keywords or browse our categories.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => window.location.href = '/crochetpatterns'}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Clear Search
                    </button>
                    <Link
                      href="/categories"
                      className="inline-flex items-center px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Browse Categories
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    No crochet patterns found
                  </h3>
                  <p className="text-slate-600 mb-6">
                    No crochet patterns match your current filters. Try adjusting your search criteria to find more patterns.
                  </p>
                  <button
                    onClick={() => setFilters({ difficulty: '', type: '', sort: 'newest' })}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </>
              )}
            </div>
          </div>
        ) : null}

        {/* SEO-Enhanced Call to Action */}
        <div className="mt-20">
          <div className="bg-blue-600 rounded-xl px-8 py-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Looking for Specific Crochet Patterns?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Browse our <strong>crochet pattern categories</strong> to find patterns organized by theme, 
              or search for exactly the <em>free crochet patterns</em> you need for your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/categories"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Browse Pattern Categories
              </Link>
              <div className="relative">
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target as HTMLFormElement)
                  const query = formData.get('search') as string
                  if (query?.trim()) {
                    window.location.href = `/crochetpatterns?search=${encodeURIComponent(query.trim())}`
                  }
                }}>
                  <input
                    name="search"
                    type="text"
                    placeholder="Search free crochet patterns..."
                    className="w-full sm:w-64 px-4 py-3 text-slate-900 placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-white border-0"
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}