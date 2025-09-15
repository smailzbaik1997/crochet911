'use client'

import { useState, useMemo } from 'react'
import { useRealtimePatterns } from '@/lib/realtime-hooks'
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

export default function PatternsPage() {
  const [filters, setFilters] = useState({
    difficulty: '',
    type: '',
    sort: 'newest'
  })
  const [currentPage, setCurrentPage] = useState(1)
  const patternsPerPage = 24

  // Convert filters to real-time hook format
  const hookFilters = useMemo(() => {
    const result: any = {
      sort: filters.sort,
      limit: 500 // Get more patterns for client-side filtering
    }

    if (filters.difficulty) {
      result.difficulty = filters.difficulty
    }

    if (filters.type === 'free') {
      result.is_free = true
    } else if (filters.type === 'premium') {
      result.is_free = false
    }

    return result
  }, [filters])

  // Use real-time hook for patterns
  const { patterns, loading } = useRealtimePatterns(hookFilters)

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
    setCurrentPage(1) // Reset to first page when filtering
  }

  // Calculate pagination with real-time patterns
  const totalPatterns = patterns.length
  const totalPages = Math.ceil(totalPatterns / patternsPerPage)
  const startIndex = (currentPage - 1) * patternsPerPage
  const endIndex = startIndex + patternsPerPage
  const currentPatterns = patterns.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            All Crochet Patterns
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Discover thousands of crochet patterns from talented designers worldwide. 
            Find the perfect pattern for your next project.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Filter Patterns</h2>
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
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="easy">Easy</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
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
                <option value="">All Patterns</option>
                <option value="free">Free Only</option>
                <option value="premium">Premium Only</option>
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
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-slate-600">Loading patterns...</p>
          </div>
        )}

        {/* Patterns Grid */}
        {!loading && currentPatterns.length > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-slate-600">
                Showing {startIndex + 1}-{Math.min(endIndex, totalPatterns)} of {totalPatterns} patterns
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
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No patterns found
              </h3>
              <p className="text-slate-600 mb-6">
                No patterns match your current filters. Try adjusting your search criteria.
              </p>
              <button
                onClick={() => setFilters({ difficulty: '', type: '', sort: 'newest' })}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : null}

        {/* Call to Action */}
        <div className="mt-20">
          <div className="bg-blue-600 rounded-xl px-8 py-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Looking for Something Specific?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Browse our categories to find patterns organized by theme, or search for exactly what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/crochetpatterns"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                Browse Crochet Patterns
              </Link>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search patterns..."
                  className="w-full sm:w-64 px-4 py-3 text-slate-900 placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-white border-0"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}