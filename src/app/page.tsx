import Link from 'next/link'
import { Metadata } from 'next'
import PatternCard from '@/components/PatternCard'
import HomepageFAQ from '@/components/HomepageFAQ'
import PatternSearchHero from '@/components/PatternSearchHero'
import HomeContent from '@/components/HomeContent'

// SEO-optimized metadata for homepage
export const metadata: Metadata = {
  title: 'Crochet Patterns Directory - Free & Premium Designs | Crochet911',
  description: 'Discover the ultimate crochet patterns directory with thousands of free and premium designs. Browse animal, holiday, clothing, and home decor patterns for all skill levels. Your complete crochet pattern resource.',
  keywords: [
    'crochet patterns directory',
    'free crochet patterns',
    'crochet pattern library',
    'crochet designs collection',
    'amigurumi patterns',
    'crochet pattern database',
    'beginner crochet patterns',
    'advanced crochet designs',
    'crochet pattern catalog',
    'yarn craft patterns'
  ].join(', '),
  openGraph: {
    title: 'Crochet Patterns Directory - Free & Premium Designs',
    description: 'The ultimate crochet patterns directory with thousands of designs for all skill levels. Find free and premium patterns from top designers.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crochet Patterns Directory - Free & Premium Designs',
    description: 'The ultimate crochet patterns directory with thousands of designs for all skill levels.',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
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

export default function Home() {
  return <HomeContent />
}