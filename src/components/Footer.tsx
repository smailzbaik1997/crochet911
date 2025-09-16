import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Image
                src="/logocrochet.webp"
                alt="Crochet911 Logo"
                width={32}
                height={32}
                className="mr-3"
              />
              <div className="text-2xl font-bold text-white">
                Crochet911
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your ultimate crochet patterns directory with thousands of free and premium designs for all skill levels.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/crochetpatterns" className="text-slate-300 hover:text-white transition-colors">
                  Crochet Patterns
                </Link>
              </li>
              <li>
                <Link href="/freecrochetpatterns" className="text-slate-300 hover:text-white transition-colors">
                  Free Patterns
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-slate-300 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/designers" className="text-slate-300 hover:text-white transition-colors">
                  Designers
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/animals" className="text-slate-300 hover:text-white transition-colors">
                  Animal Patterns
                </Link>
              </li>
              <li>
                <Link href="/categories/holidays-seasonal" className="text-slate-300 hover:text-white transition-colors">
                  Holiday Patterns
                </Link>
              </li>
              <li>
                <Link href="/categories/clothing-accessories" className="text-slate-300 hover:text-white transition-colors">
                  Clothing & Accessories
                </Link>
              </li>
              <li>
                <Link href="/categories/home-decor" className="text-slate-300 hover:text-white transition-colors">
                  Home Decor
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-300 hover:text-white transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <a href="mailto:support@crochet911.com" className="text-slate-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="mailto:legal@crochet911.com" className="text-slate-300 hover:text-white transition-colors">
                  Legal Inquiries
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Crochet911. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">
              Terms
            </Link>
            <a href="mailto:support@crochet911.com" className="text-slate-400 hover:text-white text-sm transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}