import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crochet Pattern Designers | Crochet911',
  description: 'Meet the talented designers behind our crochet patterns. Discover their unique styles and featured work.',
  openGraph: {
    title: 'Crochet Pattern Designers',
    description: 'Meet the talented designers behind our beautiful crochet patterns.',
    type: 'website',
  },
}

export default function DesignersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Designers
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the talented designers who create the beautiful crochet patterns in our collection. 
            Each brings their unique style and creativity to the crochet community.
          </p>
        </div>

        {/* Coming Soon */}
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <div className="mx-auto h-24 w-24 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="h-12 w-12 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Designer Profiles Coming Soon
            </h2>
            <p className="text-gray-600 mb-8">
              We're working on creating detailed profiles for our featured designers. 
              In the meantime, you can find designer information on individual pattern pages.
            </p>
            <div className="space-y-4">
              <a
                href="/patterns"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 transition-colors"
              >
                Browse All Patterns
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <div>
                <a
                  href="/categories"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Browse Categories
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action for Designers */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg px-8 py-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Are You a Crochet Designer?
            </h2>
            <p className="text-pink-100 text-lg mb-6">
              We'd love to feature your patterns in our collection. Join our community of talented designers.
            </p>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-pink-600 bg-white hover:bg-gray-50 transition-colors">
              Submit Your Patterns
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}