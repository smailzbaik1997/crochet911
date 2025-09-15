import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Crochet Patterns - Thousands of No-Cost Designs | Crochet911',
  description: 'Browse thousands of completely free crochet patterns. No cost, no signup required. Find beginner-friendly free crochet patterns, advanced designs, and everything in between.',
  keywords: [
    'free crochet patterns',
    'no cost crochet patterns',
    'free beginner crochet patterns',
    'free amigurumi patterns',
    'free crochet tutorials',
    'free advanced crochet patterns',
    'completely free patterns',
    'no signup crochet patterns',
    'gratis crochet patterns',
    'zero cost crochet designs'
  ].join(', '),
  openGraph: {
    title: 'Free Crochet Patterns - Thousands of No-Cost Designs',
    description: 'Browse thousands of completely free crochet patterns. No cost, no signup required.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/freecrochetpatterns`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Crochet Patterns - Thousands of No-Cost Designs',
    description: 'Browse thousands of completely free crochet patterns. No cost, no signup required.',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/freecrochetpatterns`,
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

export default function FreeCrochetPatternsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}