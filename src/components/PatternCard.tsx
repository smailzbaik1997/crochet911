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
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 hover:border-blue-300 ${className}`}>
      <Link href={`/crochetpatterns/${pattern.slug}`}>
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
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(pattern.difficulty)}`}>
              {formatDifficulty(pattern.difficulty)}
            </span>
          </div>

          {/* Free/Paid badge */}
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              pattern.is_free 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {pattern.is_free ? 'Free' : `$${pattern.price?.toFixed(2)}`}
            </span>
          </div>

          {/* View count overlay */}
          <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
            {pattern.view_count.toLocaleString()} views
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="mb-3">
          <Link 
            href={`/crochetpatterns/${pattern.slug}`}
            className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors line-clamp-2"
          >
            {pattern.title}
          </Link>
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
          {displayDescription}
        </p>

        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
          <div className="flex items-center space-x-2">
            {pattern.designer && (
              <Link 
                href={`/designers/${pattern.designer.slug}`}
                className="hover:text-blue-600 transition-colors font-medium"
              >
                {pattern.designer.name}
              </Link>
            )}
            {pattern.designer && pattern.category && <span>•</span>}
            {pattern.category && (
              <Link 
                href={`/categories/${pattern.category.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {pattern.category.name}
              </Link>
            )}
          </div>
        </div>

        <div>
          <Link 
            href={`/crochetpatterns/${pattern.slug}`}
            className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg hover:bg-slate-800 transition-all duration-200 text-sm font-semibold text-center block transform hover:scale-105"
          >
            View Free Pattern
          </Link>
        </div>
      </div>
    </div>
  )
}

// Skeleton loader for pattern cards
export function PatternCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse border border-slate-200">
      <div className="aspect-[4/3] bg-slate-300"></div>
      <div className="p-6">
        <div className="h-6 bg-slate-300 rounded mb-3"></div>
        <div className="h-4 bg-slate-300 rounded mb-2"></div>
        <div className="h-4 bg-slate-300 rounded mb-4 w-3/4"></div>
        <div className="flex justify-between mb-4">
          <div className="h-4 bg-slate-300 rounded w-1/3"></div>
          <div className="h-4 bg-slate-300 rounded w-1/4"></div>
        </div>
        <div className="h-12 bg-slate-300 rounded-lg"></div>
      </div>
    </div>
  )
}