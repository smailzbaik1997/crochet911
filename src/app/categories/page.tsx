import Link from 'next/link'
import type { Metadata } from 'next'
import { getCategoriesWithSubcategories } from '@/lib/data'

// Type definitions
type Subcategory = {
  id: string
  name: string
  slug: string
  description?: string
  parent_id?: string
  sort_order?: number
}

type Category = {
  id: string
  name: string
  slug: string
  description?: string
  parent_id?: string
  sort_order?: number
  subcategories?: Subcategory[]
}

export const metadata: Metadata = {
  title: 'Crochet Pattern Categories | Crochet911',
  description: 'Browse all crochet pattern categories. Find patterns for animals, blankets, clothing, home decor, and more.',
  openGraph: {
    title: 'Crochet Pattern Categories',
    description: 'Browse all crochet pattern categories including animals, blankets, clothing, and home decor.',
    type: 'website',
  },
}

function getCategoryIcon(slug: string): string {
  const icons: { [key: string]: string } = {
    'animals': '🐱',
    'holidays-seasonal': '🎄',
    'flowers-plants': '🌸',
    'fantasy-mythical': '🦄',
    'clothing-accessories': '👗',
    'blankets-afghans': '🧶',
    'home-decor': '🏠',
    'food-drink': '🧁',
    'baby-kids': '👶',
    'toys-dolls': '🧸',
    'bags-purses': '👜',
    'jewelry-accessories': '💎',
    'cultural-flags': '🏴',
    'religious-spiritual': '🕯️',
    'pets-accessories': '🐕',
    'nature-outdoors': '🌲',
    'stitch-styles': '🪡',
    'utility-everyday': '🧽',
    'seasonal-wear': '🧥',
    'special-occasions': '💒'
  }
  return icons[slug] || '🧶'
}

export default async function CategoriesPage() {
  const categories = await getCategoriesWithSubcategories()

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Pattern Categories
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Discover crochet patterns organized by category. From adorable animals to cozy blankets, 
            find the perfect pattern for your next project.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-12">
          {categories.map((category: Category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
              {/* Category Header */}
              <div className="bg-slate-900 px-8 py-10">
                <Link href={`/categories/${category.slug}`} className="group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl">{getCategoryIcon(category.slug)}</span>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-200 transition-colors">
                          {category.name}
                        </h2>
                        {category.description && (
                          <p className="text-slate-300 mt-2">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <svg 
                      className="w-6 h-6 text-white group-hover:text-blue-200 transition-colors" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>

              {/* Subcategories */}
              {category.subcategories && category.subcategories.length > 0 && (
                <div className="p-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-6">Browse {category.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {category.subcategories.map((subcat: Subcategory) => (
                      <Link
                        key={subcat.id}
                        href={`/categories/${subcat.slug}`}
                        className="group p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                      >
                        <h4 className="text-sm font-medium text-slate-900 group-hover:text-blue-600 text-center">
                          {subcat.name}
                        </h4>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Link
                      href={`/categories/${category.slug}`}
                      className="inline-flex items-center px-6 py-3 border-2 border-slate-300 text-sm font-semibold rounded-lg text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200"
                    >
                      View All {category.name} Patterns
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-blue-600 rounded-xl px-8 py-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Browse all our patterns or use our search feature to find exactly what you need.
            </p>
            <Link
              href="/patterns"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              Browse All Patterns
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}