'use client'

import { useState, useEffect } from 'react'
import { getAllPatterns } from '@/lib/data'
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

export default function FreeCrochetPatternsPage() {
  const [patterns, setPatterns] = useState<Pattern[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    difficulty: '',
    category: '',
    sort: 'newest'
  })
  const [currentPage, setCurrentPage] = useState(1)
  const patternsPerPage = 24

  useEffect(() => {
    async function fetchFreePatterns() {
      setLoading(true)
      try {
        const filterOptions: any = {
          sort: filters.sort,
          is_free: true, // Only show free patterns
          limit: 200 // Get more free patterns
        }

        if (filters.difficulty) {
          filterOptions.difficulty = filters.difficulty
        }

        const data = await getAllPatterns(filterOptions)
        setPatterns(data)
      } catch (error) {
        console.error('Error fetching free patterns:', error)
        setPatterns([])
      } finally {
        setLoading(false)
      }
    }

    fetchFreePatterns()
  }, [filters])

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
    name: 'Free Crochet Patterns - No Cost Downloads',
    description: 'Browse thousands of completely free crochet patterns. No cost, no signup required. Perfect for beginners and experts alike.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/freecrochetpatterns`,
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
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
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
          name: 'Free Crochet Patterns',
          item: `${process.env.NEXT_PUBLIC_SITE_URL}/freecrochetpatterns`
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
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Free Crochet Patterns - No Cost Downloads
          </h1>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Browse thousands of <strong>completely free crochet patterns</strong> with no cost and no signup required. 
            Our extensive collection of <em>free crochet patterns</em> includes designs for all skill levels - from 
            <strong>free beginner crochet patterns</strong> to advanced expert designs. Download instantly and start crocheting today!
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-slate-600">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">✓ 100% Free</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">✓ No Signup Required</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">✓ Instant Download</span>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium">✓ All Skill Levels</span>
          </div>
          <div className="mt-4 text-center">
            <p className="text-slate-600 font-medium">
              <span className="text-green-600 font-bold">{totalPatterns}</span> free crochet patterns available
            </p>
          </div>
        </div>

        {/* Enhanced Filters for Free Patterns */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Filter Free Crochet Patterns</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Skill Level
              </label>
              <select 
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                <option value="">All Free Patterns</option>
                <option value="beginner">Free Beginner Patterns</option>
                <option value="easy">Free Easy Patterns</option>
                <option value="intermediate">Free Intermediate Patterns</option>
                <option value="advanced">Free Advanced Patterns</option>
                <option value="expert">Free Expert Patterns</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Pattern Category
              </label>
              <select 
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                <option value="">All Categories</option>
                <option value="animals">Free Animal Patterns</option>
                <option value="clothing">Free Clothing Patterns</option>
                <option value="home-decor">Free Home Decor</option>
                <option value="baby">Free Baby Patterns</option>
                <option value="blankets">Free Blanket Patterns</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Sort Free Patterns
              </label>
              <select 
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                <option value="newest">Newest Free Patterns</option>
                <option value="popular">Most Popular Free</option>
                <option value="title">Alphabetical A-Z</option>
                <option value="difficulty">By Difficulty Level</option>
              </select>
            </div>
          </div>
        </div>

        {/* Free Pattern Benefits */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-green-900 mb-4">Why Choose Our Free Crochet Patterns?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-3">
              <div className="bg-green-500 text-white rounded-full p-1 mt-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-green-900">Completely Free</h3>
                <p className="text-green-700">No hidden costs, no subscriptions, no payments required</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-500 text-white rounded-full p-1 mt-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-green-900">No Signup Required</h3>
                <p className="text-green-700">Access patterns instantly without creating accounts</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-500 text-white rounded-full p-1 mt-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-green-900">Quality Guaranteed</h3>
                <p className="text-green-700">Every free pattern is tested and verified by our community</p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-4 text-slate-600">Loading free crochet patterns...</p>
          </div>
        )}

        {/* Free Patterns Grid */}
        {!loading && currentPatterns.length > 0 ? (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-slate-600">
                Showing {startIndex + 1}-{Math.min(endIndex, totalPatterns)} of {totalPatterns} free crochet patterns
              </p>
              <p className="text-green-600 font-semibold text-sm">
                All patterns on this page are 100% FREE
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
                                ? 'bg-green-600 text-white'
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
                No free patterns found
              </h3>
              <p className="text-slate-600 mb-6">
                No free crochet patterns match your current filters. Try adjusting your search criteria.
              </p>
              <button
                onClick={() => setFilters({ difficulty: '', category: '', sort: 'newest' })}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Show All Free Patterns
              </button>
            </div>
          </div>
        ) : null}

        {/* SEO Content Section */}
        <div className="mt-20">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">About Our Free Crochet Patterns Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">What Makes Our Free Patterns Special?</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• <strong>Completely free</strong> - No hidden costs or premium upgrades</li>
                  <li>• <strong>No registration required</strong> - Start downloading immediately</li>
                  <li>• <strong>Beginner-friendly</strong> - Clear instructions for all skill levels</li>
                  <li>• <strong>Quality tested</strong> - Every pattern verified by our community</li>
                  <li>• <strong>Regular updates</strong> - New free patterns added weekly</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Popular Free Pattern Categories</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• <Link href="/categories/animals" className="text-blue-600 hover:text-blue-700">Free animal crochet patterns</Link></li>
                  <li>• <Link href="/categories/baby-kids" className="text-blue-600 hover:text-blue-700">Free baby crochet patterns</Link></li>
                  <li>• <Link href="/categories/blankets-afghans" className="text-blue-600 hover:text-blue-700">Free blanket patterns</Link></li>
                  <li>• <Link href="/categories/clothing-accessories" className="text-blue-600 hover:text-blue-700">Free clothing patterns</Link></li>
                  <li>• <Link href="/categories/home-decor" className="text-blue-600 hover:text-blue-700">Free home decor patterns</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}