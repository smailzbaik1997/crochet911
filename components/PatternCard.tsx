import Link from 'next/link'
import Image from 'next/image'
import { formatDifficulty, getDifficultyColor, getValidImageUrl, truncateText } from '@/lib/utils'

interface Pattern {
  id: string
  title: string
  slug: string
  description: string
  short_description: string | null
  difficulty: 'beginner' | 'easy' | 'intermediate' | 'advanced' | 'expert'
  featured_image_url: string | null
  image_alt_text: string | null
  is_free: boolean
  price: number | null
  view_count: number
  designer?: {
    name: string
    slug: string
  }
  category?: {
    name: string
    slug: string
  }
}

interface PatternCardProps {
  pattern: Pattern
  className?: string
  priority?: boolean
}

export default function PatternCard({ pattern, className = '', priority = false }: PatternCardProps) {
  const displayDescription = pattern.short_description || truncateText(pattern.description, 120)
  const imageUrl = getValidImageUrl(pattern.featured_image_url)
  const altText = pattern.image_alt_text || `${pattern.title} crochet pattern`

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <Link href={`/patterns/${pattern.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={altText}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          
          {/* Difficulty badge */}
          <div className="absolute top-2 left-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(pattern.difficulty)}`}>
              {formatDifficulty(pattern.difficulty)}
            </span>
          </div>

          {/* Free/Paid badge */}
          <div className="absolute top-2 right-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              pattern.is_free 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {pattern.is_free ? 'Free' : `$${pattern.price?.toFixed(2)}`}
            </span>
          </div>

          {/* View count overlay */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            {pattern.view_count.toLocaleString()} views
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="mb-2">
          <Link 
            href={`/patterns/${pattern.slug}`}
            className="text-lg font-semibold text-gray-900 hover:text-pink-600 transition-colors line-clamp-2"
          >
            {pattern.title}
          </Link>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {displayDescription}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            {pattern.designer && (
              <Link 
                href={`/designers/${pattern.designer.slug}`}
                className="hover:text-pink-600 transition-colors"
              >
                {pattern.designer.name}
              </Link>
            )}
            {pattern.designer && pattern.category && <span>•</span>}
            {pattern.category && (
              <Link 
                href={`/categories/${pattern.category.slug}`}
                className="hover:text-pink-600 transition-colors"
              >
                {pattern.category.name}
              </Link>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Link 
            href={`/patterns/${pattern.slug}`}
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors text-sm font-medium text-center block"
          >
            View Pattern
          </Link>
        </div>
      </div>
    </div>
  )
}

// Skeleton loader for pattern cards
export function PatternCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-1"></div>
        <div className="h-4 bg-gray-300 rounded mb-3 w-3/4"></div>
        <div className="flex justify-between mb-4">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  )
}