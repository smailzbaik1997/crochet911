'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getCategoriesWithPatternCounts } from '@/lib/data'

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

export default function Navigation() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategoriesWithPatternCounts()
      setCategories(data)
    }
    loadCategories()
  }, [])

  const toggleDropdown = (categorySlug: string) => {
    setOpenDropdown(openDropdown === categorySlug ? null : categorySlug)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/crochetpatterns?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="https://v5.airtableusercontent.com/v3/u/45/45/1757952000000/gdL1tnSP8FlLTvJ4lYBbdQ/MR4HxHUsa3en7LUQYl73o5HezvuCkgz180uDmUFQU2MY4BFXQHpOvH08eGZMFwsz_h8FFvBEEVZoumSsOeye7571VvbNJEsf8RJm9DTFCRPPBmomfb8rQwzu1A8zdtMAEEKJ-4I-jrptdw0jeNQ68w/-0OxaI_KSDTqe5dnRc2jknBO2I_E0mniurZcXPX3M1E"
                alt="Crochet911 Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-slate-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            
            {/* Categories dropdown */}
            <div className="relative group">
              <button className="text-slate-700 hover:text-slate-900 px-4 py-2.5 text-sm font-medium transition-all duration-200 flex items-center bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg shadow-sm hover:shadow-md">
                Categories
                <svg className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute left-0 mt-2 w-[600px] bg-white rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-slate-200 overflow-hidden">
                {/* Popular Categories Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border-b border-slate-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Popular Categories</h3>
                    <span className="text-xs text-slate-500 bg-white px-3 py-1 rounded-full font-medium shadow-sm">Most Searched</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {categories
                      .filter(cat => (cat.pattern_count || 0) > 0)
                      .slice(0, 6)
                      .map((category) => (
                        <Link
                          key={category.id}
                          href={`/categories/${category.slug}`}
                          className="group/item flex items-center justify-between p-4 rounded-xl hover:bg-white transition-all duration-200 border border-transparent hover:border-slate-200 hover:shadow-md"
                        >
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-blue-600 transition-colors mb-1">
                              {category.name}
                            </div>
                            {category.pattern_count && category.pattern_count > 0 && (
                              <div className="text-xs text-slate-600">
                                {category.pattern_count} pattern{category.pattern_count !== 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                          {category.pattern_count && category.pattern_count > 0 && (
                            <div className="ml-4 bg-blue-100 text-blue-700 text-xs px-3 py-1.5 rounded-full font-semibold group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-200">
                              {category.pattern_count}
                            </div>
                          )}
                        </Link>
                      ))
                    }
                  </div>
                </div>
                
                {/* All Categories Section */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Browse All Categories</h3>
                    <Link
                      href="/categories"
                      className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline"
                    >
                      View all categories →
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    {categories.slice(0, 9).map((category) => (
                      <div key={category.id} className="space-y-3">
                        <Link
                          href={`/categories/${category.slug}`}
                          className="group block text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <span className="group-hover:underline">{category.name}</span>
                            {category.pattern_count && category.pattern_count > 0 && (
                              <span className="ml-2 text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                {category.pattern_count}
                              </span>
                            )}
                          </div>
                        </Link>
                        {category.subcategories && category.subcategories.length > 0 && (
                          <div className="space-y-2 pl-4 border-l-2 border-slate-100">
                            {category.subcategories
                              .filter(sub => (sub.pattern_count || 0) > 0)
                              .slice(0, 3)
                              .map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/categories/${sub.slug}`}
                                className="block text-xs text-slate-600 hover:text-slate-800 transition-colors duration-200 hover:underline"
                              >
                                <div className="flex items-center justify-between">
                                  <span>{sub.name}</span>
                                  {sub.pattern_count && sub.pattern_count > 0 && (
                                    <span className="ml-2 text-xs text-slate-400">({sub.pattern_count})</span>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link 
              href="/crochetpatterns" 
              className="text-slate-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Crochet Patterns
            </Link>
            
            <Link 
              href="/designers" 
              className="text-slate-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Designers
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patterns..."
                className="w-64 px-4 py-2 pl-10 pr-4 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-50 border-t border-slate-200">
              <Link 
                href="/" 
                className="block text-slate-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              <Link 
                href="/crochetpatterns" 
                className="block text-slate-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Crochet Patterns
              </Link>

              {/* Mobile categories - prioritize categories with patterns */}
              <div className="border-t border-slate-300 mt-2 pt-2">
                <div className="px-3 py-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Popular Categories</span>
                </div>
                {categories
                  .filter(cat => (cat.pattern_count || 0) > 0)
                  .slice(0, 6)
                  .map((category) => (
                  <div key={category.id}>
                    <button
                      onClick={() => toggleDropdown(category.slug)}
                      className="w-full text-left text-slate-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <span>{category.name}</span>
                        {category.pattern_count && category.pattern_count > 0 && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                            {category.pattern_count}
                          </span>
                        )}
                      </div>
                      <svg 
                        className={`h-4 w-4 transform transition-transform ${openDropdown === category.slug ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {openDropdown === category.slug && (
                      <div className="ml-4 space-y-1 bg-white rounded-md border border-slate-200 mt-1">
                        <Link
                          href={`/categories/${category.slug}`}
                          className="flex items-center justify-between text-sm text-slate-600 hover:text-blue-600 px-3 py-2"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span>All {category.name}</span>
                          {category.pattern_count && category.pattern_count > 0 && (
                            <span className="text-xs text-slate-400">({category.pattern_count})</span>
                          )}
                        </Link>
                        {category.subcategories && 
                          category.subcategories
                            .filter(sub => (sub.pattern_count || 0) > 0)
                            .slice(0, 5)
                            .map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/categories/${sub.slug}`}
                              className="flex items-center justify-between text-sm text-slate-600 hover:text-blue-600 px-3 py-2"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <span>{sub.name}</span>
                              {sub.pattern_count && sub.pattern_count > 0 && (
                                <span className="text-xs text-slate-400">({sub.pattern_count})</span>
                              )}
                            </Link>
                          ))
                        }
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <Link 
                href="/categories" 
                className="block text-slate-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                All Categories
              </Link>
              
              <Link 
                href="/designers" 
                className="block text-slate-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Designers
              </Link>

              {/* Mobile search */}
              <form onSubmit={handleSearch} className="px-3 py-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search patterns..."
                  className="w-full px-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}