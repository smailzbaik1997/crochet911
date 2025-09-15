import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Terms of Use | Crochet911',
  description: 'Read the terms and conditions for using Crochet911, your comprehensive crochet patterns directory. Learn about user responsibilities and website policies.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="https://v5.airtableusercontent.com/v3/u/45/45/1757952000000/gdL1tnSP8FlLTvJ4lYBbdQ/MR4HxHUsa3en7LUQYl73o5HezvuCkgz180uDmUFQU2MY4BFXQHpOvH08eGZMFwsz_h8FFvBEEVZoumSsOeye7571VvbNJEsf8RJm9DTFCRPPBmomfb8rQwzu1A8zdtMAEEKJ-4I-jrptdw0jeNQ68w/-0OxaI_KSDTqe5dnRc2jknBO2I_E0mniurZcXPX3M1E"
              alt="Crochet911 Logo"
              width={200}
              height={53}
              className="h-14 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Use</h1>
          <p className="text-lg text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-blue-800 font-medium mb-2">
              Welcome to Crochet911, your comprehensive crochet patterns directory.
            </p>
            <p className="text-blue-700">
              By accessing and using our website, you agree to comply with and be bound by the following terms and conditions.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Acceptance of Terms</h2>
            <p className="text-slate-700">
              By accessing, browsing, or using Crochet911, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Use of the Website</h2>
            
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Permitted Uses</h3>
            <ul className="list-disc pl-6 mb-6 text-slate-700">
              <li>Browse and search our crochet pattern directory</li>
              <li>Access free patterns and tutorials</li>
              <li>Create an account to save favorite patterns</li>
              <li>Share patterns with proper attribution</li>
              <li>Use patterns for personal, non-commercial projects</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3">Prohibited Uses</h3>
            <ul className="list-disc pl-6 mb-6 text-slate-700">
              <li>Reproduce, distribute, or sell our content without permission</li>
              <li>Use automated systems to scrape or download content</li>
              <li>Post spam, malicious content, or inappropriate material</li>
              <li>Violate intellectual property rights</li>
              <li>Engage in any illegal or unauthorized activities</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
            <p className="text-slate-700 mb-4">
              The content on Crochet911, including but not limited to text, graphics, logos, images, and software, is protected by copyright and other intellectual property laws. We respect the intellectual property rights of pattern designers and content creators.
            </p>
            <ul className="list-disc pl-6 text-slate-700">
              <li>Pattern designs belong to their respective creators</li>
              <li>Our website design and organization is our intellectual property</li>
              <li>Users must respect copyright and attribution requirements</li>
              <li>Commercial use of patterns may require additional licensing</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">User Accounts</h2>
            <p className="text-slate-700 mb-4">
              If you create an account on our website, you are responsible for:
            </p>
            <ul className="list-disc pl-6 text-slate-700">
              <li>Maintaining the confidentiality of your account information</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and up-to-date information</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Content and Submissions</h2>
            <p className="text-slate-700 mb-4">
              When you submit content to our website (comments, reviews, patterns), you grant us a non-exclusive license to use, display, and distribute that content. You represent that:
            </p>
            <ul className="list-disc pl-6 text-slate-700">
              <li>You own the rights to the content or have permission to share it</li>
              <li>The content does not violate any laws or third-party rights</li>
              <li>The content is accurate and not misleading</li>
              <li>You will not submit spam or inappropriate material</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">External Links</h2>
            <p className="text-slate-700">
              Our website may contain links to external websites and pattern sources. We are not responsible for the content, privacy policies, or practices of these external sites. Links are provided for convenience and do not constitute endorsement.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Disclaimers</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800 font-medium mb-2">Important Notice:</p>
              <ul className="list-disc pl-6 text-yellow-700">
                <li>Our website is provided "as is" without warranties of any kind</li>
                <li>We do not guarantee the accuracy of pattern instructions</li>
                <li>Users assume responsibility for pattern results and safety</li>
                <li>We are not liable for any damages arising from website use</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
            <p className="text-slate-700">
              To the fullest extent permitted by law, Crochet911 shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses resulting from your use of our website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Termination</h2>
            <p className="text-slate-700">
              We reserve the right to terminate or suspend your access to our website at any time, without notice, for conduct that we believe violates these Terms of Use or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to Terms</h2>
            <p className="text-slate-700">
              We may modify these Terms of Use at any time. Your continued use of the website after changes are posted constitutes acceptance of the modified terms. We encourage you to review these terms periodically.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
            <p className="text-slate-700">
              If you have questions about these Terms of Use, please contact us at:
            </p>
            <div className="bg-slate-50 p-4 rounded-lg mt-4">
              <p className="text-slate-700">
                Email: legal@crochet911.com<br />
                Address: [Your Address]
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Governing Law</h2>
            <p className="text-slate-700">
              These Terms of Use are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}