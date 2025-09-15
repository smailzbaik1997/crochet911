import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Crochet Patterns | Crochet911',
  description: 'Browse thousands of free and premium crochet patterns. Find patterns for every skill level from beginner to expert.',
  openGraph: {
    title: 'All Crochet Patterns',
    description: 'Browse thousands of free and premium crochet patterns for every skill level.',
    type: 'website',
  },
}

export default function PatternsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}