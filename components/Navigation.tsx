'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategoriesWithSubcategories } from '@/lib/data'
import { cleanCategoryName } from '@/lib/utils'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  parent_id: string | null
  sort_order: number
  subcategories?: Category[]
}

export default function Navigation() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategoriesWithSubcategories()
      setCategories(data)
    }
    loadCategories()
  }, [])

  const toggleDropdown = (categorySlug: string) => {
    setOpenDropdown(openDropdown === categorySlug ? null : categorySlug)
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-pink-600">Crochet911</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            
            {/* Categories dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
                Categories
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute left-0 mt-2 w-96 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2 grid grid-cols-2 gap-4 p-4">
                  {categories.slice(0, 10).map((category) => (
                    <div key={category.id} className="space-y-1">
                      <Link
                        href={`/categories/${category.slug}`}
                        className="block text-sm font-semibold text-gray-900 hover:text-pink-600 transition-colors"
                      >
                        {category.name}
                      </Link>
                      {category.subcategories && category.subcategories.length > 0 && (
                        <div className="ml-2 space-y-1">
                          {category.subcategories.slice(0, 5).map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/categories/${sub.slug}`}
                              className="block text-xs text-gray-600 hover:text-pink-600 transition-colors"
                            >
                              {cleanCategoryName(sub.name)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="border-t px-4 py-2">
                  <Link
                    href="/categories"
                    className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                  >
                    View all categories →
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              href="/patterns" 
              className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              All Patterns
            </Link>
            
            <Link 
              href="/designers" 
              className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Designers
            </Link>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search patterns..."
                className="w-64 px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-pink-600 focus:outline-none focus:text-pink-600"
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              <Link 
                href="/" 
                className="block text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              <Link 
                href="/patterns" 
                className="block text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                All Patterns
              </Link>

              {/* Mobile categories */}
              {categories.slice(0, 8).map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => toggleDropdown(category.slug)}
                    className="w-full text-left text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
                  >
                    {category.name}
                    <svg 
                      className={`h-4 w-4 transform transition-transform ${openDropdown === category.slug ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {openDropdown === category.slug && category.subcategories && (
                    <div className="ml-4 space-y-1">
                      <Link
                        href={`/categories/${category.slug}`}
                        className="block text-sm text-gray-600 hover:text-pink-600 px-3 py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        All {category.name}
                      </Link>
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/categories/${sub.slug}`}
                          className="block text-sm text-gray-600 hover:text-pink-600 px-3 py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {cleanCategoryName(sub.name)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <Link 
                href="/categories" 
                className="block text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                All Categories
              </Link>
              
              <Link 
                href="/designers" 
                className="block text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Designers
              </Link>

              {/* Mobile search */}
              <div className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Search patterns..."
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}