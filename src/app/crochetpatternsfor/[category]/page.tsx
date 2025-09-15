import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { getCategoryBySlug, getPatternsByCategoryAndSubcategories } from '@/lib/data'
import PatternCard from '@/components/PatternCard'
import { generateCategoryDescription, generateCategoryKeywords, generateCategoryFAQ } from '@/lib/utils'

interface PageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.category)
  
  if (!category) {
    return {
      title: 'Category Not Found | Crochet911',
      description: 'The requested crochet pattern category could not be found.'
    }
  }

  const categoryName = category.name.replace(' Crochet Patterns', '')
  const keywords = generateCategoryKeywords(categoryName)

  return {
    title: `Crochet Patterns for ${categoryName} - Free & Premium Designs | Crochet911`,
    description: generateCategoryDescription(category.name),
    keywords: keywords.join(', '),
    openGraph: {
      title: `Crochet Patterns for ${categoryName}`,
      description: generateCategoryDescription(category.name),
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/crochetpatternsfor/${category.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Crochet Patterns for ${categoryName}`,
      description: generateCategoryDescription(category.name),
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/crochetpatternsfor/${category.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function CrochetPatternsForCategoryPage({ params }: PageProps) {
  const category = await getCategoryBySlug(params.category)
  
  if (!category) {
    notFound()
  }

  const patterns = await getPatternsByCategoryAndSubcategories(category.slug, { limit: 50 })
  const categoryName = category.name.replace(' Crochet Patterns', '')
  const faqItems = generateCategoryFAQ(categoryName)

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Crochet Patterns', url: '/crochetpatterns' },
    { name: `Patterns for ${categoryName}`, url: `/crochetpatternsfor/${category.slug}` }
  ]

  // Generate structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Crochet Patterns for ${categoryName}`,
    description: generateCategoryDescription(category.name, patterns.length),
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/crochetpatternsfor/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: patterns.length,
      itemListElement: patterns.map((pattern, index) => ({
        '@type': 'CreativeWork',
        position: index + 1,
        name: pattern.title,
        description: pattern.short_description || pattern.description,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/crochetpatterns/${pattern.slug}`,
        image: pattern.featured_image_url,
        author: {
          '@type': 'Person',
          name: pattern.designer?.name || 'Unknown Designer'
        }
      }))
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${process.env.NEXT_PUBLIC_SITE_URL}${item.url}`
      }))
    }
  }

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SEO-Optimized Breadcrumbs */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-slate-500">
            {breadcrumbs.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-slate-900 font-medium">{item.name}</span>
                ) : (
                  <Link href={item.url} className="hover:text-blue-600 transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* SEO-Optimized Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Crochet Patterns for {categoryName}
          </h1>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {generateCategoryDescription(category.name, patterns.length)}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              {patterns.length} Patterns Available
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
              Free & Premium Options
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
              All Skill Levels
            </span>
          </div>
        </div>

        {/* Category Description */}
        {category.description && (
          <div className="bg-white rounded-xl p-8 mb-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              About {categoryName} Crochet Patterns
            </h2>
            <p className="text-slate-700 leading-relaxed">
              {category.description}
            </p>
          </div>
        )}

        {/* Patterns Grid */}
        {patterns.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Browse Our {categoryName} Crochet Pattern Collection
              </h2>
              <p className="text-slate-600">
                Showing {patterns.length} crochet patterns for {categoryName.toLowerCase()}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
              {patterns.map((pattern, index) => (
                <PatternCard key={pattern.id} pattern={pattern} priority={index < 8} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center">
              <Link
                href={`/categories/${category.slug}`}
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg"
              >
                View All {categoryName} Patterns
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl p-12 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                No {categoryName} Patterns Yet
              </h2>
              <p className="text-slate-600 mb-6">
                We're working on adding more {categoryName.toLowerCase()} crochet patterns. Check back soon!
              </p>
              <Link
                href="/crochetpatterns"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse All Patterns
              </Link>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions About {categoryName} Crochet Patterns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqItems.map((item, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {item.question}
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Categories */}
        <div className="mt-16">
          <div className="bg-slate-100 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Explore More Crochet Pattern Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/crochetpatternsfor/animals" className="text-center p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                <div className="text-2xl mb-2">🐾</div>
                <span className="text-sm font-medium text-slate-900">Animal Patterns</span>
              </Link>
              <Link href="/crochetpatternsfor/baby-kids" className="text-center p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                <div className="text-2xl mb-2">👶</div>
                <span className="text-sm font-medium text-slate-900">Baby Patterns</span>
              </Link>
              <Link href="/crochetpatternsfor/home-decor" className="text-center p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                <div className="text-2xl mb-2">🏠</div>
                <span className="text-sm font-medium text-slate-900">Home Decor</span>
              </Link>
              <Link href="/crochetpatternsfor/clothing-accessories" className="text-center p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                <div className="text-2xl mb-2">👕</div>
                <span className="text-sm font-medium text-slate-900">Clothing</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}