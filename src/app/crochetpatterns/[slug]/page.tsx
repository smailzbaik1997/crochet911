import { Metadata } from 'next'
import { getPatternBySlug } from '@/lib/data'
import { generateMetaDescription } from '@/lib/utils'
import PatternPageContent from '@/components/PatternPageContent'

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

export default function CrochetPatternPage({ params }: PageProps) {
  return <PatternPageContent slug={params.slug} />
}