import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Crochet Patterns & Premium Designs | Crochet911',
  description: 'Browse thousands of free crochet patterns and premium designs for all skill levels. Find beginner crochet patterns, advanced designs, amigurumi patterns, and more from top designers.',
  keywords: [
    'free crochet patterns',
    'crochet patterns',
    'beginner crochet patterns',
    'advanced crochet patterns',
    'premium crochet designs',
    'crochet pattern directory',
    'amigurumi patterns',
    'easy crochet patterns',
    'expert crochet patterns',
    'crochet tutorials'
  ].join(', '),
  openGraph: {
    title: 'Free Crochet Patterns & Premium Designs',
    description: 'Browse thousands of free crochet patterns and premium designs for all skill levels. Your ultimate crochet pattern resource.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/crochetpatterns`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Crochet Patterns & Premium Designs',
    description: 'Browse thousands of free crochet patterns and premium designs for all skill levels.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/crochetpatterns`,
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

export default function CrochetPatternsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}