import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { getCategoryBySlug, getPatternsByCategoryAndSubcategories, getSubcategories, getCategoryStats } from '@/lib/data'
import { generateBreadcrumbData, getCategoryPath, cleanCategoryName } from '@/lib/utils'
import PatternCard from '@/components/PatternCard'

interface PageProps {
  params: {
    slug: string
  }
  searchParams: {
    page?: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug)
  
  if (!category) {
    return {
      title: 'Category Not Found | Crochet911',
      description: 'The requested category could not be found.'
    }
  }

  // Enhanced SEO-optimized title and description targeting "crochet patterns for [category]"
  const cleanName = cleanCategoryName(category.name)
  const seoTitle = `${cleanName} Crochet Patterns - Free & Premium Designs | Crochet911`
  const seoDescription = `Discover ${cleanName.toLowerCase()} crochet patterns for all skill levels. Browse hundreds of free and premium ${cleanName.toLowerCase()} crochet designs from talented designers worldwide. Perfect for beginners to experts. Find easy ${cleanName.toLowerCase()} patterns, advanced designs, and everything in between.`
  
  const keywords = [
    `${cleanName.toLowerCase()} crochet patterns`,
    `crochet patterns for ${cleanName.toLowerCase()}`,
    `free ${cleanName.toLowerCase()} crochet patterns`,
    `${cleanName.toLowerCase()} amigurumi patterns`,
    `easy ${cleanName.toLowerCase()} crochet`,
    `beginner ${cleanName.toLowerCase()} crochet patterns`,
    `${cleanName.toLowerCase()} crochet designs`,
    `${cleanName.toLowerCase()} crochet tutorial`,
    `${cleanName.toLowerCase()} crochet ideas`,
    `how to crochet ${cleanName.toLowerCase()}`,
    `${cleanName.toLowerCase()} crochet pattern free`,
    `crochet ${cleanName.toLowerCase()} step by step`
  ]

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: keywords.join(', '),
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/categories/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/categories/${params.slug}`,
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

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const page = parseInt(searchParams.page || '1')
  const patternsPerPage = 24
  const offset = (page - 1) * patternsPerPage

  const [category, patterns, subcategories, categoryStats] = await Promise.all([
    getCategoryBySlug(params.slug),
    getPatternsByCategoryAndSubcategories(params.slug, { limit: patternsPerPage, offset }),
    getSubcategories(params.slug),
    getCategoryStats(params.slug)
  ])

  if (!category) {
    notFound()
  }

  const breadcrumbPath = getCategoryPath(category)
  const breadcrumbData = generateBreadcrumbData(breadcrumbPath)
  const cleanName = cleanCategoryName(category.name)
  
  // Enhanced structured data for better SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cleanName} Crochet Patterns`,
    description: `Complete collection of ${cleanName.toLowerCase()} crochet patterns for all skill levels. Free and premium designs with step-by-step instructions.`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/categories/${params.slug}`,
    keywords: [
      `${cleanName.toLowerCase()} crochet patterns`,
      `crochet patterns for ${cleanName.toLowerCase()}`,
      `free ${cleanName.toLowerCase()} crochet`
    ].join(', '),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: categoryStats?.totalPatterns || patterns.length,
      itemListElement: patterns.slice(0, 20).map((pattern, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/crochetpatterns/${pattern.slug}`,
          name: pattern.title,
          description: pattern.short_description || pattern.description,
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/crochetpatterns/${pattern.slug}`,
          image: pattern.featured_image_url,
          author: pattern.designer ? {
            '@type': 'Person',
            name: pattern.designer.name
          } : undefined,
          offers: pattern.is_free ? {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock'
          } : {
            '@type': 'Offer',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock'
          },
          audience: {
            '@type': 'Audience',
            name: `${pattern.difficulty} crocheters`
          }
        }
      }))
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbPath.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${process.env.NEXT_PUBLIC_SITE_URL}${item.url}`
      }))
    },
    publisher: {
      '@type': 'Organization',
      name: 'Crochet911',
      url: process.env.NEXT_PUBLIC_SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      {/* SEO-Optimized Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumbs */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-slate-500">
              {breadcrumbPath.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  {index === breadcrumbPath.length - 1 ? (
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

          {/* SEO-Optimized Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {cleanName} Crochet Patterns
            </h1>
            <div className="max-w-4xl">
              <p className="text-xl text-slate-600 mb-4 leading-relaxed">
                Explore our comprehensive collection of <strong>{cleanName.toLowerCase()} crochet patterns</strong> designed for all skill levels. 
                Whether you're searching for <em>free {cleanName.toLowerCase()} crochet patterns</em> or premium designs, 
                you'll find the perfect <strong>crochet patterns for {cleanName.toLowerCase()}</strong> to bring your creative vision to life.
              </p>
              {category.description && (
                <p className="text-lg text-slate-600 leading-relaxed mb-4">
                  {category.description}
                </p>
              )}
              <p className="text-lg text-slate-600 leading-relaxed">
                From beginner-friendly <strong>easy {cleanName.toLowerCase()} crochet patterns</strong> to advanced designs for experienced crafters, 
                our curated collection includes detailed instructions, material lists, and helpful tips to ensure your success. 
                Start your next {cleanName.toLowerCase()} crochet project today!
              </p>
            </div>
          </div>

          {/* Enhanced Pattern Stats with Real Data */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-100 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-slate-900">{categoryStats?.totalPatterns || patterns.length}+</div>
              <div className="text-slate-600">Total Patterns</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-slate-900">{categoryStats?.freePatterns || 0}</div>
              <div className="text-slate-600">Free Patterns</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-slate-900">{categoryStats?.premiumPatterns || 0}</div>
              <div className="text-slate-600">Premium Designs</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-slate-900">All Levels</div>
              <div className="text-slate-600">Skill Difficulties</div>
            </div>
          </div>

          {/* Subcategories Navigation */}
          {subcategories.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Browse {cleanName} by Type</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {subcategories.map((subcat) => (
                  <Link
                    key={subcat.id}
                    href={`/categories/${subcat.slug}`}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 text-center border border-slate-200 hover:border-blue-300"
                  >
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {subcat.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Patterns Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {patterns.length > 0 ? (
          <>
            {/* SEO Content Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Why Choose Our {cleanName} Crochet Patterns?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">🎯 Perfect for All Skill Levels</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Our {cleanName.toLowerCase()} crochet pattern collection includes designs for everyone, from 
                    <strong> beginner {cleanName.toLowerCase()} crochet patterns</strong> with step-by-step tutorials 
                    to advanced designs that challenge experienced crocheters.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">💝 Free & Premium Options</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Discover both <strong>free {cleanName.toLowerCase()} crochet patterns</strong> and premium designs. 
                    Each pattern includes detailed instructions, material lists, and helpful tips for successful completion.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">📚 Detailed Instructions</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Every <strong>{cleanName.toLowerCase()} crochet pattern</strong> comes with clear, 
                    easy-to-follow instructions, stitch guides, and helpful photos to ensure your project turns out perfect.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">🌟 Designer Quality</h3>
                  <p className="text-slate-600 leading-relaxed">
                    All our <strong>crochet patterns for {cleanName.toLowerCase()}</strong> are created by 
                    talented designers and thoroughly tested to ensure accuracy and beautiful results.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {patterns.map((pattern) => (
                <PatternCard key={pattern.id} pattern={pattern} />
              ))}
            </div>

            {/* Pagination */}
            {patterns.length === patternsPerPage && (
              <div className="mt-12 flex justify-center space-x-4">
                {page > 1 && (
                  <Link
                    href={`/categories/${params.slug}?page=${page - 1}`}
                    className="px-6 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    ← Previous Page
                  </Link>
                )}
                
                <span className="px-6 py-3 text-sm font-medium text-slate-900 bg-blue-100 border border-blue-300 rounded-lg">
                  Page {page}
                </span>
                
                <Link
                  href={`/categories/${params.slug}?page=${page + 1}`}
                  className="px-6 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Next Page →
                </Link>
              </div>
            )}

            {/* SEO FAQ Section */}
            <div className="mt-16 bg-white rounded-xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                Frequently Asked Questions About {cleanName} Crochet Patterns
              </h2>
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    What skill level do I need for {cleanName.toLowerCase()} crochet patterns?
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Our {cleanName.toLowerCase()} crochet pattern collection includes designs for all skill levels. 
                    Beginners can start with simple {cleanName.toLowerCase()} patterns that use basic stitches, 
                    while experienced crocheters can challenge themselves with intricate designs featuring advanced techniques.
                  </p>
                </div>
                
                <div className="border-b border-slate-200 pb-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Are there free {cleanName.toLowerCase()} crochet patterns available?
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Yes! We offer many free {cleanName.toLowerCase()} crochet patterns alongside our premium designs. 
                    Free patterns include basic instructions and are perfect for trying new techniques or quick projects.
                  </p>
                </div>
                
                <div className="border-b border-slate-200 pb-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    What materials do I need for {cleanName.toLowerCase()} crochet projects?
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Each {cleanName.toLowerCase()} crochet pattern includes a complete materials list with yarn weight, 
                    hook sizes, and any additional supplies needed. Most patterns can be adapted to use different yarn weights 
                    with appropriate hook size adjustments.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    How long does it take to complete {cleanName.toLowerCase()} crochet patterns?
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    The time required depends on the complexity of the pattern and your skill level. 
                    Simple {cleanName.toLowerCase()} projects might take a few hours, while detailed designs could take several days or weeks. 
                    Each pattern includes an estimated completion time to help you plan your project.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional SEO Content */}
            <div className="mt-12 bg-slate-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Tips for Success with {cleanName} Crochet Patterns
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">🧶 Choose the Right Yarn</h3>
                  <p className="text-slate-600 mb-4">
                    Select yarn that matches the pattern specifications for best results. 
                    The yarn weight and fiber content significantly impact the final appearance of your {cleanName.toLowerCase()} project.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">🔍 Check Your Gauge</h3>
                  <p className="text-slate-600 mb-4">
                    Always make a gauge swatch before starting your {cleanName.toLowerCase()} crochet pattern. 
                    This ensures your finished project will be the correct size.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">📝 Read Carefully</h3>
                  <p className="text-slate-600 mb-4">
                    Read through the entire {cleanName.toLowerCase()} pattern before beginning. 
                    Understanding the construction method helps avoid mistakes and ensures smooth progress.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">🎆 Practice New Stitches</h3>
                  <p className="text-slate-600 mb-4">
                    If your chosen {cleanName.toLowerCase()} pattern includes unfamiliar stitches, 
                    practice them on a small swatch first to build confidence and muscle memory.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">No {cleanName} Patterns Found</h3>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                We're currently building our collection of {cleanName.toLowerCase()} crochet patterns. 
                Check back soon for new designs, or explore our other categories for inspiration!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/crochetpatterns"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Browse All Crochet Patterns
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  View All Categories
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}