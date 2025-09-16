import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/logocrochet911.webp"
            alt="Crochet911"
            width={120}
            height={40}
            className="h-auto w-auto max-w-[120px] mx-auto"
            priority
          />
        </div>

        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-blue-600 leading-none">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Oops! Pattern Not Found
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            The crochet pattern you're looking for seems to have unraveled. 
            Don't worry, we have thousands of other beautiful patterns waiting for you!
          </p>
        </div>

        {/* Decorative Element */}
        <div className="mb-8">
          <div className="flex justify-center items-center space-x-2 text-blue-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go to Home
          </Link>
          
          <Link
            href="/categories"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
            </svg>
            Browse Categories
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Need help finding something specific?{' '}
            <Link href="/crochetpatterns" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
              Search our patterns
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}