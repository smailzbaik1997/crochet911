'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPatternBySlug } from '@/lib/data'
import { useRealtimePattern } from '@/lib/realtime-hooks'
import { 
  generatePatternStructuredData, 
  generateBreadcrumbData, 
  formatDifficulty, 
  formatYarnWeight, 
  getDifficultyColor,
  getValidImageUrl,
  generateMetaDescription
} from '@/lib/utils'

// Type definitions
type Tag = {
  id: string
  name: string
  color?: string
}

type PatternTag = {
  tag: Tag
}

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pattern = await getPatternBySlug(params.slug)
  
  if (!pattern) {
    return {
      title: 'Crochet Pattern Not Found | Crochet911',
      description: 'The requested free crochet pattern could not be found.'
    }
  }

  return {
    title: pattern.meta_title || `${pattern.title} - Free Crochet Pattern | Crochet911`,
    description: generateMetaDescription(pattern),
    keywords: [
      'free crochet pattern',
      'crochet patterns',
      pattern.title.toLowerCase(),
      `${pattern.difficulty} crochet pattern`,
      ...(pattern.keywords || [])
    ].join(', '),
    openGraph: {
      title: `${pattern.title} - Free Crochet Pattern`,
      description: pattern.short_description || pattern.description,
      type: 'article',
      images: pattern.featured_image_url ? [pattern.featured_image_url] : [],
      publishedTime: pattern.created_at,
      modifiedTime: pattern.updated_at,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/crochetpatterns/${pattern.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pattern.title} - Free Crochet Pattern`,
      description: pattern.short_description || pattern.description,
      images: pattern.featured_image_url ? [pattern.featured_image_url] : [],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/crochetpatterns/${pattern.slug}`,
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

// Client component for the pattern page content
function PatternPageContent({ slug }: { slug: string }) {
  const { pattern, loading, error } = useRealtimePattern(slug)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600">Loading pattern...</p>
        </div>
      </div>
    )
  }

  if (error || !pattern) {
    notFound()
  }

  const breadcrumbPath = [
    { name: 'Home', url: '/' },
    { name: 'Crochet Patterns', url: '/crochetpatterns' },
    ...(pattern.category ? [{ name: pattern.category.name, url: `/categories/${pattern.category.slug}` }] : []),
    { name: pattern.title, url: `/crochetpatterns/${pattern.slug}` }
  ]

  const structuredData = generatePatternStructuredData(pattern, '/crochetpatterns')
  const breadcrumbData = generateBreadcrumbData(breadcrumbPath)
  const imageUrl = getValidImageUrl(pattern.featured_image_url)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* SEO-Optimized Breadcrumbs */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            {breadcrumbPath.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {index === breadcrumbPath.length - 1 ? (
                  <span className="text-gray-900 font-medium">{item.name}</span>
                ) : (
                  <Link href={item.url} className="hover:text-pink-600 transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative">
              <div className="aspect-square relative">
                <Image
                  src={imageUrl}
                  alt={pattern.image_alt_text || `${pattern.title} free crochet pattern tutorial`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Pattern Details */}
            <div className="p-8">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {pattern.title} - Free Crochet Pattern
                </h1>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(pattern.difficulty)}`}>
                    {formatDifficulty(pattern.difficulty)} Crochet Pattern
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    pattern.is_free ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {pattern.is_free ? 'Free Crochet Pattern' : `Premium Pattern - $${pattern.price?.toFixed(2)}`}
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {pattern.short_description || pattern.description}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    This <strong>{pattern.difficulty} crochet pattern</strong> is perfect for 
                    {pattern.difficulty === 'beginner' ? ' those new to crochet' : 
                     pattern.difficulty === 'easy' ? ' crocheters with basic skills' :
                     pattern.difficulty === 'intermediate' ? ' experienced crocheters' :
                     pattern.difficulty === 'advanced' ? ' skilled crochet artists' :
                     ' expert crocheters'}.
                  </p>
                </div>
              </div>

              {/* Pattern Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {(pattern as any).yarn_weight && (
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Yarn Weight</h3>
                    <p className="text-gray-700">{formatYarnWeight((pattern as any).yarn_weight)}</p>
                  </div>
                )}
                
                {(pattern as any).hook_size && (
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Crochet Hook Size</h3>
                    <p className="text-gray-700">{(pattern as any).hook_size}</p>
                  </div>
                )}
                
                {(pattern as any).finished_size && (
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Finished Size</h3>
                    <p className="text-gray-700">{(pattern as any).finished_size}</p>
                  </div>
                )}
                
                {(pattern as any).time_to_complete && (
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Time to Complete</h3>
                    <p className="text-gray-700">{(pattern as any).time_to_complete}</p>
                  </div>
                )}
              </div>

              {/* Get Pattern Button - Missing Link from Database */}
              {(pattern as any).pattern_source_url && (
                <div className="mb-6">
                  <a
                    href={(pattern as any).pattern_source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Get This Free Pattern
                    <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  {(pattern as any).pattern_source_name && (
                    <p className="text-center text-sm text-gray-500 mt-2">
                      Pattern source: {(pattern as any).pattern_source_name}
                    </p>
                  )}
                </div>
              )}

              {/* Pattern Tags */}
              {(pattern as any).pattern_tags && (pattern as any).pattern_tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Pattern Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {(pattern as any).pattern_tags.map(({ tag }: any) => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        style={{ backgroundColor: tag.color ? `${tag.color}20` : undefined }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Full Description */}
          {pattern.description !== pattern.short_description && (
            <div className="p-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Crochet Pattern</h2>
              <div className="prose max-w-none text-gray-700">
                {pattern.description.split('\n').map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Yarn Details */}
          {(pattern as any).yarn_details && (
            <div className="p-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Yarn & Materials for This Crochet Pattern</h2>
              <div className="prose max-w-none text-gray-700">
                {(pattern as any).yarn_details.split('\n').map((line: string, index: number) => (
                  <p key={index} className="mb-2 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* SEO Content Section */}
          <div className="p-8 border-t border-gray-200 bg-slate-50">
            <h2 className="text-xl font-bold text-gray-900 mb-4">More About This Free Crochet Pattern</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Perfect For:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>{formatDifficulty(pattern.difficulty)} crocheters</li>
                  <li>Those looking for {pattern.is_free ? 'free' : 'premium'} crochet patterns</li>
                  {pattern.category && <li>{pattern.category.name.toLowerCase()} projects</li>}
                  <li>Skill building and technique practice</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What You'll Learn:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Essential crochet techniques</li>
                  <li>Pattern reading skills</li>
                  <li>Proper yarn and hook selection</li>
                  <li>Finishing techniques</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CrochetPatternPage({ params }: PageProps) {
  return <PatternPageContent slug={params.slug} />
}