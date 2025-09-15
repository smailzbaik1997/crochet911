// Debug component to check pattern data and images
'use client'

import { useState, useEffect } from 'react'
import { getAllPatterns } from '@/lib/data'
import { getValidImageUrl } from '@/lib/utils'

export default function ImageDebugPage() {
  const [patterns, setPatterns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  useEffect(() => {
    async function debugPatterns() {
      const logs: string[] = []
      
      try {
        logs.push('🔍 Fetching patterns...')
        const data = await getAllPatterns({ limit: 10 })
        
        logs.push(`📊 Found ${data.length} patterns`)
        
        if (data.length === 0) {
          logs.push('❌ No patterns found in database')
        } else {
          data.forEach((pattern, index) => {
            logs.push(`\\n📝 Pattern ${index + 1}: "${pattern.title}"`)
            logs.push(`   - ID: ${pattern.id}`)
            logs.push(`   - Slug: ${pattern.slug}`)
            logs.push(`   - Published: ${pattern.is_published}`)
            logs.push(`   - Featured Image URL: ${pattern.featured_image_url || 'NULL'}`)
            
            const processedUrl = getValidImageUrl(pattern.featured_image_url)
            logs.push(`   - Processed URL: ${processedUrl}`)
            logs.push(`   - Is Fallback: ${processedUrl.includes('placeholder')}`)
          })
        }
        
        setPatterns(data)
        setDebugInfo(logs)
      } catch (error) {
        logs.push(`❌ Error: ${error}`)
        setDebugInfo(logs)
      } finally {
        setLoading(false)
      }
    }

    debugPatterns()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Image Debug Tool</h1>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p>Loading patterns...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Image Debug Tool</h1>
        
        {/* Debug Log */}
        <div className="bg-slate-900 text-green-400 rounded-lg p-6 mb-8 font-mono text-sm overflow-x-auto">
          <h2 className="text-white text-lg font-bold mb-4">Debug Log:</h2>
          {debugInfo.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>

        {/* Pattern Grid */}
        {patterns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patterns.slice(0, 6).map((pattern) => {
              const imageUrl = getValidImageUrl(pattern.featured_image_url)
              const isPlaceholder = imageUrl.includes('placeholder')
              
              return (
                <div key={pattern.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="aspect-[4/3] relative bg-slate-100">
                    <img
                      src={imageUrl}
                      alt={pattern.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Image failed to load:', imageUrl)
                        e.currentTarget.src = 'https://via.placeholder.com/400x300/64748b/ffffff?text=Image+Error'
                      }}
                    />
                    {isPlaceholder && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
                        PLACEHOLDER
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">{pattern.title}</h3>
                    <p className="text-sm text-slate-600 mb-2">Difficulty: {pattern.difficulty}</p>
                    <p className="text-xs text-slate-500 break-all">
                      Image URL: {pattern.featured_image_url || 'None'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">No Patterns Found</h2>
            <p className="text-slate-600 mb-6">
              Your database appears to be empty or patterns are not published.
            </p>
            <div className="text-left bg-slate-50 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Next Steps:</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>1. Check your Supabase connection</li>
                <li>2. Ensure patterns table has data</li>
                <li>3. Verify patterns have is_published = true</li>
                <li>4. Add featured_image_url to patterns</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}