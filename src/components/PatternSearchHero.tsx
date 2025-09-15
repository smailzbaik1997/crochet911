'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PatternSearchHero() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/crochetpatterns?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Find Your Perfect Crochet Pattern
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Search through thousands of patterns or browse by category to find exactly what you're looking for.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for patterns, techniques, or categories..."
              className="w-full px-6 py-4 text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Quick Category Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Link
            href="/crochetpatternsfor/animals"
            className="group bg-white rounded-xl p-6 text-center hover:bg-blue-50 transition-all duration-200 border border-slate-200 hover:border-blue-300 shadow-sm"
          >
            <div className="text-3xl mb-3">🐾</div>
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">
              Animal Patterns
            </h3>
            <p className="text-sm text-slate-600 mt-1">Amigurumi & more</p>
          </Link>

          <Link
            href="/crochetpatternsfor/baby-kids"
            className="group bg-white rounded-xl p-6 text-center hover:bg-blue-50 transition-all duration-200 border border-slate-200 hover:border-blue-300 shadow-sm"
          >
            <div className="text-3xl mb-3">👶</div>
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">
              Baby & Kids
            </h3>
            <p className="text-sm text-slate-600 mt-1">Adorable designs</p>
          </Link>

          <Link
            href="/crochetpatternsfor/home-decor"
            className="group bg-white rounded-xl p-6 text-center hover:bg-blue-50 transition-all duration-200 border border-slate-200 hover:border-blue-300 shadow-sm"
          >
            <div className="text-3xl mb-3">🏠</div>
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">
              Home Decor
            </h3>
            <p className="text-sm text-slate-600 mt-1">Beautiful accents</p>
          </Link>

          <Link
            href="/crochetpatternsfor/clothing-accessories"
            className="group bg-white rounded-xl p-6 text-center hover:bg-blue-50 transition-all duration-200 border border-slate-200 hover:border-blue-300 shadow-sm"
          >
            <div className="text-3xl mb-3">👕</div>
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">
              Clothing
            </h3>
            <p className="text-sm text-slate-600 mt-1">Stylish wearables</p>
          </Link>
        </div>

        {/* Additional Quick Actions */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/freecrochetpatterns"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <span>🆓</span>
              <span className="ml-2">Browse Free Patterns</span>
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center px-6 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors"
            >
              <span>📁</span>
              <span className="ml-2">All Categories</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}