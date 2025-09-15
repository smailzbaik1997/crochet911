'use client'

import Link from 'next/link'
import PatternCard from '@/components/PatternCard'
import HomepageFAQ from '@/components/HomepageFAQ'
import PatternSearchHero from '@/components/PatternSearchHero'
import { useRealtimeFeaturedPatterns, useRealtimeRecentPatterns, useRealtimeCategories } from '@/lib/realtime-hooks'

export default function HomeContent() {
  // Use real-time hooks for live data
  const { patterns: featuredPatterns, loading: featuredLoading } = useRealtimeFeaturedPatterns(6)
  const { categories: mainCategories, loading: categoriesLoading } = useRealtimeCategories()
  const { patterns: recentPatterns, loading: recentLoading } = useRealtimeRecentPatterns(8)

  // Generate structured data for homepage
  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Crochet911 - Crochet Patterns Directory',
    alternateName: 'Crochet911',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    description: 'The ultimate crochet patterns directory with thousands of free and premium designs for all skill levels.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL}/crochetpatterns?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    mainEntity: {
      '@type': 'CollectionPage',
      name: 'Crochet Patterns Collection',
      description: 'Comprehensive directory of crochet patterns including animals, clothing, home decor, and more.',
      numberOfItems: featuredPatterns.length + recentPatterns.length
    },
    publisher: {
      '@type': 'Organization',
      name: 'Crochet911',
      url: process.env.NEXT_PUBLIC_SITE_URL
    }
  }

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: process.env.NEXT_PUBLIC_SITE_URL
      }
    ]
  }

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      {/* Enhanced Hero Section */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <div className="text-6xl font-bold text-white">
              Crochet911
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Crochet Patterns Directory
          </h1>
          <p className="text-xl md:text-2xl mb-6 max-w-4xl mx-auto text-slate-300 leading-relaxed">
            <strong>Discover the ultimate crochet patterns directory</strong> with thousands of free and premium designs. 
            Your complete resource for <em>crochet pattern collections</em> from talented designers worldwide.
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-slate-400 leading-relaxed">
            Browse our comprehensive <strong>crochet pattern library</strong> featuring animals, clothing, home decor, 
            and seasonal designs for every skill level - from beginner to expert.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/crochetpatterns" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Browse Crochet Patterns
            </Link>
            <Link 
              href="/freecrochetpatterns" 
              className="border-2 border-slate-300 text-slate-300 px-8 py-4 rounded-lg font-semibold hover:bg-slate-300 hover:text-slate-900 transition-all duration-200"
            >
              Free Patterns
            </Link>
          </div>
        </div>
      </section>

      {/* Pattern Search Hero */}
      <PatternSearchHero />

      {/* SEO-Enhanced Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Why Choose Our Crochet Pattern Directory?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our <strong>comprehensive crochet pattern database</strong> offers the largest collection of 
              high-quality designs with detailed instructions, perfect for crafters of all experience levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-slate-50 rounded-xl">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">All Skill Levels</h3>
              <p className="text-slate-600">From beginner-friendly to expert challenges in our pattern library</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Free & Premium</h3>
              <p className="text-slate-600">Thousands of free patterns plus premium designer collections</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Quality Tested</h3>
              <p className="text-slate-600">Every pattern thoroughly reviewed and tested by our community</p>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Mobile Friendly</h3>
              <p className="text-slate-600">Access your favorite patterns anywhere, anytime on any device</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Patterns */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Featured Crochet Patterns
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover handpicked <strong>crochet pattern favorites</strong> from our community. 
              These popular designs showcase the best of our collection with detailed instructions and beautiful results.
            </p>
          </div>

          {featuredLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-slate-600">Loading featured patterns...</p>
            </div>
          ) : featuredPatterns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredPatterns.map((pattern, index) => (
                <PatternCard key={pattern.id} pattern={pattern} priority={index < 3} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-8">Featured patterns will be displayed here once available.</p>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/crochetpatterns"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg"
            >
              View All Crochet Patterns
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Patterns */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Latest Crochet Patterns
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Stay up-to-date with the newest additions to our <strong>crochet pattern library</strong>. 
              Fresh designs added regularly from talented designers worldwide.
            </p>
          </div>

          {recentLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-slate-600">Loading recent patterns...</p>
            </div>
          ) : recentPatterns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {recentPatterns.map((pattern) => (
                <PatternCard key={pattern.id} pattern={pattern} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-8">Recent patterns will be displayed here once available.</p>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/crochetpatterns"
              className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              Explore More Patterns
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Explore Crochet Pattern Categories
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover organized collections of <strong>crochet patterns by category</strong>. 
              From adorable animals to stylish clothing, find exactly what you're looking for.
            </p>
          </div>

          {categoriesLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-slate-600">Loading categories...</p>
            </div>
          ) : mainCategories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {mainCategories.slice(0, 8).map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group bg-white rounded-xl p-6 text-center hover:bg-blue-50 transition-all duration-200 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                    {category.name}
                    {category.pattern_count && category.pattern_count > 0 && (
                      <span className="ml-2 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {category.pattern_count}
                      </span>
                    )}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-8">Categories will be displayed here once available.</p>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/categories"
              className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all duration-200 shadow-lg"
            >
              View All Categories
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <HomepageFAQ />

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Next Crochet Project?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of crocheters who trust our <strong>comprehensive pattern directory</strong> 
            for their creative projects. Start browsing today and bring your ideas to life!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/crochetpatterns"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-slate-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Start Browsing Patterns
            </Link>
            <Link
              href="/freecrochetpatterns"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Try Free Patterns First
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}