import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crochet Patterns for Every Category | Crochet911',
  description: 'Browse crochet patterns for specific categories and themes. Find targeted designs for animals, clothing, home decor, holidays, and more.',
  keywords: [
    'crochet patterns for',
    'specific crochet patterns',
    'category crochet patterns',
    'themed crochet patterns',
    'targeted crochet designs'
  ].join(', '),
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

export default function CrochetPatternsForLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}